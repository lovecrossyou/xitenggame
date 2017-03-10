/**
 * Created by zhulizhe on 2017/3/9.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    PixelRatio
} from 'react-native';


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


export class CommentMoreFooter extends Component{
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
                    <MoreItem click={this._clickItem.bind(this)} data={{text:'点赞',icon:require('../../../img/shalong/operation_more.png')}}/>
                    <MoreItem click={this._clickItem.bind(this)} data={{text:'评论',icon:require('../../../img/shalong/operation_more.png')}}/>
                    <MoreItem click={this._clickItem.bind(this)} data={{text:'赞赏',icon:require('../../../img/shalong/operation_more.png')}}/>
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
                    <Image source={require('../../../img/shalong/operation_more.png')} style={{width:28,height:28}}/>
                </TouchableOpacity>
            </View>
        </View>
    }
}


const styles = {
    row: {
        flex: 1,
        flexDirection: 'row'
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