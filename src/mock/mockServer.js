/**
 * 利用mock提供mock接口
 */

import Mock from 'mockjs'
import floors from './floors.json'
import searchList from './search.json'
import detail from './detail.json'
import user from './user.json'
import trade from './trade.json'

// 提供楼层接口
Mock.mock('http://localhost:8080/mock/floors', 'get' , {code: 200, data: floors})

// 提供搜索接口
Mock.mock('http://localhost:8080/mock/search', 'post', {code: 200, data: searchList})

// 提供详情接口
Mock.mock('http://localhost:8080/mock/detail', 'get', {code: 200, data: detail})

// 提供用户信息接口
Mock.mock('http://localhost:8080/mock/user', 'get', {code: 200, data: user})

// 提供订单信息接口
Mock.mock('http://localhost:8080/mock/trade', 'get', {code: 200, data: trade})