<template>
  <div class="my-allproblem">
    <div class="my-block">
      <div class="user-time-picker">选择选课时间段：</div>
      <el-date-picker
        v-model="datetime"
        style="width: 35rem"
        type="datetimerange"
        range-separator="至"
        value-format="yyyy-MM-dd-HH-mm"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>

    <div class="my-block">
      <div class="user-num-picker">电子信息工程：</div>
      <el-input v-model="maxNums.dianxin" placeholder="请输入人数规模" class="my-head-input"></el-input>
    </div>
    <div class="my-block">
      <div class="user-num-picker">通信工程：</div>
      <el-input v-model="maxNums.tongxin" placeholder="请输入人数规模" class="my-head-input"></el-input>
    </div>
    <div class="my-block">
      <div class="user-num-picker">电磁场：</div>
      <el-input v-model="maxNums.dianci" placeholder="请输入人数规模" class="my-head-input"></el-input>
    </div>

    <div class="my-block" v-for="item in noticeContent">
      <el-input v-model="item.title" placeholder="请输入标题" class="my-head-input"></el-input>
      <el-input
        type="textarea"
        class="my-tail-input"
        :autosize="{ minRows: 6, maxRows: 6}"
        placeholder="请输入内容"
        v-model="item.content">
      </el-input>
    </div>
    <div><i class="el-icon-plus" style="font-size: 24px;" @click="addItem"></i></div>
    <div class="my-set-button">
      <el-button type="primary" slot="reference" @click="submitSetting">提交</el-button>
    </div>
  </div>
