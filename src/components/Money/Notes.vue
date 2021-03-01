<template>
    <div>
        <label class="notes">
            <span class="name">备注</span>
            <input type="text" placeholder="在这里添加备注">
        </label>
        
    </div>
</template>

<script lang="ts">
    export default {
        name:"Notes"
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