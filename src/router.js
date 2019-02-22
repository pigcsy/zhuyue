/**
 * router Js
 * @JsName router
 * @Description Vue 程序路由
 * @DateTime 2018-12-22 20:39:22
 * @author 花花
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
            "name": "index",
            "meta": { 
                "title": "爱钱袋" 
            },
            "component": resolve => require(["@/app/views/index.vue"], resolve)
        },
        // {
        //     "path": "/login",
        //     "name": "login",
        //     "meta": { 
        //         "title": "我要借钱" 
        //     },
        //     "component": resolve => require(["@/app/views/login.vue"], resolve),
        // },
        {
            "path": "/backend",
            "name": "backend",
            "meta": { 
                "title": "爱钱袋" 
            },
            "redirect": () => { // 重定向到路由
                return "/backend/goods";
            },
            "component": resolve => require(["@/web/views/index.vue"], resolve),
            "children": [
                {
                    "path": "/backend/goods",
                    "name": "backend-goods",
                    "meta": { 
                        "title": "产品信息" 
                    },
                    "component": resolve => require(["@/web/views/goods/index.vue"], resolve)
                },
                {
                    "path": "/backend/goods/addition",
                    "name": "backend-goods-addition",
                    "meta": { 
                        "title": "新增产品" 
                    },
                    "component": resolve => require(["@/web/views/goods/addition.vue"], resolve)
                },
                {
                    "path": "/backend/goods/modify",
                    "name": "backend-goods-modify",
                    "meta": { 
                        "title": "更新产品" 
                    },
                    "component": resolve => require(["@/web/views/goods/modify.vue"], resolve)
                },
                {
                    "path": "/backend/user",
                    "name": "backend-user",
                    "meta": { 
                        "title": "会员信息" 
                    },
                    "component": resolve => require(["@/web/views/user.vue"], resolve)
                },
                {
                    "path": "/backend/user/goods",
                    "name": "backend-usergoods",
                    "meta": { 
                        "title": "会员产品" 
                    },
                    "component": resolve => require(["@/web/views/usergoods.vue"], resolve)
                },
                {
                    "path": "/backend/configuration",
                    "name": "backend-configuration",
                    "meta": { 
                        "title": "配置信息" 
                    },
                    "component": resolve => require(["@/web/views/configuration.vue"], resolve)
                },
                // {
                //     "path": "/backend/panel",
                //     "name": "backend-panel",
                //     "meta": { 
                //         "title": "用户面板" 
                //     },
                //     "component": resolve => require(["@/web/views/panel.vue"], resolve)
                // },
            ],
        },
        {
            "path": "/backend/login",
            "name": "backend-login",
            "meta": { 
                "title": "登录" 
            },
            "component": resolve => require(["@/web/views/login.vue"], resolve),
        },
    ]
});