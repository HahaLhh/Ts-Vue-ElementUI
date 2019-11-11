import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/Layout/index.vue';
//判断权限
import jwt_decode from 'jwt-decode';

Vue.use(Router);

/**
  添加条件 
* hidden: true                   如果hidden为true则在左侧菜单栏展示，否则不显示
* name:'router-name'             路由名称，必须填写
* meta : {
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'           对应路由在左侧菜单栏的图标样式，样式使用fontawesome图标库
  }
**/

//外部可访问 用于动态渲染路由信息
export const asyncRouterMap = [
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    //在左侧菜单中显示
    hidden: true,
    //实际跳转页面
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        //对应在左侧菜单中显示的名称和icon
        meta: { title: '首页', icon: 'fa fa-home' },
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  // 数据管理
  {
    path: '/dataManage',
    name: 'dataManage',
    //在左侧菜单中显示
    hidden: true,
    //对应在左侧菜单中显示的名称和icon
    meta: { title: '数据管理', icon: 'fa fa-database' },
    component: Layout,
    redirect: '/tableData',
    children: [
      //表格管理
      {
        path: '/tableData',
        name: 'tableData',
        meta: { title: '表格管理', icon: 'fa fa-table' },
        component: () => import('@/views/DataManage/TableData.vue')
      },
      //图表管理
      {
        path: '/chartsData',
        name: 'chartsData',
        meta: { title: '图表管理', icon: 'fa fa-bar-chart' },
        component: () => import('@/views/DataManage/ChartsData.vue')
      },
      //表单管理
      {
        path: '/formData',
        name: 'formData',
        meta: {
          title: '表单管理',
          icon: 'fa fa-file-text-o',
          // 限制访问权限  只有管理员和客服能够访问
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/DataManage/FormData.vue')
      }
    ]
  },
  //账户管理
  {
    path: '/userManage',
    name: 'userManage',
    component: Layout,
    //显示
    hidden: true,
    redirect: '/accountData',
    children: [
      // /账户管理
      {
        path: '/accountData',
        name: 'accountData',
        meta: { title: '账户管理', icon: 'fa fa-user-plus', roles: ['admin'] }, // 只有管理员能够访问
        component: () => import('@/views/UserManage/AccountData.vue')
      }
    ]
  },
  //个人中心
  {
    path: '/user',
    component: Layout,
    redirect: '/userInfo',
    //不需要在左侧菜单中显示
    hidden: false,
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: { title: '个人中心' },
        component: () => import('@/views/UserManage/UserInfo.vue')
      }
    ]
  },
  // 404页面
  {
    path: '/404',
    name: '404',
    hidden: false,
    meta: { title: '404' },
    component: () => import('@/views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
  // login
  {
    path: '/login',
    name: 'login',
    hidden: false,
    meta: { title: '系统登录' },
    component: () => import('@/views/Login/login.vue')
  },
  //password
  {
    path: '/password',
    name: 'password',
    hidden: false,
    meta: { title: '找回密码' },
    component: () => import('@/views/Login/password.vue')
  }
];


const router: any = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  //挂载
  routes: asyncRouterMap
});
router.beforeEach((to: any, from: any, next: any) => {
  //是否登陆成功
  const isLogin = localStorage.tsToken ? true : false;
  //是否在登陆或者忘记密码页面
  if (to.path == "/login" || to.path == "/password") {
    next()
  } else
    //已经登陆进来
    if (isLogin) {
      const decoded: any = jwt_decode(localStorage.tsToken);
      const { key } = decoded;
      // 权限判断
      if (hasPermission(key, to)) {
        next();
      } else {
        next('/404'); // 没有权限进入
      }
    } else {
      next('/login');
    }
  {

  }
})
/**
 * 判断是否有权限
 * @param roles 当前角色
 * @param route 当前路由对象
 * */
function hasPermission(roles: string, route: any) {
  if (route.meta && route.meta.roles) {
    // 如果meta.roles是否包含角色的key值,如果包含那么就是有权限,否则无权限
    return route.meta.roles.some((role: string) => role.indexOf(roles) >= 0);
  } else {
    // 默认不设置有权限
    return true;
  }
}

export default router;