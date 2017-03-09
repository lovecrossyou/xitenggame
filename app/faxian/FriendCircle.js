/**
 * Created by zhulizhe on 2017/3/9.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    InteractionManager
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import ParallaxView from 'react-native-parallax-view'
import CellItem from '../common/component/CommonCell'
import {UserHeaderInfo} from '../common/component/UserHeaderInfo'
import {CommentMoreFooter} from '../common/component/CommentMoreFooter'
import SGListView from 'react-native-sglistview'
import {requestData} from '../util/NetUtil'

class StockCell extends Component{
    render(){
        return <View>
            <UserHeaderInfo {...this.props}/>
            <View style={{marginLeft:50,paddingHorizontal:10}}>
                <View style={[styles.row,styles.between,styles.paddingV]}>
                    <Text>名称：上证指数</Text>
                    <Text>20170909期</Text>
                </View>
                <View style={[styles.row,styles.between,styles.paddingV]}>
                    <Text>投注：</Text>
                    <Text>猜涨</Text>
                    <Text>数额</Text>
                    <Text>10</Text>
                </View>
                <View style={[styles.row,styles.between,styles.paddingV]}>
                    <Text>收盘</Text>
                    <Text>998</Text>
                    <Text>盈亏</Text>
                    <Text>等待开奖</Text>
                </View>
            </View>
            <CommentMoreFooter />
        </View>
    }
}

class FriendCircleCell extends Component{
    render(){
        return <View>
            <UserHeaderInfo {...this.props}/>

        </View>
    }
}

class Header extends Component{
    render(){
        return <View style={{height:140,justifyContent:'flex-end',borderBottomWidth:1,borderBottomColor:'#f5f5f5'}}>
            <View style={{flexDirection:'row'}}>
                <Image
                    style={{width:45,height:45,marginLeft:20,marginRight:15,marginBottom:10}}
                    source={require('../../img/me/icon_likes_d.png')}
                />
                <View style={{justifyContent:'space-around'}}>
                    <Text style={{fontSize:16,fontWeight:'bold',}}>大发明家黑默丁格</Text>
                    <Text numberOfLines={2} style={{fontSize:12,marginRight:80,paddingBottom:6}}>React Native与传统的HybirdApp最大区别就是抛开WebView，使用JSC+原生组件的方式进行渲染，那么整个App启动/渲染流程又是怎样的呢？</Text>
                </View>
            </View>
        </View>
    }
}

class Banner extends Component{

    _goRank(){

    }

    render(){
        return <CellItem title="排行榜" desc="第五名"
                      style={{flex:1}}
                      icon={require('../../img/me/me_icon_assets.png')}
                      click={this._goRank.bind(this)}
            />
    }
}

export default class FriendCircle extends Component{

    constructor() {
        super()
        this.pageNo = 0
        this.state = {
            list: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
            this.fetchData()
        })
    }

    renderData(data){
        return <StockCell data={data}/>
    }

    fetchData(){
        requestData('client/friendCircle/friendCircleList',{
            commentTypeId:0,
            commentType:'userSelf',
            pageNo:this.pageNo,
            size:20
        }).then((list)=>{
            let lists = list['content']
            this.setState({
                list:lists
            })
        })
    }

    render(){
        return <View style={{flex:1}}>
            <NavigationBar
                title={{title:'朋友圈'}}
                tintColor="#f7f7f8"/>
            <ParallaxView
                style={{flex:1}}
                backgroundSource={require('../../img/me/betting-record_bg.png')}
                windowHeight={140}
                header={<Header />}>
                <Banner />
                <SGListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.list) }
                    renderRow={this.renderData.bind(this)}
                    initialListSize={1}
                    onEndReached={this.fetchData.bind(this)}
                    onEndReachedThreshold={10}
                    pageSize={20}
                    scrollRenderAheadDistance={1}
                    stickyHeaderIndices={[]}
                    enableEmptySections={true}>
                </SGListView>
            </ParallaxView>
        </View>
    }
}

const styles = {
    row:{
        flexDirection:'row'
    },
    between:{
        justifyContent:'space-between'
    },
    paddingV:{
        paddingVertical:6
    }
}