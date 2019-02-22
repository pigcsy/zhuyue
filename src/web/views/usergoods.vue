<!--
  - usergoods Vue
  - @JsName usergoods
  - @Description 产品视图 :: 用户产品.
  - @DateTime 2018-12-22 20:39:22
  - @author
  -->
<!-- 视图 -->  
<template>
    <div id="usergoods">
        <el-container direction="vertical" v-loading="loading">
            <el-header>
                <div id="sign">
                    <span class="signicon"><font>#</font></span>
                    <span class="signtext">产品列表 :: 用户产品</span>
                </div>
                <div id="group">
                    <span class="groupicon"><i class="material-icons" @click="refresh()">refresh</i></span>
                    <span class="groupicon"><i class="material-icons" @click="close()">settings_power</i></span>
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
                                <el-table-column label="PV" align="center" min-width="80">
                                    <template slot-scope="scope">{{ scope.row.pageView }}</template>
                                </el-table-column>
                                <el-table-column label="UV" align="center" min-width="80">
                                    <template slot-scope="scope">{{ scope.row.uniqueVisitor }}</template>
                                </el-table-column>
                                <el-table-column label="访问时间（ 第一次 ）" align="center" min-width="160">
                                    <template slot-scope="scope">{{ scope.row.createdTime }}</template>
                                </el-table-column>
                                <el-table-column label="访问时间（ 最近 ）" align="center" min-width="160">
                                    <template slot-scope="scope">{{ scope.row.modifiedTime }}</template>
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
import { User } from "@/web/module/user";
export default {
    name: "backend-usergoods",
    components: {
    },
    data () {
        return {
            "loading": true,
            "page": 1,
            "param": {
                "id": 0,
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
            setTimeout(() => {
                User.obtain({ ...that.param }).then((res) => {
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
         * 分页跳转
         */
        jumpPagination (val) {
            const that = this; 
            that.loading = true; 
            that.param.page = val; 
            // 加载数据
            that.loadingInfo();
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
         * 关闭
         * -- 返回指定页面
         */
        close () {
            const that = this;
            that.$router.replace({ "name": "backend-user", "params": { "page": that.page }});
        },
    },
    beforeCreate () {
    },
    beforeMount () {
        const that = this, { userId, page } = that.$route.params; 
        if (userId) {
            that.page = page;
            that.param.id = userId;
            // 加载数据
            that.loadingInfo();
        } else {
            that.$router.replace({ "path": "/backend/user" });
        }
    },
};
</script>

<!-- 视图 Scss 样式 -->  
<style lang="scss">
#usergoods {
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
                    tr {
                        cursor: pointer;
                    };
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
