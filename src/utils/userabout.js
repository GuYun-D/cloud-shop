// 临时id不能变，要存到本地
import { v4 as uuidv4 } from 'uuid'

let TOKEN_KEY = 'TOKEN_KEY'

/**
 * 为未登录用户生成临时id，返回生成的id
 */
function getUserTempId() {
  let userTempId = localStorage.getItem('USERTEMPID_KEY')

  if (!userTempId) {
    userTempId = uuidv4();
    localStorage.setItem('USERTEMPID_KEY', userTempId)
  }

  return userTempId
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

function getToken(){
  return localStorage.getItem(TOKEN_KEY)
}

function removeToken(){
  localStorage.removeItem(TOKEN_KEY)
}

function getUserInfo(userInfoTemp){
  const userInfo = JSON.parse(localStorage.getItem('USER_INFO'))
  if(userInfo){
    userInfoTemp.name = userInfo.phone
  }
}

export {
  getUserTempId,
  setToken,
  getToken,
  removeToken,
  getUserInfo
}