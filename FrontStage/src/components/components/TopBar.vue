<template>
  <div class="my-header">
    <div class="my-header-col">
      <el-menu  :default-active="activeIndex" 
                class="el-menu-demo my-menu" 
                mode="horizontal">
        <div class="my-logo-text">
          <img
          @click="redirect('HomePage')"
          style="height: 100%"
          src="../../assets/student-union-logo.jpg"/>
          <div class="my-title">电子信息与通信学院
            <div class="my-sub-title">专业分流志愿填报系统</div>
          </div>
        </div>
        <el-menu-item index="1" @click="redirect('Notice')">
          专业填报
        </el-menu-item>
        <el-menu-item index="2" @click="getMyInfo">
          我的填报信息
        </el-menu-item>
        <el-menu-item index="3" @click="logout">
          退出登录
        </el-menu-item>
      </el-menu>
      <el-dialog
        title="请确认信息"
        :visible.sync="myInfoVisible"
        width="30%">
        <div><strong>姓名：</strong>{{form.name}}</div>
        <div><strong>学号：</strong>{{form.uid}}</div>
        <div><strong>班级：</strong>{{form.class}}</div>
        <div><strong>填报方向：</strong>{{choiceName[form.choice]}}</div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="myInfoVisible = false">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {IP} from '../config.js'
export default {
  name: 'TopBar',
  data() {
    return {
      myInfoVisible: false,
      adjustWidth:'',
      activeIndex: '1',
      activeIndex2: '1',
      fit:'scale-down',
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
      }
    };
  },
  mounted(){
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
    var is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
    if(is_mobi){
      this.adjustWidth = '80rem'
    }else{
      this.adjustWidth = '100%'
    }
  },
  methods: {
    temp(){
    },
    getMyInfo(key, keyPath) {
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
            that.myInfoVisible = true
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
    logout() {
      var that = this
      that.$message({
        message: '退出成功',
        type: 'success'
      })
      this.$cookies.set('account', '')
      this.$cookies.set('password', '')
      this.redirect('Login')
    },
    redirect(pathname){
      this.$router.push({ name: pathname})
    },
  }
}
</script>

<style>
.my-sub-title{
  margin-top: 0.2rem;
  border-top: 1px #aaaaaa solid;
  font-size: 14px;
  color: #8b8b8b;
  font-weight: 200;
}
.my-header-col .el-menu{
  display: flex;
  justify-content: space-between;
  width: 65rem;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a{ 
text-decoration:none; 
color:rgb(156, 156, 156); 
} 
.my-header-col{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120rem;
}
.my-title{
  border-left: 1px #bbbbbb solid;
  padding-left: 40px;
  margin-left: 30px;
  color: #444444;
  white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.my-header{
  width: 80rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.my-logo-text{
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: rgb(53, 53, 53);
  padding-left: 8rem;
  margin-right: 5rem;
}
.my-header-img{
  width: 100%;
  position: absolute;
  left: 0;
  top:0;
  z-index: 0;
}
.my-menu{
  display: flex;
  height: 3.7rem;
  justify-content: space-between;
  border: 0;
  padding: 0;
  padding-right: 8rem;
  margin: 0;
  /* width: 100%; */
  z-index: 10;
}
.my-notice{
  display: flex;
  align-items:center;
  margin-right: 1rem;
  font-size: 1.2rem;
}
body{
  margin:0px;
  height: 1rem;
}
.my-home-alert-img{
  width: 100%;
}
</style>