</template>
<script>
import {IP} from '../../../config.js'
export default {
  name: 'MyRights',
  data() {
      return {
        datetime: '',
        filters:{
          sex:[
            { text: "男", value: "boy"},
            { text: "女", value: "girl"}
          ],
          FirstExcept:[
            { text: "办公室", value: "办公室"},
            { text: "辩论队", value: "辩论队"},
            { text: "技术部", value: "技术部"},
            { text: "礼仪队", value: "礼仪队"},
            { text: "权益部", value: "权益部"},
            { text: "赛事部", value: "赛事部"},
            { text: "社会实践部", value: "社会实践部"},
            { text: "体育部", value: "体育部"},
            { text: "外联部", value: "外联部"},
            { text: "小红帽", value: "小红帽"},
            { text: "心理部", value: "心理部"},
            { text: "新闻中心", value: "新闻中心"},
            { text: "宣传部", value: "宣传部"},
            { text: "学术部", value: "学术部"},
            { text: "组织部", value: "组织部"},
            { text: "文艺部", value: "文艺部"},
            { text: "启明书屋", value: "启明书屋"},
            { text: "主持人队", value: "主持人队"}
          ],
          SecondExcept:[
            { text: "办公室", value: "办公室"},
            { text: "辩论队", value: "辩论队"},
            { text: "技术部", value: "技术部"},
            { text: "礼仪队", value: "礼仪队"},
            { text: "权益部", value: "权益部"},
            { text: "赛事部", value: "赛事部"},
            { text: "社会实践部", value: "社会实践部"},
            { text: "体育部", value: "体育部"},
            { text: "外联部", value: "外联部"},
            { text: "小红帽", value: "小红帽"},
            { text: "心理部", value: "心理部"},
            { text: "新闻中心", value: "新闻中心"},
            { text: "宣传部", value: "宣传部"},
            { text: "学术部", value: "学术部"},
            { text: "组织部", value: "组织部"},
            { text: "文艺部", value: "文艺部"},
            { text: "启明书屋", value: "启明书屋"},
            { text: "主持人队", value: "主持人队"}
          ],
          AdjustedOrNot:[
            { text: "服从调剂", value: "1"},
            { text: "不服从调剂", value: "2"},
          ],
          class:[
            { text: "信息类数理提高班1901", value: "信息类数理提高班1901"},
            { text: "电子信息类卓越班1901", value: "电子信息类卓越班1901"},
            { text: "电子信息类1901", value: "电子信息类1901"},
            { text: "电子信息类1902", value: "电子信息类1902"},
            { text: "电子信息类1903", value: "电子信息类1903"},
            { text: "电子信息类1904", value: "电子信息类1904"},
            { text: "电子信息类1905", value: "电子信息类1905"},
            { text: "电子信息类1906", value: "电子信息类1906"},
            { text: "电子信息类1907", value: "电子信息类1907"},
            { text: "电子信息类1908", value: "电子信息类1908"},
            { text: "电子信息类1909", value: "电子信息类1909"},
            { text: "电子信息类1910", value: "电子信息类1910"},
          ],
        },
        tableData: [
          {
            uid: 'U201713506',
            name: '刘羿',
            class: '电子信息类1802',
            score: 93.6,
            chooseOrNot: 0,
            choice: 'a',
            result: '电子信息工程',
            rank: '5',
          },
          {
            uid: 'U201713506',
            name: '刘羿',
            class: '电子信息类1802',
            score: 93.6,
            chooseOrNot: 0,
            choice: 'a',
            result: '电子信息工程',
            rank: '5',
          },
          {
            uid: 'U201713506',
            name: '刘羿',
            class: '电子信息类1802',
            score: 93.6,
            chooseOrNot: 0,
            choice: 'a',
            result: '电子信息工程',
            rank: '5',
          },
        ],
        noticeContent: [
          {
            title: '',
            content: ''
          }
        ],
        maxNums:{
          dianxin: '',
          tongxin: '',
          dianci: ''
        }
      };
    },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    addItem(){
      this.noticeContent.push({
        title: '',
        content: ''
      })
    },
    submitSetting(){
      var contentArray = []
      var that = this
      for(var i=0;i<this.noticeContent.length;i++){
        contentArray.push({
          title: this.noticeContent[i].title,
          content: this.noticeContent[i].content.split("\n"),
          constantContent: this.noticeContent[i].content,
        })
      }
      var start = this.datetime[0].split('-')
      var end = this.datetime[1].split('-')
      var startTime = {
        year: start[0],
        month: start[1],
        day: start[2],
        hour: start[3],
        min: start[4]
      }
      var endTime = {
        year: end[0],
        month: end[1],
        day: end[2],
        hour: end[3],
        min: end[4]
      }
      var data = {
        content: JSON.stringify(contentArray),
        startTime: JSON.stringify(startTime),
        endTime: JSON.stringify(endTime),
        maxNums: JSON.stringify(that.maxNums)
      }
      // console.log(data)
      jQuery.post(
        IP + '/settings',
        data,
        function (res) {
          if(res.code == '1'){
            that.$message({
              message: '修改成功',
              type: 'success'
            })
          }
          else{
            that.$message({
              message: '修改失败',
              type: 'error'
            })
          }
        }
      )
    }
  },
  mounted(){
    var that = this
    // var data = {
    //   uid: that.$cookies.get('adminAccount'),
    //   password: that.$cookies.get('adminPassword'),
    // }
    jQuery.get(
      IP + '/getSettings',
      // data,
      function (res) {
        console.log(res)
        if(res.code == '1'){
          that.noticeContent = []
          var tempContent = JSON.parse(res.settings.content)
          var tempStartTime = JSON.parse(res.settings.startTime)
          var tempEndTime = JSON.parse(res.settings.endTime)
          that.maxNums = JSON.parse(res.settings.maxNums)
          if(tempContent.length == 0){
            that.noticeContent = [
              {
                title: '',
                content: ''
              }
            ]
          }
          else{
            for(var i=0;i<tempContent.length;i++){
              that.noticeContent.push({
                title: tempContent[i].title,
                content: tempContent[i].constantContent
              })
            }
          }
          that.datetime = [
            tempStartTime.year + '-' + tempStartTime.month + '-' + tempStartTime.day + '-' + tempStartTime.hour + '-' + tempStartTime.min,
            tempEndTime.year + '-' + tempEndTime.month + '-' + tempEndTime.day + '-' + tempEndTime.hour + '-' + tempEndTime.min,
          ]
        }
        else if(res.code == '-1'){
          that.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }
    )
  }
}
</script>

<style>
.user-num-picker{
  width: 9rem;
}
.my-set-button{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.my-block{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
}
.my-head-input{
  width: 8rem;
  margin-right: 1rem;
}
.my-tail-input{
  width: 35rem;
}
.user-time-picker{
  margin-right: 2rem;
  font-size: 14px;
}
.my-allproblem{
  width: 50rem;
  padding-top: 2rem;
  padding-left: 2rem;
}
.my-desc-text-container{
  padding-left:1rem;
  padding-right:1rem;
  border:0;
  margin:0;
  font-size:0.9rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.my-headimg-row{
  height: 10rem;
  width: 10rem;
}
</style>
