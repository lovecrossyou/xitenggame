/**
 * Created by huibei on 17/2/27.
 */
'use strict';

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';
const middlewares = [thunk];
import createLogger from 'redux-logger'
if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
let store = createStoreWithMiddleware(rootReducer);
export default store;