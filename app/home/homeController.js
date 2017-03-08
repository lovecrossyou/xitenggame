/**
 * Created by zhulizhe on 2017/2/25.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    Navigator
} from 'react-native';
import Swiper from 'react-native-swiper'
import NavigationBar from 'react-native-navbar'
import RankCell from '../common/component/RankCell'
import betController from './betController'
import LoginController from '../login/LoginController'
import AutoScrollListView from '../common/component/AutoScrollListView'
import RankController from './Rank'

import RootContainer from '../common/tabController'
import {requestData,getRecentBetList} from '../util/NetUtil'
import {dateRemainByNow} from '../util/DateUtil'
var {width,height} = Dimensions.get('window')
const bannerHeight = 110
class Banner extends Component{
    render(){
        var banners = this.props.list.map((data,index)=>{
            return <Image
                style={styles.slide}
                key={index}
                source={{uri:data.picUrl}}/>
        })
        return (
            <Swiper
                style={styles.wrapper}
                height={bannerHeight}
            >
                {banners}
            </Swiper>
        )
    }
}

class StockCell extends Component{
    render(){
        var {guessUp,guessDown,stock} = this.props
        return <View style={{backgroundColor:'#f5f5f5',borderRadius:4,marginHorizontal:15,marginBottom:20}}>
            <View style={[styles.center,{marginVertical:15}]}>
                <Text>{stock.stockGameName}</Text>
            </View>
            <View style={[styles.row,{justifyContent:'space-around',paddingHorizontal:20,paddingVertical:10}]}>
                    <Text>{stock.stockModel.currentPoint}</Text>
                    <Text>{stock.stockModel.chg}</Text>
                    <Text>{stock.stockModel.changeRate}</Text>
            </View>
            <View style={[styles.row,{justifyContent:'space-around',paddingHorizontal:20}]}>
                <Image
                    style={{width:40,height:32}}
                    source={require('../../img/home/icon_cow.png')}
                />
                <Image
                    style={{width:30,height:18}}
                    source={require('../../img/home/PK.png')}
                />
                <Image
                    style={{width:23,height:35}}
                    source={require('../../img/home/icon_bear.png')}
                />
            </View>
            <View style={[styles.row,{justifyContent:'space-between',paddingHorizontal:20,paddingVertical:10}]}>
                <View style={styles.row}>
                    <Image
                        style={{width:14,height:17}}
                        source={require('../../img/home/home-red-flag.png')}
                    />
                    <Text style={{paddingHorizontal:6}}>{stock.guessUpXtBAmount}</Text>
                </View>
                <View style={styles.row}>
                    <Image
                        style={{width:14,height:17}}
                        source={require('../../img/home/home-green-flag.png')}
                    />
                    <Text style={{paddingHorizontal:6}}>{stock.guessDownXtBAmount}</Text>
                </View>
            </View>
            <View style={[styles.row,{justifyContent:'space-between',paddingHorizontal:20,paddingBottom:10}]}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{
                        guessUp(stock)}
                    }>
                    <Text>猜涨投注</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{
                        console.log('xxxx')
                        guessDown(stock)
                    }}>
                    <Text>猜跌投注</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}


class StockRank extends Component{
    render(){
        var ranklist = this.props.list.map((rank,index)=>{
            return <RankCell key={index} rank={rank}/>
        })
        return <View>
            <View style={[styles.row,{justifyContent:'space-between',alignItems:'center'}]}>
                <View>
                    <Text style={{padding:10}}>股神争霸</Text>
                </View>
                <View style={[styles.row,{paddingRight:15,paddingVertical:10}]}>
                    <TouchableOpacity activeOpacity={1}
                                      onPress={()=>{
                        this.props.onPress(0)
                    }}>
                        <Text>本年排行</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1}
                                      onPress={()=>{
                        this.props.onPress(1)
                    }}>
                        <Text style={{paddingHorizontal:10}}>本月排行</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1}
                                      onPress={()=>{
                        this.props.onPress(2)
                    }}>
                        <Text>本周排行</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View>
                <ScrollView>
                    {ranklist}
                </ScrollView>
            </View>
        </View>
    }
}


class RecentBet extends Component{
    render(){
        return  <AutoScrollListView
            style={styles.wrapper}
            height={bannerHeight}
            {...this.props}
        />
    }
}

class AnnualPrize extends Component{
    render(){
        var {awards} = this.props
        if(awards.length){
            var award = awards[0]
            return <Image
                source={{uri:award.picUrl}}
                style={{width:width,height:120,marginBottom:10}}/>
        }
        return null
    }
}


class StockContent extends Component{
    render(){
        var stocklist = this.props.list.map((stock,index)=>{
            return <StockCell key={index} stock={stock} {...this.props}/>
        })
        return <View>
            {stocklist}
        </View>
    }
}


class EndTimeView extends Component{
    constructor(){
        super()
        this.gameEndTime = new Date().toTimeString()
        this.state = {
            remainTime:''
        }
    }
    componentDidMount() {
        this.timer = setInterval(()=>{
            let timeStr = dateRemainByNow(this.gameEndTime)
            this.setState({
                remainTime:timeStr
            })
        },1000)
    }

    componentWillUnMount() {
        this.timer && clearTimeout(this.timer)
    }

    render(){
        var stocklist = this.props.list
        if(stocklist.length){
            var stockM = stocklist[0]
            this.gameEndTime = stockM.gameEndTime
            return <View style={styles.center}>
                <Text style={{paddingVertical:5}}>{`${stockM.stage} ${stockM.tradeDay}`}</Text>
                <Text style={{paddingVertical:5}}>截止投注：{this.state.remainTime}</Text>
            </View>
        }
        return null
    }
}


export default class HomeController extends Component{
    constructor(props){
        super(props)
        this.state = ({
            bannerlist:[],
            stocklist:[],
            rakingList:[],
            awards:[],
            recentBet:[]
        })
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData() {
        //banner data
        var param = {
            activityCategory:'home'
        }
        requestData('activity/list',param).then((json)=>{
            var list = json['content']
            this.setState({
                bannerlist:list
            })
        })
        //stock data pageNo
        param = {
            'pageNo':0,
            'size':5
        }
        requestData('stockGameList',param).then((json)=>{
            var list = json['content']
            this.setState({
                stocklist:list
            })
        })
        //anuual rank
        param = {
            'pageNo':0,
            'size':3,
            'type':'currentYear'
        }
        requestData('rakingList',param).then((json)=>{
            var list = json['content']
            this.setState({
                rakingList:list
            })
        })

        //getRecentBetList
        getRecentBetList(0,20).then((data)=>{
            var list = data["content"]
            this.setState({
                recentBet:list
            })
        })

        //footer peize logo
        param = {
            'awardType':3
        }
        requestData('award/list',param).then((json)=>{
            var list = json['awards']
            this.setState({
                awards:list
            })
        })
    }
    _guessUp(stock){
        this.props.navigator.push({
            component:betController,
            title:'投注',
            params:{stock:stock}
        })
    }
    _guessDown(stock){
        this.props.navigator.push({
            component:betController,
            title:'投注',
            params:{stock:stock}
        })
    }

    _login(){
        RootContainer.switchToLoginView()
    }

    _goToRank(index){
        this.props.navigator.push({
            component:RankController,
            params:{index:index, isCurrent:true}
        })
    }
    render(){
        return <View style={{flex:1}}>
            <NavigationBar
                title={{title:'喜腾'}}
                tintColor="#f7f7f8"
                rightButton={{
                    title:'登录',
                    handler:()=>{
                        this._login()
                    }
                }}/>
            <ScrollView>
                <Banner list={this.state.bannerlist}/>
                <EndTimeView list={this.state.stocklist}/>
                <StockContent
                    list={this.state.stocklist}
                    guessUp={this._guessUp.bind(this)}
                    guessDown={this._guessDown.bind(this)}/>
                {/*<RecentBet list={this.state.recentBet}/>*/}
                <StockRank list={this.state.rakingList} onPress={this._goToRank.bind(this)}/>
                <AnnualPrize awards={this.state.awards}/>
            </ScrollView>
        </View>
    }
}


var styles = {
    flex:{
        flex:1
    },
    wrapper: {
        marginBottom:10
    },
    row:{
      flexDirection:'row'
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide: {
        height:bannerHeight,
        width:width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'center'
    },
    btn:{
        width:110,
        height:30,
        backgroundColor:'yellow',
        borderRadius:15,
        justifyContent: 'center',
        alignItems: 'center'
    }
}