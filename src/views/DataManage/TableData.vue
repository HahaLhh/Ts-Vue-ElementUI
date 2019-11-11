<template>
  <div class="table-data">
    <div class="search-box">
      <el-input size="small" v-model="searchVal" placeholder="请输入课程名称检索"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width" :height="tHeight" class="table-box">
      <!-- el-table-column 列 -->
      <!-- type="index" 显示序号 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <!-- label 设置列名 -->
      <!-- prop 等于 data.title  tableData.title -->
      <el-table-column label="课程名称" prop="title"></el-table-column>
      <el-table-column width="120" label="课程等级" prop="level"></el-table-column>
      <el-table-column width="120" label="技术栈" prop="type"></el-table-column>
      <el-table-column width="120" label="报名人数" prop="count"></el-table-column>
      <el-table-column width="160" label="上线日期" prop="date"></el-table-column>
      <!-- 权限限制 游客visitor不允许操作 -->
      <el-table-column label="操作" width="160" v-if="getUser.key != 'visitor'">
          <!-- slot-scope="scope"  scope等于当前this-->
        <template v-slot="scope">
            <!-- 通过作用域插槽获取子组件里的数据 $index和row -->
          <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <!-- type="danger" 红色警示 -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages" ref="page-box">
      <!-- @size-change 传递page-sizes页码中选中的条数 加载对应条数数据 -->
      <!-- @current-change 更改页数 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5,10,20]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </div>
    <EditDialog :dialogVisible="dialogVisible" :form="formData" @closeDialog="closeDialog"></EditDialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import EditDialog from "./EditDialog.vue";
import { State, Getter, Mutation, Action } from "vuex-class";

@Component({
  components: { EditDialog }
})
export default class TableData extends Vue {
  @Provide() searchVal: string = ""; //搜索框
  @Provide() tHeight: number = document.body.offsetHeight - 270; //表格高度
  @Provide() tableData: any = []; //储存所有展示的数据
  @Provide() page: number = 1; //当前page 页数
  @Provide() size: number = 5; //请求数据个数 默认为5
  @Provide() total: number = 0; //总数据条数

  @Provide() dialogVisible: Boolean = false; // 是否展示编辑页面
  @Provide() formData: object = { //展示数据 
    title: "",
    type: "",
    level: "",
    count: "",
    date: ""
  };

  @Getter("user") getUser:any
  //请求数据
  loadData() {
    (this as any)
      .$axios(`/api/profiles/loadMore/${this.page}/${this.size}`)
      .then((res: any) => {
        console.log(res.data);
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      }).catch((err:any) =>{
        console.log(err);
        
      });
  }
  created() {
    this.loadData();
  }
  //修改请求条数
  handleSizeChange(val: number): void {
    //将需要获取的数据条数重新赋值为参数传递过来的数值
    this.size = val;
    //重置this.page 为1
    this.page = 1;
    //修改this.page this.size后 请求axios
    this.searchVal ? this.loadSearchData() : this.loadData();
  }
  //修改请求页数
  handleCurrentChange(val: number): void {
    this.page = val;
    this.searchVal ? this.loadSearchData() : this.loadData();
  }
  //搜索
  handleSearch(): void {
    this.page = 1;
    this.searchVal ? this.loadSearchData() : this.loadData();
  }
  // 加载搜索数据
  loadSearchData() {
    (this as any)
      .$axios(
        `/api/profiles/search/${this.searchVal}/${this.page}/${this.size}`
      )
      .then((res: any) => {
        // console.log(res.data);
        this.tableData = res.data.datas.list;
        this.total = res.data.datas.total;
      });
  }
  //编辑 
  handleEdit(index:number,row:any){
    //    console.log(index,row)
    //赋值一行中的数据
    this.formData =  row ;
    //展示编辑页面
    this.dialogVisible = true;
  }
    //更改this.dialogVisible
  closeDialog(){
      this.dialogVisible = false;
  }
//删除
  handleDelete(index:number,row:any){
    //   console.log(row._id);
    (this as any).$axios
      .delete(`/api/profiles/delete/${row._id}`)
      .then((res: any) => {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        //在储存数据的数组中删除
        this.tableData.splice(index, 1);
      });
  }
}
</script>
<style lang="less" scoped>
.table-data {
  height: 100%;
  .table-box {
    font-size: 14px;
  }
  .pages {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
  }
  .search-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>