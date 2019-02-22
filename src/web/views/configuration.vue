<!--
  - configuration Vue
  - @JsName configuration
  - @Description 配置视图.
  - @DateTime 2018-12-22 20:39:22
  - @author
  -->
<!-- 视图 -->  
<template>
    <div id="configuration">
        <el-container direction="vertical" v-loading="loading">
            <el-header>
                <div id="sign">
                    <span class="signicon"><font>#</font></span>
                    <span class="signtext">配置页面</span>
                </div>
                <div id="group">
                    <span class="groupicon"><i class="material-icons" @click="refresh()">refresh</i></span>
                </div>
            </el-header>
            <el-main>
                <div class="content">
                   <!-- 申请文案 -->
                    <div class="applyForText">
                        <el-form :model="data" :rules="rules" ref="data" label-width="100px">
                            <el-form-item :label="data.name" prop="value">
                                <el-input size="small" v-model="data.value" v-bind:disabled="isSubmit"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="submit">
                            <el-button size="small" type="primary" @click="submitForm('data')" v-bind:disabled="isSubmit" v-bind:loading="isSubmit">{{ buttonName }}</el-button>
                            <el-button size="small" @click="reset()" v-bind:disabled="isSubmit">{{ "重置" }}</el-button>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>   
    </div>
</template>

<!-- 视图 Js 脚本 -->  
<script>
import { Configure } from "@/web/module/configure";
export default {
    name: "backend-configuration",
    components: {
    },
    data () {
        return {
            "loading": true,
            "isSubmit": false,
            "buttonName": "保存",
            "param": {
                "code": "ApplyForText",
            },
            "data": {},
            "rules": {
                "value": [
                    { "min": 4, "max": 4, "message": '长度在 4 个字符', "trigger": 'blur' }
                ],
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
                Configure.obtain({ ...that.param }).then((res) => {
                    that.loading = false;
                    that.isSubmit = false; 
                    if (res) {
                        if (res.code === 10001) {
                            that.data = res.data;
                        } else {
                            that.$message({ center: true, type: 'warning', message: "加载失败 , ".concat(res.result) });
                        }
                    }
                }, (err) => {
                    that.loading = false;
                    that.isSubmit = false; 
                    that.$message({ center: true, type: 'warning', message: "加载失败 , 网络异常" });
                    console.error(err);
                });
            }, 500);
        },
        /**
         * 提交表单
         */
        submitForm (formName) {
            const that = this
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    that.buttonName = "保存中"; 
                    that.isSubmit = true; 
                    setTimeout(() => {
                        Configure.modify({ "id": that.data.id , "value": that.data.value }).then((res) => {
                            that.buttonName = "保存"; 
                            that.isSubmit = false; 
                            if (res) {
                                if (res.code === 10001) {
                                    // 加载数据
                                    that.loadingInfo();
                                } else {
                                    that.$message({ center: true, type: "warning", message: "保存失败 , ".concat(res.result) });
                                }
                            }    
                        }, (err) => {
                            that.buttonName = "保存"; 
                            that.isSubmit = false;
                            that.$message({ center: true, type: "warning", message: "保存失败 , 网络异常" });
                            console.error(err);
                        });
                    }, 500);
                }
            });
        },
        /**
         * 重置表单
         */
        reset () {
            const that = this
            that.isSubmit = true; 
            // 加载数据
            that.loadingInfo();
        },
        /**
         * 刷新
         */
        refresh () {
            const that = this; 
            that.loading = true; 
            // 加载数据
            that.loadingInfo();
        },
    },
    beforeCreate () {
    },
    beforeMount () {
        const that = this; 
        // 加载数据
        that.loadingInfo();
    },
};
</script>

<!-- 视图 Scss 样式 -->  
<style lang="scss">
#configuration {
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
            .applyForText {
                display: flex;
                width: 500px;
                margin: 0 auto;
                padding: 32px 0 0 0;
                .el-form {
                    padding-top: 10px;
                    height: 62px;
                };  
                .submit {
                    height: 62px;
                    line-height: 62px;
                    margin-left: 32px;
                };  
            };
        };
    };
};
</style>
