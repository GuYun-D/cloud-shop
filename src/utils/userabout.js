// 临时id不能变，要存到本地
import {v4 as uuidv4} from 'uuid'

/**
 * 为未登录用户生成临时id，返回生成的id
 */
function getUserTempId(){
  let userTempId = localStorage.getItem('USERTEMPID_KEY')

  if(!userTempId){
    userTempId = uuidv4();
    localStorage.setItem('USERTEMPID_KEY', userTempId)
  }

  return userTempId
}

export {
  getUserTempId
}