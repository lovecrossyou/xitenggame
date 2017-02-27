/**
 * Created by zhulizhe on 2017/2/27.
 */
import {shalongcommentlist} from '../../util/NetUtil'
import * as types from '../../actions/ActionTypes'
export let shalongAction = (pageNo,pageSize,isRefreshing,isLoading)=>{
    return dispatch => {
        dispatch(fetchCommentList(pageNo,pageSize,isRefreshing,isLoading))
        return shalongcommentlist(pageNo,pageSize).then((json)=>{
                var list = json['content']
                dispatch(reveiveCommentList(list))
        })
    }
}


let fetchCommentList = (pageNo,pageSize,isRefreshing,isLoading)=>{
    return {
        type:types.FETCH_SHALONG_LIST,
        isRefreshing: isRefreshing,
        isLoading: isLoading
    }
}

let reveiveCommentList= (list)=>{
    return {
        type:types.RECEIVE_SHALONG_LIST,
        list:list
    }
}