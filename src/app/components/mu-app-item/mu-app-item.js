/**
 * mu-app-item Js
 * @JsName mu-app-item
 * @Description mu-app-item（ 列表子项目 :: 贷超 ）自定义组件 Js 脚本.
 * @DateTime 2018-12-22 20:39:22
 * @author 花花
 */
export default {
    name: "mu-app-item",
    componentName: "mu-app-item",
    props: {
        item: {
            type: Object,
            default: {}
        },
        applyForText: {
            type: String
        },
    },
    data () {
        return {}
    },
    methods: {
        jumpPage (url, id) {
            this.$emit("jumpPage", url, id);
        },
    },
};
