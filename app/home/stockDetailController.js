/**
 * Created by zhulizhe on 2017/3/7.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import NavigationBar from 'react-native-navbar'

let {width} = Dimensions.get('window')
export default class stockDetailController extends Component{

    _back(){
        this.props.navigator.pop()
    }

    render(){
        return <View style={{flex:1}}>
            <NavigationBar
                tintColor="#f7f7f8"
                leftButton={{
                    title:'返回',
                    handler:()=>{
                        this._back()
                    }
                }}/>
            <View style={{justifyContent:'space-between',flex:1}}>
                <ScrollView>
                    <View style={{backgroundColor:'#515151'}}>
                        <View style={[styles.row,{alignItems:'center',marginVertical:20,marginHorizontal:10}]}>
                            <Text style={[styles.textRed,{fontSize:20}]}>2916.04</Text>
                            <Text style={styles.textRed}>+2.89</Text>
                            <Text style={styles.textRed}>+0.09%</Text>
                        </View>
                        <View style={[styles.row,{justifyContent:'space-between',paddingHorizontal:10}]}>
                            <View style={styles.row}>
                                <Text>左收</Text>
                                <Text>2911.22</Text>
                            </View>
                            <View style={styles.row}>
                                <Text>最高</Text>
                                <Text>2911.22</Text>
                            </View>
                            <View style={styles.row}>
                                <Text>成交量</Text>
                                <Text>6.1亿</Text>
                            </View>
                        </View>
                        <View style={[styles.row,{justifyContent:'space-between',padding:10}]}>
                            <View style={styles.row}>
                                <Text>今开</Text>
                                <Text>2911.22</Text>
                            </View>
                            <View style={styles.row}>
                                <Text>最低</Text>
                                <Text>2911.22</Text>
                            </View>
                            <View style={styles.row}>
                                <Text>成交额</Text>
                                <Text>6.1亿</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.row,{paddingHorizontal:10},styles.center]}>
                        <TouchableOpacity style={[styles.item,styles.center]} focusedOpacity={0.8}>
                            <Text>分时</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.item,styles.center]}>
                            <Text>日K</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.item,styles.center]}>
                            <Text>周K</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.item,styles.center]}>
                            <Text>月K</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.center,{paddingHorizontal:10}]}>
                        <Text>上证指数 160815 开奖时间：08-15 15：30</Text>
                        <Text>截止投注： 15：30</Text>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Image />
                            <View style={{height:1,backgroundColor:'red'}}></View>
                            <View></View>
                        </View>
                        <View></View>
                        <View>
                            <Image />
                            <View style={{height:1,backgroundColor:'red'}}></View>
                            <View></View>
                        </View>
                    </View>
                </ScrollView>
                <View style={[styles.footer,styles.center,{justifyContent:'space-between',flexDirection:'row'}]}>
                    <TouchableOpacity style={[styles.btn,styles.center,{marginLeft:20}]}>
                        <Text style={styles.text}>猜涨投注</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,styles.center,{marginRight:20}]}>
                        <Text style={styles.text}>猜跌投注</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }
}


const styles = {
    row:{
      flexDirection:'row'
    },
    flex:{
      flex:1
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    footer:{
        height:60,
        backgroundColor:'gray'
    },
    btn:{
        height:40,
        width:140,
        borderRadius:20,
        backgroundColor:'red'
    },
    padding:{
        padding:10
    },
    text:{
        color:'white',
        fontSize:18
    },
    textRed:{
        color:'red',
    },
    textBlue:{
        color:'green'
    },
    textGray:{

    },
    item:{
        width:(width-10*2)/4,
        height:36,
        backgroundColor:'gray'
    }
}
