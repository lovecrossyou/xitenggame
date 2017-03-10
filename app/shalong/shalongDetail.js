/**
 * Created by zhulizhe on 2017/3/8.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import SGListView from 'react-native-sglistview'
import NavigationBar from 'react-native-navbar'


export default class shalongDetail extends Component{
    renderData(comment){
        return <View style={{height:44,backgroundColor:'red'}}>

        </View>
    }

    fetchData(){

    }

    render(){
        return <View style={{flex:1,justifyContent:'space-between'}}>
            <NavigationBar
                title={{title:'沙龙'}}
                tintColor="#f7f7f8"/>
            <SGListView
                dataSource={this.state.dataSource.cloneWithRows(list) }
                renderRow={this.renderData.bind(this)}
                initialListSize={1}
                onEndReached={this.fetchData.bind(this)}
                onEndReachedThreshold={10}
                pageSize={pageSize}
                scrollRenderAheadDistance={1}
                stickyHeaderIndices={[]}
                enableEmptySections={true}
                renderFooter={()=>{
                if(this.state.isLast)return null
                return <LoadMoreFooter/>
            }}>
            </SGListView>
        </View>
    }
}