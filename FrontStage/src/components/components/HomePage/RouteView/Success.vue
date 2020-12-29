<template>
  <div class="my-success">
    <el-steps class="process-bar" :active="2" finish-status="success">
      <el-step title="填报须知"></el-step>
      <el-step title="方向选择"></el-step>
      <el-step title="填报成功"></el-step>
    </el-steps>
    <div class="my-success-notice">
      您已完成专业分流志愿填报！可在“我的填报信息”栏中查询填报信息
    </div>
    <div class="my-success-content">
      您的填报志愿为：{{choice}}
    </div>
    <div class="my-success-content">
      如需修改请再次填报，最终填报结果以最后一次为准
    </div>
    <div class='my-success-confirm'>
      <div>{{''}}</div>
      <el-button style="width: 6rem;" @click="redirect('Notice')">完成</el-button>
    </div>
  </div>
</template>
<script>
import {IP} from '../../../config.js'
export default {
  name: 'Success',
  data() {
      return {
        choice:'电子信息工程—通信工程—电磁场与无线技术'
      };
    },
  methods: {
    redirect(pathname){
      this.$router.push({ name: pathname})
    },
    temp(){
      jQuery.post(
        'http://' + IP + '/',
        data,
        function (res) {
        }
      )
    }
  },
  mounted(){
  },
  created(){
  },
}
</script>

<style>
.my-success-confirm{
  margin-top: 1rem;
  width: 50rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.process-bar{
  padding-top: 1rem;
  padding-bottom: 2rem;
  width: 50rem;
}
.my-success-notice{
  margin-top: 1rem;
  font-size: 20px;
  font-weight: bold;
}
.my-success-content{
  margin-top: 1rem;
  font-size: 20px;
  font-weight: bold;
}
</style>
