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

import {NavigationBarRouteMapper} from '../common/navigatorConfig'
import CellItem from '../common/component/CommonCell'
var personManager = NativeModules.PersonManager

class Header extends Component {
    render() {
        return <View style={styles.userinfo_container}>
            <TouchableOpacity onPress={()=>{
                alert('xxx')
            }}>
                <Image
                    style={{width: 60, height: 60, borderRadius: 3, marginLeft: 10}}
                    source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
            </TouchableOpacity>
            <View style={{marginLeft: 10,justifyContent:'center'}}>
                <View style={{flexDirection: 'row',alignItems:'flex-start'}}>
                    <Text style={{color: '#333333', fontSize: 14}}>猪猪侠</Text>
                </View>
                <Text style={{color: '#333333', fontSize: 11}}>9527</Text>
            </View>
        </View>
    }
}


class AboutMeHome extends Component{
    render(){
        const {navigator} = this.props;
        return <ScrollView style={{flex:1,marginTop:64,backgroundColor:'#f5f5f5'}}>
            <Header />
            <CellItem title="我的资产" desc="" icon={require('../../img/me/me_icon_assets.png')}/>
            <CellItem marginBot={10} title="投注记录" desc="" icon={require('../../img/me/me_icon-_record.png')}/>
            <CellItem title="邀请朋友" desc="" icon={require('../../img/me/me_icon_assets.png')}/>
            <CellItem marginBot={10} title="喜鹊计划" desc=""
                      click={()=>{

                      }}
                      icon={require('../../img/me/me_icon_plan.png')}/>
            <CellItem title="订单" desc="兑换礼品 订单详情" icon={require('../../img/me/me_icon-_order.png')}/>
            <CellItem marginBot={10} title="我的沙龙" desc="发表的评论" icon={require('../../img/me/me_icon_comment.png')}/>
            <CellItem title="消息" desc="" icon={require('../../img/me/me_icon-_news.png')}/>
            <CellItem title="通用" desc="" icon={require('../../img/me/me_icon_common.png')}/>
        </ScrollView>
    }
}

export default class AboutMe extends Component{
    render(){
        return (
            <Navigator
                initialRoute={{title: '我', component:AboutMeHome}}
                renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }}
                configureScene={(route, routeStack) => Navigator.SceneConfigs.PushFromRight}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={NavigationBarRouteMapper}
                        style={{backgroundColor: '#4964ef'}}/>
                }
            />)
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
