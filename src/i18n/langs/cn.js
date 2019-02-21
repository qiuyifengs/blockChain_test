import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // 引入element语言包

const cn = { message: {
  searchPlaceholder: '您可搜索的内容例如：地址/交易哈希/区块/代币名称',
  home: '首页',
  go: '搜索',
  homeTip: '欢迎使用幽灵区块链浏览器',
  BlockChain: '区块链浏览器',
  blocks: '区块',
  transaction: '交易',
  superNode: '超级节点',
  LatestBlock: '最新区块',
  LatestDeal: '最新交易',
  hash: '哈希',
  block: '区块',
  Age: '块龄',
  txn: '交易',
  signer: '矿工',
  GasUsed: '燃料用量',
  gasLimit: '燃料限制'
}, ...zhLocale }
export default cn
