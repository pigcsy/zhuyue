<!--
  - goods Vue
  - @JsName index
  - @Description 产品视图.
  - @DateTime 2018-12-22 20:39:22
  - @author
  -->
<!-- 视图 -->  
<template>
    <div id="goods">
        <el-container direction="vertical" v-loading="loading">
            <el-header>
                <div id="sign">
                    <span class="signicon"><font>#</font></span>
                    <span class="signtext">产品列表 :: 贷款产品</span>
                </div>
                <div id="group">
                    <span class="groupicon"><i class="material-icons addition" @click="addition()">add</i></span>
                    <span class="groupicon"><i class="material-icons" @click="refresh()">refresh</i></span>
                </div>
            </el-header>
            <el-main>
                <div class="content">
                    <el-container direction="vertical">
                        <!-- 表格 -->
                        <el-main>
                            <el-table :data="data"  height="100%">
                                <el-table-column type="index" label="序号" align="center">
                                    <template slot-scope="scope">{{ ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}</template>
                                </el-table-column>
                                <el-table-column label="名称" align="center" min-width="120">
                                    <template slot-scope="scope"><a v-bind:href="scope.row.jumpLink" target="_blank">{{ scope.row.name }}</a></template>
                                </el-table-column>
                                <el-table-column label="图标" align="center">
                                    <template slot-scope="scope">
                                        <img v-bind:src="scope.row.icon"/>
                                    </template>
                                </el-table-column>
                                <el-table-column label="来源" align="center" min-width="220">
                                    <template slot-scope="scope">{{ scope.row.source }}</template>
                                </el-table-column>
                                <el-table-column label="简介" align="center" min-width="320">
                                    <template slot-scope="scope">{{ scope.row.synopsis }}</template>
                                </el-table-column>
                                <el-table-column label="放款时长" align="center" min-width="80">
                                    <template slot-scope="scope">{{ scope.row.makeLoans + " 分钟" }}</template>
                                </el-table-column>
                                <el-table-column label="放款额度" align="center" width="160">
                                    <template slot-scope="scope">{{ scope.row.minQuota + " - " + scope.row.maxQuota + " ¥" }}</template>
                                </el-table-column>
                                <el-table-column label="通过率" align="center"  min-width="80">
                                    <template slot-scope="scope">{{ scope.row.passRatio + " %" }}</template>
                                </el-table-column>
                                <el-table-column label="状态" align="center"  min-width="80">
                                    <template slot-scope="scope">
                                    <span v-if="scope.row.shelfStatus === 1">{{ "上架" }}</span>
                                    <span v-else>{{ "下架" }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="排序权重" align="center"  min-width="80">
                                    <template slot-scope="scope">{{ scope.row.sortPriority }}</template>
                                </el-table-column>
                                <el-table-column label="PV" align="center" min-width="80">
                                    <template slot-scope="scope">{{ scope.row.pageView }}</template>
                                </el-table-column>
                                <el-table-column label="UV" align="center" min-width="80">
                                    <template slot-scope="scope">{{ scope.row.uniqueVisitor }}</template>
                                </el-table-column>
                                <el-table-column label="创建时间" align="center" min-width="160">
                                    <template slot-scope="scope">{{ scope.row.createdTime }}</template>
                                </el-table-column>
                                <el-table-column label="操作" align="center" min-width="160">
                                    <template slot-scope="scope">
                                        <el-dropdown @command="actuator" v-loading="dropdown">
                                            <el-button type="primary" size="small" plain>{{ "操作" }}</el-button>
                                            <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item :command="{data: scope.row, operate: 1}">{{ "编辑" }}</el-dropdown-item>
                                            <el-dropdown-item :command="{data: scope.row, operate: 2}">
                                                <span v-if="scope.row.shelfStatus === 1">{{ "下架" }}</span>
                                                <span v-else>{{ "上架" }}</span>
                                            </el-dropdown-item>
                                            <el-dropdown-item :command="{data: scope.row, operate: 3}">{{ "删除" }}</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </template>
                                </el-table-column>
                            </el-table> 
                        </el-main>
                        <!-- 分页器 -->
                        <el-footer>
                            <div class="pagination">
                                <el-pagination @current-change="jumpPagination"
                                    layout="total, prev, pager, next, jumper"
                                    :current-page="pagination.currentPage"
                                    :page-size="pagination.pageSize"
                                    :total="pagination.total">
                                </el-pagination>
                            </div>
                        </el-footer>
                     </el-container>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<!-- 视图 Js 脚本 -->  
<script>
import { Goods } from "@/web/module/lending";
export default {
    name: "backend-goods",
    components: {
    },
    data () {
        return {
            "loading": true,
            "dropdown": false,
            "param": {
                "page": 1,
            },
            "data": [],
            "pagination": {
                "total": 0,
                "pageCount": 0,
                "currentPage": 1,
                "pageSize": 10,
            },
        }
    },
    methods: {
        /**
         * 加载数据
         */
        loadingInfo () {
            const that = this; 
            that.loading = true;
            setTimeout(() => {
                Goods.obtainPaging({ ...that.param }).then((res) => {
                    that.loading = false;
                    if (res) {
                        if (res.code === 10001) {
                            const { totalCount, totalPage, page, size, data } = res.data;
                            that.data = data;
                            that.pagination.total = totalCount;
                            that.pagination.pageCount = totalPage;
                            that.pagination.currentPage = page;
                            that.pagination.pageSize = size;
                        } else {
                            that.$message({ center: true, type: "warning", message: "加载失败 , ".concat(res.result) });
                        }
                    }
                }, (err) => {
                    that.loading = false;
                    that.$message({ center: true, type: "warning", message: "加载失败 , 网络异常" });
                    console.error(err);
                });
            }, 500);
        },
        /**
         * 状态
         */
        shelfStatus (data) {
            const that = this, status = data.shelfStatus, text = (status === 1) ? "下架" : "上架"; 
            that.dropdown = true;
            Goods.modify({ id: data.id, shelfStatus: (status === 1) ? 0 : 1 }).then((res) => {
                if (res) {
                    if (res.code === 10001) {
                        that.$message({ center: true, type: "success", duration: "1500", message: text.concat(res.result), onClose: () => {
                            that.dropdown = false;
                            // 加载数据
                            that.loadingInfo();    
                        }});
                    } else {
                        that.dropdown = false;
                        that.$message({ center: true, type: "warning", message: text.concat("失败 , ").concat(res.result) });
                    }
                } else {
                    that.dropdown = false;
                }
            }, (err) => {
                that.dropdown = false;
                that.$message({ center: true, type: "warning", message: text.concat("失败 , 网络异常") });
                console.error(err);
            });        
        },
        /**
         * 删除
         */
        remove (data) {
            const that = this, text = "删除"; 
            that.$confirm("此操作将永久删除该产品 , 是否继续 ?", "提示", { 
                "confirmButtonText": "确定",
                "cancelButtonText": "取消",
                "type": "warning",
            }).then(() => {
                that.dropdown = true;
                Goods.remove({ "id": data.id }).then((res) => {
                    if (res) {
                        if (res.code === 10001) {
                            that.$message({ center: true, type: "success", duration: "1500", message: text.concat(res.result), onClose: () => {
                                that.dropdown = false;
                                // 加载数据
                                that.loadingInfo();    
                            }});
                        } else {
                            that.dropdown = false;
                            that.$message({ center: true, type: "warning", message: text.concat("失败 , ").concat(res.result) });
                        }
                    } else {
                        that.dropdown = false;
                    }
                }, (err) => {
                    that.dropdown = false;
                    that.$message({ center: true, type: "warning", message: text.concat("失败 , 网络异常") });
                    console.error(err);
                });        
            }).catch(() => {
                that.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });          
            });
        },
        /**
         * 增加信息
         */
        addition () {
            const that = this;
            that.$router.replace({ "path": "/backend/goods/addition" });
        },
        /**
         * 执行器
         */
        actuator ({ data, operate }) {
            const that = this;
            switch (operate) {
                case 1:
                    that.$router.replace({ "name": "backend-goods-modify", "params": { "goodsId": data.id, "page": that.pagination.currentPage } });
                    break;
                case 2:
                    that.shelfStatus(data);
                    break;    
                case 3:
                    that.remove(data);
                    break;    
                default:
                    console.warn("Command 操作错误 , 未匹配到 Command 操作. ")
                    break;
            }
        },
        /**
         * 刷新
         */
        refresh () {
            const that = this; 
            that.loading = true; 
            that.param.page = 1;
            // 加载数据
            that.loadingInfo();
        },
        /**
         * 分页跳转
         */
        jumpPagination (val) {
            const that = this; 
            that.loading = true; 
            that.param.page = val; 
            // 加载数据
            that.loadingInfo();
        },
    },
    beforeCreate () {
    },
    beforeMount () {
        const that = this, { page } = that.$route.params; 
        if (page) {
            that.param.page = page;
        } 
        // 加载数据
        that.loadingInfo();
    },
};
</script>

