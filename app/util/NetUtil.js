/**
 * Created by huibei on 17/2/7.
 */
import * as WeChat from 'react-native-wechat'
import {GetRandomNum} from '../util/NumberUtil'
var Realm = require('realm')

import {NativeModules, DeviceEventEmitter} from 'react-native'
import  User from '../model/User'

export const WechatAppID = "wx29fb35e25d660f0a"
const WechatSecret = "64ea45d0b288669706194b3a07726208"


const AppKey = "b5958b665e0b4d8cae77d28e1ad3f521"
const AppSecret = "71838ae252714085bc0fb2fc3f420110"
//生产环境
// const Base_url  = "http://www.xiteng.com/xitenggame/"
// const ImageUrl = "http://www.xiteng.com/imageserver/"

const Base_url = "http://114.251.53.22/xitenggamejar/"
const ImageUrl = "http://114.251.53.22/imageserver/"
// const Base_url = "http://192.168.1.229:9931/xitenggamejar/"


var XTUtil = NativeModules.XTUtil

function sendNetRequest(...props) {
    this.url = props.shift(1);
    this.options = props.shift(1);
    return fetch(this.url, Object.assign({}, this.options))
        .then((response) => {
        let result = JSON.stringify(response._bodyInit)
            if(result == '""'){
                result={status:200}
            }
            else {
                result = response.json()
            }
            return result
        }).catch(error => {
            return error
        })
}

