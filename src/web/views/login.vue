<!--
  - login Vue
  - @JsName login
  - @Description 登录视图.
  - @DateTime 2018-12-22 20:39:22
  - @author
  -->
<!-- 视图 -->  
<template>
    <div id="backendLogin">
        <el-container direction="horizontal">
            <div class="content">
                <h2>{{ caption }}</h2>
                <h5>欢迎使用{{ caption }}管理后台</h5>
                <el-input size="small" placeholder="用户名" type="text" ref="username" v-bind:disabled="isSubmit" v-model="loginForm.username"></el-input>
                <el-input size="small" placeholder="密码" type="password" ref="password" v-bind:disabled="isSubmit" v-model="loginForm.password"></el-input>
                <el-button size="small" type="primary" @click="logIn" v-bind:disabled="isSubmit" v-bind:loading="isSubmit">{{ buttonName }}</el-button>
            </div>
        </el-container>
    </div>
</template>

<!-- 视图 Js 脚本 -->  
<script>
import { Encoding } from "@/tools";
import { Owner } from "@/web/module/owner";
export default {
    name: "backend-login",
    components: {
    },
    data () {
        return {
            "caption": "爱钱袋",
            "loginForm": {
                "username": "",
                "password": "",
            },
           "isSubmit": false,
           "buttonName": "登录",
        }
    },
    methods: {
        /**
         * 登录
         */
        logIn () {
            const that = this;  
            if (that.validator()) {
                that.buttonName = "登录中"; 
                that.isSubmit = true;
                Owner.logIn({ "userName": that.loginForm.username, "password": Encoding.rsaEncrypt(that.loginForm.password) }).then((res) => {
                    if (res.code === 10001) {
                        that.showMessage("success", 1000, "登录成功", () => {
                            that.buttonName = "登录"; 
                            that.isSubmit = false;
                            that.$router.push({ "path": "/backend" });
                        });
                    } else {
                        that.showMessage("warning", 1500, "登陆失败 , ".concat(res.result), () => {
                            that.buttonName = "登录"; 
                            that.isSubmit = false;
                        });
                    }    
                }, (err) => {
                    that.showMessage("warning", 1500, "登录失败 , 网络异常", () => {
                        that.buttonName = "登录"; 
                        that.isSubmit = false;
                    });
                    console.error(err);
                });   
            }
        },
        /**
         * 显示消息
         */
        showMessage (type, duration, message, callback) {
            const that = this; 
            that.$message({
                type: type,
                center: true,
                duration: duration,
                showClose: false,
                message: message,
                onClose: (element) => {
                    if (callback) {
                        callback(element)
                    }
                },
            })
        },
        /**
         * 验证
         */
        validator () {
            const that = this; 
            if (that.loginForm.username === '' || that.loginForm.username === undefined) {
                that.showMessage("info", 2000, "请输入用户名  !!!"); 
                return false;
            } else if (that.loginForm.password === '' || that.loginForm.password === undefined) {
                that.showMessage("info", 2000, "请输入用户凭证  !!!"); 
                return false;
            } else {
                return true;
            }
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
#backendLogin {
    width: 100%;
    height: 100%;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    background-color: #F3F3F4;
    .el-container {
        width: 100%;
        height: 100%;
        .content {
            position: relative;
            top: 20%;
            margin: 0 auto;
            width: 388px;
            height: 388px;
            text-align: center;
            font-weight: 600;
            vertical-align: middle;
            h2 {
                color: #CCCCCC;
                font-size: 65px;
                line-height: 99px;
                text-align: center;
                margin-bottom: 30px;
            };
            h5 {
                color: #7C7B78;
                font-size: 18px;
                text-align: center;
                margin-bottom:22px;
            };
            .el-input, .el-button {
                width:328px;
                margin-bottom: 18px;
            };
            .el-button {
                margin-top: 12px;
            };
        };
    };
};
</style>
