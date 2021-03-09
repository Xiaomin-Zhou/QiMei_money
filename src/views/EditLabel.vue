<template>
    <Layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click="goBack"/>
            <span class="title">编辑标签</span>
            <span class="rightIcon"/>  
        </div>
        <div class="form-wrapper">
            <FormItem :value="tag.name"
                @update:value="Update"
                field-name="标签名"
                placeholder="输入标签名"
            />
        </div>

        <div class="button-wrapper">
            <Button @click="remove">删除标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">

import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import FormItem from '@/components/Money/FormItem.vue'
import Layout from '@/components/Layout.vue';
import Button from '@/components/Button.vue';

    @Component ({
        components: {FormItem, Layout,Button}
    })
    export default class EditLabel extends Vue{
        get tag(){
            return this.$store.state.currentTag
        }
        created(){
            const id = this.$route.params.id;
            this.$store.commit('setcurrentTag',id);
            if(!this.tag){
                this.$router.replace('/404')
            }
        }

        Update(name: string){
           if(this.tag){
               //gai
               //store.updateTag(this.tag.id, name)
           }
        }

        remove(){
            if(this.tag){
                //gai
            //    if( store.removeTag(this.tag.id)){
            //         this.$router.replace('/labels')
            //     // this.$router.back()
            //    }else{
            //       window.alert('删除失败') 
            //    }
            }
        }

        goBack(){
            this.$router.back()
        } 
    }
</script>

<style lang="scss" scoped>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .title {
    }
    > .leftIcon {
      width: 24px;
      height: 24px;
    }
    > .rightIcon {
      width: 24px;
      height: 24px;
    }
  }
  .form-wrapper {
    background: white;
    margin-top: 8px;
  }
  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>