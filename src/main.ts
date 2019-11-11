import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';


//element-ui
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI

Vue.config.productionTip = false;

//axios
import axios from "./utils/http";
// import urls from "./utils/urls";

Vue.prototype.$axios = axios; // 其他页面在使用 axios 的时候直接  this.$axios 就可以了
// Vue.prototype.$urls = urls; // 其他页面在使用 urls 的时候直接  this.$urls 就可以了

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
