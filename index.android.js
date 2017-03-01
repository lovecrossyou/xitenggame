/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import store from './app/store/configure-store'
import {Navigation} from './app/common/entry'
export default class xitenggame extends Component {
    render() {
        return <Provider store={store}>
            <Navigation/>
        </Provider>
    }
}
AppRegistry.registerComponent('xitenggame', () => xitenggame);
