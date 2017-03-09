/**
 * Created by zhulizhe on 2017/3/7.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    Dimensions
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import ParallaxView from 'react-native-parallax-view'
import {requestData} from '../util/NetUtil'

let {width} = Dimensions.get('window')
class BetCell extends Component{
    render(){
        let {finalResult,guessResultAmount,guessAmount,guessTime,stockName,guessType,stage} = this.props.record
        return <View style={{backgroundColor:'#F0FFFF',padding:20,marginHorizontal:15,marginVertical:7}}>
            <View style={[styles.row,styles.between]}>
                <View style={[styles.row,styles.center]}>
                    <Text>投注时间：{guessTime}</Text>
                    <Text>未收盘</Text>
                </View>
                <Image
                    style={{width:14,height:14,alignSelf:'center'}}
                    source={require('../../img/me/icon_likes_d.png')}
                />
            </View>
            <View style={[styles.row,styles.between,styles.padding]}>
                <View style={styles.row}>
                    <Text>名称：</Text>
                    <Text>{stockName}</Text>
                </View>
                <Text>{stage}期</Text>
            </View>
            <View style={[styles.row,styles.between,styles.padding]}>
                <View style={styles.row}>
                    <Text>投注：</Text>
                    <Text>{guessType}</Text>
                </View>
                <Text>数额</Text>
                <Text>{guessAmount}</Text>
            </View>
            <View style={[styles.row,styles.between,styles.padding]}>
                <View style={styles.row}>
                    <Text>收盘：</Text>
                    <Text>{finalResult}</Text>
                </View>
                <Text>盈亏</Text>
                <Text>{guessResultAmount}</Text>
            </View>
        </View>
    }
}

class BetHeader extends Component{
    constructor(props){
        super(props)
        this.state = {
            userInfo:{
                cumulativeBetAmount:0,
                yields:0,
                addGuessAmount:0,
                hitRate:0,
                hitAmount:0,
                defeatPersonAMount:0,
                addProfit:0,
                serialAmount:0,
            }
        }
    }

    componentDidMount(){
        requestData('getGuessWithStockStatistics',{}).then((datas)=>{
            this.setState({
                userInfo:datas
            })
            // alert(JSON.stringify(datas))
        })
    }

    render(){
        let {
            cumulativeBetAmount,
            yields,
            addGuessAmount,
            hitRate,
            hitAmount,
            defeatPersonAMount,
            addProfit,
            serialAmount
        }= this.state.userInfo
        return <View>
            <View style={{marginTop:40}}>
                <Image
                    style={{width:30,height:30,alignSelf:'center'}}
                    source={require('../../img/me/icon_hit_rate.png')}
                />
                <View style={[styles.row,{justifyContent:'space-around',marginTop:20}]}>
                    <View>
                        <View style={[styles.row]}>
                            <Text style={styles.text}>{cumulativeBetAmount}</Text>
                            <Text style={styles.text}>喜腾币</Text>
                        </View>
                        <View style={styles.center}>
                            <Text style={styles.text}>投注金额</Text>
                        </View>
                    </View>
                    <View>
                        <View style={[styles.row]}>
                            <Text style={styles.text}>{addProfit}</Text>
                            <Text style={styles.text}>喜腾币</Text>
                        </View>
                        <View style={styles.center}>
                            <Text style={styles.text}>投注盈利</Text>
                        </View>
                    </View>
                    <View>
                        <View style={[styles.row]}>
                            <Text style={styles.text}>{yields}</Text>
                            <Text style={styles.text}>喜腾币</Text>
                        </View>
                        <View style={styles.center}>
                            <Text style={styles.text}>收益率</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.center,{marginHorizontal:10,paddingVertical:15}]}>
                <Image
                    style={{height:1}}
                    source={require('../../img/me/line_yellow.png')}/>
            </View>
            <View>
                <Image
                    style={{width:30,height:30,alignSelf:'center'}}
                    source={require('../../img/me/icon_yield.png')}
                />
                <View style={[styles.row,{justifyContent:'space-around',marginTop:20}]}>
                    <View>
                        <View style={[styles.row,styles.center]}>
                            <Text style={styles.text}>{addGuessAmount}</Text>
                        </View>
                        <View style={styles.center}>
                            <Text style={styles.text}>投注次数</Text>
                        </View>
                    </View>
                    <View style={styles.center}>
                        <View style={[styles.row]}>
                            <Text style={styles.text}>{hitAmount}</Text>
                        </View>
                        <View style={styles.center}>
                            <Text style={styles.text}>猜中次数</Text>
                        </View>
                    </View>
                    <View style={styles.center}>
                        <View style={[styles.row]}>
                            <Text style={styles.text}>{hitRate}</Text>
                        </View>
                        <View style={styles.center}>
                            <Text style={styles.text}>猜中率</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    }
}


export default class BetRecordController extends Component{
    constructor(props){
        super(props)
        this.datalist = []
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: this.ds.cloneWithRows([]),
            isLoading:true,
            userInfo:{
                cumulativeBetAmount:0,
                yields:0,
                addGuessAmount:0,
                hitRate:0,
                hitAmount:0,
                defeatPersonAMount:0,
                addProfit:0,
                serialAmount:0,
            }
        }
    }

    _renderCell(record){
        return <BetCell record={record}/>
    }

    componentDidMount() {
        //投注记录数据
        this._requestRecordList(0).then((listModel)=>{
            let list = listModel['content']
            this.setState({
                dataSource:this.ds.cloneWithRows(list),
                isLoading:false
            })
        })
    }

    _requestRecordList(pageNo){
        let params = {
            "pageNo":pageNo,
            "size":20,
            "sortProperties":["time"],
            "direction":'DESC'
        }
        return requestData('getWithStockList',params)
    }

    _loadMore(){

    }

    render(){
        let mainView = (
            <ListView
                ref={(scroll)=>this.scrollV = scroll}
                style={{backgroundColor:'#F7F7F7'}}
                dataSource={this.state.dataSource }
                renderRow={this._renderCell.bind(this)}
                onEndReached={this._loadMore.bind(this)}
                onEndReachedThreshold={10}
                removeClippedSubviews={true}
                enableEmptySections={true}>
            </ListView>
        )
        if(this.state.isLoading){
            mainView = (<View style={[styles.flex,styles.center,{marginTop:20}]}>
                <Text style={{color:'gray',fontSize:13}}>正在加载...</Text>
            </View>)
        }
        return <ParallaxView
            style={{flex:1}}
            backgroundSource={require('../../img/me/betting-record_bg.png')}
            windowHeight={200+30+30}
            header={<BetHeader />}
        >
            {mainView}
        </ParallaxView>
    }
}


const styles = {
    flex:{
      flex:1
    },
    row:{
        flexDirection:'row'
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    between:{
        justifyContent:'space-between'
    },
    around:{
        justifyContent:'space-around'
    },
    text:{
        color:'#ffe300'
    },
    padding:{
        paddingTop:6
    }
}