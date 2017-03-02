/**
 * Created by huibei on 17/2/28.
 */
// const x = 5
// let str = ''
// if(x<14){
//     str = str +'444'
// }
// if(x<13){
//     str +='333'
// }
//
// console.log(str)

function login() {
    console.log('xxxxxx')
    console.log('aaaaaaa')
}

function loginP() {
    return new Promise((res,rej)=>{
        res('loginP ok')
    })
}


loginP().then((response)=>{
    console.log('xxxxxxp')
    console.log('aaaaaaap')
    console.log(response)
})


login()


