/**
 * main Js
 * @JsName main
 * @Description Vue 程序入口
 * @DateTime 2018-12-22 20:39:22
 * @author 花花
 */
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import YDUI from "vue-ydui";
import FastClick from "fastclick";
import VueWechatTitle from "vue-wechat-title";
import MainView from "@/main.vue";
import Router from "@/router";
import "es6-promise/auto";
import "element-ui/lib/theme-chalk/index.css";
import "vue-ydui/dist/ydui.rem.css";
import "material-design-icons/iconfont/material-icons.css";

/**
 * 关闭生产模式下给出的提示
 */
Vue.config.productionTip = false;

/**
 * FastClick :: 处理移动端点击事件 300ms 延迟问题
 */
FastClick.attach(document.body);

/**
 * 注册 Vuex 插件
 */
Vue.use(Vuex);

/**
 * 注册 VueRouter 插件
 */
Vue.use(VueRouter);

/**
 * 注册 VueAxios , Axios 插件
 */
Vue.use(VueAxios, Axios);

/**
 * 注册 ElementUI 插件
 */
Vue.use(ElementUI);

/**
 * 注册 YDUI 插件
 */
Vue.use(YDUI)

/**
 * 注册 VueWechatTitle 插件
 */
Vue.use(VueWechatTitle);

/**
 * 注册一个全局前置导航守卫
 */
Router.beforeEach((to, from, next) => {
    // 判断是否匹配到路由 ? 如果未匹配 , 匹配上级 , 上级也未匹配到则跳转登录页面 : 如果匹配到则正确跳转
    to.matched.length === 0 ? (from.name ? next({ name: from.name }) : ((to.fullPath && to.fullPath.substring(0, 8) === "/backend") ? next("/backend") : next("/"))) : next();
});

/**
 * 创建和挂载根实例
 */
new Vue({
    router: Router,
    render: target => target(MainView),
}).$mount("#app");