<template>
    <div>
        <label class="notes">
            <span class="name">备注</span>
            <input type="text" v-model="value"
            placeholder="在这里添加备注">
        </label>
        
    </div>
</template>

<script lang="ts">
 import Vue from "vue";
 import {Component,Watch} from "vue-property-decorator";

    @Component
    export default class Note extends Vue {
        value ='';
        @Watch('value')
        onValueChanged(value: string){
            this.$emit('update:value',value)
        }
    }
</script>

<style lang="scss" scoped>
.notes{
    font-size: 14px;
    background: #f5f5f5;
    display: block;
    padding-left: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    .name{
     padding-right: 16px;
    }
    input{
    padding: 16px 0;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
    }
}
</style>