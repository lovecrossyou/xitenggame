/**
 * Created by zhulizhe on 2017/3/10.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Picker,
    TouchableOpacity
} from 'react-native';

//日期生成
function dateGenerator(from,to,suffix) {
    let results = []
    for(let i= from;i<=to;i++){
        results.push(i+suffix)
    }
    return results
}
const years = dateGenerator(1970,2017,'年')
const months = dateGenerator(1,12,'月')
const days = dateGenerator(1,31,'')

export default class FortuneDatePicker extends Component{
    constructor(){
        super()
        this.state = {
            year:'',
            month:'',
            day:''
        }
    }

    render(){
        let {datas}= this.props
        return <View>
            <View
                style={{height:40,backgroundColor:'#f5f5f5',justifyContent:'space-around',flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity>
                    <Text>阴历</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>阳历</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>确定</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.year}
                    onValueChange={(year) => this.setState({year: year})}>
                    {
                        years.map((year,index)=>{
                            return <Picker.Item label={year} value={year} key={index}/>
                        })
                    }
                </Picker>
                <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.month}
                    onValueChange={(month) => this.setState({month: month})}>
                    {
                        months.map((month,index)=>{
                            return <Picker.Item label={month} value={month} key={index}/>
                        })
                    }
                </Picker>
                <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.day}
                    onValueChange={(day) => this.setState({day: day})}>
                    {
                        days.map((day,index)=>{
                            return <Picker.Item label={day} value={day} key={index}/>
                        })
                    }
                </Picker>
            </View>
        </View>
    }
}


const styles = {
    pickerContainer:{
        flexDirection:'row',
    },
    pickerStyle:{
        flex:1
    }
}