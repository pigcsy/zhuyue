<!--
  - user Vue
  - @JsName user
  - @Description 用户视图.
  - @DateTime 2018-12-22 20:39:22
  - @author 花花
  -->
<!-- 视图 -->  
<template>
    <div id="user">
        <el-container direction="vertical" v-loading="loading">
            <el-header>
                <div id="sign">
                    <span class="signicon"><font>#</font></span>
                    <span class="signtext">用户列表</span>
                </div>
                <div id="group">
                    <span class="groupicon"><i class="material-icons" @click="refresh()">refresh</i></span>
                </div>
            </el-header>
            <el-main>
                <div class="content">
                    <el-container direction="vertical">
                        <!-- 表格 -->
                        <el-main>
                            <el-table :data="data"  height="100%" @row-click="(row) => actuator({ data: row, operate: 1 })">
                                <el-table-column type="index" label="序号" align="center">
                                    <template slot-scope="scope">{{ ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}</template>
                                </el-table-column>
                                <el-table-column label="图标" align="center" min-width="160">
                                    <template slot-scope="scope">
                                        <img v-bind:src="scope.row.avatar"/>
                                    </template>
                                </el-table-column>
                                <el-table-column label="用户手机" align="center" min-width="160">
                                    <template slot-scope="scope">{{ scope.row.mobile }}</template>
                                </el-table-column>  
                                <el-table-column label="创建时间" align="center" min-width="160">
                                    <template slot-scope="scope">{{ scope.row.createdTime }}</template>
                                </el-table-column>
                                <el-table-column label="操作" align="center" min-width="160">
                                    <template slot-scope="scope">
                                    <el-dropdown @command="actuator">
                                        <el-button type="primary" size="small" plain>{{ "操作" }}</el-button>
                                        <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item :command="{ data: scope.row, operate: 1 }">{{ "查看" }}</el-dropdown-item>
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
import { User } from "@/web/module/user";
export default {
    name: "backend-user",
    components: {
    },
    data () {
        return {
            "loading": true,
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
            setTimeout(() => {
                User.obtainAll({ ...that.param }).then((res) => {
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
         * 执行器
         */
        actuator ({ data }) {
            const that = this; 
            that.$router.replace({ "name": "backend-usergoods", "params": { "userId": data.id, "page": that.pagination.currentPage }});
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
#user {
    width: 100%;
    height: 100%;
    .el-header {
        padding: 0;
        height: 72px !important;
        background-color: #FFFFFF;
        box-shadow: 0px 0px 2px #e6dfdf;
        display: flex;
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
            width: 120px;
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
