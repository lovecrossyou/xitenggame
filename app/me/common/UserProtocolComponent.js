/**
 * Created by zhulizhe on 2017/3/9.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';
import NavigationBar from 'react-native-navbar'

export default class UserProtocolComponent extends Component {
    render() {
        return <View style={{flex:1}}>
            <NavigationBar
                title={{title:'通用'}}
                tintColor="#f7f7f8"/>
            <WebView
                source={{uri: 'https://github.com/facebook/react-native'}}
            />
        </View>
    }
}