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

var {width} = Dimensions.get('window')
class InputCell extends Component{
    render(){
        var {title,placeholder} = this.props
        return <View style={{marginTop: 20,flexDirection:'row',alignItems:'center',backgroundColor:'white'}}>
            <Text style={{fontSize:14,paddingLeft:10,width:60}}>{title}</Text>
            <View>
                <TextInput
                    placeholder={placeholder}
                    style={styles.input}
                />
            </View>
        </View>
    }
}


export default class LoginController extends Component {
    render() {
        return <View style={styles.container}>
            <View>
                <Image
                    style={styles.image}
                    source={{uri: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1502327020,2968128604&fm=116&gp=0.jpg'}}/>
                <InputCell style={{marginTop: 20}} title="用户名" placeholder="请输入用户名" />
                <InputCell style={{marginTop: 20,}} title="密码" placeholder="请输入密码"/>
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

                }}
                >
                    <Text>登陆</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.botContainer}>
                <View></View>
                <Text>或</Text>
                <View>
                    <Image />
                    <Text>微信快捷登陆</Text>
                </View>
            </View>
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
        justifyContent: 'space-between',
        bottom: 20
    },
    image: {
        width: 60,
        height: 60,
        marginTop: 20 + 64,
        alignSelf: 'center',
        borderRadius: 30
    }
}

