<template>
  <div class="my-notice">
    <el-steps class="process-bar" :active="0" finish-status="success">
      <el-step title="填报须知"></el-step>
      <el-step title="方向选择"></el-step>
      <el-step title="填报成功"></el-step>
    </el-steps>
    <div class='my-notice-block' v-for='content in contents'>
      <div class='my-notice-block-title'>
        <span class="my-span">{{content.title == ''?'':'#'}}</span>
        {{content.title}}
      </div>
      <div class='my-notice-block-content'>
        <div 
          class='my-notice-block-content-item'
          v-for='item in content.content'>
          {{item}}
        </div>
      </div>
    </div>
    <div class='my-notice-confirm'>
      <el-radio v-model="isConfirm">我已认真阅读并同意填报须知的各项内容</el-radio>
      <el-button @click="redirect('LessonChoice')" style="width: 6rem;" :disabled="1-isConfirm">下一步</el-button>
    </div>
  </div>
</template>
<script>
import {IP} from '../../../config.js'
export default {
  name: 'Notice',
  data() {
    return {
      isConfirm: 0,
      contents:[
        {
          title: '',
          content: ['根据学校2018级按院招生要求，结合我院专业分布情况，以及专业建设和评估的需要，特制定学科大类招生后的专业分流方案如下：']
        },
        {
          title: '分流时间',
          content: ['2019年12月15日至2019年12月16日']
        },
        {
          title: '分流方案',
          content: [
            '全体学生从以下A-F六种志愿中选择一种进行填报（每种志愿按照三个专业的第一到第三志愿依次排序）；未选报志愿者，由系统根据专业招录情况进行调剂。六种志愿为：',
            'A：电子信息工程—通信工程—电磁场与无线技术；',
            'B：电子信息工程—电磁场与无线技术—通信工程；',
            'C：电磁场与无线技术—电子信息工程—通信工程；',
            'D：电磁场与无线技术—通信工程—电子信息工程；',
            'E：通信工程—电子信息工程—电磁场与无线技术；',
            'F：通信工程—电磁场与无线技术—电子信息工程；',
            ]
        },
        {
          title: '录取原则',
          content: [
            '① 每一专业优先录取第一志愿学生；',
            '② 在第一志愿学生超过专业招录人数时，按照前两学期GPA排名，由高到低进行录取，录满为止；',
            '③ 第一志愿未录满专业，优先录取第二志愿学生，第二志愿学生超过缺额人数时，按照前两学期GPA排名，由高到低进行录取，录满为止；',
            '④ 第一、第二志愿仍未录满的专业，按照前两学期GPA排名，由高到低录取第三专业学生，录满为止。',
          ]
        },
        {
          title: '注意事项',
          content: [
            '① 每一专业优先录取第一志愿学生；',
            '② 在第一志愿学生超过专业招录人数时，按照前两学期GPA排名，由高到低进行录取，录满为止；',
            '③ 第一志愿未录满专业，优先录取第二志愿学生，第二志愿学生超过缺额人数时，按照前两学期GPA排名，由高到低进行录取，录满为止；',
            '④ 第一、第二志愿仍未录满的专业，按照前两学期GPA排名，由高到低录取第三专业学生，录满为止。',
            '① 每一专业优先录取第一志愿学生；',
            '② 在第一志愿学生超过专业招录人数时，按照前两学期GPA排名，由高到低进行录取，录满为止；',
            '③ 第一志愿未录满专业，优先录取第二志愿学生，第二志愿学生超过缺额人数时，按照前两学期GPA排名，由高到低进行录取，录满为止；',
            '④ 第一、第二志愿仍未录满的专业，按照前两学期GPA排名，由高到低录取第三专业学生，录满为止。',
          ]
        },
      ]
    };
  },
  methods: {
    nextStep(){
      that.$cookies.set('lookupNotice', isConfirm)
      that.redirect('LessonChoice')
    },
    redirect(pathname){
      this.$router.push({ name: pathname})
    },
  },
  mounted(){
    var that = this
    jQuery.get(
      IP + '/getSettings',
      function (res) {
        console.log(res)
        if(res.code == '1'){
          that.contents = []
          var tempContent = JSON.parse(res.settings.content)
          for(var i=0;i<tempContent.length;i++){
            that.contents.push({
              title: tempContent[i].title,
              content: tempContent[i].content
            })
          }
        }
        else if(res.code == '-1'){
          that.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }
    )
  },
  created(){
  },
}
</script>

<style>
.process-bar{
  padding-top: 1rem;
  padding-bottom: 2rem;
  width: 50rem;
}
.my-notice{
  display: flex;
  padding: 0;
  width: 50rem;
  flex-direction: column;
  align-items: flex-start;
}
.my-notice-block{
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}
.my-notice-block-title{
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.my-span{
  color: rgb(216, 17, 17);
}
.my-notice-block-content{
  text-indent: 3ch;
  font-size: 16px;
}
.my-notice-block-content-item{
  padding: 0.2rem;
}
.my-notice-confirm{
  margin-top: 1rem;
  width: 50rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
