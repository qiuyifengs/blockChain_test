/**
 * Created by qiuyifeng on 19/1/18.
 */
import service from './axios-service'
const API_TODO_ROUTER = '/dmp'

const tag = {
  addSystemTag: (data, callback) => {
    service.post(API_TODO_ROUTER + '/tag', data, callback)
  }
}

const dmp = {
  tag: tag
}

export default dmp
