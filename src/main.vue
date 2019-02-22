<!--
  - main Vue
  - @JsName main
  - @Description Vue 程序主视图
  - @DateTime 2018-12-22 20:39:22
  - @author 花花
  -->
<!-- 主视图 -->  
<template>
    <div id="app">
        <router-view v-wechat-title="$route.meta.title"></router-view>
    </div>
</template>

<!-- 主视图 Js 脚本 -->  
<script>
export default {
    name: 'app',
};
</script>

<!-- 主视图 ( 全局 ) Scss 样式 -->  
<style lang="scss">
/* 全局样式 */
* {
    font-family: "Helvetica Neue", "Avenir", "Helvetica", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", "Arial", "sans-serif";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    margin: 0;
    padding: 0;
    border: 0;
};
/* 滚动条整体样式 */
*::-webkit-scrollbar {
    width: 0px;
    height: 0px;
};
/* 滚动条 - 滚动块样式 */
*::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #5C8FA4;
};
/* 滚动条 - 外层滚动轨道样式(里面装滚动块thumb) */
*::-webkit-scrollbar-track {
    display: none
};
/* 滚动条 - 内层滚动轨道样式 */
*::-webkit-scrollbar-track-piece {
    display: none
};
/* 滚动条 - 滚动条俩边的按钮样式 */
*::-webkit-scrollbar-button {
    display: none
};
/* 滚动条 - 滚动条边角及两个滚动条的交汇处样式 */
*::-webkit-scrollbar-corner {
    display: none;
};
/* 滚动条 - 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件样式 */
*::-webkit-resizer {
    display: none;
};
/* app 主视图样式  */
#app {
    width: 100vw;
    height: 100vh;
};
</style>
