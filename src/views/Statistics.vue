<template>
  <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{beautify(group.title)}}
          <span>￥{{group.total}}</span>
        </h3>
        <hr>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record"
          > 
            <div class="tags">{{item.tags.name}}</div> 
            <div class="time">{{time(item.clock)}}</div>                      
            <div class="notes">{{item.notes}}</div>  
            <div class="amount">￥{{item.amount}}</div>
          </li>

        </ol>
      </li>
    </ol>
    <div v-else class="None-Record">
      <Icon name="noRecord"/>
       <div>您还没有相关记录哦~</div>
       </div> 
  </Layout>
</template>

<script lang='ts'>

  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs'
  import clone from '@/lib/clone';
 
  @Component({
    components: {Tabs},
  })
  export default class Statistics extends Vue {

    beautify(string: string) {
          const day = dayjs(string);     
          const now = dayjs();
          if (day.isSame(now, 'day')) {
            return '今天';
          } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
            return '昨天';
          } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
            return '前天';
          } else if (day.isSame(now, 'year')) {
            return day.format('M月D日');
          } else {
            return day.format('YYYY年M月D日');
          }
        }
    time(string: string){
        return dayjs(string).format('HH:mm')
    }
    get recordList() {
      return (this.$store.state as RootState).recordList;
    }
    get groupedList() {
      const {recordList} = this;
      if (recordList.length === 0) {return [];}

      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {return [];}
      type Result = { title: string; total?: number; items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
  //, time: dayjs(newList[0].createdAt).format('HH:mm')
      for (let i = 1; i < newList.length; i++) {
         const current = newList[i];
         const last = result[result.length - 1];
        if (dayjs(current.createdAt).isSame(dayjs(last.title), 'day')){
            last.items.push(current);
        }else { 
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }         
      }
   
      result.map(group => {
          group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
      });
      
      return result;
    }
    beforeCreate() {
      this.$store.commit('fetchRecords');
    }
    type = '-';
    recordTypeList = recordTypeList;
  }
</script>

<style lang="scss" scoped>
// background: #12e0c8;
  ::v-deep .type-tabs-item{
    background: #fff;
    &.selected{
        background: #12e0c8;       
        &::after{
        display: none;
        }
    }
  }
  ::v-deep .interval-tabs-item {
    height: 48px;
  }
   %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  //  %grid{
  //    margin-left: 3px;
  //    margin-top: 3px;
  //  }
  .title {
    @extend %item;
  }
  .record {
    // @extend %item;
    display: grid;
    grid-template-columns: 20% 25% 1fr 20% ;
    background: white;     
  }
  .tags{
    grid-column: 1/2;
    // @extend %grid;
   place-self: center left;
   margin-left: 18px;
  }
  .time{
    grid-column: 2/3;
    // @extend %grid;
    color:#0da795;
    font-size: 12px;
    place-self: center;
  }
  .notes {
    grid-column: 3/4;
    // @extend %grid;
    color: #999;
    font-size: 12px;
     place-self: center left;
    
  }
  .amount{
    grid-column: 4/5;
    // @extend %grid;
    place-self: center right;
    color:#0da795;
    margin-right: 18px;

  }
  .None-Record{
    padding: 50px;
    text-align: center;
    .icon {
    width: 64px;
    height: 64px;
    }
  }

</style>