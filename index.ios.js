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
import {reducer} from './app/shalong/reducer/shalongReducer'
const store = createStore(reducer)

import Root from './app/common/tabController'
export default class xitenggame extends Component {
    render() {
        return <Root store={store}/>
    }
}
AppRegistry.registerComponent('xitenggame', () => xitenggame);
