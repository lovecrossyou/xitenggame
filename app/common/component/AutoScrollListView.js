/**
 * Created by zhulizhe on 2017/3/4.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
    ListView,
    InteractionManager
} from 'react-native';
let {width} = Dimensions.get('window')
import {getRecentBetList} from '../../util/NetUtil'
import BetCell from './BetCell'
import TimerMixin from 'react-native-timer-mixin'

export default class AutoScrollListView extends Component{
    mixins:[TimerMixin]
    constructor(props){
        super(props)
        this.offsetY = 0
        this.datalist = []
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: this.ds.cloneWithRows([])
        }
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
            this._requestData()
        })
        // this.timer = setInterval(()=>{
        //     this.offsetY += 10
        //     this.scrollV.scrollTo({y:this.offsetY})
        // },500)
    }

    componentWillUnMount(){
        this.timer && clearInterval(this.timer)
    }

    renderData(data){
        return <BetCell data={data}/>
    }

    _requestData(){
        getRecentBetList(0,20).then((data)=>{
            var list = data["content"]
            this.datalist= list
            this.setState({
                dataSource:this.ds.cloneWithRows(list)
            })
        })
    }

    _loadMore(){
        if (this.datalist.length == 0)return
        this.offsetY = 0
        this.scrollV.scrollTo({y:this.offsetY})
        this.setState({
            dataSource:this.ds.cloneWithRows(this.datalist)
        })
    }

    render(){
        return <View style={{justifyContent:'center',alignItems:'center'}}>
            <ListView
                ref={(scroll)=>this.scrollV = scroll}
                style={{width:width,height:180}}
                dataSource={this.state.dataSource }
                renderRow={this.renderData.bind(this)}
                onEndReached={this._loadMore.bind(this)}
                onEndReachedThreshold={10}
                removeClippedSubviews={true}
                enableEmptySections={true}>
            </ListView>
        </View>
    }
}