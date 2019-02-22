<!--
  - login Vue
  - @JsName login
  - @Description 登录视图.
  - @DateTime 2018-12-22 20:39:22
  - @author
  -->
<!-- 视图 -->  
<template>
    <div id="logIn">
        <div id="mobile">
            <yd-input v-model="mobile" ref="mobile" required regex="mobile" placeholder="请输入手机号码"></yd-input>
            <yd-button @click.native="logIn" :disabled="disabled" :loading="loading" loading-txt="加载中..." type="primary" shape="square" size="large">{{"我要借钱"}}</yd-button>
        </div>
    </div>
</template>

<!-- 视图 Js 脚本 -->  
<script>
import { Notify } from "vue-ydui/dist/lib.rem/dialog";
import { User } from "@/app/module/user";
export default {
    name: "logIn",
    components: {
    },
    data () {
        return {
           "mobile": "",
           "loading": false,
           "disabled": false,
        }
    },
    methods: {
        /**
         * 登录
         */
        logIn () {
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
                            Notify({ mes: "登录失败 , ".concat(res.result), timeout: 3000});
                            that.disabled = false;
                            that.loading = false;
                        }
                    }, (err) => {
                        Notify({ mes: "登录失败 , 网络异常", timeout: 3000});
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
#logIn {
    display: flex;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0px;
    cursor: pointer;
    max-width: 515px;
    background: url("../../assets/app/background.png") no-repeat #ffdb01;
    background-size: 100%;
    #mobile {
        width: 72%;
        height: 3rem;
        margin: 82% auto 0;
        padding: 0 12px;
        background-color: #F3F3F4;
        border-radius: 3px;
        .yd-input {
            input {
                padding: 0 12px;
            };
            a:after, .yd-input-warn:after, .yd-input-error:after, .yd-input-success:after {
                font-size: 1.0rem;
            };
        };
        .yd-btn-block {
            width: 110%;
            height: 2.8rem;
            margin-top: 2rem;
            font-size: 13px;  
            margin-left: -12px;
            cursor: pointer;
            background-color: #EF4F4E;
        };
    };
};
:global {
    .yd-notify {
        height: 2.26rem;
        font-size: .82rem !important;
        line-height: 1.28rem !important;
        background-color: #EF4F4E !important;
    };
}
</style>
