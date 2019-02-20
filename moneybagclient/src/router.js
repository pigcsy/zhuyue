/**
 * router Js
 * @JsName router
 * @Description Vue 程序路由
 * @DateTime 2018-12-22 20:39:22
 * @author csy
 */
import VueRouter from "vue-router";

/**
 * 默认导出
 * -- 导出清单
 * - VueRouter（ 路由实例 ）
 */
export default new VueRouter({
    mode: "history", // 配置路由模式
    routes: [
        {
            "path": "/list",
            "name": "list",
            "meta": { 
                "title": "者月钱包" 
            },
            "component": resolve => require(['@/app/views/index.vue'], resolve)
        },
        // {
        //     "path": "/login",
        //     "name": "login",
        //     "meta": { 
        //         "title": "我要借钱" 
        //     },
        //     "component": resolve => require(['@/app/views/login.vue'], resolve),
        // },
        // {
        //     "path": "/web",
        //     "name": "index",
        //     "meta": { 
        //         "title": "者月钱包" 
        //     },
        //     "component": resolve => require(['@/web/views/index.vue'], resolve)
        // },
        {
            "path": "/backend/login",
            "name": "backendlogin",
            "meta": { 
                "title": "登录" 
            },
            "component": resolve => require(['@/web/views/login.vue'], resolve),
        },
    ]
});