<template>
  <div class="register">
    <div>
      <div class="top-bar"
        :width='webWidth'>
        <div class='logo-bar'>
          <img 
            class="python-logo"
            src="/static/images/logo-white.png"
            fit="cover"
            />
          <div class='logo-text'>EIC学生身份认证系统</div>
        </div>
        <!-- <i class="el-icon-user-solid user-icon" @click="loginFunction()" v-if="nowAccount == ''"></i> -->
        <!-- <div class='user-account-text'  v-if="nowAccount != ''">{{nowAccount}}</div> -->
      </div>
      <div class="black-shadow"/>
      <el-image 
        class="background-img"
        :src="'../static/images/hero.jpg'"
        :width='webWidth'
        :height='webHeight'
        :fit='"cover"'
      />
      <div>
        <div class='user-router' v-if="islogin" :style="{width: loginWindow.width,right: loginWindow.right, top: loginWindow.top, left: loginWindow.left, borderRadius: loginWindow.borderRadius}">
          <div class='user-login-form' :style="{width: loginWindow.width , borderRadius: loginWindow.borderRadius, padding: loginWindow.padding}">
            <div class='user-login-change-bar'>
              <div class='user-login-text'>{{islogin?"学生身份认证":"修改密码"}}</div>
            </div>
            <el-form ref="form" :model="loginForm">
              <el-form-item>
                <el-input v-model="loginForm.account" placeholder="请输入学号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
              </el-form-item>
              <el-button type="primary" style='width: 100%;' @click="loginPost">登录</el-button>
            </el-form>
            <div class='user-register-text' @click="islogin=false">初始账户点击修改密码</div></div>
          </div>
        </div>
        <div class='user-router' v-if="!islogin" :style="{width: loginWindow.width,right: loginWindow.right, top: loginWindow.top, left: loginWindow.left, borderRadius: loginWindow.borderRadius}">
          <div class='user-login-form' :style="{width: loginWindow.width , borderRadius: loginWindow.borderRadius, padding: loginWindow.padding}">
            <div class='user-login-change-bar'>
              <div class='user-login-text'  @click="redirect('accountIn')">{{islogin?"学生身份认证":"修改密码"}}</div>
            </div>
            <el-form ref="form" :model="chpwdForm">
              <el-form-item>
                <el-input v-model="chpwdForm.account" placeholder="请输入学号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="chpwdForm.oldPassword" placeholder="请输入原始密码" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="chpwdForm.newPassword" placeholder="请输入新密码" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="chpwdForm.renewPassword" placeholder="请确认新密码" show-password></el-input>
              </el-form-item>
              <el-button type="primary" style='width: 100%;' @click="changePost">修改密码</el-button>
            </el-form>
            <div class='user-register-text' @click="islogin=true">点击登录</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BottomBar from '@/components/components/BottomBar'
import {IP} from '../config.js'

export default {
  name: 'Login',
  components:{
    BottomBar:BottomBar,
  },
  data(){
    return {
      loginWindow:{
        width: '300px',
        right: '200px',
        top: '200px',
        left: '',
        padding: '20px',
        borderRadius: '3px',
        position: 'absolute'
      },
      isMobile: false,
      islogin: true,
      webWidth: '0',
      webHeight: '0',
      accountIn: 0,
      chpwdForm_mobile: {
        account: '',
        oldPassword: '',
        newPassword: '',
        renewPassword: '',
      },
      loginForm:{
        account: '',
        password: ''
      },
      chpwdForm:{
        account: '',
        oldPassword: '',
        newPassword: '',
        renewPassword: '',
      },
      nowAccount: ''
    }
  },
  mounted(){
    let isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    this.isMobile = isMobile
    if(isMobile){
      this.loginWindow.width = '90vw'
      this.loginWindow.padding = '5vw'
      this.loginWindow.right = ''
      this.loginWindow.left = '0%'
      this.loginWindow.top = '15%'
      this.loginWindow.position = 'absolute'
      this.loginWindow.borderRadius = '0px'
    }
    this.webWidth = document.body.scrollWidth  + 'px'
    this.webHeight = '100%'
  },
  methods:{
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
    loginPost(){
      var that = this
      var data = {
        uid: this.loginForm.account,
        password: this.loginForm.password,
      }
      jQuery.post(
        IP + '/login',
        data,
        function (res) {
          if(res.code == '1'){
            that.$message({
              message: '登陆成功',
              type: 'success'
            })
            that.$cookies.set('account', that.loginForm.account)
            that.$cookies.set('password', that.loginForm.password)
            that.redirect('Notice')
          }
          else if(res.code != '1'){
            that.$message({
              message: res.msg,
              type: 'info'
            })
          }
        }
      )
    },
    changePost(){
      var that = this
      var data = {
        uid: this.chpwdForm.account,
        password: this.chpwdForm.oldPassword,
        newPassword: this.chpwdForm.newPassword,
      }
      jQuery.post(
        IP + '/updatePassword',
        data,
        function (res) {
          if(res.code != '1'){
            that.$message({
              message: res.msg,
              type: 'info'
            })
          }
          else if(res.code == '1'){
            that.$message({
              message: res.msg,
              type: 'success'
            })
            that.islogin = true
          }
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-login-form{
  width: 300px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 3px;
  border: #bbbbbb 1px solid;
}
.user-login-text{
  color: #636363;
  margin-bottom: 20px;
  width: 50%;
}
.register-form{
  background-color: black;
  width: 100px;
  height: 100px;
}
.login-form{
  background-color: rgb(143, 25, 25);
  width: 100px;
  height: 100px;
}
.background-img{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
}
.black-shadow{
  z-index: 10;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.171) no-repeat;
  text-align:center;
}
.top-bar{
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
}
.user-icon{
  padding-right: 10%;
  padding-top: 20px;
  float: right;
  font-size: 35px;
  color: rgb(238, 238, 238);
}
.user-account-text{
  padding-right: 10%;
  padding-top: 32px;
  float: right;
  color: rgb(238, 238, 238);
  font-weight: bold;
}
.python-logo{
  width: 55px;
  height: 40px;
  margin-bottom: 10px;
}
.logo-bar{
  display: flex;
  padding-top: 20px;
  padding-left: 10%;
  float: left;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.logo-text{
  margin-left: 10px;
  color: #ffffff;
  font-weight: bold;
}
.user-login-change-bar{
  display: flex;
  flex-direction: row;
}
.user-video-container{
  width: 150px;
  height: 100%;
}
.user-video-size{
  width: 300px;
  height: 100%;
}
.user-register-text{
  font-size: 12px;
  margin-top: 10px;
}
.user-router{
  z-index: 3100;
  position: absolute;
  right: 100px;
  top: 250px;
}


</style>
