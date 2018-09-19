/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 10:30:00
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-19 11:59:22
 */

//  引入httpUtil
import { get, post, all } from '@/utils/httpUtil'

// 基本路径
const baseUrl = '/peopleMediate/V1.1.0'

// 登录接口
export const login = (params) => get(`${baseUrl}/login`, params)

// 登录状态接口
export const loginStatus = (params) => get(`${baseUrl}/loginStatus`, params)

// 退出登录
export const logout = (params) => get(`${baseUrl}/logout`, params)

// 获取模块权限
export const permission = (params) => get(`${baseUrl}/permission`, params)

// 机构排名接口
export const organizationRankings = (params, responseType) => post(`${baseUrl}/institutionalRankings`, params, responseType)

// 机构详情接口 (司法局和司法所)
export const organizationDetails = (params) => all([
  {url: `${baseUrl}/organizationDetailsBaseTeamNumber`, params: params},
  {url: `${baseUrl}/organizationDetailsSpecializationResource`, params: params},
  {url: `${baseUrl}/organizationDetailsSuccessAmount`, params: params}
])

// 机构详情接口 (调委会)
export const mediationDetails = (params) => get(`${baseUrl}/mediationCommitteeDetails`, params)

// 人员排名接口
export const peopleRankings = (params, responseType) => post(`${baseUrl}/portraysList`, params, responseType)

// 人员详情接口
export const peopleDetails = (params) => all([
  {url: `${baseUrl}/portraitDetailbaseinfo`, params: params},
  {url: `${baseUrl}/portraitDetailbusinessinfo`, params: params},
  {url: `${baseUrl}/portraitDetailcaseinfo`, params: params}
])

// 首页
export const homeData = (params) => all([
  {url: `${baseUrl}/businessMap`, params: params},
  {url: `${baseUrl}/businessCount`, params: params},
  {url: `${baseUrl}/businessType`, params: params},
  {url: `${baseUrl}/businessProcess`, params: params},
  {url: `${baseUrl}/onlineNumber`, params: params}
])

// 工作质量分析 登录人员分析
export const loginAnalysis = (params) => all([
  {url: `${baseUrl}/loginUser`, params: params[0]},
  {url: `${baseUrl}/loginCount`, params: params[1]}
])
