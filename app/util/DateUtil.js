/**
 * Created by huibei on 17/2/8.
 */
export function dateRemainByNow(dateString) {
    let timeDesc = ''
    const time = dateString.replace(/-/g,"/")
    const date = new Date(time)
    const now = new Date()
    const t = date.getTime() - now.getTime()
    let d=0;
    let h=0;
    let m=0;
    let s=0;
    if(t>=0){
        d=Math.floor(t/1000/60/60/24);
        h=Math.floor(t/1000/60/60%24);
        m=Math.floor(t/1000/60%60);
        s=Math.floor(t/1000%60);
    }
    if(d>0){
        timeDesc += (d +'天')
    }
    if(h>0){
        timeDesc += (h +'小时')
    }
    if(m>0){
        timeDesc += (m +'分钟')
    }
    if(s>0){
        timeDesc += (s+'秒')
    }
    return timeDesc

}

export function dateDistanceByNow(dateString){
    var timeDesc = dateString
    if(dateString == undefined ||timeDesc==null)return ''
    var time = dateString.replace(/-/g,"/")
    var date = new Date(time)
    var now = new Date()
    var t = now.getTime() - date.getTime()
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    if(t>=0){
        d=Math.floor(t/1000/60/60/24);
        h=Math.floor(t/1000/60/60%24);
        m=Math.floor(t/1000/60%60);
        s=Math.floor(t/1000%60);
    }
    if(d>0){
        timeDesc= dateString
    }
    else if(h>0){
        timeDesc= h +'小时前'
    }
    else if(m>0){
        timeDesc= m +'分钟前'
    }
    else if(s>0){
        timeDesc= '刚刚'
    }
    return timeDesc
}

/**
 * 方法作用：【格式化时间】
 * 使用方法
 * 示例：
 *      使用方式一：
 *      var now = new Date();
 *      var nowStr = now.dateFormat("yyyy-MM-dd hh:mm:ss");
 *      使用方式二：
 *      new Date().dateFormat("yyyy年MM月dd日");
 *      new Date().dateFormat("MM/dd/yyyy");
 *      new Date().dateFormat("yyyyMMdd");
 *      new Date().dateFormat("yyyy-MM-dd hh:mm:ss");
 * @param format {date} 传入要格式化的日期类型
 * @returns {2015-01-31 16:30:00}
 */
Date.prototype.dateFormat = function (format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}
/***********************************************************************
 *                           日期时间工具类                            *
 *                     注：调用方式，deteUtil.方法名                   *
 * ********************************************************************/
var dateUtil = {
    /*
     * 方法作用：【取传入日期是星期几】
     * 使用方法：dateUtil.nowFewWeeks(new Date());
     * @param date{date} 传入日期类型
     * @returns {星期四，...}
     */
    nowFewWeeks: function (date) {
        if (date instanceof Date) {
            var dayNames = new Array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            return dayNames[date.getDay()];
        } else {
            return "Param error,date type!";
        }
    },
    /*
     * 方法作用：【字符串转换成日期】
     * 使用方法：dateUtil.strTurnDate("2010-01-01");
     * @param str {String}字符串格式的日期，传入格式：yyyy-mm-dd(2015-01-31)
     * @return {Date}由字符串转换成的日期
     */
    strTurnDate: function (str) {
        var re = /^(\d{4})\S(\d{1,2})\S(\d{1,2})$/;
        var dt;
        if (re.test(str)) {
            dt = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3);
        }
        return dt;
    },
    /*
     * 方法作用：【计算2个日期之间的天数】
     * 传入格式：yyyy-mm-dd(2015-01-31)
     * 使用方法：dateUtil.dayMinus(startDate,endDate);
     * @startDate {Date}起始日期
     * @endDate {Date}结束日期
     * @return endDate - startDate的天数差
     */
    dayMinus: function (startDate, endDate) {
        if (startDate instanceof Date && endDate instanceof Date) {
            var days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
            return days;
        } else {
            return "Param error,date type!";
        }
    }
}

export function dateFormat(date,format) {
    return date.dateFormat(format)
}