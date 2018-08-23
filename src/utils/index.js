import { area } from './dictionaryMapping'

// 时间格式化
export let dateFormat = (dateTime, valueFormat) => {
  let newDate = new Date(dateTime)
  valueFormat = valueFormat || 'yyyy-MM-dd'
  let date = {
    'yy': newDate.getFullYear(),
    'MM': newDate.getMonth() + 1,
    'dd': newDate.getDate(),
    'hh': newDate.getHours(),
    'mm': newDate.getMinutes(),
    'ss': newDate.getSeconds(),
    'D': ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][newDate.getDay()]
  }
  // 输出年 y+:匹配1个到多个y,i:忽略大小写
  if (/(y+)/i.test(valueFormat)) {
    valueFormat = valueFormat.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  // 输出月、日、时、分、秒、星期
  Object.keys(date).forEach(function (i) {
    // 只有写成`(${i})`形式，才能在正则表达式中捕获子匹配，进而才能用到RegExp.$1的值
    if (new RegExp(`(${i})`).test(valueFormat)) {
      // 判断，如果时间为一位数，则在前面加'0'
      if (RegExp.$1.length === 2) {
        if (date[i] < 10) {
          date[i] = `0${date[i]}`
        }
      }
      // 替换初始化函数时候传入yyyy-mm-dd hh:mm:ss D
      valueFormat = valueFormat.replace(RegExp.$1, date[i])
    }
  })
  return valueFormat
}
// 日期选择器配置--包含禁用日期、快捷选项和周起始日
export const pickerOptions = {
  disabledDate (time) {
    return time.getTime() > Date.now()
  },
  shortcuts: [{
    text: '最近一周',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近半年',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一年',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      picker.$emit('pick', [start, end])
    }
  }],
  firstDayOfWeek: 1
}

// 日期选择器配置--包含禁用日期和周起始日
export const pickerDisabledDate = {
  disabledDate (time) {
    return time.getTime() > Date.now()
  },
  firstDayOfWeek: 1
}

// 日期范围选择器默认日期范围(本年)
export let defaultDateRage = () => {
  const enddate = dateFormat(new Date())
  const startDate = dateFormat(new Date(new Date().setDate(1)).setMonth(0))
  return [startDate, enddate]
}

// 日期选择器默认日期(本年)

export let defaultYear = () => {
  const year = dateFormat(new Date(), 'yyyy')
  return year
}

// 通过地区名称查找地区编码
export const findAreaNameByValue = (value) => {
  let result = area.filter(item => {
    if (item.value === value) {
      return true
    }
  })
  return result[0] ? result[0].label : '未知区域'
}

// 找到指定日期所在周星期几的日期
export const findWeekRangeByToday = (date, weekday) => {
  return new Date(1000 * 60 * 60 * 24 * (weekday - new Date(date).getDay()) + new Date(date).getTime())
}
