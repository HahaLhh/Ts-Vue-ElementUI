<template>
  <el-container class="layout-content">
    <!-- 左侧菜单 -->
    <!-- el-aside 侧边栏容器 -->
    <el-aside width="200px">
      <slot name="left"></slot>
    </el-aside>

    <!-- 右侧页面 -->
    <!-- 主要区域容器 -->
    <el-main>
      <!-- 面包屑 -->
      <div class="top">
        <i class="fa fa-reorder"></i>
        <!-- separator 分隔符 -->
        <el-breadcrumb class="breadcrumb" separator="/">
          <el-breadcrumb-item
            v-for="(item,index) in breadCrumbArry"
            :key="index"
            :to="{path:item.path}"
          >{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 页面内容 -->
      <div class="content">
        <slot name="content"></slot>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Content extends Vue {
  @Provide() breadCrumbArry: any; //面包屑数组
  //监听 实时刷新 定义一个方法
  @Watch("$route") handleRouteChange(to: any) {
    this.initBreadCrumbItems(to);
  }
  //勾子函数
  created() {
    this.initBreadCrumbItems(this.$route);
  }
  //定义方法
  initBreadCrumbItems(router: any) {
    // console.log(router);
    // 根路由title
    let breadCrumbItems: any = [{ path: "/", title: "后台管理系统" }];
    // 遍历父级到当前子路由的页面的title和path 存储到数组里
    for (const index in router.matched) {
      //判断当前对象中的mate是否存在 mata包含 path icon title
      if (router.matched[index].meta && router.matched[index].meta.title) {
        breadCrumbItems.push({
          //在router.matched[index]下是否有path
          path: router.matched[index].path ? router.matched[index].path : "/",
          title: router.matched[index].meta.title
        });
      }
    }
    this.breadCrumbArry = breadCrumbItems;
    // console.log(this.breadCrumbArry);
  }
}
</script>

<style lang="less" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  .el-main {
    padding: 0;
    .top {
      background: #fff;
      height: 54px;
      border-right: none;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        // 鼠标光标
        cursor: pointer;
        padding-left: 16px;
      }
      .breadcrumb {
        padding-left: 16px;
      }
    }
    .content {
      padding: 10px;
      height: calc(100% - 54px);
      box-sizing: border-box;
    }
  }
}
</style>