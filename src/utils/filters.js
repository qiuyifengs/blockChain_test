/**
 * 格式化时间
 *
 * @param {String} str
 * @returns 格式化后的时间
 */
const timetransFilterTest = value => {
  if (!value) return ''
  var time = parseInt(new Date().getTime() / 1000) - value // 现在的时间-传入的时间 = 相差的时间（单位 = 秒）
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return parseInt(time / 1000) + '秒前'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000), 10) + '秒前'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000), 10) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt((time / 3600000), 10) + '小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt((time / 86400000), 10) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt((time / 2592000000), 10) + '月前'
  } else {
    return parseInt((time / 31536000000), 10) + '年前'
  }
}

export {
  timetransFilterTest
}
