/**
 * Created by zhulizhe on 2017/2/25.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    ScrollView
} from 'react-native';
import CellItem from '../common/component/CommonCell'
import NavigationBar from 'react-native-navbar'
import FriendCircle from './FriendCircle'
export default class FaXianController extends Component{
    _goFrindCircle(){
        this.props.navigator.push({
            component:FriendCircle
        })
    }

    render(){
        return <View style={{flex:1}}>
            <NavigationBar
                title={{title:'发现'}}
                tintColor="#f7f7f8"/>
            <ScrollView style={{flex:1,backgroundColor:'#f5f5f5',paddingTop:10}}>
                <CellItem
                    click={this._goFrindCircle.bind(this)}
                    title="朋友圈" desc="朋友动态" icon={require('../../img/me/me_icon_assets.png')}
                />
                <CellItem title="喜信" marginBot={10} desc="及时聊天" icon={require('../../img/me/me_icon_assets.png')}/>
                <CellItem title="升级会员" desc=""
                          click={()=>{

                          }}
                          icon={require('../../img/me/me_icon_plan.png')}/>
                <CellItem title="购买钻石"   desc="" marginBot={10} icon={require('../../img/me/me_icon-_order.png')}/>
                <CellItem title="零元夺宝"  desc="" icon={require('../../img/me/me_icon_comment.png')}/>
                <CellItem title="礼品商城" marginBot={10} desc="" icon={require('../../img/me/me_icon-_news.png')}/>
                <CellItem title="每日运程" desc="" icon={require('../../img/me/me_icon_common.png')}/>
            </ScrollView>
        </View>
    }
}