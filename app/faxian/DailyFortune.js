/**
 * Created by zhulizhe on 2017/3/9.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import ParallaxView from 'react-native-parallax-view'
import CellItem from '../common/component/CommonCell'
import FortuneDatePicker from './FortuneDatePicker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
// import Modal from 'react-native-modalbox';

var radio_props = [
    {label: '男', value: 0 },
    {label: '女', value: 1 }
];
class Header extends Component{
    render(){
        return <View style={{marginTop:60}}>
            <View style={{alignItems:'center',}}>
                <Image
                    style={{width: 45, height: 45,marginBottom:10}}
                    source={require('../../img/home/icon_xiteng_s.png')}/>
                <Text style={styles.text}>
                    Lovecross
                </Text>
            </View>
            <View style={[styles.row,{justifyContent:'space-around',paddingTop:20}]}>
                <View>
                    <Text style={styles.text}>
                        远程大吉大利会员
                    </Text>
                    <Text style={styles.text}>
                        剩余0天
                    </Text>
                </View>
                <View>
                    <Text style={styles.text}>
                        远程会员专区
                    </Text>
                </View>
            </View>
        </View>
    }
}

export default class DailyFortune extends Component{
    constructor(){
        super()
        this.state = {
            showPicker:false,
            sexvalue:0,
            birthday:'1987-05-12',
            fortuneday:'2017-05-12'
        }
    }

    _goAssets(){

    }

    onDateChange(){

    }
    onClose(){

    }
    onOpen(){
        alert(this.refs.pickermodal)
        //this.pickermodal.open()
    }
    render(){
        return <ParallaxView
            style={{flex:1,backgroundColor:'#f5f5f5'}}
            backgroundSource={require('../../img/me/betting-record_bg.png')}
            windowHeight={200}
            header={<Header />}>
            <View style={styles.row}>
                <CellItem title="性别" desc=""
                          hiddenArrow={true}
                          icon={require('../../img/me/me_icon_assets.png')}
                          click={this._goAssets.bind(this)} />
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={true}
                    onPress={(value) => {this.setState({sexvalue:value})}}
                />
            </View>
            <CellItem title="八字" desc={this.state.birthday}
                      icon={require('../../img/me/me_icon_assets.png')}
                      click={this.onOpen.bind(this)}
            />
            <CellItem title="运程日" desc={this.state.fortuneday}
                      icon={require('../../img/me/me_icon_assets.png')}
                      click={this.onOpen.bind(this)}
            />
            <View style={{alignItems:'center',marginTop:20}}>
                <Image
                    style={{width: 45, height: 45,marginBottom:10}}
                    source={require('../../img/home/icon_xiteng_s.png')}/>
                <TouchableOpacity >
                        <Text >立即测算</Text>
                </TouchableOpacity>
            </View>
            <FortuneDatePicker onDateChange={(date)=>{
                this.setState({
                    birthday:date
                })}}/>
        </ParallaxView>
    }
}


const styles = {
    row:{
        flexDirection:'row'
    },
    text:{
        color:'#fff'
    }
}