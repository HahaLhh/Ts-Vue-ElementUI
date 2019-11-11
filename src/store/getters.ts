import {GetterTree} from 'vuex'

const getters :GetterTree<any,any> = {
    //获取状态
    user(state:any) :any{
        return state.user
    },
    routers(state:any) :any{
        return state.routers
    }
}
export default getters