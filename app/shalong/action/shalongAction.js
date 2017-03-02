/**
 * Created by zhulizhe on 2017/2/27.
 */
import * as types from '../../actions/ActionTypes'
import {shalongcommentlist} from '../../util/NetUtil'
function fetchCommentList(pageNo,pageSize,isRefreshing,isLoading){
    return {
        type:types.FETCH_SHALONG_LIST,
        isRefreshing: isRefreshing,
        isLoading: isLoading
    }
}


function reveiveCommentList (list){
    return {
        type:types.RECEIVE_SHALONG_LIST,
        list:list
    }
}

export let actions = {
    shalongAction: (pageNo,pageSize,isRefreshing,isLoading)=>{
        return dispatch => {
            dispatch(fetchCommentList(pageNo,pageSize,isRefreshing,isLoading))
            return shalongcommentlist(pageNo,pageSize).then((json)=>{
                var list = json['content']
                dispatch(reveiveCommentList(list))
            })
        }
    }

}

