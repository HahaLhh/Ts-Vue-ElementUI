<template>
  <div id="login">
    <LoginHeader>
      <!-- :model数据对象 :rules表单验证规则 ref为了在methods中对指定的表单进行验证 -->
      <el-form
        slot="container"
        :model="ruleForm"
        :rules="rules"
        ref="refid"
        label-position="left"
        label-width="0px"
      >
        <div class="title">
          <h3>账号密码登陆</h3>
        </div>
        <!-- username -->
        <!-- 表单域验证对象的子规则 prop=“规则名称” -->
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
            <!--在输入框中内嵌一个icon-->
            <i slot="prefix" class="fa fa-user-o"></i>
          </el-input>
        </el-form-item>
        <!-- password -->
        <!-- 表单域验证对象的子规则 prop=“规则名称” -->
        <el-form-item prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码">
            <!--在输入框中内嵌一个icon-->
            <i slot="prefix" class="fa fa-lock"></i>
          </el-input>
        </el-form-item>
        <!-- Login button -->
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%"
            @click.native.prevent="handleSubmit"
            :loading="isLogin"
          >点击登陆</el-button>
        </el-form-item>
        <!-- autoLogin  forgetPassword -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">七天自动登录</el-checkbox>
          <el-button type="text" class="forgetPassword" @click="$router.push('./password')">忘记密码</el-button>
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import LoginHeader from "./LoginHeader.vue";
@Component({
  components: { LoginHeader }
})
export default class login extends Vue {
  // 存储用户信息
  @Action("setUser") setUser: any;
  //创建isLogin
  @Provide() isLogin: boolean = false;
  //数据对象
  @Provide() ruleForm: {
    // 装饰器名称
    username: String;
    pwd: String;
    autoLogin: boolean;
  } = {
    username: "",
    pwd: "",
    autoLogin: true //是否自动登录
  };

  //验证 装饰器
  // 等于 provide() {
  //        return {
  //          rules: this.rules
  //      }
  //验证规则
  @Provide() rules = {
    //required 是否必填  message 提示语 trigger 触发 blur失去焦点后
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };

  handleSubmit(): void {
    //显示button是否显示加载中动画 
    //validate()	任一表单项被校验后触发 返回是否通过验证
    (this.$refs["refid"] as any).validate((valid: boolean) => {
      if (valid) {
        // console.log("校验通过");
        //校验通过后 显示加载动画
        this.isLogin = true;
        (this as any).$axios
          .post("/api/users/login", this.ruleForm)
          .then((res: any) => {
            //axios请求完成后停止按钮加载动画
            this.isLogin = false;
            // console.log(res.data);
            // 存储token
            localStorage.setItem("tsToken", res.data.token);
            // 存储到vuex中
            this.setUser(res.data.token);
            // 登录成功 跳转 /
            this.$router.push("/");
          })
          .catch(() => {
            this.isLogin = false;
          });
      }
    });
  }
}
</script>
<style lang="less" scoped>
.title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #505458;
}
i {
  margin: 0 8px 0 5px;
  font-size: 14px;
}
.forgetPassword {
  float: right;
}
</style>