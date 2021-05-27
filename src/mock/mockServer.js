/**
 * 利用mock提供mock接口
 */

import Mock from 'mockjs'
import floors from './floors.json'

// 提供楼层接口
Mock.mock('http://localhost:8080/mock/floors', 'get' , {code: 200, data: floors})