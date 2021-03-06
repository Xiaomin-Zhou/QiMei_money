<template>

    <button class="button" @click="$emit('click',$event)">
        <slot/>
    </button>

</template>

<script lang="ts">
    export default {
        
    }
</script >

<style lang="scss" scoped>
    .button{
        background: #12e0c8;
        color: #666;
        border-radius: 4px;
        border: none;
        height: 40px;
        padding: 0 16px;
        &-wrapper {  //等同 createTag-wrapper
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;
    }
  }
</style>