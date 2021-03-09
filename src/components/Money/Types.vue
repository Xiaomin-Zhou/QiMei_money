<template>
    <div>
        <ul class="types">
            <li :class="{[classPrefix+'item']: classPrefix, selected: value==='-'}"
            @click="selectType('-')">支出</li>
            <li :class="{[classPrefix+'item']: classPrefix, selected: value==='+'}"
            @click="selectType('+')">收入</li>
        </ul>
    </div>
</template>

<script lang="ts">
 import Vue from "vue";
 import {Component, Prop} from "vue-property-decorator";

 @Component
 export default class Types extends Vue{

    @Prop(String) readonly value!: string;
    @Prop(String) classPrefix?: string;
    
    selectType(type: string){ // type只能是 '-' '+'
        if(type !=='-'&& type !=='+'){
            throw new Error('type is unknown')
        }
        this.$emit('update:value', type)
        
    }
 }

</script>

<style lang="scss" scoped>
 .types{
        // background: #12e0c8;
        background: #00bfbf;
        text-align: center;
        display: flex;
        font-size: 24px;
  > li{
        width: 50%;
        height: 64px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        &.selected{
            background: #12e0c8;
            }
        &.selected::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #333;
            }
  }
 }
</style>