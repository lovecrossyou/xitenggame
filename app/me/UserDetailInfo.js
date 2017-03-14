/**
 * Created by zhulizhe on 2017/3/13.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import {UserHeaderInfo} from '../common/component/UserHeaderInfo'
import CellItem from '../common/component/CommonCell'

export default class UserDetailInfo extends Component{
    _goBetRecord(){

    }

    render(){
        let {data} = this.props
        return <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
            <NavigationBar
                title={{title:'详细资料'}}
                tintColor="#f7f7f8"/>
            <UserHeaderInfo data={data}/>
            <View style={{paddingVertical:15,paddingHorizontal:10}}>
                <Text>西城赌王排行前三名</Text>
            </View>
            <View style={{paddingHorizontal:10}}>
                <Text>未填写</Text>
            </View>
            <View style={{marginTop:20}}>
                <CellItem title="个人动态" desc=""
                          icon={require('../../img/me/me_icon-_record.png')}
                          click={this._goBetRecord.bind(this)}
                />
                <CellItem title="投注记录" desc=""
                          icon={require('../../img/me/me_icon-_record.png')}
                          click={this._goBetRecord.bind(this)}
                />
                <CellItem marginBot={10} title="沙龙评论" desc=""
                          icon={require('../../img/me/me_icon-_record.png')}
                          click={this._goBetRecord.bind(this)}
                />
            </View>
        </View>
    }
}

const styles = {
    backgroundColor:''
}