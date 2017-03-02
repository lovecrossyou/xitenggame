/**
 * Created by huibei on 17/2/28.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Navigator
} from 'react-native';
import {NavigationBarRouteMapper} from '../common/navigatorConfig'
import {connect} from "react-redux";
import LoginController from '../login/LoginController'
import {bindActionCreators} from "redux";
import {actions} from '../shalong/action/shalongAction'
import Splash from './Splash'
class Entry extends Component{
    render(){
        // 判断是否登录
        return <Navigator
            initialRoute={{
                title: '喜腾',
                component:Splash
            }}
            renderScene={(route, navigator) => {
                let Component = route.component
                return <Component {...route.params} navigator={navigator} {...this.props} {...route.params}/>
              }}
            configureScene={(route, routeStack) => {
                let Component = route.component
                if(Component == LoginController){
                   return Navigator.SceneConfigs.FloatFromBottom
                }
               return Navigator.SceneConfigs.FloatFromRight
            }}
        />
    }
}

let mapStateToProps = (state)=>{
    return {state}
}


let mapDispatchToProps = (dispatch)=>{
    return {
        actions:bindActionCreators(actions, dispatch)
    }
}

let  createContainer = (component)=>{
    return connect(mapStateToProps, mapDispatchToProps)(component);
}



export let Navigation = createContainer(Entry)