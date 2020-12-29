<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import BottomBar from '@/components/components/BottomBar'
import TopBar from '@/components/components/TopBar'

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
    if(document.documentElement.clientWidth < 1240){
      that.screenWidth = '80rem'
    }
    else{
      that.screenWidth = document.documentElement.clientWidth + 'px'
    }
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        if(window.screenWidth < 1240){
          that.screenWidth = '80rem'
        }
        else{
          that.screenWidth = window.screenWidth + 'px'
        }
      })()
    }
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
}
.show-col{
  width: 80rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.main-router-view {
  position: relative;
  width: 60rem;
}
</style>
