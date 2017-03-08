/**
 * Created by zhulizhe on 2017/3/7.
 */
// 长整数相乘  12*34

// 获取字符串指定位置的数值
function getValueAtIndex(number,i) {
    if (i < number.length){
        return number[number.length - i - 1] - '0'
    }
    return 0;
}

// 带进位的单值相乘
function mutilply_single(singleNumberA, singleNumberB, c) {
    let result = parseInt(singleNumberA) * parseInt(singleNumberB) + c
    let resultV = result%10
    let carry1 = parseInt((result - resultV)/10)
    let result1 = {resultV,carry1}
    return result1
}

// 单值乘以字符串
function mutil_string_single(number, singleValue) {
    const numberlen = number.length
    let currentCarry = 0
    let result = []
    for(let i = 0; i < number.length; i++){
        let value = getValueAtIndex(number,i)
        let {carry1,resultV} = mutilply_single(singleValue,value,currentCarry)
        currentCarry = carry1
        result.push(resultV)
    }
    if(currentCarry!=0){
        result.push(currentCarry)
    }
    return result.reverse()
}

// 计算入口
function multiply(numA,numB) {
    const lengthB = numB.length
    let final_result = ''
    for(let i = lengthB-1;i>=0;i--){
        let result_line = mutil_string_single(numA,getValueAtIndex(numB,i))
        let new_line = add_new_line(result_line, i)

        let line_string = new_line.join('')
        console.log(line_string)
        final_result = accumulator(final_result,line_string)
    }
    return final_result
}

// 带进位的单值相加
function plus_single(a,b,carry) {
    let s = a+ b +carry
    let resultV = s%10
    let carry1 = (s - resultV)/10
    return {resultV,carry1}
}

// 相邻行的相加
function get_max(result_string, line_string) {
    return result_string.length > line_string.length? result_string : line_string
}

function accumulator(result_string,line_string) {
    let result = 0
    let result_arr = []

    let carry = 0

    let max_line = get_max(result_string,line_string)

    for(let i = 0;i<max_line.length;i++){
        let line_c = getValueAtIndex(line_string,i)
        let result_c = getValueAtIndex(result_string,i)
        let {resultV,carry1} = plus_single(line_c,result_c,carry)
        carry = carry1
        result_arr.push(resultV)
        console.log('开始计算 '+line_c + '+ '+result_c + '=' + resultV)
    }
    let s = result_arr.reverse().join('')
    if(carry){
        s = carry + s
    }
    return s
}

//每行的结果补零处理
function add_new_line(line_string, offset){
    function moveLeft(line, offset) {
        for (var i = 0; i < offset; i++){
            line.push(0)
        }
        return line
    }
    let new_line = moveLeft(line_string, offset)
    return  new_line
}

// console.log(plus_single(9,2,1))
// multiply('123','45')
console.log(multiply('999999','888888'))