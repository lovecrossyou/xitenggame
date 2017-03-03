/**
 * Created by CrossZhu@huipay on 2017/2/11.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    AppRegistry,
    Image,
    TextInput,
    TouchableOpacity,
    PixelRatio,
    Dimensions
} from 'react-native'
import {wechatlogin,WechatAppID,login} from '../util/NetUtil'
import * as WeChat from 'react-native-wechat'
import Toast, {DURATION} from 'react-native-easy-toast'

const {width} = Dimensions.get('window')
import  User from '../model/User'

class InputCell extends Component{
    render(){
        var {title,placeholder,callback,keyboardType} = this.props
        return <View style={{marginTop: 20,flexDirection:'row',alignItems:'center',backgroundColor:'white'}}>
            <Text style={{fontSize:14,paddingLeft:10,width:60}}>{title}</Text>
            <View>
                <TextInput
                    placeholder={placeholder}
                    style={styles.input}
                    onChangeText={(text)=>{
                        callback(text)
                    }}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    }
}


export default class LoginController extends Component {

    constructor(){
        super()
        this.userName = ''
        this.passsword = ''
    }

    componentDidMount (){
        WeChat.registerApp(WechatAppID)
    }

    _setUserName(text){
        this.userName = text
    }

    _setPassword(text){
        this.passsword = text
    }

    _sendWeChatRequest(){

    }

    _login(){
        var Realm = require('realm')
        let userName = this.userName
        let passsword = this.passsword
        login(userName,passsword).then((d)=>{
            let access_token_secret = d['access_token_secret']
            let access_token = d['access_token']
            let realm = new Realm({schema: [User]})
            let users = realm.objects('User')
            if(users && users.length!=0){
            }
            else{
                //首次登陆
                realm.write(()=>{
                    realm.create('User',{
                        phone:userName,
                        online:true,
                        access_token:access_token,
                        access_token_secret:access_token_secret,
                    })
                })
            }
            this._pop()
        })
    }

    _pop(){
        this.refs.toast.show('登陆成功！')
        setTimeout(()=>{
            this.props.navigator.pop()
        },1000)
    }

    _loginWeChat(){
        wechatlogin().then((result)=>{
            var {response, bindInfo,wechatinfo} = result
            var {headimgurl,nickname,sex} = wechatinfo
            var {access_token,access_token_secret} = response
            const status = bindInfo.statue
            const phoneNum = bindInfo.phoneNum
            const xtNumber = bindInfo.xtNumber
            if(status=='in_bind'){
                //已绑定手机号 保存用户信息
                let realm = new Realm({schema: [User]})
                realm.write(()=>{
                    let user = realm.create('User',{
                        phone:phoneNum,
                        picture:headimgurl,
                        nickname:nickname,
                        xtnumber:xtNumber,
                        sex:sex+'',
                        online:true,
                        access_token:access_token,
                        access_token_secret:access_token_secret
                    })
                })
            }
            else{
                //弹出绑定手机号

            }
        })
    }

    render() {
        return <View style={styles.container}>
            <View>
                <Image
                    style={styles.image}
                    source={{uri: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1502327020,2968128604&fm=116&gp=0.jpg'}}/>
                <InputCell keyboardType="phone-pad" callback={this._setUserName.bind(this)} style={{marginTop: 20}} title="用户名" placeholder="请输入用户名" />
                <InputCell keyboardType="default" callback={this._setPassword.bind(this)} style={{marginTop: 20,}} title="密码" placeholder="请输入密码"/>
                <TouchableOpacity
                    style={{
                    alignItems: 'center',
                    borderRadius: 4,
                    marginTop: 20,
                    marginHorizontal: 10,
                    backgroundColor: '#63B8FF',
                    height: 40,
                    justifyContent: 'center'
                }}
                    onPress={()=>{
                        this._login()
                }}
                >
                    <Text>登陆</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.botContainer}>
                <TouchableOpacity onPress={this._loginWeChat.bind(this)}>
                    <Image
                        style={styles.share}
                        source={require('../../img/share/share_btn_wechat.png')}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={styles.share}
                        source={require('../../img/share/share_btn_weibo.png')}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={styles.share}
                        source={require('../../img/share/share_btn_qq.png')}/>
                </TouchableOpacity>
            </View>
            <Toast ref="toast"  position='top'/>
        </View>
    }
}


const styles = {
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4'
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        width:width*0.8
    },
    botContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        bottom: 32
    },
    image: {
        width: 60,
        height: 60,
        marginTop: 20 + 64,
        alignSelf: 'center',
        borderRadius: 30
    },
    share:{
        width:44,
        height:44
    }
}

