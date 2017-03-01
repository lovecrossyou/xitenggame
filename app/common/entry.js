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
import RootContainer from './tabController'
import {NavigationBarRouteMapper} from '../common/navigatorConfig'
import {connect} from "react-redux";

class Entry extends Component{
    render(){
        // 判断是否登录
        return <Navigator
            initialRoute={{
                title: '喜腾',
                component:RootContainer
            }}
            renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} {...this.props} {...route.params}/>
              }}
        />
    }
}

let mapStateToProps = (state)=>{
    var {shalongReducer} = state
    return {shalongReducer}
}
let  createContainer = (component)=>{
    return connect(mapStateToProps)(component);
}

export let Navigation = createContainer(Entry)