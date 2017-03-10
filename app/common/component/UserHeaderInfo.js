/**
 * Created by zhulizhe on 2017/3/9.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

export class UserHeaderInfo extends Component{
    render() {
        const {userIconUrl, userName, time, sex,iconUrl}  = this.props.data
        var sexUrl = require('../../../img/shalong/man.png')
        if (sex != '男') {
            sexUrl = require('../../../img/shalong/woman.png')
        }
        return <View style={styles.userinfo_container}>
            <TouchableOpacity onPress={()=>{

            }}>
                <Image
                    style={{width: 40, height: 40, borderRadius: 3, marginLeft: 10}}
                    source={{uri: userIconUrl?userIconUrl:iconUrl}}/>
            </TouchableOpacity>
            <View style={{marginLeft: 10,justifyContent:'center'}}>
                <View style={{flexDirection: 'row',alignItems:'flex-start'}}>
                    <Text style={{color: '#333333', fontSize: 14}}>{userName}</Text>
                    <Image
                        style={[{width: 14, height: 14, marginLeft: 6},styles.border_1]}
                        source={sexUrl}/>
                </View>
                <Text style={{color: '#333333', fontSize: 11}}>{time}</Text>
            </View>
        </View>
    }
}

const styles = {
    userinfo_container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10
    }
}