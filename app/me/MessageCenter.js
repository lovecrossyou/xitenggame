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

export default class MessageCenter extends Component{
    render(){
        return <View style={{flex:1}}>
            <NavigationBar
                title={{title:'消息'}}
                tintColor="#f7f7f8"/>

        </View>
    }
}