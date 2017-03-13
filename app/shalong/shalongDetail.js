/**
 * Created by zhulizhe on 2017/3/8.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';
import SGListView from 'react-native-sglistview'
import NavigationBar from 'react-native-navbar'
import ShalongCell from '../common/component/ShalongCell'

const pageSize = 20
export default class shalongDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            isLast:false
        }
    }

    renderData(comment){
        return <View>

        </View>
    }

    fetchData(){

    }

    renderHeader(){
        return <ShalongCell data={this.props.data} numberOfLines={0}/>

    }

    render(){
        return <View style={{flex:1,justifyContent:'space-between',backgroundColor:'#f5f5f5'}}>
            <NavigationBar
                title={{title:'沙龙'}}
                tintColor="#f7f7f8"/>
            <SGListView
                dataSource={this.state.dataSource.cloneWithRows(['']) }
                renderRow={this.renderData.bind(this)}
                initialListSize={1}
                onEndReached={this.fetchData.bind(this)}
                onEndReachedThreshold={10}
                pageSize={pageSize}
                scrollRenderAheadDistance={1}
                stickyHeaderIndices={[]}
                renderHeader={this.renderHeader.bind(this)}
                enableEmptySections={true}/>
        </View>
    }
}