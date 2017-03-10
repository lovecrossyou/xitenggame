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
import {requestData} from '../util/NetUtil'
import SGListView from 'react-native-sglistview'
import LoadingView from '../common/component/LoadingView'
class MessageCell extends Component{
    render(){
        let {content,time} = this.props.msg
        return <View style={{backgroundColor:'#f5f5f5'}}>
            <View style={{justifyContent:'center',alignItems:'center',paddingVertical:7}}>
                <Text style={{fontSize:12,color:'gray'}}>{time}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Image
                    style={{width:30,height:30,marginLeft:10,marginTop:10}}
                    source={require('../../img/me/icon_likes_d.png')}
                />
                <View style={{marginTop:20,marginLeft:10,marginRight:30+10,marginBottom:10}}>
                    <Text
                        style={{backgroundColor:'#fff',padding:10,borderRadius:6}}
                        adjustsFontSizeToFit={true}
                        suppressHighlighting={true}>
                        {content}
                    </Text>
                </View>
            </View>
        </View>
    }
}

export default class MessageCenter extends Component{

    constructor() {
        super()
        this.pageNo = 1
        this.pageSize=20
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

    fetchData(){
        requestData('pushMessage/list',{
            size:this.pageSize,
            pageNo:this.pageNo
        }).then((list)=>{
            let msglist = list['content']
            let oldlist = this.state.list
            this.setState({
                list:[...oldlist,...msglist]
            })
            this.pageNo = this.pageNo+1
        })
    }

    renderData(msg){
        return <MessageCell msg={msg}/>
    }

    render(){
        let datalist = (
            <SGListView
                dataSource={this.state.dataSource.cloneWithRows(this.state.list) }
                renderRow={this.renderData.bind(this)}
                initialListSize={1}
                onEndReached={this.fetchData.bind(this)}
                onEndReachedThreshold={10}
                pageSize={this.pageSize}
                scrollRenderAheadDistance={1}
                stickyHeaderIndices={[]}
                enableEmptySections={true}>
            </SGListView>
        )
        if(this.state.list.length==0){
            datalist = (<LoadingView bgColor='#f5f5f5'/>)
        }
        return <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
            <NavigationBar
                title={{title:'消息'}}
                tintColor="#f7f7f8"/>
            {datalist}
        </View>
    }
}