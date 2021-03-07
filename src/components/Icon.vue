<template>
    <svg class="icon" @click="$emit('click',$event)">
        <use :xlink:href="'#'+name"/>
    </svg>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

    // 导入icons目录
    const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
    try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}
    
    @Component
    export default class Icon extends Vue {
        @Prop({required: true, type: String}) name!: string;
    }
</script>

<style scoped>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>