/**
 * Created by huibei on 17/2/27.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    PixelRatio,
    Image
} from 'react-native';

export default class RankCell extends Component{
    render(){
        var {rank} = this.props
        // alert(JSON.stringify(rank))
        return <View style={[styles.row,{justifyContent:'space-between',alignItems:'center',padding:10}]}>
            <View style={[styles.row,{alignItems:'center'}]}>
                <Text style={{paddingHorizontal:10}}>{rank.ranking}</Text>
                <Image
                    style={{width:30,height:30,padding:10}}
                    source={{uri:rank.iconUrl}}/>
                <Text style={{paddingHorizontal:10}}>{rank.userName}</Text>
            </View>
            <View style={[styles.row,{alignItems:'center'}]}>
                <Image
                    style={{padding:10,width:7,height:9}}
                    source={require('../../../img/home/s-currency-gray.png')}/>
                <Text>{rank.bonusXtbAmount}</Text>
            </View>
        </View>
    }
}

var styles = {
    wrapper: {
        marginBottom:10
    },
    row:{
        flexDirection:'row'
    }
}