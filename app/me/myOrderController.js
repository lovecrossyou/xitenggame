/**
 * Created by wangyandan on 17/3/7.
 */
import React,{Component} from 'react';
import {AppRegistry,Text,Image,View,TouchableOpacity} from 'react-native';
import NavigationBar from 'react-native-navbar'
import {requestData} from '../util/NetUtil'
import OrderListController from './OrderListController'

class OrderItem extends Component{
    render() {
        let {number,status,imageIcon}=this.props
        // var {click} = this.props.click
        return <TouchableOpacity style={{alignItems:'center'}}
                onPress = {()=>{
                    this.props.click()
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

    constructor(props){
        super(props)
        this.state={
            orderInfo:{}
        }
    }
    componentDidMount(){
        this.getOrderInfo()
    }
    getOrderInfo(){
        requestData("order/info",{'version':'new'}).then((json)=>{
            var order = json
            this.setState({
                orderInfo:order
            })
        })
    }

    render(){
        var order = this.state.orderInfo

        let {
            firstNum,
            secondNum,
            thirdNum,
            status,
            firstStatus,
            secondStatus,
            thirdStatus,
            imageIcon,
            firstImage,
            secondImage,
            thirdImage,
        } = this.props
        if (status == '礼品订单'){
            firstStatus = '待发货',
                secondStatus='待收货',
                thirdStatus = '待晒单',
                imageIcon=require('../../img/order/me_order_gift.png'),
                firstImage=require('../../img/order/giftOrder1.png'),
                secondImage=require('../../img/order/me_daishouhuo.png'),
                thirdImage=require('../../img/order/me_daishaidan.png'),
                firstNum = order.presentWaitEvaluateCount,
                secondNum = order.presentWaitReceiveCount,
                thirdNum = order.presentWaitSendCount
        }else if (status == '夺宝订单'){
            firstStatus = '待揭晓',
                secondStatus='待领奖',
                thirdStatus = '待晒单',
                imageIcon= require('../../img/order/me_duobao.png'),
                firstImage=require('../../img/order/me_jinixngzhong.png'),
                secondImage=require('../../img/order/me_yijiexiao.png'),
                thirdImage=require('../../img/order/me_daishaidan.png'),
                firstNum = order.bidOrderWaitAcceptCount,
                secondNum = order.bidOrderWaitEvaluateCount,
                thirdNum = order.bidOrderWaitLotteryCount

        }else {
            firstStatus = '待领奖',
                secondStatus='待收货',
                thirdStatus = '待晒单',
                imageIcon= require('../../img/order/me_zhongjiangorder.png'),
                firstImage=require('../../img/order/me_yijiexiao.png'),
                secondImage=require('../../img/order/me_daishouhuo.png'),
                thirdImage=require('../../img/order/me_daishaidan.png'),
                firstNum = order.stockWinOrderWaitSendCount,
                secondNum = order.stockWinOrderWaitReceiveCount,
                thirdNum = order.stockWinOrderWaitEvaluateCount

        }
        return <View style={{borderBottomColor:'#d0d0d0',borderBottomWidth:12}}>
            <View style={styles.typeTop}>
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:12}}>
                    <Image style={{width:20,height:20}} source={imageIcon}/>
                    <Text style={{color:'#4964ef',fontSize:14,marginLeft:10}}>{status}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginRight:12}}>
                    <Text style={{color:'#aaaaaa',fontSize:12}}>查看订单</Text>
                    <Image style={{width:8,height:12,marginLeft:8}} source={require('../../img/arrow_right.png')}/>
                </View>
            </View>
            <View style={styles.typeBotton}>
                <OrderItem number={firstNum} status = {firstStatus}  imageIcon={firstImage} click={this.props.click}></OrderItem>
                <OrderItem number={secondNum} status = {secondStatus}  imageIcon={secondImage} click={this.props.click}></OrderItem>
                <OrderItem number={thirdNum} status = {thirdStatus}  imageIcon={thirdImage} click={this.props.click}></OrderItem>
            </View>
        </View>
    }
}


export default class myOrderController extends Component{
    _goToOrderList(){
        this.props.navigator.push({
            component:OrderListController
        })
    }
    render(){
        return <View>
            <NavigationBar
                title={{title:'订单'}}
                tintColor='#999999'
            />
                <OrderType style={styles.myOrder} status='礼品订单' click={this._goToOrderList.bind(this)}></OrderType>
                <OrderType style={styles.myOrder} status='夺宝订单' click={this._goToOrderList.bind(this)}></OrderType>
                <OrderType style={styles.myOrder} status='中奖订单' click={this._goToOrderList.bind(this)}></OrderType>
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

