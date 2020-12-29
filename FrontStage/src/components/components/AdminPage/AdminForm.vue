<template>
  <div>
    <div class="my-adminform-main-contain-col" :style="{width:adjustWidth}">
      <div class="my-adminform-main-contain-row">
        <LeftBar/>
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import LeftBar from '@/components/components/AdminPage/LeftBar.vue'

export default {
  name: 'AdminForm',
  components:{
    LeftBar:LeftBar,
  },
  data(){
    return{
      adjustWidth:'',
    }
  },
  mounted(){
    var is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
    if(is_mobi){
      this.adjustWidth = '80rem'
    }else{
      this.adjustWidth = '100%'
    }
  },
  methods:{
    temp(){
      jQuery.post(
        'http://' + IP + '/',
        data,
        function (res) {
        }
      )
    }
  }
}
</script>

<style>
.my-adminform-main-contain-col{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70rem;
}
.my-adminform-main-contain-row{
  display: flex;
  width: 70rem;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
