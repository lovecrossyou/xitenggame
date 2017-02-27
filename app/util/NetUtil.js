/**
 * Created by huibei on 17/2/7.
 */


import {NativeModules} from 'react-native'

// const Base_url  = "http://114.251.53.22/xitenggamejar/"
// const ImageUrl  ="http://114.251.53.22/imageserver/"
// const AppKey ="b5958b665e0b4d8cae77d28e1ad3f521"
// const AppSecret = "71838ae252714085bc0fb2fc3f420110"

//生产环境
const Base_url  = "http://www.xiteng.com/xitenggame/"
const ImageUrl  ="http://www.xiteng.com/imageserver/"
const AppKey ="b5958b665e0b4d8cae77d28e1ad3f521"
const AppSecret = "71838ae252714085bc0fb2fc3f420110"

// var PersonManager = NativeModules.PersonManager

const accessInfo = {
    "phone_num":"18310066927",
    "version":"1.4.3",
    "os":"ios",
    "loginType":"",
    "signature":"9499CF9A69EBD7F586E42F0DDA1F7C06",
    "access_token":"7e43e0752bfc4e948fab0197939624b4",
    "app_key":"b5958b665e0b4d8cae77d28e1ad3f521"
}

// phone_num = "18310066927";
// version = "1.4.3";
// os = "ios";
// loginType = "";
// signature = "9499CF9A69EBD7F586E42F0DDA1F7C06";
// access_token = "7e43e0752bfc4e948fab0197939624b4";
// app_key = "b5958b665e0b4d8cae77d28e1ad3f521"

function sendNetRequest(...props) {
    this.url = props.shift(1);
    this.options = props.shift(1);
    return fetch(this.url, Object.assign({}, this.options))
        .then((response) => {
            return response.json()
        })
}

function getAccessInfo() {
    var p = new Promise(function (resolve, reject) {
        // var accessInfo = {
        //     "access_token": "5cdf787ba57e475bb411e0131455ab29",
        //     "app_key": "b5958b665e0b4d8cae77d28e1ad3f521",
        //     "os": "ios",
        //     "phone_num": "13220168837",
        //     "signature":"1D7D3E2F1B8F1CE810181B5F17E6DBF4",
        //     "version":"1.3.2"
        // }
        resolve(accessInfo)
    })
    return p
}


// function getMd5(param) {
//     return new Promise(function (res, rej) {
//         PersonManager.getMd5(param, (err, info) => {
//             res(info)
//         })
//     })
// }

export function uploadImageRequest(url, images) {
    var getAccInfo = getAccessInfo()
    return new Promise(function (resolve, reject) {
        getAccInfo.then((accessInfo) => {
            getMd5(AppSecret).then((signature)=>{
                var accessInfo = {
                    'app_key': AppKey,
                    'access_token': '',
                    'signature': signature
                }

                url = ImageUrl + url
                var formData = new FormData()
                images.forEach(function(uri,index){
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

export  function requestData(url, param, method='POST') {
    var getAccInfo = getAccessInfo()
    return new Promise(function (resolve, reject) {
        getAccInfo.then((accessInfo) => {
            param["accessInfo"] = accessInfo
            url = Base_url + url
            var p = sendNetRequest(url, {
                method: method,
                body: JSON.stringify(param),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            resolve(p.then((data) => data).catch((error) => {
                reject(error)
            }))
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
 * login
 * @param name
 * @param pwd
 */
export function login(name, pwd) {
    var params = {
        name: name,
        password: pwd
    }
    return requestData('login', params, method)
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
export function sendComment(url,stockGameId=0,imageUrls,content) {
    var params = {
        "stockGameId": stockGameId,
        "imageUrls": imageUrls,
        "content": content,
    }
    return requestData(url, params, 'POST')
}

export function shalongcommentlist(pageNo,pageSize,commentType='all') {
    var params = {
        "pageNo": pageNo,
        "size": pageSize,
        "commentType": commentType,
    }
    return requestData('commentList', params, 'POST')
}

