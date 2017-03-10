/**
 * Created by xiteng on 2017/3/7.
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
import NavigationBar from 'react-native-navbar';
import {requestData} from '../util/NetUtil'

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

class AwardHeader extends Component {
    constructor(props) {
        super(props)
        this.state={
            desc:''
        }
    }
    componentDidMount(){
        this.getAwardDesc()
    }
    getAwardDesc(){
        requestData('award/desc', {}).then((json)=>{
            var awardDesc = json['awardDesc']
            this.setState({
                desc:awardDesc
            })
        })
    }
    render(){
        var str =  this.state.desc.length ? this.state.desc.substring(5):''
        return <View>
            <Text style={{marginTop:15, marginLeft:12, fontSize:13, color:'rgba(255,186,38,1)'}}>奖励说明:<Text style={AwardHeaderStyle.descS}>{str}</Text></Text>
            <Text style={AwardHeaderStyle.claimS}>声明:所有商品活动与苹果公司(Apple Inc)无关</Text>
        </View>
    }
}
const AwardHeaderStyle = {
    descS : {
        marginRight:12,
        fontSize:13,
        color:'white',

    },
    claimS : {
        marginTop:5,
        marginLeft:12,
        marginBottom:5,
        fontSize:12.5,
        color:'rgba(247,41,41,1)',

    }
}

class AwardCell extends Component{
    render(){
        var rankImg = [require('../../img/home/winner-first.png'),
                       require('../../img/home/winner-second.png'),
                       require('../../img/home/winner-third.png')]
        var data = this.props.data
        return <View>
            <View style={AwardCellStyle.backS}>
                {this.props.isCurrent?null:<View style={{height:40, backgroundColor:'rgba(231,231,231,1)', borderRadius:4}}>
                    <View style={{height:39.5, justifyContent:'center', backgroundColor:'white', borderRadius:4}}>
                        <Text style={AwardCellStyle.presentDescS}>{data.rankStr}:
                            <Text style={AwardCellStyle.presentNameS}>{data.awardName}</Text></Text>
                    </View>
                </View>}
                <Image style={AwardCellStyle.imgS}
                       source={{uri:this.props.isCurrent?data.picUrl:data.pic}}/>
                <View style={{height:0.5, backgroundColor:'rgba(231,231,231,1)'}}></View>
                {this.props.isCurrent ? <View style={{height:55, justifyContent:'center'}}>
                    <Text style={AwardCellStyle.presentDescS}>{data.rankStr}:
                        <Text style={AwardCellStyle.presentNameS}>{data.name}</Text></Text>
                </View> :
                    <View style={{flexDirection:'row', height:55, alignItems:'center'}}>
                        <View style={{flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            marginLeft:10,
                            width:18}}>
                            {data.rank<=3?<Image style={{width : 18, height:25, alignSelf:'center'}}
                                                 source={rankImg[data.rank-1]}/>:
                                <Text style={{fontSize:15, color:'rgba(51,51,51,1)', alignSelf:'center'}}>{data.rank}</Text>}
                        </View>
                        <Image style={{marginLeft:10, width:30, height:30, borderRadius:3}}
                               source={{uri:data.userIcon}}/>
                        <Text style={{marginLeft:10, fontSize:15, color:'rgba(51,51,51,1)'}}>{data.userName}</Text>
                        <TouchableOpacity style={{marginLeft:10}}>
                            <Text style={{fontSize:14, color:'rgba(51,51,51,1)'}}>{data.profit}</Text>
                        </TouchableOpacity>
                    </View>}
            </View>
        </View>
    }
}
const AwardCellStyle = {
    backS : {
        marginLeft:12,
        marginRight:12,
        marginBottom:15,
        backgroundColor:'white',
        borderRadius:4
    },
    imgS : {
        width:ScreenWidth-24,
        height:165,
        borderRadius:4
    },
    presentDescS:{
        marginLeft:15,
        marginRight:15,
        fontSize:15,
        color:'rgba(247,41,41,1)'
    },
    presentNameS:{
        fontSize:15,
        color:'rgba(51,51,51,1)'
    }
}

class AwardList extends Component {
    constructor(props){
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            awardA:[],
            dataSource : ds.cloneWithRows([])
        }
    }
    componentDidMount(){
        this.getAwardList()
    }
    getAwardList(){
        var url = this.props.isCurrent ? 'award/list' : 'award/records'
        var param = this.props.isCurrent ? {'awardType':this.props.index} : {'rankType':this.props.index}
        requestData(url, param).then((json)=>{
            var list = this.props.isCurrent ? json['awards'] : json['content']
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            this.setState({
                awardA:list,
                dataSource:ds.cloneWithRows(list)
            })
        })
    }
    _renderHeader(){
        return <AwardHeader />
    }
    _renderCell(data){
        return <AwardCell data={data} {...this.props}/>
    }
    render(){
        return <ListView style={{flex:1}}
                         dataSource={this.state.dataSource}
                         renderRow={this._renderCell.bind(this)}
                         renderHeader={this._renderHeader.bind(this)}
                         enableEmptySections={true}>

        </ListView>
    }
}

export default class AwardListController extends Component {
    getNavTitle(index){
        var array = this.props.isCurrent ? ['本周奖品', '本月奖品', '年度奖品'] : ['上周获奖名单', '上月获奖名单', '上年获奖名单'];
        return array[index-1]
    }
    render(){
        var {index, isCurrent} = this.props;
        return <View>
            <NavigationBar title={{title:this.getNavTitle(index)}}
                           tintColor="#f7f7f8"
                           rightButton={{
                               title:'分享'
                           }}/>
            <Image style={{width:ScreenWidth, height:ScreenHeight-64}}
                   source={require('../../img/home/ranking_lg.png')}>
                <AwardList {...this.props}/>
            </Image>
        </View>
    }
}
