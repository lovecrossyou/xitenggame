/**
 * Created by huibei on 17/2/27.
 */
import * as types from '../../actions/ActionTypes'

const defaultState = {
    commentlist:[],
    pageNo:0
}

const shalongReducer = (state=defaultState, action)=>{
    switch(action.type){
        case types.FETCH_SHALONG_LIST:{
            return Object.assign({}, state, {
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading,
            })
        }
        case types.RECEIVE_SHALONG_LIST:{
            return Object.assign({}, state, {
                commentlist:[...action.list,...state.commentlist]
            })
        }
        default:
            return state
    }
}

export default shalongReducer