<!-- 视图 Scss 样式 -->  
<style lang="scss">
#goods {
    width: 100%;
    height: 100%;
    .el-header {
        padding: 0;
        height: 72px !important;
        background-color: #FFFFFF;
        box-shadow: 0px 0px 2px #e6dfdf;
        #sign {
            width: 200px;
            height: 100%;
            display: flex;
            .signicon {
                width: 32px;
                height: 32px;
                border-radius: 16px;
                margin: 20px 10px 20px 38px;    
                background-color: #E3EDFD;
                border: 1px solid #6189D3;
                font {
                    color: #6189D3;
                    font-size: 16px;
                    font-family: "material-icons";
                    line-height: 30px;
                };
            };
            .signtext {
                line-height: 72px;
                color: #606266;
            };  
        };
        #group {
            display: flex;
            width: 170px;
            height: 72px;
            float: right;
            top: 0;
            right: 0;
            position: absolute;
            user-select: none;
            -ms-user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            .groupicon {
                display: block;
                width: 38px;
                height: 100%;
                margin-right: 12px;
                .material-icons {
                    cursor: pointer;
                    font-size: 24px;
                    color: #606266;
                    line-height: 72px;        
                };
                .material-icons.addition {
                    font-size: 28px;
                };
            };
        };
    };
    .el-main {
        width: 100%;
        height: 100%;
        .content {
            height: inherit;
            background-color: #FFFFFF;
            .el-main {
                .el-table {
                    td {
                        padding: 0;
                    };
                    img {
                        width: 50px;
                        border-radius: 50px;
                        margin: 12px auto 5px;
                    };
                };
            };
            .el-footer {
                height: 52px !important;
            };
        };
    };
};
</style>
