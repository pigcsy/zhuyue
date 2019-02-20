<!--
  - index Vue
  - @JsName index
  - @Description Index 首页视图
  - @DateTime 2018-12-22 20:39:22
  - @author csy
  -->
<!-- 视图 -->  
<template>
    <yd-infinitescroll :callback="loadingMore" ref="infinitescroll" id="index" v-loading.fullscreen.lock="loading">
        <yd-list slot="list">
            <div class="headline">{{headline}}</div>
            <mu-app-item v-for="(item, index) in data" v-bind:key="index" v-bind:item="item" v-bind:applyForText="applyForText" v-on:jumpPage="jumpPage"></mu-app-item>
        </yd-list>
        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip">{{completeText}} </span>
        <!-- 加载中提示，不指定，将显示默认加载中图标 -->
        <!-- <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/> -->
    </yd-infinitescroll>
</template>

<!-- 视图 Js 脚本 -->  
<script>
import { Toast } from "vue-ydui/dist/lib.rem/dialog";
import { Goods } from "@/app/module/lending";
import { Configure } from "@/app/module/configure";
import { AppItem } from "@/app/components";
export default {
    name: 'index',
    components: {
        "mu-app-item": AppItem,
    },
    data () {
        return {
            loading: true,
            applyForText: "立即申请",
            headline: "· 热门推荐 ·",
            completeText: "没有数据啦 >_<",
            param: {
                "page": 1
            },
            data: [],
        }
    },
    methods: {
        /**
         * 加载更多
         */
        loadingMore () {
            const that = this; 
            setTimeout(() => {
                Goods.obtain({ ...that.param }).then((res) => {
                    that.loading = false;
                    if (res) {
                        if (res.code === 10001) {
                            const { data, isFinish } = res.data;
                            that.data = [...that.data, ...data];
                            if (isFinish) {
                                /* 全部数据加载完成 */
                                that.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                                return;
                            } else {
                                /* 单次请求数据完成 */
                                that.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
                                that.param.page++;
                            }
                        } else {
                            Toast({ mes: "加载失败 , ".concat(res.result), timeout: 3000});
                        }
                    }
                }, (err) => {
                    Toast({ mes: "加载失败 , 网络异常", timeout: 3000});
                    console.error(err);
                });
            }, 500);
        },
        /**
         * 跳转页面
         */
        jumpPage (url, id) {
            Goods.count({ goodsId: id }).then((res) => {
                if (res) {
                    if (res.code === 10001) {
                        window.location = url;
                    } else {
                        Toast({ mes: "加载失败 , ".concat(res.result), timeout: 3000});
                    }
                }
            }, (err) => {
                Toast({ mes: "加载失败 , 网络异常", timeout: 3000});
                console.error(err);
            }); 
        },
    },
    beforeCreate () {
        const that = this; 
        Configure.obtain({ "code": "ApplyForText" }).then((res) => {
            if (res) {
                if (res.code === 10001) {
                    that.applyForText =  res.data;   
                } else {
                    Toast({ mes: "加载失败 , ".concat(res.result), timeout: 3000});
                }
            }
        }, (err) => {
            Toast({ mes: "加载失败 , 网络异常", timeout: 3000});
            console.error(err);
        });
    },
    beforeMount () {
        const that = this; 
        // 加载数据
        that.loadingMore();
    },
};
</script>

<!-- 视图 Scss 样式 -->  
<style lang="scss">
#index {
    margin: 0 auto;
    padding: 0px;
    cursor: pointer;
    max-width: 515px;
    background-color: #F3F3F4;
    .headline {
        color: #3c3a3a;
        font-size: 0.98rem;
        font-weight: 400;
        text-align: center;
        padding: .85rem 0 0 0;
    };
    svg {
        width: 2.0rem;
        height: 2.0rem;
        margin-bottom: 2.0rem;
    };
    .yd-list-donetip {
        color: #babfc6;
        font-size: .75rem;
        text-align: center;
        padding: .25rem 0 .75rem 0;
    };
};
</style>
