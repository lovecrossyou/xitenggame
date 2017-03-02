'use strict';

import React from 'react';
import {
    Dimensions,
    Image,
    InteractionManager,
    View,
    Text,
    PixelRatio,
    TouchableOpacity
} from 'react-native';

import RootContainer from './tabController'

var {height, width} = Dimensions.get('window');
const timeInterval = 5
class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remainTime:timeInterval
        }
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this._enterMain()
        }, timeInterval*1000);
        this.remainTimer = setInterval(()=>{
           let time = this.state.remainTime-1
            this.setState({
                remainTime:time
            })
        },1000)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.remainTimer && clearTimeout(this.remainTimer);
    }

    _enterMain(){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.resetTo({
                component: RootContainer
            });
        });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Image
                    style={{flex:1,width:width,height:height,alignItems:'flex-end'}}
                    source={require('../../img/Default.png')}
                >
                    <TouchableOpacity
                        style={{marginHorizontal:30,marginVertical:60,borderColor:'#f5f5f5',borderWidth:1/PixelRatio.get(),borderRadius:4}}
                        onPress={this._enterMain.bind(this)}>
                        <Text
                            style={{fontSize:14,color:'white',paddingHorizontal:6,paddingVertical:4}}>
                            倒计时{this.state.remainTime}s
                        </Text>
                    </TouchableOpacity>
                </Image>
            </View>
        );
    }
}
export default Splash;