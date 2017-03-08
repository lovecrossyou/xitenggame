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
const {width, height} = Dimensions.get('window')

const picMargin = 10
const picRowCount = 4
let pageNo = 1
const pageSize = 45
const picSize = (width - picMargin * (picRowCount + 1)) / picRowCount

class Header extends Component {
    render() {
        const {userIconUrl, userName, time, sex}  = this.props.data
        var sexUrl = require('../../img/shalong/man.png')
        if (sex != '男') {
            sexUrl = require('../../img/shalong/woman.png')
        }
        return <View style={styles.userinfo_container}>
            <TouchableOpacity onPress={()=>{

            }}>
                <Image
                    style={{width: 40, height: 40, borderRadius: 3, marginLeft: 10}}
                    source={{uri: userIconUrl}}/>
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

class ImageItem extends Component{
    render(){
        var {index,showModal,head_img,showBigImage} = this.props
        return <TouchableOpacity
            onPress={showBigImage}>
            <Image
                style={[styles.imageItem,styles.border_1]}
                source={{uri:head_img}}
            />
        </TouchableOpacity>
    }
}

class RowImageCell extends Component{
    render(){
        var {rowM,showModal,showBigImage} = this.props
        var rowViews = rowM.map((m,index)=>{
            return <ImageItem key={index} index={index} showModal={showModal} head_img={m.head_img} showBigImage={showBigImage}/>
        })
        return <View style={[styles.row]}>
            {rowViews}
        </View>
    }
}

class Content extends Component {
    constructor() {
        super()
        this.state = {
            showModal: false,
            showIndex:0
        }
    }

    render() {
        const {content, contentImages}  = this.props.data
        var imgUrls = []
        contentImages.forEach(function (img,index) {
            imgUrls.push({
                'url': img.big_img
            })
        })

        var picModels = [];
        for(var i=0,len=contentImages.length;i<len;i+=picRowCount){
            picModels.push(contentImages.slice(i,i+picRowCount));
        }

        var rowCells = picModels.map((rowM,index)=>{
            return (<RowImageCell rowM={rowM} key={index} showModal={this.state.showModal} showBigImage={()=>{
                this.setState({
                     showModal:true
                })
            }}/>)
        })
        let rows = rowCells.length
        return <View style={styles.container}>
            <View>
                <Text numberOfLines={9} style={{marginHorizontal:10,marginVertical:10}}>{content}</Text>
            </View>
            {rowCells}
            <Modal visible={this.state.showModal} transparent={false}>
                <ImageViewer
                    imageUrls={imgUrls}
                    index={this.state.showIndex}
                    onClick={()=>{
                    var showModal = !this.state.showModal
                    this.setState({
                    showModal:showModal,
                   })
                }}
                />
            </Modal>
        </View>
    }
}

//点赞 评论 赞赏 通用组件
class MoreItem extends Component{
    render(){
        var {text,icon} = this.props.data
        var {click} = this.props
        return <TouchableOpacity
            style={{alignItems:'center',flexDirection:'row',justifyContent:'space-around'}}
            onPress={()=>{
                click(text)
            }}>
            <Image source={icon} style={{width:28,height:28}}/>
            <Text style={{fontSize:11,color:'gray',paddingRight:4}}>{text}</Text>
        </TouchableOpacity>
    }
}


class Footer extends Component {
    constructor(){
        super()
        this.state = {
            more_opacity:0
        }
    }

    _clickItem(text){
        alert(text)
    }

    render() {
        return <View
            style={[styles.row,{marginTop:20,justifyContent:'space-between',alignItems:'center',borderBottomColor:'#f5f5f5',borderBottomWidth:1}]}>
            <View style={[styles.row,{paddingBottom:6,width:100,flexGrow:3}]}>
                <Text style={styles.footerText}>100 点赞</Text>
                <Text style={styles.footerText}>200 赞赏</Text>
                <Text style={styles.footerText}>999 评论</Text>
            </View>
            <View style={[styles.row,{justifyContent:'flex-end',flexGrow:4}]}>
                <View
                    style={[styles.row,{marginBottom:4,justifyContent:'space-around',alignItems:'center',backgroundColor:'#f5f5f5',borderRadius:4,opacity:this.state.more_opacity},styles.border_1]}>
                    <MoreItem click={this._clickItem.bind(this)} data={{text:'点赞',icon:require('../../img/shalong/operation_more.png')}}/>
                    <MoreItem click={this._clickItem.bind(this)} data={{text:'评论',icon:require('../../img/shalong/operation_more.png')}}/>
                    <MoreItem click={this._clickItem.bind(this)} data={{text:'赞赏',icon:require('../../img/shalong/operation_more.png')}}/>
                </View>
                <TouchableOpacity
                    style={{paddingRight:6}}
                    onPress={()=>{
                    var opacity = this.state.more_opacity
                    opacity = Math.abs(1-opacity)
                    this.setState({
                        more_opacity:opacity
                    })
                }}>
                    <Image source={require('../../img/shalong/operation_more.png')} style={{width:28,height:28}}/>
                </TouchableOpacity>
            </View>
        </View>
    }
}

class ShalongCell extends Component {
    render() {
        const {data,cellClick} = this.props
        return <TouchableOpacity
            style={[styles.container]}
             onPress={cellClick}>
            <Header data={data}/>
            <Content data={data}/>
            <Footer data={data}/>
        </TouchableOpacity>
    }
}

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

        }}/>
    }

    fetchData(){
        InteractionManager.runAfterInteractions(() => {
            this.props.actions.shalongAction(pageNo,pageSize,false,true);
            // pageNo++
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