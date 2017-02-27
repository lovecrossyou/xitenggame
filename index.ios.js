/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import store from './app/store/configure-store'

import Root from './app/common/tabController'
export default class xitenggame extends Component {
    render() {
        return <Provider store={store}>
            <Root/>
            </Provider>
    }
}
AppRegistry.registerComponent('xitenggame', () => xitenggame);
