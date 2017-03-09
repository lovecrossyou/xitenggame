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

export default class AboutXTComponent extends Component{
    render(){
        return <View style={{backgroundColor:'#f5f5f5'}}>
            <NavigationBar
                title={{title:'关于喜腾'}}
                tintColor="#f7f7f8"/>
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>

            </View>
        </View>
    }
}