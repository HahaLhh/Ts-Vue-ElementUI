import {MutationTree} from 'vuex'

const mutations :MutationTree<any> = {
    //方法
    SET_USER(state:any,user:any):void{
         state.user  = user 
    },
    SET_ROUTER(state:any,routers:any):void{
        state.routers  = routers 
   },
}
export default mutations