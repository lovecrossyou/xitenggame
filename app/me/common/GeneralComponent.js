/**
 * Created by zhulizhe on 2017/3/9.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import CellItem from '../../common/component/CommonCell'
import UserProtocolComponent from './UserProtocolComponent'
import AboutXTComponent from './AboutXTComponent'
export default class SettingComponent extends Component{

    _goUserProtocol(){
        this.props.navigator.push({
            component:UserProtocolComponent,
        })
    }

    _goAbout(){
        this.props.navigator.push({
            component:AboutXTComponent,
        })
    }

    render(){
        return <View style={{flex:1}}>
            <NavigationBar
                title={{title:'通用'}}
                tintColor="#f7f7f8"/>
            <ScrollView style={{flex:1,backgroundColor:'#f5f5f5'}}>
                <CellItem title="用户协议" desc=""
                          marginBot={10}
                          icon={require('../../../img/me/me_icon_assets.png')}
                          click={this._goUserProtocol.bind(this)}/>
                <CellItem title="关于喜腾" desc=""
                          marginBot={10}
                          icon={require('../../../img/me/me_icon_assets.png')}
                          click={this._goAbout.bind(this)}/>
                <CellItem title="给喜腾点赞" desc=""
                          icon={require('../../../img/me/me_icon_assets.png')}
                          click={this._goUserProtocol.bind(this)}/>
                <CellItem title="设置" desc=""
                          icon={require('../../../img/me/me_icon_assets.png')}
                          click={this._goUserProtocol.bind(this)}/>
                </ScrollView>

        </View>
    }
}