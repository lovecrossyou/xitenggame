/**
 * Created by zhulizhe on 2017/3/6.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    PixelRatio,
    Image
} from 'react-native';
import {getRecentBetList} from '../../util/NetUtil'
import {dateDistanceByNow} from '../../util/DateUtil'

export default class BetCell extends Component {
    render() {
        var userIconUrl = this.props.data.userIconUrl
        var time = this.props.data.time
        var timeDesc = dateDistanceByNow(time)
        return <TouchableOpacity
            style={[styles.cellContainer, styles.row]}
            activeOpacity={1}>
            <View style={[styles.leftContainer, styles.row]}>
                <TouchableOpacity
                    activeOpacity={1}
                >
                    <Image style={[styles.logo,styles.border_1]} source={{uri: userIconUrl}}/>
                </TouchableOpacity>
                <View>
                    <Text style={{marginTop: 12, marginLeft: 6}}>{this.props.data.userName}</Text>
                    <Text style={{marginTop: 10, marginLeft: 6,color:'gray',fontSize:11}}>{timeDesc}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Image
                    source={require('../../../img/home/icon_xiteng_s.png')}
                    style={{width: 10, height: 13, marginRight: 4}}/>
                <Text style={{color: 'red'}}>{this.props.data.guessXitbAmount}</Text>
            </View>
        </TouchableOpacity>
    }
}


const styles = {
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },
    logo: {
        width: 44,
        height: 44,
        marginTop: 10,
        marginLeft: 10
    },
    cellContainer: {
        justifyContent: 'space-between',
        height: 64,
        borderBottomWidth:1/PixelRatio.get(),
        borderBottomColor:'#F2F2F2'
    },
    rightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        flexDirection: 'row'
    },
    leftContainer: {
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    border_1:{
        borderColor:'#f5f5f5',
        borderWidth:1/PixelRatio.get()
    }
}