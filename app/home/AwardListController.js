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
        return <View>
            <Text style={AwardHeaderStyle.descS}>{this.state.desc}</Text>
            <Text style={AwardHeaderStyle.claimS}>声明:所有商品活动与苹果公司(Apple Inc)无关</Text>
        </View>
    }
}
const AwardHeaderStyle = {
    descS : {
        marginTop:15,
        marginLeft:12,
        marginRight:12,
        color:'white',
        fontSize:13
    },
    claimS : {
        marginTop:5,
        marginLeft:12,
        marginBottom:5,
        color:'rgba(247,41,41,1)',
        fontSize:12.5
    }
}

class AwardCell extends Component{
    render(){
        var data = this.props.data
        return <View>
            <View style={AwardCellStyle.backS}>
                <Image style={AwardCellStyle.imgS}
                       source={{uri:data.picUrl}}/>
                <View style={{height:0.5, backgroundColor:'rgba(231,231,231,1)'}}></View>
                <View style={{height:55, justifyContent:'center'}}>
                    <Text style={{marginLeft:15, marginRight:15, fontSize:15, color:'rgba(51,51,51,1)'}}>{data.rankStr}:{data.name}</Text>
                </View>
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
        requestData('award/list', {'awardType':this.props.index}).then((json)=>{
            var list = json['awards']
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
        return <AwardCell data={data}/>
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
    render(){
        return <View>
            <NavigationBar title={{title:'奖品列表'}}
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
