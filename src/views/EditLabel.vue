<template>
    <Layout>
        <div>
            <Icon name="left"/>
        <span>编辑标签</span>
        </div>
        <Notes field-name="标签名" placeholder="输入标签名"/>
    </Layout>
</template>

<script lang="ts">
import tagListModel from '@/models/tagListModel';
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Notes from '@/components/Money/Notes.vue'
import Layout from '@/components/Layout.vue';
    @Component ({
        components: {Notes, Layout}
    })
    export default class EditLabel extends Vue{
        created(){
            const id = this.$route.params.id;
            tagListModel.fetch();
            const tags = tagListModel.data;
            const tag = tags.filter(t => t.id === id)[0];
            if(tag){
                this.tag = tag;
            }else{
                this.$router.replace('/404')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>