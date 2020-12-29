<template>
  <div class="my-allproblem">
    <a href="../../../../static/excel/students.xlsx">
      <el-button type="primary" slot="reference" @click="fresh">下载表格</el-button>
    </a>
    <el-button type="primary" slot="reference" @click="getResult">获取分流结果</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="paiming"
        label="排名"
        sortable
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="65">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="学号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="score"
        label="加权成绩"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        prop="class"
        label="班级"
        :filters="filters.class"
        :filter-method="filterHandler"
        width="200">
      </el-table-column>
      <el-table-column
        prop="chooseOrNot"
        label="状态"
        :filters="filters.status"
        :filter-method="filterHandler"
        width="65">
      </el-table-column>
      <el-table-column
        prop="choice"
        label="方向选择"
        :filters="filters.choice"
        :filter-method="filterHandler"
        width="95">
      </el-table-column>
      <el-table-column
        prop="result"
        label="分流结果"
        :filters="filters.result"
        :filter-method="filterHandler"
        width="110">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {IP} from '../../../config.js'
export default {
  name: 'MyRights',
  data() {
      return {
        filters:{
          status:[
            { text: '0', value: '0'},
            { text: '1', value: '1'},
          ],
          result:[
            { text: "尚无结果", value: "尚无结果"},
            { text: "电信", value: "电信"},
            { text: "通信", value: "通信"},
            { text: "电磁", value: "电磁"},
          ],
          choice:[
            { text: "尚未选择", value: "尚未选择"},
            { text: "a", value: "a"},
            { text: "b", value: "b"},
            { text: "c", value: "c"},
            { text: "d", value: "d"},
            { text: "e", value: "e"},
            { text: "f", value: "f"},
          ],
          class:[
            { text: "电子信息类电信201801班", value: "电子信息类电信201801班"},
            { text: "电子信息类电信201802班", value: "电子信息类电信201802班"},
            { text: "电子信息类电信201803班", value: "电子信息类电信201803班"},
            { text: "电子信息类电信201804班", value: "电子信息类电信201804班"},
            { text: "电子信息类电信201805班", value: "电子信息类电信201805班"},
            { text: "电子信息类电信201806班", value: "电子信息类电信201806班"},
            { text: "电子信息类电信201807班", value: "电子信息类电信201807班"},
            { text: "电子信息类电信201808班", value: "电子信息类电信201808班"},
            { text: "电子信息类电信201809班", value: "电子信息类电信201809班"},
            { text: "电子信息类电信201810班", value: "电子信息类电信201810班"},
            { text: "电子信息类电信201811班", value: "电子信息类电信201811班"},
            { text: "电子信息类电信201812班", value: "电子信息类电信201812班"},
          ],
        },
        tableData: [
        ]
      };
    },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    fresh(){
      jQuery.get(
        IP + '/download/excel',
        function (res) {
          console.log(res)
        }
      )
    },
    getResult(){
    var that = this
    var data = {
      uid: that.$cookies.get('adminAccount'),
      password: that.$cookies.get('adminPassword')
    }
      jQuery.get(
        IP + '/getResult',
        function (res) {
          jQuery.get(
            IP + '/getAllData',
            data,
            function (res) {
              console.log(res.data)
              that.tableData = res.data
            }
          )
        }
      )
    }
  },
  mounted(){
    var that = this
    var data = {
      uid: that.$cookies.get('adminAccount'),
      password: that.$cookies.get('adminPassword')
    }
    jQuery.get(
      IP + '/getAllData',
      data,
      function (res) {
        console.log(res.data)
        that.tableData = res.data
      }
    )
  }
}
</script>

<style>
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
