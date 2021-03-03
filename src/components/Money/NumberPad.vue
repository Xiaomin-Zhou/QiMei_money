<template>
    <div class="numberPad">
        <div class="output">{{output}}</div>
        <div class="buttons">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="onAdd">+</button>
            <button @click="remove">删除</button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="onSubtract">-</button>
            <button @click="clear">清空</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button>×</button>
            <button @click="ok" class="ok">
              {{ adding || subtracting ? '=' : 'OK' }}
              </button>            
            <button >0</button>
            <button @click="inputContent">.</button>
            <button>％</button>
            <button>÷</button>

         </div>
    </div>
</template>

<script lang="ts">
 import Vue from "vue";
 import {Component,Prop,Watch} from "vue-property-decorator";

 @Component
 export default class NumberPad extends Vue{

  output = '0'
  adding = false
  subtracting = false
  firstOutput = '0'
  secondOutput = '0'
  @Watch('output')
  onOutputChange() {
    // change
    this.$emit('update:value', this.output)
  }

    inputContent(event: MouseEvent){
        const button = (event.target as HTMLButtonElement);
        const input = button.textContent!; //添加! 是不为空的意思
        
        if (this.output.length === 16) { return; }
        if (this.output === '0') {
            if ('0123456789'.indexOf(input) >= 0) {
                this.output = input;    
            } else {
                this.output += input;
            }
            return;
      }
        if (this.output.indexOf('.') >= 0 && input === '.') {return;}
      // this.output += input;  从这改
         // 开启计算模式
    if (this.adding || this.subtracting) {
      this.secondOutput = this.secondOutput === '0' ? input : this.secondOutput + input
      this.output = this.output + input
      return
    }
    if (this.output !== '0' && this.output.indexOf('.') >= 0 && input === '.') return
    if (this.output === '0' && input === '.') {
      this.output = this.output + input
    } else if (this.output === '0' && input !== '.') {
      this.output = input
    } else {
      this.output = this.output + input
    }
} 

    remove(){
       if(this.output.length===1){ //快到最后一个，输出0
           this.output = '0'
       }else{
           this.output = this.output.slice(0,-1)
       }
    }
    // ok(){
    //   this.$emit('update:value',this.output);
    //   this.$emit('submit', this.output)
    //   this.output = '0';
    // }
      
      ok() {
    if (this.adding) {
      const totalOutput = parseFloat(this.firstOutput) + parseFloat(this.secondOutput)
      this.output = totalOutput + ''
      this.firstOutput = totalOutput + ''
      this.secondOutput = '0'
      this.adding = false
    } else if (this.subtracting) {
      const totalOutput = parseFloat(this.firstOutput) - parseFloat(this.secondOutput)
      this.output = totalOutput + ''
      this.firstOutput = totalOutput + ''
      this.secondOutput  ='0'
      this.subtracting = false
    } else {
      const formatOutput = parseFloat(parseFloat(this.output).toFixed(2))
      if (formatOutput < 0) {
        alert('请输入正确的金额哦！')
      } else {
        // 提交
        this.$emit('submit', formatOutput)
        this.clear()
      
      }
    }
  }
    clear() {
    this.adding = false
    this.subtracting = false
    this.firstOutput = '0'
    this.secondOutput = '0'
    this.output = '0'
  }



    onAdd() {
    if (this.output === '0') return
    if (this.subtracting) {
      const total = parseFloat(this.firstOutput) - parseFloat(this.secondOutput)
      this.output = total + '+'
      this.firstOutput = total + ''
      this.secondOutput = '0'
      this.subtracting = false
      this.adding = true
      return
    }
    if (this.adding) {
      const total = parseFloat(this.firstOutput) + parseFloat(this.secondOutput)
      this.output = total + '+'
      this.firstOutput = total + ''
      this.secondOutput = '0'
    } else {
      this.adding = true
      this.firstOutput = parseFloat(this.output).toFixed(2)
      this.output = this.output + '+'
    }
  }
  onSubtract() {
    if (this.output === '0') return
    if (this.adding) {
      const total = parseFloat(this.firstOutput) + parseFloat(this.secondOutput)
      this.output = total + '-'
      this.firstOutput = total + ''
      this.secondOutput = '0'
      this.adding = false
      this.subtracting = true
      return
    }
    if (this.subtracting) {
      const total = parseFloat(this.firstOutput) - parseFloat(this.secondOutput)
      this.output = total + '-'
      this.firstOutput = total + ''
      this.secondOutput = '0'
    } else {
      this.subtracting = true
      this.firstOutput = parseFloat(this.output).toFixed(2)
      this.output = this.output + '-'
    }
  }
 }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
  .numberPad {
    .output {
      @extend %clearFix;
      @extend %innerShadow;
      font-size: 36px;
      font-family: Consolas, monospace;
      padding: 9px 16px;
      text-align: right;
      height: 72px;
    }
    .buttons {
      @extend %clearFix;
      > button {
        width: 20%;
        height: 64px;
        float: left;
        background: transparent;
        border: none;
        &.ok {
          height: 64*2px;
          float: right;
        }
        // $bg: rgba(215, 255, 36, 0.5);
        $bg: #b9f5ee;
        &:nth-child(1) {
          background: $bg;
        }
        &:nth-child(2), &:nth-child(6) {
          background: darken($bg, 8%);
        }
        &:nth-child(3), &:nth-child(7), &:nth-child(11) {
          background: darken($bg, 4*8%);
        }
        &:nth-child(4), &:nth-child(8), &:nth-child(12), &:nth-child(16) {
          background: darken($bg, 4*9%);
        }
        &:nth-child(5), &:nth-child(9), &:nth-child(13), &:nth-child(17) {
          background: darken($bg, 4*10%);
        }
        &:nth-child(10), &:nth-child(14), &:nth-child(18) {
          background: darken($bg, 4*11%);
        }
        &:nth-child(19) {
          background: darken($bg, 4*12%);
        }
        &:nth-child(15) {
          background: darken($bg, 4*12%);
        }
      }
    }
  }
</style>