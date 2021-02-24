export function GeteffectTime(newTime, IntoTime, Time, effectTime) {
    newTime = new Date().getTime()
    if ((newTime - IntoTime) / 1000 > 30) { //30s内没有操作本界面这时长清0
        IntoTime = newTime
        effectTime = 0
    } else {
        Time = IntoTime
        effectTime = parseInt((newTime - Time) / 1000)
    }
    return effectTime
}