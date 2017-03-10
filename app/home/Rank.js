/**
 * Created by xiteng on 2017/2/28.
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
import ScrollableTabView from 'react-native-scrollable-tab-view';
import NavigationBar from 'react-native-navbar'
import {requestData} from '../util/NetUtil'
import AwardListController from './AwardListController'

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

const SelectView = React.createClass({
    propType: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array
    },
    render (){
        return <View style={{height:60}}>
                 <View style={SelectStyle.selectS}>
                     {this.props.tabs.map((tab, i)=> {
                      return <TouchableOpacity activeOpacity={1}
                                               style={SelectStyle.selectBtnS}
                                               onPress={()=> {
                                                 this.props.goToPage(i)
                                               }}
                                               key={tab}>

                                <Image style={{flexDirection: 'row',
                                               width: (ScreenWidth - 106) / 3,
                                               height: 35,
                                               justifyContent: 'center',
                                               borderRadius: 4}}
                                       source={this.props.activeTab == i ? require('../../img/home/ranking_Btn_s.png') : require('../../img/home/ranking_Btn_n.png')}>
                                   <Text style={SelectStyle.selectBtnText}>{tab}</Text>
                                </Image>
                             </TouchableOpacity>
                })}
                </View>
             </View>
    }
});
const SelectStyle = {
    selectS : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-between',
        height : 35,
        marginLeft : 12,
        marginRight : 12,
        alignItems : 'center',

    },
    selectBtnS : {
        flexDirection:'row',
        width : (ScreenWidth-106)/3,
        height : 35,
        borderRadius : 4,
        alignItems:'center'
    },
    selectBtnText : {
        fontSize : 15,
        borderRadius : 4,
        color : 'white',
        alignSelf : 'center',
        backgroundColor: 'rgba(233,233,233,0)'
    }
}

class Award extends Component {
    constructor(props){
        super(props)
        this.state = {
            awards:[]
        }
    }
    componentDidMount() {
        this.getAwardPic()
    }
    getAwardType(type) {
        if (type=='currentYear' || type=='preYear') {
            return 3
        }
        if (type=='currentMonth' || type=='preMonth') {
            return 2
        }
        if (type=='currentWeek' || type=='preWeek') {
            return 1
        }
    }
    getAwardPic(){

        var param = {
            'awardType': this.getAwardType(this.props.type)
        }
        requestData('award/list',param).then((json)=>{
            var list = json['awards']
            this.setState({
                awards:list
            })
        })
    }
    render(){
        if (this.state.awards.length) {
            var award = this.state.awards[0]
            return <View style={{height:155}}>
                     <TouchableOpacity style={AwardStyle.awardS}
                                       activeOpacity={1}
                                       onPress={()=>{
                                           this.props.onPress(this.getAwardType(this.props.type))
                                       }
                     }>
                       <Image style={AwardStyle.imgS}
                           source={{uri:award.picUrl}}>
                        <Text style={{backgroundColor:'rgba(211,211,211,0)', marginRight:10, marginBottom:10}}>更多</Text>
                       </Image>
                     </TouchableOpacity>
                  </View>
        }
        return null
    }
}
const AwardStyle = {
    awardS : {
        flexDirection :'row',
        marginLeft : 12,
        marginRight : 12,
        height :130,
        backgroundColor:'gray'
    },
    imgS : {
        flex :1,
        height : 130,
        borderRadius : 4,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    }
}

class RankCell extends Component {
    constructor(props){
        super(props)
        this.state = {
            winner:[require('../../img/home/winner-first.png'),
                    require('../../img/home/winner-second.png'),
                    require('../../img/home/winner-third.png')]
        }
    }
    render(){
        var data = this.props.data
        return <View style={{height:60}}>
                 <View style={RankCellStyle.mainS}>
                   <TouchableOpacity style={{flexDirection:'row',
                                             alignItems:'center',
                                             justifyContent:'center',
                                             width:36}}>
                    {data.ranking<=3?<Image style={RankCellStyle.rankS}
                                            source={data.ranking<=3?this.state.winner[data.ranking-1]:null}></Image>:<Text style={{fontSize:14, alignSelf:'center'}}>{data.ranking<=3?null:data.ranking}</Text>}
                   </TouchableOpacity>
                   <Image style={RankCellStyle.imgS}
                       source={{uri:data.iconUrl}}/>
                   <View style={RankCellStyle.rightS}>
                     <Text>{data.userName}</Text>
                     <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}>
                        <Image style={{width:7, height:10, marginRight:5}}
                               source={require('../../img/home/icon_xiteng_s.png')}/>
                        <Text style={{color:'rgba(247,41,41,1)', backgroundColor:'rgba(50,50,50,0)'}}>{data.bonusXtbAmount}</Text>
                     </TouchableOpacity>
                   </View>
                </View>
                <View style={{marginLeft:12, marginRight:12 ,height:0.5, backgroundColor:'rgba(231,231,231,1)'}} />
             </View>
    }
}
const RankCellStyle = {
    mainS : {
        flexDirection : 'row',
        backgroundColor : 'white',
        marginLeft : 12,
        marginRight : 12,
        alignItems : 'center',
        height:59.5
    },
    rankS :{
        width : 18,
        height:25,
        alignSelf:'center'
    },
    imgS : {
        alignSelf : 'center',
        marginLeft : 6,
        width : 40,
        height : 40,
        borderRadius : 4
    },
    rightS : {
        flex : 1,
        flexDirection : 'row',
        backgroundColor : 'white',
        justifyContent : 'space-between',
        marginLeft : 15,
        marginRight : 12
    }
}

class RankList extends Component {
    constructor(props){
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            rankA:[],
            dataSource : ds.cloneWithRows([])
        }

    }
    componentDidMount() {
        this.valueAssign()
    }
    valueAssign(){
        var param = {
            'pageNo':0,
            'size':20,
            'type':this.props.type
        }
        requestData('rakingList',param).then((json)=>{
            var list = json['content']
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            this.setState({
                rankA:list,
                dataSource:ds.cloneWithRows(list)
            })
        })
    }
    _renderCell(data){
        return <RankCell data={data}/>
    }
    _renderHeader(){
        return <Award {...this.props}/>
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

export default class RankController extends Component {
    _goToPreviousRank(){
        this.props.navigator.push({
            component:RankController,
            params:{index:0, isCurrent:false}
        })
    }
    _goToAwardList(index){
        this.props.navigator.push({
            component:AwardListController,
            params:{index:index, isCurrent:this.props.isCurrent}
        })
    }
    render(){
        const {index, isCurrent} = this.props;
        return <View>
            <NavigationBar title={{title:isCurrent?'股神争霸':'往期争霸'}}
                           tintColor="#f7f7f8"
                           rightButton={{title:isCurrent? '往期' : '',
                                         handler:()=>{
                                             this._goToPreviousRank()
                                         }
                }}/>
            <Image style={{width:ScreenWidth, height:ScreenHeight-64}}
                   source={require('../../img/home/ranking_lg.png')}>
                <ScrollableTabView initialPage={index}
                                   renderTabBar={() => <SelectView onPress={this._goToAwardList.bind(this)}/>}>
                    <RankList tabLabel={isCurrent?'年度排行':'上周排行'} type={isCurrent?'currentYear':'preWeek'} onPress={this._goToAwardList.bind(this)}></RankList>
                    <RankList tabLabel={isCurrent?'本月排行':'上月排行'} type={isCurrent?'currentMonth':'preMonth'} onPress={this._goToAwardList.bind(this)}></RankList>
                    <RankList tabLabel={isCurrent?'本周排行':'上年排行'} type={isCurrent?'currentWeek':'preYear'} onPress={this._goToAwardList.bind(this)}></RankList>
                </ScrollableTabView>
            </Image>
        </View>


    }
}