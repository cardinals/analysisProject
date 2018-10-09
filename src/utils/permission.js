/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-09-19 14:06:35
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-10-09 16:35:52
 */

import { permission } from '@/api/api'
import { area } from '@/utils/dictionaryMapping'

// 获取并设置当前用户的模块权限
export const componentsPermission = () => {
  return new Promise((resolve, reject) => {
    permission({}).then(res => {
      let data = res.data
      data = data.map(parent => {
        parent.disable = false
        if (parent.children) {
          parent.children = parent.children.map(children => {
            children.disable = false
            return children
          })
        }
        return parent
      })
      resolve(data)
    })
  })
}

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
