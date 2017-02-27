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
    TouchableOpacity,
    Image
} from 'react-native';

export default class CellItem extends Component{
    render(){
        var {title,desc,click,icon,marginBot}  = this.props
        return <TouchableOpacity
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                borderBottomWidth:1/PixelRatio.get(),
                borderBottomColor:'#f5f5f5',
                backgroundColor:'white',
                marginBottom:marginBot,
                marginHorizontal:10,
                height:50
                }}
            onPress={click}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image
                    style={[styles.cell_img]}
                    source={icon}/>
                <Text style={{fontSize:14}}>{title}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{color:'gray',fontSize:12}}>{desc}</Text>
                <Image
                    style={[styles.cell_img,{width:8,height:17}]}
                    source={require('../../../img/arrow_right.png')}/>
            </View>
        </TouchableOpacity>
    }
}

const styles = {
    cell_img:{
        width: 25,
        height: 21,
        marginHorizontal:15,
        marginVertical:10

    }
}