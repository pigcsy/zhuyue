<!--
  - mu-app-item Vue
  - @JsName mu-app-item
  - @Description mu-app-item（ 列表子项目 :: 贷超 ）自定义组件.
  - @DateTime 2018-12-22 20:39:22
  - @author
  -->
<template>
    <div class="mu-app-item">
        <div class="item-section" v-on:click="jumpPage(item.jumpLink, item.id)">
            <div class="blockmark-left">
                <img class="icon" v-bind:src="item.icon">
            </div>
            <div class="blockmark-right">
                <div class="blockmark-subject">
                    <div class="subject">
                        <div class="title">{{item.name}}</div>
                        <div class="synopsis"><p>{{item.synopsis}}</p></div>
                    </div>
                    <div class="ratio">
                        <div class="worth">{{item.passRatio}}<span>%</span></div>
                        <div class="column">通过率</div>
                    </div>
                </div>
                <div class="blockmark">
                    <div class="maxQuota">
                        <span>可借额度</span>
                        <span class="quota">{{item.minQuota}} - {{item.maxQuota}}</span>
                    </div>
                    <div class="register">{{applyForText}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- 引入 mu-app-item Js 文件  -->
<script src="./mu-app-item.js"></script>
<!-- 引入 mu-app-item Scss 文件  -->
<style lang="scss" scoped>@import "./mu-app-item";</style>
