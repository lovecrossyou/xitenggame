/**
 * Created by huibei on 17/2/27.
 */
'use strict';

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger'
const logger = createLogger()
var initState = {};
const store = createStore(
    rootReducer,
    initState,
    applyMiddleware(thunk,promiseMiddleware,logger)
)
export default store;