export function uploadImageRequest(url, images) {
    var getAccInfo = getAccessInfo()
    return new Promise(function (resolve, reject) {
        getAccInfo.then((accessInfo) => {
            getMd5(AppSecret).then((signature) => {
                var accessInfo = {
                    'app_key': AppKey,
                    'access_token': '',
                    'signature': signature
                }

                url = ImageUrl + url
                var formData = new FormData()
                images.forEach(function (uri, index) {
                    let file = {uri: uri.path, type: 'multipart/form-data', name: index + '.jpg'}
                    formData.append("file", file)
                })
                return fetch(url, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        resolve(responseData)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        })
    })
}

export function requestData(url, param, method = 'POST') {
    return new Promise(function (resolve, reject) {
        createAccessInfo().then((accessInfo) => {
            param["accessInfo"] = accessInfo
            url = Base_url + url
            netRequest(url, param, method).then((result) => {
                let errors = result.errors
                if (errors == '没有权限') {
                    //拦截弹出 登陆界面
                    DeviceEventEmitter.emit('shouldLogin')
                }
                resolve(result)
            })
        })
    })
}

/**
 * 最新投注信息
 * @param pageNo
 * @param pageSize
 * @param method
 * @returns {*}
 */
export function getRecentBetList(pageNo, pageSize, method = 'post') {
    var params = {
        "size": pageSize,
        "pageNo": pageNo,
        "sortProperties": ["time"],
        "direction": "DESC",
    }
    return requestData('getJustNowWithStockList', params, method)
}

/**
 * 晒单详情
 * @param orderId
 * @returns {*}
 */
export function shareOrderDetail(orderId, shareType, url, method = 'post') {
    var params = {}
    params[shareType] = orderId
    return requestData(url, params, method)
}

/**
 * 发表评论
 * @param url
 * @param stockGameId
 * @param imageUrls
 * @param content
 * @returns {*}
 */
export function sendComment(url, stockGameId = 0, imageUrls, content) {
    var params = {
        "stockGameId": stockGameId,
        "imageUrls": imageUrls,
        "content": content,
    }
    return requestData(url, params, 'POST')
}

export function shalongcommentlist(pageNo, pageSize, commentType = 'all') {
    var params = {
        "pageNo": pageNo,
        "size": pageSize,
        "commentType": commentType,
    }
    return requestData('commentList', params, 'POST')
}


function md5(str) {
    return new Promise((res, rej) => {
        XTUtil.digest(str, (err, info) => {
            res(info[0])
        })
    })
}
// -------------------------login------------------------------ 

function getLoginSignature(userName, password, md5key) {
    return new Promise((res, rej) => {
        let p1 = userName + password + md5key
        md5(p1).then((d) => {
            let p2 = AppSecret + d
            md5(p2).then((dd) => {
                res(dd)
            })
        })
    })
}

function getLoginAccessInfo(userName) {
    return new Promise((res, rej) => {
        md5(AppSecret).then((signature) => {
            res({
                'app_key': AppKey,
                'access_token': '',
                'phone_num': userName,
                'signature': signature
            })
        })
    })
}

function getMD5Key(userName, loginType) {
    let signature = ''
    return new Promise((res, rej) => {
        md5(AppSecret).then((signature) => {
            let accessInfo = {
                'phone_num': userName,
                'app_key': AppKey,
                'loginType': loginType,
                'access_token': '',
                'signature': signature
            }
            let url = Base_url + 'userMD5'
            let param = {
                'accessInfo': accessInfo
            }
            netRequest(url, param).then((result) => {
                res(result)
            })
        })
    })
}

export function login(userName, password, type = 'phonenum') {
    return new Promise((resolve, reject) => {
        getMD5Key(userName, type).then((d) => {
            let userMD5 = d['userMD5']
            getLoginSignature(userName, password, userMD5).then((signature) => {
                getLoginAccessInfo(userName).then((accessInfo) => {
                    accessInfo['loginType'] = type
                    accessInfo['signature'] = signature

                    let params = {
                        'userName': userName,
                        'app_key': AppKey,
                        'accessInfo': accessInfo
                    }
                    let url = Base_url + 'login'
                    netRequest(url, params).then((result) => {
                        resolve(result)
                    })
                })
            })
        })
    })
}

function getWeChatLoginSignature(unionid) {
    return new Promise((res, rej) => {
        md5(AppSecret + unionid).then((result) => {
            res(result)
        })
    })
}

function createAccessInfo() {
    return new Promise((res, rej) => {
        let realm = new Realm({schema: [User]})
        let users = realm.objects('User')
        let hasLogin = false
        let user = {}
        if (users && users.length) {
            user = users[0]
            hasLogin = true
        }
        let accessInfo = {}
        if (!hasLogin) {
            md5(AppSecret).then((signature) => {
                XTUtil.currentVersion((err, info) => {
                    let version = info[0]
                    accessInfo = {
                        access_token: '',
                        phone_num: '',
                        app_key: AppKey,
                        signature: signature,
                        os: 'ios',
                        version: version
                    }
                    res(accessInfo)
                })
            })
        }
        else {
            let str = AppSecret + '&' + user.access_token_secret
            md5(str).then((signature) => {
                XTUtil.currentVersion((err, info) => {
                    let version = info[0]
                    accessInfo = {
                        access_token: user.access_token,
                        phone_num: user.phone,
                        app_key: AppKey,
                        signature: signature,
                        os: 'ios',
                        version: version
                    }
                    res(accessInfo)
                })
            })
        }
    })
}

function createWechatAccessInfo(wechatinfo, response) {
    return new Promise((res, rej) => {
        let str = AppSecret + '&' + response.access_token_secret
        md5(str).then((signature) => {
            XTUtil.currentVersion((err, info) => {
                let version = info[0]
                accessInfo = {
                    access_token: response.access_token,
                    phone_num: wechatinfo.unionid,
                    app_key: AppKey,
                    signature: signature,
                    os: 'ios',
                    version: version
                }
                res(accessInfo)
            })
        })
    })
}

/**
 * 检测绑定手机号
 * @param wechatinfo
 * @param tokenInfo
 * @returns {Promise}
 */
function checkBindPhone(wechatinfo, response = {}) {
    return new Promise((res, rej) => {
        createWechatAccessInfo(wechatinfo, response).then((accessInfo) => {
            accessInfo['loginType'] = 'weixin'
            let params = {
                'cName': wechatinfo.nickname,
                'userIconUrl': wechatinfo.headimgurl,
                'accessInfo': accessInfo,
            }
            let url = Base_url + 'checkBind'
            netRequest(url, params).then((result) => {
                res(result)
            })
        })
    })
}

/**
 * 微信注册登陆
 * @returns {Promise}
 */
export function wechatlogin() {
    return new Promise((res, rej) => {
        getWechatUserInfo().then((wechatinfo) => {
            let unionid = wechatinfo['unionid']
            getWeChatLoginSignature(unionid).then((signature) => {
                getLoginAccessInfo(unionid).then((accessInfo) => {
                    accessInfo['loginType'] = 'weixin'
                    accessInfo['signature'] = signature
                    let params = {
                        'sex': wechatinfo.sex,
                        'userName': unionid,
                        'nickName': wechatinfo.nickname,
                        'headImageUrl': wechatinfo.headimgurl,
                        'app_key': AppKey,
                        'accessInfo': accessInfo
                    }
                    let url = Base_url + 'login'
                    netRequest(url, params).then((response) => {
                        checkBindPhone(wechatinfo, response).then((bindInfo) => {
                            res({response, bindInfo, wechatinfo})
                        })
                    })
                })
            })
        })
    })
}


// --------------------registe---------------------------

/**
 *
 * @returns {Promise}
 */
function getWeChatCode() {
    let stateValue = GetRandomNum(1, 10000) + ''
    return new Promise((res, rej) => {
        WeChat.sendAuthRequest('snsapi_userinfo', stateValue).then((response) => {
            let code = response.code
            res(code)
        })
    })
}

/**
 *
 * @returns {Promise}
 */
function getWechatUserInfo() {
    return new Promise((res, rej) => {
        getWeChatCode().then((code) => {
            let requestUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + WechatAppID + '&secret=' + WechatSecret + '&code=' + code + '&grant_type=authorization_code'
            netRequest(requestUrl, {}, 'GET').then((resp) => {
                let access_token = resp.access_token
                let openid = resp.openid
                let url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid
                netRequest(url, {}, 'GET').then((resp) => {
                    res(resp)
                })
            })
        })
    })

}


function netRequest(url, params, method = 'POST') {
    return new Promise((resolve, reject) => {
        if (method == 'GET') {
            sendNetRequest(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((result) => resolve(result))
        }
        else {
            sendNetRequest(url, {
                method: method,
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                resolve(result)
            })
        }
    })
}

export function requestUserInfo() {
    // user/info
    return requestData('user/info', {})
}


// ----------------------guessGame------------------------------------
export function guessGame(stockId, amount, guessType = 0) {
    let params = {
        "cathecticAmount": amount,
        "stockId": stockId,
        "guessType": guessType
    }
    return requestData('guessGame', params)
}

//recent bet
// export function getRecentBetList(pageNo, pageSize, method = 'post') {
//     var params = {
//         "size": pageSize,
//         "pageNo": pageNo,
//         "sortProperties": ["time"],
//         "direction": "DESC",
//     }
//     return requestData('getJustNowWithStockList', params, method)
// }


