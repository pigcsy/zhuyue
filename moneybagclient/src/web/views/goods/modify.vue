<!--
  - modify Vue
  - @JsName modify
  - @Description 更新视图 :: 更新产品.
  - @DateTime 2018-12-22 20:39:22
  - @author 花花
  -->
<!-- 视图 -->  
<template>
    <div id="modify">
        <el-container direction="vertical" v-loading="isSubmit">
            <el-header>
                <div id="sign">
                    <span class="signicon"><font>#</font></span>
                    <span class="signtext">更新产品 :: 贷款产品</span>
                </div>
                <div id="group">
                    <button class="groupicon"><i class="material-icons" @click="submit('data')">done_all</i></button>
                    <span class="groupicon"><i class="material-icons" @click="reset('data')">settings_backup_restore</i></span>
                    <span class="groupicon"><i class="material-icons" @click="close()">settings_power</i></span>
                </div>
            </el-header>
            <el-main>
                <div class="content">
                     <el-form :model="data" :rules="rules" ref="data" label-width="100px">
                        <el-row type="flex" class="row-bg" justify="center">
                            <el-col :span="6" :sm="{ span: 16 }" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                                <div style="min-width: 378px;max-width: 398px;">
                                    <el-form-item label="名称" prop="name">
                                        <el-input size="small" v-model="data.name" placeholder="请输入名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="来源" prop="source">
                                        <el-input size="small" v-model="data.source" placeholder="请输入来源"></el-input>
                                    </el-form-item>
                                    <el-form-item label="链接" prop="jumpLink">
                                        <el-input size="small" v-model="data.jumpLink" placeholder="请输入跳转链接"></el-input>
                                    </el-form-item>
                                    <el-form-item label="简介" prop="synopsis">
                                        <el-input type="textarea" v-model="data.synopsis" placeholder="请输入简介"></el-input>
                                    </el-form-item>
                                    <el-form-item label="放款时长" prop="makeLoans" class="locate">
                                        <el-input-number size="small" v-model="data.makeLoans"></el-input-number>
                                        <span class="depict">{{ "下款时长 ( 单位 : 分钟 )" }}</span>
                                    </el-form-item>
                                    <el-form-item label="最低额度" prop="minQuota" class="locate">
                                        <el-input-number size="small" :precision="2" :step="10.00" :min="1.00" v-model="data.minQuota"></el-input-number>
                                    </el-form-item>
                                    <el-form-item label="最高额度" prop="maxQuota" class="locate">
                                        <el-input-number size="small" :precision="2" :step="10.00" :min="2.00" v-model="data.maxQuota"></el-input-number>
                                    </el-form-item>
                                    <el-form-item label="通过率" prop="passRatio" class="locate">
                                        <el-input-number size="small" :precision="2" :step="0.1" :min="0" :max="100" v-model="data.passRatio"></el-input-number>
                                    </el-form-item>
                                    <el-form-item label="排序" prop="sortPriority" class="locate">
                                        <el-input-number size="small" :min="0" v-model="data.sortPriority"></el-input-number>
                                    </el-form-item>
                                    <el-form-item label="状态" prop="shelfStatus" class="locate">
                                        <el-radio-group v-model="data.shelfStatus">
                                            <el-radio :label="1">{{ "上架" }}</el-radio>
                                            <el-radio :label="0">{{ "下架" }}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="0"></el-col>
                            <el-col :span="5" :sm="{ span: 16 }" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 5 }">
                                <el-form-item label="图标" prop="icon" class="locate">
                                    <el-upload v-loading="loading" :on-success="onSuccess" :on-error="onError" :before-upload="beforeUpload" :action="action" :headers="headers" name="icon" :show-file-list="false" list-type="picture-card" class="avatar-uploader">
                                        <img v-if="data.icon" :src="data.icon" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<!-- 视图 Js 脚本 -->  
