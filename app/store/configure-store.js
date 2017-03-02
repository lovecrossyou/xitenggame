/**
 * Created by huibei on 17/2/27.
 */
'use strict';

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import RootReducer from '../reducer/index';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger'
import { composeWithDevTools } from 'remote-redux-devtools';

const logger = createLogger()
var initState = {};
const store = createStore(
    RootReducer,
    initState,
    composeWithDevTools(applyMiddleware(thunk,promiseMiddleware,logger))
)
export default store;