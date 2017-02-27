/**
 * Created by zhulizhe on 2017/2/25.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import homeController from '../home/homeController'
import shalongController from '../shalong/shalongComponent'
import faxianController from '../faxian/faxianController'
import AboutMe from '../me/meController'

import TabNavigator from 'react-native-tab-navigator'
const tabBarItems = [
    {
        title: '首页',
        icon:() => <Image style={styles.item_img}
                          source={require('../../img/tab/tab_xiteng.png')} /> ,
        component: homeController
    },
    {
        title: '沙龙',
        icon:() => <Image style={styles.item_img}
                          source={require('../../img/tab/tab_shalong.png')} /> ,
        component: shalongController
    },
    {
        title: '发现',
        icon:() => <Image style={styles.item_img}
                          source={require('../../img/tab/tab_faxian.png')} /> ,
        component: faxianController
    },
    {
        title: '我的',
        icon:() => <Image style={styles.item_img}
                          source={require('../../img/tab/tab_me.png')} /> ,
        component: AboutMe
    }
]



export default class Root extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: tabBarItems[1].title,
        }
    }

    render() {
        var {store} = this.props
        return (<TabNavigator tabBarStyle={{ height: 60 }}>
            {
                tabBarItems.map((controller, i) => {
                    let Component = controller.component;
                    return (
                        <TabNavigator.Item
                            key= {i}
                            selected={this.state.selectedTab === controller.title}
                            title={controller.title}
                            renderIcon={controller.icon}
                            onPress={() => this.setState({ selectedTab: controller.title }) }>

                            <Component
                                navigator = {this.props.navigator} {...this.props}/>
                        </TabNavigator.Item>
                    )
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
