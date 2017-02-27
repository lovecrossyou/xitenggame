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
import {NavigationBarRouteMapper} from '../common/navigatorConfig'

var {width,height} = Dimensions.get('window')
const bannerHeight = 110

import {requestData} from '../util/NetUtil'
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
        return <View style={{backgroundColor:'#f5f5f5',borderRadius:4,marginHorizontal:15,marginBottom:20}}>
            <View style={[styles.center,{marginVertical:15}]}>
                <Text>上证指数</Text>
            </View>
            <View style={[styles.row,{justifyContent:'space-around',paddingHorizontal:20}]}>
                    <Text>3253.43</Text>
                    <Text>+2.06</Text>
                    <Text>0.06</Text>
            </View>
            <View style={[styles.row,{justifyContent:'space-around',paddingHorizontal:20}]}>
                <Image
                    style={{width:30,height:30}}
                    source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                />
                <Image
                    style={{width:30,height:30}}
                    source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                />
                <Image
                    style={{width:30,height:30}}
                    source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                />
            </View>
            <View style={[styles.row,{justifyContent:'space-between',paddingHorizontal:20,paddingVertical:10}]}>
                <View style={styles.row}>
                    <Image
                        style={{width:20,height:20}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                    <Text>4410</Text>
                </View>
                <View style={styles.row}>
                    <Image
                        style={{width:20,height:20}}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                    <Text>4410</Text>
                </View>
            </View>
            <View style={[styles.row,{justifyContent:'space-between',paddingHorizontal:20,paddingBottom:10}]}>
                <TouchableOpacity style={styles.btn}>
                    <Text>猜涨投注</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text>猜跌投注</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}


class StockRank extends Component{
    render(){
        return <View>
            <View style={[styles.row,{justifyContent:'space-between',alignItems:'center'}]}>
                <View>
                    <Text>股神争霸</Text>
                </View>
                <View style={[styles.row,{paddingRight:15,paddingVertical:10}]}>
                    <Text>本年排行</Text>
                    <Text>本月排行</Text>
                    <Text>本周排行</Text>
                </View>
            </View>
            <View>
                <ScrollView>
                    <Text>1</Text>
                    <Text>2</Text>
                    <Text>3</Text>
                    <Text>4</Text>
                    <Text>5</Text>
                </ScrollView>
            </View>
        </View>
    }
}

class RecentBet extends Component{
    render(){
        return  <Swiper
            style={styles.wrapper}
            height={bannerHeight}
            horizontal={false}
        >
            <View style={styles.slide1}>
                <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
                <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
                <Text style={styles.text}>And simple</Text>
            </View>
        </Swiper>
    }
}

class AnnualPrize extends Component{
    render(){
        return <Image source={{uri:'http://pic.58pic.com/58pic/16/62/63/97m58PICyWM_1024.jpg'}}
        style={{width:width,height:120,marginBottom:10}}/>
    }
}


class StockContent extends Component{
    render(){
        var stocklist = this.props.list.map((stock,index)=>{
            return <StockCell key={index}/>
        })
        return <View>
            {stocklist}
        </View>
    }
}


class Home extends Component{
    constructor(props){
        super(props)
        this.state = ({
            bannerlist:[],
            stocklist:[]
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
    }

    render(){
        return <ScrollView style={{flex:1,marginTop:64}}>
            <Banner list={this.state.bannerlist}/>
            <View style={styles.center}>
                <Text style={{paddingVertical:5}}>201702277期 02月27（周一）</Text>
                <Text style={{paddingVertical:5}}>截止投注：1天8时50分3秒</Text>
            </View>
            <StockContent list={this.state.stocklist}/>
            <RecentBet />
            <StockRank />
            <AnnualPrize />
        </ScrollView>
    }
}

export default class homeController extends Component{
    render(){
        return <Navigator
            initialRoute={{title: '喜腾', component:Home}}
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
        />
    }
}

var styles = {
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