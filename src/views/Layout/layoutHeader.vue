<!-- 主页头部导航栏 -->
<template>
  <div class="layoutHeader">
    <el-row>
      <!-- left -->
      <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
        <div class="system-info">
          <img class="logo" src="@/assets/logg.jpeg" alt @click="$router.push('./home')" />
          <span class="title">HahaLh</span>
        </div>
      </el-col>
      <!-- right -->
      <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
        <!-- 添加指令 -->
        <el-dropdown class="system-user" @command="userCommand">
          <!-- 下拉菜单 -->
          <span class="userinfo-inner">
            <!-- 拼接字符串 根据getUSer的值选择对应图片 -->
            <img :src="require('@/assets/' + get.key + '.jpg')" alt />
            {{get.username}}
          </span>
          <!-- 下拉菜单触发后 -->
          <el-dropdown-menu slot="dropdown" router>
            <!-- command 触发的事件回调 -->
            <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
            <!-- divided 显示分割线 -->
            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";

@Component
export default class LayoutHeader extends Vue {
  @Getter("user") get: any;
  userCommand(command: string): void {
    //等于 注销登录时
    if (command == "logout") {
      localStorage.removeItem("tsToken");
      this.$router.replace("/login");
    }
    //等于 个人中心时
    // if (command == "usercenter") this.$router.push("/user");
    if (command == "usercenter") this.$router.push("./user");
  }
  created() {
    // console.log(this.get);
  }
}
</script>
<style lang="less" scoped>
.layoutHeader {
  background: #495060;
  line-height: 64px;
  height: 64px;
}
.system-info {
  text-align: left;
  .logo {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 10px;
    float: left;
    position: relative;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    color: azure;
    line-height: 64px;
  }
}
.system-user {
  text-align: right;
  float: right;
  padding-right: 16px;
  .userinfo-inner {
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin: 10px 0px 10px 10px;
      float: right;
    }
  }
}
</style>
