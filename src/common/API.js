/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 10:30:00
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-13 19:26:16
 */

//  引入httpUtil
import { get, post } from './httpUtil'

// 基本路径
const baseUrl = '/peopleMediate/V1.0.0.3'

// 登录接口
const login = (params) => get(`${baseUrl}/login`, params)
// 机构排名接口
const organizationRankings = (params) => post(`${baseUrl}/institutionalRankings`, params)
// 机构详情接口
const organizationDetails = (params) => get(`${baseUrl}/organizationDetails`, params)

export {
  login,
  organizationRankings,
  organizationDetails
}
