<template>
  <div>
    <div class="my-col-display">
      <div class="my-row-display">
        <div class='col-show'>
          <div class='choice-title'>
            电子信息与通信学院专业分流志愿填报
          </div>
          <!-- <el-steps class="process-bar" :active="active" finish-status="success">
            <el-step title="填报须知"></el-step>
            <el-step title="方向选择"></el-step>
            <el-step title="填报成功"></el-step>
          </el-steps> -->
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {IP} from '../config.js'
export default {
  name: 'HomePage',
  data() {
      return {
        active: 0,
      };
    },
  methods: {
    temp(){
      jQuery.post(
        IP + '/',
        data,
        function (res) {
        }
      )
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  },
  mounted(){
  }
}
</script>

<style>
body{
  margin:0px;
  height: 1rem;
}
.choice-title{
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 28px;
  font-weight: bold;
  align-items: center;
  margin-top: 2rem;
}
.col-show{
  display: flex;
  flex-direction: column;
}
.process-bar{
  padding-top: 2rem;
  width: 50rem;
}
.my-col-display{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.my-row-display{
  width: 80rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.my-row-display-1{
  width: 80rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.my-home-alert-img{
  width: 100%;
}
</style>
