<template>
  <div class="my-register-form">
    <el-steps class="process-bar" :active="1" finish-status="success">
      <el-step title="填报须知"></el-step>
      <el-step title="方向选择"></el-step>
      <el-step title="填报成功"></el-step>
    </el-steps>
    <!-- <div class="my-register-form-title">电子信息与通信学院学生会招新报名表</div>
    <div class="my-register-line"/>
    <div class="my-register-form-subtitle">报名表是学生会对所有想加入学生会大家庭同学的第一次考核，请大家认真对待、仔细填写</div> -->
    <el-form ref="form" :model="form" label-width="80px" class="my-register-form-inner">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="uid">
        <el-input v-model="form.uid" disabled></el-input>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-input v-model="form.class" disabled></el-input>
      </el-form-item>
      <el-form-item label="方向选择" prop="choice">
        <el-radio v-for="item in choice" v-model="form.choice" :label="item.label">
          {{item.name}}
          <span style="color: red">
            ({{choiceNum[item.label]}})
          </span>
        </el-radio>
      </el-form-item>
    </el-form>
    <div class='my-choice-confirm'>
      <el-button style="width: 6rem;" @click="redirect('Notice')">上一步</el-button>
      <!-- <el-button style="width: 6rem;" @click="redirect('Success')">下一步</el-button> -->
      <el-button style="width: 6rem;" @click="dialogVisible = true" :disabled="form.choice == ''?true:false">下一步</el-button>
      <el-dialog
        title="请确认信息"
        :visible.sync="dialogVisible"
        width="30%">
        <div><strong>姓名：</strong>{{form.name}}</div>
        <div><strong>学号：</strong>{{form.uid}}</div>
        <div><strong>班级：</strong>{{form.class}}</div>
        <div>
          <strong>填报方向：</strong>
          {{choiceName[form.choice]}}
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendChoice">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {IP} from '../../../config.js'
export default {
  name: 'LessonChoice',
  data() {
      return {
        dialogVisible: false,
        form:{
          name: '',
          uid: '',
          class: '',
          choice: '',
        },
        choice:[
          {
            label: 'a',
            name: '电子信息工程—通信工程—电磁场与无线技术'
          },
          {
            label: 'b',
            name: '电子信息工程—电磁场与无线技术—通信工程'
          },
          {
            label: 'c',
            name: '电磁场与无线技术—电子信息工程—通信工程'
          },
          {
            label: 'd',
            name: '电磁场与无线技术—通信工程—电子信息工程'
          },
          {
            label: 'e',
            name: '通信工程—电子信息工程—电磁场与无线技术'
          },
          {
            label: 'f',
            name: '通信工程—电磁场与无线技术—电子信息工程'
          },
        ],
        choiceName: {
          'a': '电子信息工程—通信工程—电磁场与无线技术',
          'b': '电子信息工程—电磁场与无线技术—通信工程',
          'c': '电磁场与无线技术—电子信息工程—通信工程',
          'd': '电磁场与无线技术—通信工程—电子信息工程',
          'e': '通信工程—电子信息工程—电磁场与无线技术',
          'f': '通信工程—电磁场与无线技术—电子信息工程',
        },
        choiceNum: {
          'a': 153,
          'b': 134,
          'c': 53,
          'd': 68,
          'e': 75,
          'f': 43,
        }
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
    redirect(pathname){
      this.$router.push({ name: pathname })
    },
    sendChoice(){
      var that = this
      var data = {
        uid: that.$cookies.get('account'),
        password: that.$cookies.get('password'),
        choice: that.form.choice
      }
      console.log(data)
      jQuery.post(
        IP + '/chooseCourse',
        data,
        function (res) {
          if(res.code == '1'){
            that.$message({
              message: '选课成功',
              type: 'success'
            })
            that.redirect('Success')
          }
          else{
            that.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }
      )
    }
  },
  mounted(){
    var that = this
    jQuery.get(
      IP + '/getStudentNums',
      function (res) {
        console.log(res)
        that.choiceNum = res.nums
      }
    )
    jQuery.get(
      IP + '/getStudentNums',
      function (res) {
        console.log(res)
        that.choiceNum = res.nums
      }
    )
    var that = this
    var data = {
      uid: that.$cookies.get('account'),
      password: that.$cookies.get('password')
    }
    jQuery.get(
      IP + '/getChoice',
      data,
      function (res) {
        if(res.code == '1'){
          console.log(res)
          that.form.name = res.data.name
          that.form.uid = res.data.uid
          that.form.class = res.data.class
          that.form.choice = res.data.choice
        }
        else{
          that.$message({
            message: '您尚未选课',
            type: 'info'
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
body{
  margin:0px;
  height: 1rem;
}
.my-choice-confirm{
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
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.my-register-form-photo{
  display: flex;
  flex-direction: row;
}
.my-register-form-photo{
  margin: 0.5rem;
}
.my-register-form-photo-title{
  font-size: 0.9rem;
  margin-left: -0.4rem;
  margin-right: 0.7rem;
  color: #333333;
}
.my-find-infomation{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.my-two-buttons-container{
  display: flex;
  flex-direction: row;
}
.my-buttons-container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.my-register-form{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.my-register-line{
  border-top: 1px rgb(141, 141, 141) solid;
  width: 3rem;
  margin-bottom: 0.2rem;
}
.my-register-form-title{
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
}
.my-register-form-subtitle{
  margin-bottom: 2rem;
  font-size: 0.8rem;
  color: rgb(160, 160, 160);
}
.my-register-form-inner{
  width: 40rem;
}
</style>
