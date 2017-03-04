/**
 * Created by zhulizhe on 2017/3/4.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import CellItem from '../common/component/CommonCell'

let {width} = Dimensions.get('window')
class MoneyItem extends Component{
    render(){
        return <View style={[styles.center,{width:width/2,paddingVertical:10}]}>
            <Text>249</Text>
            <View style={[styles.row,styles.center]}>
                <Image
                    style={{width:20,height:20}}
                    source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                />
                <Text>普通币</Text>
                <Text style={{color:'red',fontSize:12}}>(全场通用)</Text>
            </View>
        </View>
    }
}

 export default class AssetsController extends Component{
     render(){
         return <View style={styles.flex}>
             <NavigationBar
                 title={{title:'我的资产'}}
                 tintColor="#f7f7f8"/>
             <View style={[styles.center,{borderBottomWidth:1,borderBottomColor:'#f5f5f5',paddingVertical:10,marginVertical:10,marginHorizontal:15,backgroundColor:'#fff'
}]}>
                 <Image
                     style={{width:50,height:50,marginBottom:15}}
                     source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                 />
                 <View style={[styles.center,{flexDirection:'row'}]}>
                     <Text style={{color:'red'}}>249</Text>
                     <Text>喜腾币</Text>
                 </View>
             </View>
             <View style={[styles.row,styles.center,{backgroundColor:'#fff',marginHorizontal:15}]}>
                 <MoneyItem />
                 <MoneyItem />
             </View>
             <View style={{marginTop:20}}>
                 <CellItem  title="购买钻石" desc="" icon={require('../../img/me/me_icon-_record.png')}/>
                 <CellItem  title="礼品商城" desc="" icon={require('../../img/me/me_icon-_record.png')}/>
             </View>
         </View>
     }
 }

 const styles = {
     flex:{
         flex:1,
         backgroundColor:'#f5f5f5'
     },
     center:{
         alignItems:'center',
         justifyContent:'center'
     },
     row:{
         flexDirection:'row'
     }
 }