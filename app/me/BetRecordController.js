/**
 * Created by zhulizhe on 2017/3/7.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import {requestUserInfo} from '../util/NetUtil'

export default class BetRecordController extends Component{
    constructor(props){
        super(props)
        this.datalist = []
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: this.ds.cloneWithRows([])
        }
    }

    _renderCell(){
        return <View>

        </View>
    }

    componentDidMount() {
        requestUserInfo('getGuessWithStockStatistics',{}).then((datas)=>{
            alert(JSON.stringify(datas))
        })
    }

    _loadMore(){

    }

    _headerView(){
        return <View style={{height:120,backgroundColor:'red'}}>
            <View>
                <Image
                    style={{width:30,height:30,alignSelf:'center'}}
                    source={require('../../img/me/me_icon_assets.png')}
                />
                <View>
                    <View>
                        <View style={{}}>

                        </View>
                        <View></View>
                    </View>
                    <View></View>
                    <View></View>
                </View>
            </View>
            <View></View>
        </View>
    }

    render(){
        return <View style={{flex:1}}>
            <NavigationBar
                title={{title:'投注记录'}}
                tintColor="#f7f7f8"/>
            <ListView
                ref={(scroll)=>this.scrollV = scroll}
                style={{backgroundColor:'#F7F7F7'}}
                dataSource={this.state.dataSource }
                renderHeader={()=>this._headerView()}
                renderRow={this._renderCell.bind(this)}
                onEndReached={this._loadMore.bind(this)}
                onEndReachedThreshold={10}
                removeClippedSubviews={true}
                enableEmptySections={true}>
            </ListView>
        </View>
    }
}


const styles = {
    flex:{
      flex:1
    },
    row:{
        flexDirection:'row'
    }
}