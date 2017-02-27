/**
 * Created by huibei on 17/2/27.
 */
export const types = {
    HEAD_ACTION: 'head_action',
    CONTENT_ACTION: 'content_action',
    PRAISE_ACTION: 'praise_action',
    REQUEST_COMMENTS_ACTION:'request_action'
}

const defaultState = {
    commentlist:[{
        data:'xxxxx'
    }]
}

export const reducer = (state=defaultState,action)=>{
    var {comment} = action
    switch(action.type){
        case types.HEAD_ACTION:{
            return state
        }
        case types.CONTENT_ACTION:{
            return state
        }
        case types.PRAISE_ACTION:{
            // commentlist
            return state
        }
        case types.REQUEST_COMMENTS_ACTION:{
            var list = state.commentlist
            var newlist = []
            newlist = newlist.concat(list)
            var newState = {
                ...state,
                commentlist:newlist
            }
            console.log(newlist)
            return newState
        }
        default:
            return state
    }
}

