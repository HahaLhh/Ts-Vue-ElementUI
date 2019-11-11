<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";

@Component
export default class App extends Vue {

  // 存储用户信息
  @Action("setUser") setUser: any;
  // // 声明周期钩子
  created(){
    this.setUser(localStorage.tsToken)
  }

}
</script>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
