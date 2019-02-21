/**
 * Created by qiuyifeng on 19/1/18.
 */
import service from './axios-service'
const API_BLOCK_ROUTER = 'http://192.168.4.188:3001/block'
const API_TRANSACTION_ROUTER = 'http://192.168.4.188:3001/txs'

const block = {
  getBlockCount: (data, callback) => {
    service.get(API_BLOCK_ROUTER + '/count', data, callback)
  },
  getBlockTop10: (data, callback) => {
    service.get(API_BLOCK_ROUTER + '/top10', data, callback)
  },
  getBlockAll: (data, callback) => {
    service.get(API_BLOCK_ROUTER + '/all', data, callback)
  },
  getBlockByNumber: (data, callback) => {
    service.getSingle(API_BLOCK_ROUTER, data, callback)
  }
}

const transaction = {
  getTxsCount: (data, callback) => {
    service.get(API_TRANSACTION_ROUTER + '/count', data, callback)
  },
  getTxsTop10: (data, callback) => {
    service.get(API_TRANSACTION_ROUTER + '/top10', data, callback)
  },
  getTxsAll: (data, callback) => {
    service.get(API_TRANSACTION_ROUTER + '/all', data, callback)
  },
  getTxsByNumber: (data, callback) => {
    service.get(API_TRANSACTION_ROUTER + '/count', data, callback)
  },
  getTxsByblock: (data, callback) => {
    service.get(API_TRANSACTION_ROUTER + '/byblock', data, callback)
  },
  getTxsByHash: (data, callback) => {
    service.getSingle(API_TRANSACTION_ROUTER, data, callback)
  },
  getTxsByAddress: (address, data, callback) => {
    service.getTxsByAddress(API_TRANSACTION_ROUTER, address, data, callback)
  }
}

const blockChainApi = {
  block: block,
  transaction: transaction
}

export default blockChainApi
