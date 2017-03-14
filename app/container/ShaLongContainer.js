/**
 * Created by zhulizhe on 2017/3/14.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {connect} from "react-redux";
import ShaLongController from '../shalong/shalongComponent'
import {bindActionCreators} from "redux";
import {actions} from '../shalong/action/shalongAction'

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

export let ShaLongContainer = createContainer(ShaLongController)

