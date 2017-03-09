/**
 * Created by zhulizhe on 2017/3/9.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import NavigationBar from 'react-native-navbar'
import CellItem from '../../common/component/CommonCell'

export default class SettingComponent extends Component{

    _goAccountMgr(){

    }

    _feedBack(){

    }

    _clearCache(){

    }

    _loginOut(){

    }

    render(){
        return <View style={{flex:1}}>
            <NavigationBar
                title={{title:'设置'}}
                tintColor="#f7f7f8"/>
            <ScrollView style={{flex:1,backgroundColor:'#f5f5f5'}}>
                <CellItem title="账号管理" desc=""
                          marginBot={10}
                          click={this._goAccountMgr.bind(this)}/>
                <CellItem title="意见反馈" desc=""
                          click={this._feedBack.bind(this)}/>
                <CellItem title="清除缓存" desc=""
                          marginBot={10}
                          click={this._clearCache.bind(this)}/>
                <TouchableOpacity style={{justifyContent:'center',height:40,alignItems:'center',backgroundColor:'white',marginHorizontal:10}}>
                        <Text style={{color:'gray',fontSize:15}}>退出登陆</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    }
}