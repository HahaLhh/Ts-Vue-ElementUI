 <template>
  <div class="user-info">
    <div class="img-box">
      <h2 class="title">About me</h2>
      <!-- getUser.key  根据用户类型显示不同的img -->
      <img :src="require('@/assets/'+getUser.key+'.jpg')" alt />
      <h4>{{getUser.username}}</h4>
    </div>
    <div class="info-box">
      <h2 class="title">Account</h2>
      <!-- from -->
      <el-form :model="userData" class="form-box">
        <el-form-item label="用户名">
          <!-- readonly 只读 -->
          <el-input v-model="getUser.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <!-- readonly 只读 -->
          <el-input type="password" v-model="userData.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 未填写密码时禁用 :disabled  加载动画 :loading -->
          <el-button
            :disabled="!userData.pwd"
            type="primary"
            :loading="loading"
            @click="onSubmit"
          >修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";

@Component
export default class Userinfo extends Vue {
  //获取登陆用户数据
  @Getter("user") getUser: any;

  @Provide() userData: { username: string; pwd: string } = {
    username: "",
    pwd: ""
  };
  @Provide() loading: boolean = false; //是否发起网络请求

  created() {
    // console.log(this.getUser);
  }
  onSubmit(): void {
    this.userData.username = this.getUser.username;
    // console.log(this.userData);
    this.loading = true;
    //发起请求
    (this as any).$axios
      .post("/api/users/changePwd", this.userData)
      .then((res: any) => {
        // console.log(res.data);
        // 修改成功后 改变button :loading加载动画
        this.loading = false;
        // elementui 提供 this.$message({})
        this.$message({
          message: res.data.msg,
          type: "success"
        });
      }).catch((error:any) =>{
        console.log(error);
        
      })
      // 请求完成后 不论失败与否
      // .catch(() => {
      //   this.loading = false;
      // });

  }
}
</script>
<style lang="less" scoped>
.user-info {
  height: calc(100% - 70px);
  display: flex;
  overflow: auto;
  color: #606266;
  .img-box,
  .info-box {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    background: #fff;
    .title {
      border-bottom: 1px solid #dcdfe6;
      padding: 10px;
      text-align: left;
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .img-box {
    text-align: center;
    width: 30%;
    margin-right: 10px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    h4 {
      margin-top: 20px;
      font-size: 16px;
    }
  }
  .info-box {
    flex: 1;
    .form-box {
      padding: 10px;
    }
  }
}
</style>