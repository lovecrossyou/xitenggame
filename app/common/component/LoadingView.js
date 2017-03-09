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

export default class LoadingView extends Component{
    render(){
        return (<View
            style={[styles.flex,styles.center,{backgroundColor:'#fff'}]}>
            <Text
                style={{fontSize:12,paddingTop:10}}>
                正在加载...
            </Text>
        </View>)
    }
}

const styles = {
    flex:{
        flex:1,
    },
    row:{
        flexDirection:'row'
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
}