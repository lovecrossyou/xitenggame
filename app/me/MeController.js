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
    TouchableOpacity,
    PixelRatio,
    Image,
    ScrollView,
    NativeModules
} from 'react-native';

import NavigationBar from 'react-native-navbar'
import GeneralComponent from './common/GeneralComponent'
import CellItem from '../common/component/CommonCell'
import MessageCenter from './MessageCenter'
var personManager = NativeModules.PersonManager
import AssetsController from './AssetsController'
import BetRecordController from './BetRecordController'
import myOrderController from './myOrderController'
import {requestUserInfo} from '../util/NetUtil'
class Header extends Component {
    render() {
        let {userinfo} = this.props
        let {phoneNumber,cnName,xtNumber,icon} = userinfo
        return <View style={styles.userinfo_container}>
            <TouchableOpacity onPress={()=>{
                alert('xxx')
            }}>
                <Image
                    style={{width: 60, height: 60, borderRadius: 3, marginLeft: 10}}
                    source={{uri: icon}}/>
            </TouchableOpacity>
            <View style={{marginLeft: 10}}>
                <View style={{flexDirection: 'row',alignItems:'flex-start',paddingVertical:10}}>
                    <Text style={{color: '#333333', fontSize: 14}}>{cnName}</Text>
                </View>
                <Text style={{color: '#333333', fontSize: 11}}>{xtNumber}</Text>
            </View>
        </View>
    }
}


export default class AboutMe  extends Component{

    _requestUserInfo(){
        requestUserInfo().then((user)=>{
            let errors= user.errors
            if (errors)return
            this.setState({
                userinfo:user
            })
        })
    }

    constructor(props){
        super(props)
        this.state = {
            userinfo: undefined
        }
    }

    componentDidMount(){
        this._requestUserInfo()
    }

    _header(){
        const user = this.state.userinfo
        if(user){
            return <Header userinfo={user.userInfo}/>
        }
        return null
    }

    _goAssets(){
        this.props.navigator.push({
            component:AssetsController,
            title:'投注'
        })
    }

    _goBetRecord(){
        this.props.navigator.push({
            component:BetRecordController,
            title:'投注记录'
        })
    }

    _goxiquePlan(){
        this.props.navigator.push({
            component:BetRecordController,
            title:'投注'
        })
    }

    _goOrder(){
        this.props.navigator.push({
            component:myOrderController,
            title:'订单'
        })
    }

    render(){
        return <View style={{flex:1}}>
            <NavigationBar
                title={{title:'我'}}
                tintColor="#f7f7f8"/>
            <ScrollView style={{flex:1,backgroundColor:'#f5f5f5'}}>
                {this._header()}
                <CellItem title="我的资产" desc=""
                          icon={require('../../img/me/me_icon_assets.png')}
                          click={this._goAssets.bind(this)}
                />
                <CellItem marginBot={10} title="投注记录" desc=""
                          icon={require('../../img/me/me_icon-_record.png')}
                          click={this._goBetRecord.bind(this)}
                />
                <CellItem title="邀请朋友" desc="" icon={require('../../img/me/me_icon_assets.png')}/>
                <CellItem marginBot={10} title="喜鹊计划" desc=""
                          click={this._goxiquePlan.bind(this)}
                          icon={require('../../img/me/me_icon_plan.png')}
                />
                <CellItem title="订单" desc="兑换礼品 订单详情"
                          icon={require('../../img/me/me_icon-_order.png')}
                          click={this._goOrder.bind(this)}
                />
                <CellItem marginBot={10} title="我的沙龙" desc="发表的评论" icon={require('../../img/me/me_icon_comment.png')}/>
                <CellItem
                    title="消息" desc="" icon={require('../../img/me/me_icon-_news.png')}
                    click={()=>{
                        this.props.navigator.push({
                            component:MessageCenter,
                            title:'投注'
                        })
                    }}
                />
                <CellItem
                    title="通用" desc="" icon={require('../../img/me/me_icon_common.png')}
                    click={()=>{
                        this.props.navigator.push({
                            component: GeneralComponent,
                            title: '投注'
                        })
                    }}
                />
            </ScrollView>
        </View>
    }
}

const styles = {
    container: {
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    userinfo_container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor:'white',
        margin:10
    },
    footerText: {
        color: 'gray',
        fontSize: 10,
        marginLeft: 6
    },
    border_1:{
        borderColor:'#f5f5f5',
        borderWidth:1/PixelRatio.get()
    },
    cell_img:{
        width: 25,
        height: 21,
        marginHorizontal:15,
        marginVertical:10

    }
}
