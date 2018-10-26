/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-09-19 14:06:35
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-10-26 14:03:49
 */

import { area } from '@/utils/dictionaryMapping'

// 获取并设置当前用户的数据权限
export const dataPermission = (areacode) => {
  let temp = []
  if (areacode === 'SHJCK01000') {
    temp = area
  } else {
    area.map(item => {
      if (item.value === areacode) {
        temp.push(item)
      }
    })
  }
  return temp
}
