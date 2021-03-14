<template>     
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>       
        <div class="notes">
            <div class="icon">
                <Icon name="write"/>
            </div>
            <FormItem  field-name="备注"
                placeholder="在这里输入备注"
                :value.sync="record.notes" 
            />
        </div>
        <!-- <Tags @update:value= "record.tags = $event"/> -->
        <!-- gai -->
        <Tags v-if="record.type === '-'"  :selected-tag.sync="record.tags"
                  />
        <Tags v-else-if="record.type === '+'" :selected-tag.sync="record.tags"
                  />
        <!-- gai -->

        <Tabs class-prefix="type" :data-source="recordTypeList"
          :value.sync="record.type"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Tags from '@/components/Money/Tags.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import {Component} from "vue-property-decorator";
    import Tabs from '@/components/Tabs.vue';
    import recordTypeList from '@/constants/recordTypeList';

    @Component({
    components: { Tabs,Tags,FormItem,NumberPad}
    })

    export default class Money extends Vue{
        get recordList(){
            return this.$store.state.recordList;
        }
      beforeCreate(){
          this.$store.commit('fetchTags'); 
      } 

        recordTypeList = recordTypeList;
        record: RecordItem = {
            tags: [], notes: '', type: '-', amount: 0
        }
        created(){
            this.$store.commit('fetchRecords')
        }
        onUpdateNotes(value: string) {
            this.record.notes = value;
        }
        // onUpdateAmount(value: string) {
        //     this.record.amount = parseFloat(value);
        // }   
        
        saveRecord() {
            if(!this.record.tags ||this.record.tags.length===0){
                return window.alert('请至少选一个标签')
            }
            this.$store.commit('createRecord',this.record)
            if(this.$store.state.createRecordError ===null){
                window.alert('保存成功')
                this.record.notes = ""
                //改
                this.record.tags = []
            }
        }
   
    }
</script>

<style lang="scss"  scoped>
::v-deep .type-tabs-item{
    background: #fff;
    margin-bottom: 1px;
    &.selected{
        
        background: #12e0c8;       
        &::after{
        display: none;
        }
    }
  }
::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
    .notes {
        display: flex;
        align-items: center;
        padding: 4px 8px;
        font-size: 14px;
        border-top: 1px solid #f5f5f5;
        background: lighten(#f5f5f5, 4%);
    }
</style>