<template>
  <div class="account-data">
    <div class="add-box">
      <el-button @click="addAccount" type="primary">新增账户</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%">
      <el-table-column label="角色" width="180">
        <template v-slot="scope">
          <!-- 当edit值为true时 编辑状态 显示下拉菜单 -->
          <!-- @change 监听变化  改变role时改变相对应的des/key-->
          <el-select
            v-if="scope.row.edit"
            v-model="scope.row.role"
            @change="selectChange(scope.row)"
          >
            <el-option
              v-for="option in options"
              :label="option.role"
              :value="option.role"
              :key="option.key"
            ></el-option>
          </el-select>
          <span v-else>{{scope.row.role}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="180">
        <template v-slot="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.username"></el-input>
          <span v-else>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="180" prop="des"></el-table-column>
      <el-table-column label="编辑" width="180">
        <!-- 当用户身份为admin管理员 不允许删除或者编辑 -->
        <template slot-scope="scope" v-if="scope.row.username != 'admin'">
          <!-- 编辑 / 完成 两种状态按钮 -->
          <el-button
            size="mini"
            v-if="!scope.row.edit"
            @click="handleEdit(scope.$index,scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            v-else
            type="success"
            @click="handleSave(scope.$index,scope.row)"
          >完成</el-button>
          <!-- -- -- -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddAccount
      @closeDialog="closeDialog"
      :dialogVisible="dialogVisible"
      :options="options"
      @update="getData"
    ></AddAccount>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import AddAccount from "./AddAccount.vue";
@Component({
  components: { AddAccount }
})
export default class AccountData extends Vue { 
  //创建数组储存用户数据
  @Provide() tableData: any = [];
  //dialog弹出框是否显示
  @Provide() dialogVisible: boolean = false;
  // select数据
  @Provide() options: any = [
    {
      key: "admin",
      role: "管理员",
      des: "Super Administrator. Have access to view all pages."
    },
    {
      key: "editor",
      role: "客服",
      des: "Normal Editor. Can see all pages except permission page"
    },
    {
      key: "visitor",
      role: "游客",
      des: "Just a visitor. Can only see the home page and the document page"
    }
  ];
  created() {
    this.getData();
  }
  getData() {
    //获取所有用户
    (this as any).$axios("/api/users/allUsers").then((res: any) => {
      // console.log(res);
      //设置编辑状态 列举每一项给tableData添加属性
      res.data.datas.forEach((item: any) => {
        item.edit = false;
      });
      //  console.log(res.data.datas);
      this.tableData = res.data.datas;
    }).catch((error:any) =>{
        console.log(error);
      });
  }
  //新增账户
  addAccount() {
    this.dialogVisible = true;
  }
  //关闭弹窗窗口
  closeDialog() {
    this.dialogVisible = false;
  }
  //监听 更改数据 动态更改des/key
  selectChange(item: any) {
    this.options.map((option: any) => {
      if (option.role == item.role) {
        item.key = option.key;
        item.des = option.des;
      }
    });
  }
  //点击编辑
  handleEdit(index: number, row: any) {
    row.edit = true;
    // console.log(row.edit);
  }
  //点击完成
  handleSave(index: number, row: any) {
    row.edit = false;
    (this as any).$axios
      .post(`/api/users/editUser/${row._id}`, row)
      .then((res: any) => {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
      }).catch((error:any) =>{
        console.log(error);
        
      });
  }
  //点击删除
  handleDelete(index: number, row: any) {
    (this as any).$axios
      .delete(`/api/users/deleteUser/${row._id}`)
      .then((res: any) => {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        //在数组中删除
        this.tableData.splice(index, 1);
      }).catch((error:any) =>{
        console.log(error);
        
      });
  }

}
</script>
<style lang="less" scoped>
.account-data {
  height: 100%;
  overflow: auto;
  .add-box {
    margin-bottom: 10px;
  }
}
</style>