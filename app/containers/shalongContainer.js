/**
 * Created by zhulizhe on 2017/2/27.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';
import {connect} from 'react-redux';
import shalongController from '../shalong/shalongComponent'

export default connect((state)=>{
    const {ShaLongReducer} = state
    return ShaLongReducer
})(shalongController)
