<!--
  - index Vue
  - @JsName index
  - @Description 首页视图.
  - @DateTime 2018-12-22 20:39:22
  - @author
  -->
<!-- 视图 -->  
<template>
    <div id="backend">
        <el-container direction="horizontal">
            <!-- 菜单 -->
            <el-aside id="asidemenu">
                <el-container direction="vertical">
                    <el-header>
                        <div id="sign" @click="jumpPage('/backend')"><font><strong>a</strong></font></div>
                    </el-header>
                    <el-main>
                        <div class="menu dns" @click="jumpPage('/backend/goods')"><i class="material-icons">dns</i></div>
                        <div class="menu contacts" @click="jumpPage('/backend/user')"><i class="material-icons">contacts</i></div>
                        <div class="menu album" @click="jumpPage('/backend/configuration')"><i class="material-icons">album</i></div>
                    </el-main>
                    <el-footer>
                        <div id="avatar" @click="jumpPage('/backend/panel')"><img v-bind:src="avatar"></div>
                    </el-footer>
                </el-container>
            </el-aside>
            <!-- 内容 -->
            <el-main id="views">
                <transition>
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>

<!-- 视图 Js 脚本 -->  
<script>

export default {
    name: 'backend',
    components: {
    },
    data () {
        return {
            "avatar": "http://money-bag.oss-cn-hangzhou.aliyuncs.com/user/portrait/Portrait.png"        
        }
    },
    methods: {
        jumpPage (url) {
            const that = this;
            that.$router.replace({ "path": url });
        },
    },
    beforeCreate () {
    },
    beforeMount () {
    },
};
</script>

<!-- 视图 Scss 样式 -->  
<style lang="scss">
#backend {
    width: 100%;
    height: 100%;
    .el-container {
        width: 100%;
        height: 100%;
        #asidemenu {
            width: 72px !important;
            background-color: #121822;
            text-align: center;
            user-select: none;
            -ms-user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            .el-container {
                width: 100%;
                height: 100%;
                .el-header {
                    padding: 0;
                    height: 80px !important; 
                    #sign {
                        cursor: pointer;
                        width: 38px;
                        height: 38px;
                        border-radius: 19px;
                        margin: 20px auto 0px;
                        padding: 0;
                        background-color: #5B626C;
                        font {
                            color: #FFFFFF;
                            font-size: 31px;
                            font-family: "material-icons";
                            font-weight: 900;
                            line-height: 31px;
                        };
                    };   
                };
                .el-main {
                    padding: 0;
                    text-align: center;
                    background-color: #121822;
                    .menu {
                        width: 44px;
                        height: 44px;
                        border-radius: 22px;
                        margin: 5px auto 15px;
                        padding: 0;
                        cursor: pointer;
                        .material-icons {
                            font-size: 18px;
                            color: #FFFFFF;
                            line-height: 44px;
                        };
                    };
                    .menu.dashboard {
                        background-color: #33CC33;
                    }; 
                    .menu.dns {
                        background-color: #57B275;
                    };  
                    .menu.contacts {
                        background-color: #4696EC;
                    };
                    .menu.album {
                        background-color: #DC3743;
                    }; 
                };
                .el-footer {
                    padding: 0;
                    height: 90px !important; 
                    #avatar {
                        cursor: pointer;
                        width: 44px;
                        height: 44px;
                        border-radius: 22px;
                        margin: 5px auto 15px;
                        background-color: #5B626C;
                        img {
                            width: 44px;
                            height: 44px;
                        };
                    };
                };
            };
        };
        #views {
            background-color: #F5F5F5;
            padding: 0;
            text-align: center;
        };
    };
};
</style>
