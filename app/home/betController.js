/**
 * Created by huibei on 17/2/28.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import PopupDialog, { SlideAnimation,DialogTitle } from 'react-native-popup-dialog'
import {guessGame} from '../util/NetUtil'
import Toast, {DURATION} from 'react-native-easy-toast'

const {width, height} = Dimensions.get('window')

class NumberItem extends Component{
    render(){
        var {text} = this.props
        return <TouchableOpacity style={[styles.center,{height:45,width:98,backgroundColor:'#f5f5f5',marginHorizontal:8,marginVertical:10,borderRadius:4,justifyContent:'center'}]}>
            <Text>{text}</Text>
        </TouchableOpacity>
    }
}

export default class betController extends Component{
    constructor(props){
        super(props)
        this.betamount = 0
    }

    _guessGame(){
        Keyboard.dismiss()
        let {stockGameId} = this.props.stock
        let cathecticAmount = 100
        let guessType = 0
        guessGame(stockGameId,cathecticAmount,guessType).then((response)=>{
            const status = response.status
            if(status == 200){
                this.popupDialog.openDialog()
            }
            else{
                let msg = response.message
                this.refs.toast.show(msg)
            }
        })
    }

    amountInputChange(text){
        this.betamount = text
    }

    render(){
        const {stock} = this.props;
        return <View style={{flex:1,backgroundColor:'gray'}}>
            <NavigationBar
                title={{title:'投注'}}
                tintColor="#f7f7f8"/>
            <View style={[styles.center,styles.container]}>
                <Text style={{paddingVertical:20,color:'white',fontSize:16}}>上证指数 20170301期 猜涨</Text>
                <View style={[styles.row,{alignItems:'center'}]}>
                    <Text>数额：</Text>
                    <TextInput
                        placeholder='请输入/选择数额'
                        style={styles.input}
                        keyboardType='number-pad'
                        onChangeText={this.amountInputChange.bind(this)}/>
                    <Text>喜腾币</Text>
                </View>
                <View style={[styles.row,{justifyContent:'space-around'}]}>
                    <NumberItem text="100"/>
                    <NumberItem text="1000"/>
                    <NumberItem text="10000"/>
                </View>
                <View style={[styles.row,{width:width-32,paddingVertical:10,justifyContent:'space-between'}]}>
                    <View style={styles.row}>
                        <Text>余额</Text>
                        <Text style={{paddingHorizontal:10}}>999</Text>
                        <TouchableOpacity>
                            <Text style={{color:'yellow'}}>全部投注</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text style={{color:'yellow'}}>获取喜腾币</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.center,{marginTop:30,backgroundColor:'yellow',height:45,width:160,justifyContent:'center',borderRadius:20}]}
                    onPress={this._guessGame.bind(this)}>
                    <Text style={{color:'black',fontSize:24}}>立即投注</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center',paddingBottom:15}}>
                <Text style={{fontSize:12}}>
                    【当前参考】猜涨赔率 0.09 猜跌赔率 9.29
                </Text>
            </View>
            <PopupDialog
                ref={(popupDialog) => { this.popupDialog = popupDialog }}
                dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }
                dialogTitle={<DialogTitle title="投注结果" />}

            >
                <View>
                    <Text>投注成功！</Text>
                </View>
            </PopupDialog>
            <Toast ref="toast"  position='bottom'/>
        </View>
    }
}

const styles = {
    container:{
        flex:1,
        alignItems:'center'
    },
    row:{
        flexDirection:'row',
    },
    input:{
        height:45,
        width:160,
        borderRadius:4,
        borderColor:'white',
        borderWidth:1,
        fontSize:13,
        textAlign:'center',
        color:'yellow'
    },
    center:{
        // justifyContent:'center',
        alignItems:'center'
    }
}