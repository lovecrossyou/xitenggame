/**
 * Created by zhulizhe on 2017/3/2.
 */
export function GetRandomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}