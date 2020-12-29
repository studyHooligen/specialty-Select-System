<template>
  <div>
    <div class="show-row" :style="{width: screenWidth,height: screenHeight}">
      <div class="show-col" 
        :style="{width: screenWidth,height: screenHeight}"
        v-loading="iserror"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        >
        <TopBar/>
        <!-- <transition :name="direction" > -->
          <router-view  class="main-router-view"/>
        <!-- </transition> -->
        <BottomBar/>
        <!-- <FastMenu/> -->
      </div>
    </div>
  </div>
</template>

<script>
import BottomBar from '@/components/components/BottomBar'
import TopBar from '@/components/components/AdminTopBar'
import {IP} from '../config.js'

export default {
  name: 'App',
  components:{
    TopBar:TopBar,
    BottomBar:BottomBar,
  },
  data(){
    return {
      direction:"",
      screenWidth: '',
      screenHeight: '',
      iserror: true,
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      if (to.path == "/") {
        this.direction = "el-fade-in";
      } else if (from.path == "/") {
        this.direction = "el-zoom-in-center";
      }else{
        this.direction = toDepth < fromDepth ? "el-fade-in" : "el-zoom-in-center";
      }
    }
  },
  mounted(){
    const that = this
    that.screenHeight = document.documentElement.clientHeight + 'px'
    console.log(that.screenHeight)
    if(document.documentElement.clientWidth < 1240){
      that.screenWidth = '80rem'
    }
    else{
      that.screenWidth = document.documentElement.clientWidth + 'px'
    }
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth + 'px'
        that.screenHeight = document.documentElement.clientHeight + 'px'
        if(window.screenWidth < 1240){
          that.screenWidth = '80rem'
        }
        else{
          that.screenWidth = window.screenWidth + 'px'
        }
      })()
    }
    var data = {
      uid: that.$cookies.get('adminAccount'),
      password: that.$cookies.get('adminPassword'),
    }
    jQuery.post(
      IP + '/adminLogin',
      data,
      function (res) {
        if(res.code != '1'){
          that.$message({
            message: '请先登录',
            type: 'info'
          })
          that.$router.push({ name: 'LoginAdmin' })
        }
	else{
	  that.iserror = false
	}
      }
    ).fail(
      function(error){
        that.$message({
          message: '网络错误，请稍后重试',
          type: 'error'
        })
        that.$router.push({ name: 'LoginAdmin' })
      }
    )
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
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.show-row{
  display: flex;
  flex-direction: row;
  width: 80rem;
  height: 100%;
}
.show-col{
  width: 80rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.main-router-view {
  position: relative;
  width: 60rem;
  height: 100%;
}
</style>
