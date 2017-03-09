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

export default class DailyFortune extends Component{
    render(){
        return <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
            <NavigationBar
                title={{title:'运程'}}
                tintColor="#f7f7f8"/>
        </View>
    }
}