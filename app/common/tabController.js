/**
 * Created by zhulizhe on 2017/2/25.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter
} from 'react-native';

import HomeController from '../home/homeController'
import ShaLongController from '../shalong/shalongComponent'
import FaXianController from '../faxian/faxianController'
import AboutMe from '../me/MeController'
import LoginController from '../login/LoginController'
import TabNavigator from 'react-native-tab-navigator'

const tabBarItems = [
    {
        title: '首页',
        icon:() => <Image style={styles.item_img}
                          source={require('../../img/tab/tab_xiteng.png')} /> ,
        component: HomeController
    },
    {
        title: '沙龙',
        icon:() => <Image style={styles.item_img}
                          source={require('../../img/tab/tab_shalong.png')} /> ,
        component: ShaLongController
    },
    {
        title: '发现',
        icon:() => <Image style={styles.item_img}
                          source={require('../../img/tab/tab_faxian.png')} /> ,
        component: FaXianController
    },
    {
        title: '我的',
        icon:() => <Image style={styles.item_img}
                          source={require('../../img/tab/tab_me.png')} /> ,
        component: AboutMe
    }
]
export default class RootContainer extends Component {
    constructor(props) {
        super(props)
        RootContainer.switchToLoginView = RootContainer.switchToLoginView.bind(this);
        RootContainer.switchToMainView = RootContainer.switchToMainView.bind(this);
        this.state = {
            selectedTab: '喜腾',
            tabName: ['喜腾','沙龙','发现','我']
        }
    }

    componentDidMount(){
        this.listner = DeviceEventEmitter.addListener('shouldLogin',RootContainer.switchToLoginView.bind(this))
    }

    componentWillUnMount(){
        this.listner.remove()
    }

    static switchToMainView() {
        this.props.navigator.push({
            component: LoginController,
            params: {}
        });
    }

    static switchToLoginView() {
        this.props.navigator.push({
            component: LoginController,
            params: {}
        });
    }

    static defaultProps = {
        selectedColor: 'rgb(22,131,251)',
        normalColor: '#a9a9a9'
    };

    render() {
        const {selectedColor} = this.props;
        const {tabName} = this.state;
        return (<TabNavigator
            tabBarStyle={{ height: 50}}
            hidesTabTouch={false}
            sceneStyle={{ paddingBottom: 50 }}>
            {
                tabBarItems.map((item, index) => {
                    let Com = item.component
                    return <TabNavigator.Item
                        key={index}
                        selected={this.state.selectedTab === tabName[index]}
                        title={tabName[index]}
                        renderIcon={item.icon}
                        onPress={() => this.setState({ selectedTab:item.title }) }>
                        <Com
                            navigator={this.props.navigator} {...this.props} />
                    </TabNavigator.Item>
                })
            }
        </TabNavigator>)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    item_img: {
        width: 28,
        height: 28
    }
});
