/**
 * Created by huibei on 17/2/23.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    PixelRatio,
    NavigatorIOS,
    Dimensions,
    TouchableOpacity,
    ListView,
    Modal,
    NativeModules,
    Navigator,
    InteractionManager
} from 'react-native';
import Image from 'react-native-image-progress'
import SGListView from 'react-native-sglistview'
import ImageViewer from 'react-native-image-zoom-viewer'
import {shalongcommentlist} from '../util/NetUtil'
import {types} from './reducer/shalongReducer'
import NavigationBar from 'react-native-navbar'
import {shalongAction} from './action/shalongAction'
import shalongDetail from './shalongDetail'
import ShalongCell from '../common/component/ShalongCell'
const {width, height} = Dimensions.get('window')

const picMargin = 10
const picRowCount = 4
let pageNo = 1
const pageSize = 45
const picSize = (width - picMargin * (picRowCount + 1)) / picRowCount


export default class ShaLongController extends Component {
    constructor() {
        super()
        this.state = {
            commentlist: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            isLast: false
        }
    }

    componentDidMount() {
        this.fetchData()
    }


    renderData(data) {
        return <ShalongCell data={data} cellClick={()=>{
            this.props.navigator.push({
            component:shalongDetail,
            title:'详情',
            params:{data}
        })
        }}/>
    }

    fetchData(){
        InteractionManager.runAfterInteractions(() => {
            this.props.actions.shalongAction(pageNo,pageSize,false,true);
        });
    }

    render() {
        let list = this.props.state.shalongReducer.commentlist
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

class LoadMoreFooter extends Component {
    render() {
        return <View style={{height:44,justifyContent:'center',alignItems:'center'}}>
            <Image style={{height:30,width:30}} source={require('../../img/loading.gif')}/>
        </View>
    }
}


const styles = {
    container: {
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    userinfo_container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10
    },
    imageItem: {
        width: picSize,
        height: picSize,
        marginLeft: picMargin,
        marginBottom:picMargin/2
    },
    footerText: {
        color: 'gray',
        fontSize: 10,
        marginLeft: 6
    },
    border_1:{
        borderColor:'#DCDCDC',
        borderWidth:1/PixelRatio.get()
    }
}