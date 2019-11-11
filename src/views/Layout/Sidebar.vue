<!-- header -->
<template>
  <el-scrollbar class="el-scrollbar">
    <!-- :index="" 相当于router-link -->
    <!-- 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转  -->
    <!-- 给menu的default-active绑定route.path 渲染menu都会将当前path设置为default-active-->
    <el-menu class="el-menu-slide" :default-active="$router.currentRoute.path" router>
      <template
        v-for="item in GetRouters"
        :index="item"
        v-if="item.hidden&&item.children&&item.children.length>0"
      >
        <!-- 判断路由下只有一个子路由  即首页和账户管理 -->
        <el-menu-item
          v-if="item.children.length==1"
          :index="item.children[0].path"
          :key="item.name"
        >
          <!-- 对第一个子路由的meta对象中的icon属性判断是否存在 判定icon属性  -->
          <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
          <!-- 获取第一个子路由的meta对象中的title -->
          <span slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>

        <!-- 判断路由下有多个子元素  即数据管理 el-submenu 二级菜单-->
        <!-- v-else 对应 上方el-menu-item中的v-if-->
        <el-submenu v-else :index="item.children[0].path" :key="item.name">
          <!-- 主菜单标题 icon -->
          <template slot="title">
            <!-- 判断是否有icon属性 进行绑定 -->
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <!-- 判断是否有title属性 进行绑定 -->
            <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
          </template>
          <!-- 副菜单标题 icon -->
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.name">
            <!-- 判断是否有icon属性 进行绑定 -->
            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
            <!-- 判断是否有title属性 进行绑定 -->
            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
@Component
export default class Sidebar extends Vue {
  @Getter("routers") GetRouters: any;
  created() {
    // console.log(this.GetRouters);
  }
}
</script>
<style lang="less" scoped>
.el-scrollbar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  .el-menu-slide {
    border-right: none;
    i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>
