/**
 * Created by zhulizhe on 2017/3/9.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import NavigationBar from 'react-native-navbar'

export default class SettingComponent extends Component{
    render(){
        return <View>
            <NavigationBar
                title={{title:'设置'}}
                tintColor="#f7f7f8"/>
        </View>
    }
}