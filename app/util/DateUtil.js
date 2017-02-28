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