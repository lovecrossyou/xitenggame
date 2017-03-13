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
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Modal from 'react-native-modalbox';
var CalendarPicker = require('react-native-calendar-picker')

//日期生成
function dateGenerator(from, to, suffix) {
    let results = []
    for (let i = from; i <= to; i++) {
        results.push(i + suffix)
    }
    return results
}
const years = dateGenerator(1970, 2017, '年')
const months = dateGenerator(1, 12, '月')
const days = dateGenerator(1, 31, '日')

export class FortuneDatePicker extends Component {
    constructor() {
        super()
        this.state = {
            year: '1990年',
            month: '5月',
            day: '12日',
            display: false
        }
    }

    onClose() {
        this.refs.pickermodal.close()
    }

    onOpen() {
        this.refs.pickermodal.open()
    }

    render() {
        let {onDateChange, onComfirm} = this.props
        return <Modal style={{height:200}}
                      position={"bottom"}
                      isOpen={this.state.display}
                      ref={"pickermodal"}
                      swipeArea={20}>
            <View
                style={{height:40,backgroundColor:'#f5f5f5',justifyContent:'space-around',flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity>
                    <Text>阴历</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>阳历</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.onClose.bind(this)}
                >
                    <Text>确定</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.year}
                    onValueChange={(year) => {
                        this.setState({year: year})
                        onDateChange(year + this.state.month + this.state.day)
                    }}>
                    {
                        years.map((year, index) => {
                            return <Picker.Item label={year} value={year} key={index}/>
                        })
                    }
                </Picker>
                <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.month}
                    onValueChange={(month) => {
                        this.setState({month: month})
                        onDateChange(this.state.year + month + this.state.day)
                    }}>
                    {
                        months.map((month, index) => {
                            return <Picker.Item label={month} value={month} key={index}/>
                        })
                    }
                </Picker>
                <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.day}
                    onValueChange={(day) => {
                        this.setState({day: day})
                        onDateChange(this.state.year + this.state.month + day)
                    }}>
                    {
                        days.map((day, index) => {
                            return <Picker.Item label={day} value={day} key={index}/>
                        })
                    }
                </Picker>
            </View>
        </Modal>
    }
}

export class FortuneCalendarPicker extends Component {

    constructor(props){
        super(props)
        this.state = {
            date: new Date(),
            display: false
        }
    }

    onClose() {
        this.refs.pickermodal.close()
    }

    onOpen() {
        this.refs.pickermodal.open()
    }

    onDateChange(date) {
        this.setState({date: date});
    }

    render() {
        return <Modal style={{height:240}}
                      position={"bottom"}
                      isOpen={this.state.display}
                      ref={"pickermodal"}
                      swipeArea={20}>
            <CalendarPicker
                selectedDate={this.state.date}
                onDateChange={this.onDateChange.bind(this)}
                screenWidth={Dimensions.get('window').width}
                selectedBackgroundColor={'#5ce600'}/>
            <Text style={styles.selectedDate}> Date: { this.state.date.toString() } </Text>
        </Modal>
    }
}

const styles = {
    pickerContainer: {
        flexDirection: 'row',
    },
    pickerStyle: {
        flex: 1
    },
    container: {
        marginTop: 30,
    },
    selectedDate: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#000',
    }
}