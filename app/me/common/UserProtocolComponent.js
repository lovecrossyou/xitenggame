/**
 * Created by zhulizhe on 2017/3/9.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';
import NavigationBar from 'react-native-navbar'

export default class UserProtocolComponent extends Component {
    constructor(){
        super()
        this.state= {
            isLoading:false
        }
    }

    render() {
        let mainView = (<WebView
            source={{uri: 'https://github.com/facebook/react-native'}}
            renderLoading={()=>{
                return (<View style={{flex:1,marginTop:80}}>
                        <Text>loading....</Text>
                    </View>)
            }}
        />)
        if(this.state.isLoading){
            mainView = (<View style={{marginTop:20,flex:1,justifyContent:'center',alignItems}}>
                <Text style={{color:'gray',fontSize:13}}>正在加载...</Text>
            </View>)
        }
        return <View style={{flex:1}}>
            <NavigationBar
                title={{title:'通用'}}
                tintColor="#f7f7f8"/>
            {mainView}
        </View>
    }
}