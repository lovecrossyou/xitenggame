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
import SGListView from 'react-native-sglistview'
import NavigationBar from 'react-native-navbar'
import ShalongCell from '../common/component/ShalongCell'

import {requestData} from '../util/NetUtil'

let {width} = Dimensions.get('window')
export default class stockDetailController extends Component{
    constructor(){
        super()
        this.state = {
            imgUrl:undefined,
            commentlist:[]
        }
    }

    componentDidMount(){
        let {stockModel,stockGameName,stockGameId} = this.props.stock
        let {dayImg,weekImg,monthImg,minImg} = stockModel
        this.setState({
            imgUrl:minImg,
        })
        this._requestCommentList('stockGame',stockGameId,0,10).then((list)=>{
            this.setState({
                commentlist:list['content']
            })
        })
    }

    _requestCommentList(commentType,gameId,pageNo,pageSize){
        let params = {
            commentTypeId:gameId,
            pageNo:pageNo,
            size:pageSize,
            commentType:commentType
        }
        return requestData('commentList',params)
    }

    _back(){
        this.props.navigator.pop()
    }

    render(){
        let {stockModel,stockGameName} = this.props.stock
        let {dayImg,weekImg,monthImg,minImg,yesterDayClosed,nowPrice,todayMaxPrice,todayMinPrice,turnoverStockAmount,turnoverStockMoney,currentPoint,changeRate,chg,} = stockModel
        let commentlist = this.state.commentlist.map((comment,index)=>{
            return <ShalongCell data={comment} key={index}/>
        })
        return <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
            <NavigationBar
                tintColor="#f7f7f8"
                title={{title:stockGameName}}
                leftButton={{
                    title:'返回',
                    handler:()=>{
                        this._back()
                    }
                }}/>
            <View style={{justifyContent:'space-between',flex:1}}>
                <ScrollView>
                    <View style={{backgroundColor:'rgba(27,26,32,1)'}}>
                        <View style={[styles.row,{alignItems:'center',marginVertical:20,marginHorizontal:10}]}>
                            <Text style={[styles.textRed,{fontSize:20}]}>2916.04</Text>
                            <Text style={styles.textRed}>{currentPoint}</Text>
                            <Text style={styles.textRed}>{changeRate}</Text>
                        </View>
                        <View style={[styles.row,{justifyContent:'space-between',paddingHorizontal:10}]}>
                            <View style={styles.row}>
                                <Text style={styles.textGray}>昨收</Text>
                                <Text style={styles.textWhite}>{yesterDayClosed}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.textGray}>最高</Text>
                                <Text  style={styles.textRed}>{todayMaxPrice}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.textGray}>成交量</Text>
                                <Text style={styles.textWhite}>{turnoverStockAmount}</Text>
                            </View>
                        </View>
                        <View style={[styles.row,{justifyContent:'space-between',padding:10}]}>
                            <View style={styles.row}>
                                <Text style={styles.textGray}>今开</Text>
                                <Text style={styles.textWhite}>{nowPrice}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.textGray}>最低</Text>
                                <Text style={styles.textBlue}>{todayMinPrice}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.textGray}>成交额</Text>
                                <Text style={styles.textWhite}>{turnoverStockMoney}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{backgroundColor:'rgba(27,26,32,1)'}}>
                        <View style={[styles.row,{paddingHorizontal:10,backgroundColor:'black'},styles.center]}>
                            <TouchableOpacity
                                style={[styles.item,styles.center]} focusedOpacity={0.8}
                                onPress={()=>{
                                this.setState({
                                    imgUrl:minImg
                                })
                            }}
                            >
                                <Text>分时</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.item,styles.center]}
                                onPress={()=>{
                                this.setState({
                                    imgUrl:dayImg
                                })
                            }}>
                                <Text>日K</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.item,styles.center]}
                                onPress={()=>{
                                this.setState({
                                    imgUrl:weekImg
                                })
                            }}>
                                <Text>周K</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.item,styles.center]}
                                onPress={()=>{
                                this.setState({
                                    imgUrl:monthImg
                                })
                            }}>
                                <Text>月K</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginHorizontal:10}}>
                            <Image
                                style={{height:200}}
                                source={{uri:this.state.imgUrl}}
                            />
                        </View>
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
                    {commentlist}
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
        color:'gray'
    },
    textWhite:{
        color:'white'
    },
    item:{
        width:(width-10*2)/4,
        height:36,
        backgroundColor:'gray'
    }
}
