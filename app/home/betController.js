/**
 * Created by huibei on 17/2/28.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class betController extends Component{
    render(){
        return <View style={{justifyContent:'space-between',backgroundColor:'#f5f5f5',flex:1}}>
            <View></View>
            <View style={{alignItems:'center',paddingBottom:15}}>
                <Text style={{fontSize:12}}>
                    【当前参考】猜涨赔率 0.09 猜跌赔率 9.29
                </Text>
            </View>
        </View>
    }
}