import { ActionTree } from 'vuex'
//token解析插件没
import jwt_decode from 'jwt-decode'
//获取router
import { asyncRouterMap } from '../router'
const actions: ActionTree<any, any> = {
    //存储用户信息
    //异步方法
    async setUser({ state, commit }, user: any) {
        //解析用户传递过来的token
        const decoded: any = jwt_decode(user);
        //调用SET_USER方法 传递user用户信息到mutations
        commit('SET_USER', decoded);
        //解构获取decoded 根据key进行根据权限处理
        const { key } = decoded;
        //返回当前用户拥有权限的路由 
        filterAsyncRouter(asyncRouterMap, key)
        //将得到的路由commit
        let accessedRouters = filterAsyncRouter(asyncRouterMap, key);
        commit('SET_ROUTER', accessedRouters);
    }
}
/**
* 递归过滤异步路由表，返回符合用户角色权限的路由表
* @param asyncRouterMap 所有路由表
* @param roles 当前角色
*/
function filterAsyncRouter(asyncRouterMap: Array<any>, roles: string) {
    const accessedRouters = asyncRouterMap.filter(route => {
        // route 所有的路由
        // console.log(route);
        if (hasPerssion(roles, route)) {
            //判断子路由和子路由下包含meta
            if(route.children && route.children.length){
                //递归 执行
                filterAsyncRouter(route.children,roles)
            }
            return true;
        }else{
            return false
        }
    })
    //返回出去
    return accessedRouters;
}
/**
 * 判断是否有权限
 * @param roles 当前角色
 * @param route 当前路由对象
 * */
function hasPerssion(roles: string, route: any) {
    //是否拥有meta和meta有没有roles 检查是否有路由权限
    if (route.meta && route.meta.roles) {
        // 如果meta.roles是否包含角色的key值,如果包含那么就是有权限,否则无权限
        //查看每一个中是否包含当前对象  包含返回值为true 不包含返回false
        return route.meta.roles.some((role: string) => role.indexOf(roles) >= 0);
    } else {
        //与上方无关 返回true是为了返回路由 因为每一个用户都能够访问
        return true
    }
}
export default actions