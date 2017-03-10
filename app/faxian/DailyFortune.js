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
import ParallaxView from 'react-native-parallax-view'


class Header extends Component{
    render(){
        return <View>

        </View>
    }
}


export default class DailyFortune extends Component{
    render(){
        return <ParallaxView
            style={{flex:1,backgroundColor:'#f5f5f5'}}
            backgroundSource={require('../../img/me/betting-record_bg.png')}
            windowHeight={200}
            header={<Header />}
        >
        </ParallaxView>
    }
}