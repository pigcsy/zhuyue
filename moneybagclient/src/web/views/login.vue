<!--
  - login Vue
  - @JsName login
  - @Description login 登录视图
  - @DateTime 2018-12-22 20:39:22
  - @author csy
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
export default {
    name: "weblogin",
    components: {
    },
    data () {
        return {
            "caption": "统一登录",
            "loginForm": {
                "username": "",
                "password": "",
            },
           "isSubmit": false,
           "buttonName": "登录",
        }
    },
    methods: {
        logIn () {
            // 者月钱包
            const that = this; 
            const result = that.$refs.mobile;
            if (result.valid) {
                that.loading = true;
                that.disabled = true;
                setTimeout(() => {
                    User.logIn({ "mobile": that.mobile }).then((res) => {
                        if (res.code === 10001) {
                            Notify({ mes: "登录成功", timeout: 2000, callback: () => {
                                that.loading = false;
                                that.$router.push({ "path": "/" });
                            }});  
                        } else {
                            Notify({ mes: "加载失败 , ".concat(res.result), timeout: 3000});
                            that.disabled = false;
                            that.loading = false;
                        }
                    }, (err) => {
                        Notify({ mes: "加载失败 , 网络异常", timeout: 3000});
                        that.disabled = false;
                        that.loading = false;
                        console.error(err);
                    });   
                }, 500);
            } else {
                Notify({ mes: ((result.errorCode === "NOT_NULL") ? "手机号码不允许为空. " : "手机号码不正确. "), timeout: 100000});
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
