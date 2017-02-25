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
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper'

const bannerHeight = 90
class Banner extends Component{
    render(){
        return (
            <Swiper
                style={styles.wrapper}
                height={bannerHeight}
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
export default class homeController extends Component{
    render(){
        return <ScrollView style={{flex:1}}>
            <Banner></Banner>
            <View style={styles.center}>
                <Text style={{paddingVertical:5}}>201702277期 02月27（周一）</Text>
                <Text style={{paddingVertical:5}}>截止投注：1天8时50分3秒</Text>
            </View>
            <View>
                <StockCell />
                <StockCell />
            </View>
            <View>
                <RecentBet />
            </View>
        </ScrollView>
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
    slide1: {
        height:bannerHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        height:bannerHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        height:bannerHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
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