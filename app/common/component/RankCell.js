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
    Image,
    TouchableOpacity
} from 'react-native';

export default class RankCell extends Component{
    render(){
        var {rank,onPress} = this.props
        return <TouchableOpacity
            style={[styles.row,{justifyContent:'space-between',alignItems:'center',padding:10}]}
            onPress={()=>{
                onPress(0)
            }}>
            <View style={[styles.row,{alignItems:'center'}]}>
                <Text style={{paddingHorizontal:10}}>{rank.ranking}</Text>
                <Image
                    style={{width:30,height:30,padding:10}}
                    source={{uri:rank.iconUrl}}/>
                <Text style={{paddingHorizontal:10}}>{rank.userName}</Text>
            </View>
            <View style={[styles.row,{alignItems:'center'}]}>
                <Image
                    style={{width: 10, height: 13, marginRight: 4}}
                    source={require('../../../img/home/icon_xiteng_s.png')}/>
                <Text>{rank.bonusXtbAmount}</Text>
            </View>
        </TouchableOpacity>
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