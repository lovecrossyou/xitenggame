/**
 * Created by xiteng on 2017/3/9.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Navigator,
    ListView
} from 'react-native'
import NavigationBar from 'react-native-navbar'
var Dimensions = require('Dimensions');
import {requestData} from '../util/NetUtil'
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

class GiftCell extends Component {
    render() {
        return <View>
            <Image style={{width:(ScreenWidth-15)/3, height:(ScreenWidth-15)/3}}/>
            <View style={{justifyContent:'space-between'}}>
                <Text></Text>
                <TouchableOpacity></TouchableOpacity>
            </View>
        </View>
    }
}

class GiftList extends Component {
    constructor(props) {
        super(props)
        this.state={

        }
    }
    componentDidMount() {
        this.getGiftArray()
    }
    getGiftArray() {
        requestData('product/list',{}).then((json)=>{

        })
    }
    render() {
        return <View style={{width:ScreenWidth, height:ScreenHeight-64}}></View>
    }
}

export default class GiftMall extends Component {
    render() {
        return <View>
            <NavigationBar title={{title:'礼品商城'}}
                           tintColor="#f7f7f8"
                           rightButton={{
                               title:'购物车'
                           }}/>
            <GiftList></GiftList>
        </View>
    }
}