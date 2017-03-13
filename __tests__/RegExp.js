/**
 * Created by zhulizhe on 2017/3/13.
 */
// let str = '2013-09-24'
// const time = str.replace(/-/g,"/")
// console.log(str)
// console.log(time)

let str = '2013/09/24'
const time = str.replace(/\//g,"-")
console.log(str)
console.log(time)