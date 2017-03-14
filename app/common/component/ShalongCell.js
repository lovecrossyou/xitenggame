/**
 * Created by zhulizhe on 2017/3/8.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    PixelRatio,
    Modal
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer'

const {width, height} = Dimensions.get('window')

const picMargin = 10
const picRowCount = 4
let pageNo = 1
const pageSize = 45
const picSize = (width - picMargin * (picRowCount + 1)) / picRowCount
import {UserHeaderInfo} from './UserHeaderInfo'
import {CommentMoreFooter} from './CommentMoreFooter'

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
        const {content, contentImages,numberOfLines}  = this.props.data
        let imgUrls = []
        contentImages.forEach(function (img,index) {
            imgUrls.push({
                'url': img.big_img
            })
        })

        let picModels = [];
        for(let i=0,len=contentImages.length;i<len;i+=picRowCount){
            picModels.push(contentImages.slice(i,i+picRowCount));
        }

        const rowCells = picModels.map((rowM,index)=>{
            return (<RowImageCell rowM={rowM} key={index} showModal={this.state.showModal} showBigImage={()=>{
                this.setState({
                     showModal:true
                })
            }}/>)
        })
        let rows = rowCells.length
        return <View style={styles.container}>
            <View>
                <Text numberOfLines={numberOfLines} style={{marginHorizontal:10,marginVertical:10}}>{content}</Text>
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

export default class ShalongCell extends Component {
    render() {
        const {data,cellClick} = this.props
        return <TouchableOpacity
            style={[styles.container]}
            onPress={cellClick}>
            <UserHeaderInfo data={data} {...this.props}/>
            <Content data={data} {...this.props}/>
            <CommentMoreFooter data={data}/>
        </TouchableOpacity>
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