<template>
<div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`" :style="{height: scrollerHeight}">
    <div class="content" :class="classPrefix && `${classPrefix}-content`   ">
        <slot/>
        </div>
        <Nav/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Prop} from 'vue-property-decorator';
  @Component
export  default class Layout extends Vue{
    @Prop(String) classPrefix?: string;

    // :style="{height: scrollerHeight}
     get scrollerHeight(){
      return document.documentElement.clientHeight + 'px'
    }
}
</script>
<style lang="scss" scoped>
.layout-wrapper{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.content{
    overflow: auto;
    flex-grow: 1;
}
</style>