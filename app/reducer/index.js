/**
 * Created by huibei on 17/2/27.
 */
'use strict';

import shalongReducer from '../shalong/reducer/shalongReducer'
import {combineReducers} from 'redux';
const rootReducer = combineReducers({
    shalongReducer
})
export default rootReducer;