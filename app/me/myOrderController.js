/**
 * Created by wangyandan on 17/3/7.
 */
import React,{Component} from 'react';
import {AppRegistry,Text,Image,View,TouchableOpacity} from 'react-native';
import NavigationBar from 'react-native-navbar'
import {requestData} from '../util/NetUtil'


class OrderItem extends Component{
    render() {
        let {number,status,imageIcon}=this.props
        let pageHidden = number <= 0 ? true:false
        var {click}=this.props
        return <TouchableOpacity style={{alignItems:'center'}}
                onPress = {()=>{
                    click()
                }}
        >
            <Image style={{overflow:'visible',flexDirection:'row',width:26,height:26,justifyContent:'flex-end'}}
                   source={imageIcon}>
                <View style={styles.pageNo}>
                    <Text style={{color:'white',fontSize:10}}>{number}</Text>
                </View>
            </Image>
            <Text style={{color:'#333333',fontSize:14,marginTop:8}}>{status}</Text>
        </TouchableOpacity>
    }
}
class OrderType extends Component{

    render(){
        // let {
        //     firstNum,
        //     secondNum,
        //     thirdNum,
        //     status,
        //     firstStatus,
        //     secondStatus,
        //     thirdStatus,
        //     imageIcon,
        //     firstImage,
        //     secondImage,
        //     thirdImage,
        // } = this.props
        // if (status == '礼品订单'){
        //         firstStatus = '待发货',
        //         secondStatus='待收货',
        //         thirdStatus = '待晒单',
        //             imageIcon=require('../../img/order/me_order_gift.png'),
        //             firstImage=require('../../img/order/giftOrder1.png'),
        //             secondImage=require('../../img/order/me_daishouhuo.png'),
        //             thirdImage=require('../../img/order/me_daishaidan.png')
        // }else if (status == '夺宝订单'){
        //         firstStatus = '待揭晓',
        //         secondStatus='待领奖',
        //         thirdStatus = '待晒单',
        //     imageIcon= require('../../img/order/me_duobao.png'),
        //             firstImage=require('../../img/order/me_jinixngzhong.png'),
        //             secondImage=require('../../img/order/me_yijiexiao.png'),
        //             thirdImage=require('../../img/order/me_daishaidan.png')
        //
        // }else {
        //         firstStatus = '待领奖',
        //         secondStatus='待收货',
        //         thirdStatus = '待晒单',
        //     imageIcon= require('../../img/order/me_zhongjiangorder.png'),
        //             firstImage=require('../../img/order/me_yijiexiao.png'),
        //             secondImage=require('../../img/order/me_daishouhuo.png'),
        //             thirdImage=require('../../img/order/me_daishaidan.png')
        //
        // }
        var order = this.props.orderInfo
        alert(JSON.stringify(this.props.orderInfo))
        return <View style={{borderBottomColor:'#d0d0d0',borderBottomWidth:12}}>
            <View style={styles.typeTop}>
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:12}}>
                    <Image style={{width:20,height:20}} source={null}/>
                    <Text style={{color:'#4964ef',fontSize:14,marginLeft:10}}>{'1'}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginRight:12}}>
                    <Text style={{color:'#aaaaaa',fontSize:12}}>查看订单</Text>
                    <Image style={{width:8,height:12,marginLeft:8}} source={require('../../img/arrow_right.png')}/>
                </View>
            </View>
            <View style={styles.typeBotton}>
                <OrderItem number={order.presentWaitSendCount} status={'待送货'} imageIcon = {null}></OrderItem>
                <OrderItem number={'1'} status={'1'} imageIcon = {null}></OrderItem>
                <OrderItem number={'1'} status={'1'} imageIcon = {null}></OrderItem>
            </View>
        </View>
    }
}


export default class myOrderController extends Component{
    constructor(){
        super()
        this.state = {
            orderInfo:{
                //礼品订单待评价数量
                // presentWaitEvaluateCount:0,
                //礼品订单待收货数量
                // presentWaitReceiveCount:0,
                //礼品订单待发货数量
                // presentWaitSendCount:0,

                //夺宝订单待领奖数量
                // bidOrderWaitAcceptCount:0,
                //夺宝订单待晒单数量
                // bidOrderWaitEvaluateCount:0,
                //夺宝订单待揭晓数量
                // bidOrderWaitLotteryCount:0,

                //猜涨跌中奖订单待发货数量
                // stockWinOrderWaitSendCount:0,
                //猜涨跌中奖订单待收货数量
                // stockWinOrderWaitReceiveCount:0,
                //猜涨跌中奖订单待评价数量
                // stockWinOrderWaitEvaluateCount:0,
            }
        }
    }
    componentDidMount(){
        this._requestOrderInfo().then((infoM)=>{
             this.setState({
                 orderInfo:infoM
             })
        })
    }
    _requestOrderInfo(){
      let params = {
          version:'new'
      }
      return requestData("order/info",params)
    }

    render(){
        // alert(JSON.stringify(this.state.orderInfo))
        return <View>
            <NavigationBar
                title={{title:'订单'}}
                tintColor='#999999'
            />
                <OrderType style={styles.myOrder}  orderInfo={this.state.orderInfo} status='礼品订单'></OrderType>
                <OrderType style={styles.myOrder} orderInfo={this.state.orderInfo} status='夺宝订单'></OrderType>
                <OrderType style={styles.myOrder} orderInfo={this.state.orderInfo} status='中奖订单'></OrderType>
        </View>
    }
}

const styles = {
    myOrder:{
        height:144,
        marginTop:12
    },
       typeTop:{
          flexDirection:'row',
           height:44,
           alignItems:'center',
           justifyContent:'space-between',
           borderBottomColor:'#f5f5f5',
           borderBottomWidth:0.9
       },
       typeBotton:{
           flexDirection:'row',
           justifyContent:'space-around',
           height:100,
           alignItems:'center'
       },
    pageNo:{
        width:18,
        height:18,
        borderRadius:9,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'red' ,
        marginRight:-6,
        marginTop:-6
    }
}