<script>
import { Service } from "@/web/request";
import { Goods } from "@/web/module/lending";
export default {
    name: "backend-goods-modify",
    components: {
    },
    data () {
        return { 
            "page": 1,
            "action": Service.host.concat(Goods.api.upload),
            "headers": {
                "Token": localStorage.getItem("$BackendKey") ? localStorage.getItem("$BackendKey") : "",
            },
            "param": {
                "id": 0,
            },
            "loading": false,
            "isSubmit": false,
            "data": {
                "icon": "",
                "name": "",
                "source": "",
                "jumpLink": "",
                "synopsis": "",
                "makeLoans": "",
                "minQuota": "",
                "maxQuota": "",
                "passRatio": "",
                "shelfStatus": 1,
                "sortPriority": 0,
            },
            "rules": {
                "icon": [
                    { "required": true, "message": "请上传图标" },
                ],
                "name": [
                    { "required": true, "message": "请输入名称", "trigger": "blur" },
                    { "min": 2, "max": 10, "message": "长度在 2 到 10 个字符", "trigger": "blur" },
                ],
                "source": [
                    { "required": true, "message": "请输入来源", "trigger": "blur" },
                    { "min": 2, "max": 20, "message": "长度在 2 到 20 个字符", "trigger": "blur" },
                ],
                "jumpLink": [
                    { "required": true, "message": "请输入跳转链接", "trigger": "blur" },
                ],
                "synopsis": [
                    { "required": true, "message": "请输入简介", "trigger": "blur" },
                    { "min": 2, "max": 100, "message": "长度在 2 到 100 个字符", "trigger": "blur" },
                ],
                "makeLoans": [
                    { "required": true, "validator": (rule, value, callback) => {
                        if (value === undefined) {
                            return callback(new Error("请输入放款时长 ( 单位 : 分钟 )"));
                        }
                        if (!Number.isInteger(value)) {
                            callback(new Error("时长必须为数字值 ( 单位 : 分钟 )"));
                        } else {
                            (value > 0) ? callback() : callback(new Error("时长必须为 > 0 的数字值 ( 单位 : 分钟 )"));
                        }
                    }, "trigger": ["blur", "change"] },
                ],
                "minQuota": [
                    { "required": true, "validator": (rule, value, callback) => {
                        const that = this, { maxQuota } = that.data;
                        if (value === undefined) {
                            return callback(new Error("请输入最低额度"));
                        }
                        if (value >= 0.10) {
                            (maxQuota > value) ? callback() : callback(new Error("最低额度必须 < 最高额度"));
                        } else {
                            callback(new Error("最低额度必须 > 0.10 "));
                        }
                    }, "trigger": ["blur", "change"] },
                ],
                "maxQuota": [
                    { "required": true, "validator": (rule, value, callback) => {
                        const that = this, { minQuota } = that.data;
                        if (value === undefined) {
                            return callback(new Error("请输入最高额度"));
                        }
                        if (value >= 0.10) {
                            (value > minQuota) ? callback() : callback(new Error("最高额度必须 > 最低额度"));
                            that.$refs["data"].validateField("minQuota");
                        } else {
                            callback(new Error("最高额度必须为 > 0.10 "));
                        }
                    }, "trigger": ["blur", "change"] },
                ],
                "passRatio": [
                    { "required": true, "validator": (rule, value, callback) => {
                        if (value === undefined) {
                            return callback(new Error("请输入通过率"));
                        }
                        (value > 0) ? callback() : callback(new Error("通过率必须 > 0 "));
                    }, "trigger": ["blur", "change"] },
                ],
                "sortPriority": [
                    { "required": true, "validator": (rule, value, callback) => {
                        if (value === undefined) {
                            return callback(new Error("请输入排序"));
                        }
                        if (!Number.isInteger(value)) {
                            callback(new Error("排序必须为数字值"));
                        } else {
                            (value >= 0) ? callback() : callback(new Error("排序必须为 >= 0 的数字值"));
                        }
                    }, "trigger": "blur" },
                    { "required": true, "validator": (rule, value, callback) => {
                        if (value === undefined) {
                            return callback(new Error("请输入排序"));
                        }
                        if (!Number.isInteger(value)) {
                            callback(new Error("排序必须为数字值"));
                        } else {
                            (value >= 0) ? callback() : callback(new Error("排序必须为 >= 0 的数字值"));
                        }
                    }, "trigger": "change" },
                ],
                "shelfStatus": [
                    { "required": true, "message": '请选择状态', "trigger": "change" },
                ],
            }
        }
    },
    methods: {
        /**
         * 加载数据
         */
        loadingInfo () {
            const that = this;
            that.isSubmit = true; 
            setTimeout(() => {
                Goods.obtain({ ...that.param }).then((res) => {
                    that.isSubmit = false;
                    if (res) {
                        if (res.code === 10001) {
                            delete res.data["pageView"];
                            delete res.data["uniqueVisitor"];
                            delete res.data["createdTime"];
                            delete res.data["modifiedTime"];
                            that.data = { ...res.data };
                        } else {
                            that.$message({ center: true, type: "warning", message: "加载失败 , ".concat(res.result) });
                        }
                    }
                }, (err) => {
                    that.isSubmit = false; 
                    that.$message({ center: true, type: "warning", message: "加载失败 , 网络异常" });
                    console.error(err);
                });
            }, 500);
        },
        /**
         * 提交表单
         */
        submit (formName) {
            const that = this
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    that.isSubmit = true; 
                    setTimeout(() => {
                        Goods.modify({ ...that.data }).then((res) => {
                            that.isSubmit = false; 
                            if (res) {
                                if (res.code === 10001) {
                                    that.$message({ center: true, type: "success", duration: "1500", message: "更新".concat(res.result) });
                                } else {
                                    that.$message({ center: true, type: "warning", message: "更新失败 , ".concat(res.result) });
                                }
                            }
                        }, (err) => {
                            that.isSubmit = false; 
                            that.$message({ center: true, type: "warning", message: "更新失败 , 网络异常" });
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
            const that = this;
            that.loadingInfo();
        },
        /**
         * 关闭
         * -- 返回指定页面
         */
        close () {
            const that = this;
            that.$router.replace({ "name": "backend-goods", "params": { "page": that.page }});
        },
        /**
         * 上传成功
         */
        onSuccess (res) {
            const that = this;
            that.loading = false;
            if (res) {
                if (res.code === 10013) {
                    that.data.icon = res.data;
                    that.$refs["data"].validateField("icon");
                } else {
                    that.$message({ center: true, type: "warning", message: res.result });
                }
            }
        },
        /**
         * 上传失败
         */
        onError (err) {
            const that = this;
            that.loading = false;
            that.$message({ center: true, type: "warning", message: "上传失败 , 网络异常" });
            console.error(err);
        },
        /**
         * 上传之前的钩子
         */
        beforeUpload (file) {
            const that = this, isJPGPNG = (file.type === 'image/jpeg' || file.type === 'image/png'), isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPGPNG) {
                that.$message({ center: true, type: "warning", message: "上传图标只能是 JPG/PNG 格式. " });
            }
            if (!isLt2M) {
                 that.$message({ center: true, type: "warning", message: "上传图标大小不能超过 2MB. " });
            }
            that.loading = (isJPGPNG && isLt2M);
            return isJPGPNG && isLt2M;
        }
    },
    beforeCreate () {
    },
    beforeMount () {
        const that = this, { goodsId, page } = that.$route.params; 
        if (goodsId) {
            that.page = page;
            that.param.id = goodsId;
            // 加载数据
            that.loadingInfo();
        } else {
            that.close();
        }
    },
};
</script>

<!-- 视图 Scss 样式 -->  
<style lang="scss">
#modify {
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
            .el-row > .el-col {
                margin-top: 38px;
                .el-form-item {
                    margin: 25px auto;
                    .avatar-uploader {
                        .el-upload {
                            border: 1px dashed #d9d9d9;
                            border-radius: 6px;
                            cursor: pointer;
                            position: relative;
                            overflow: hidden;
                        };
                        .el-upload:hover {
                            border-color: #409EFF;
                        };
                    };
                    .avatar-uploader-icon {
                        font-size: 28px;
                        color: #8c939d;
                        width: 146px;
                        height: 146px;
                        line-height: 146px;
                        text-align: center;
                    };
                    .avatar {
                        width: 146px;
                        height: 146px;
                        display: block;
                    };
                };
                .el-form-item.locate > .el-form-item__content {
                    display: table-cell;
                    .el-input-number--small {
                        width: 150px;
                        margin-right: 8px;
                    };
                    .depict {
                        font-size: 12px;
                        color: #8e7c7c;
                        display: contents;
                    };
                };
            };
        };
    };
};
</style>
