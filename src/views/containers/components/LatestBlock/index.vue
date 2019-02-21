<template lang="pug">
div
    el-card.f-mb24(shadow="never")
      el-table(:data="tableData" :header-cell-class-name="header" fit ref="Table" style="width: 100%")
        el-table-column(type="index" width="50")
        el-table-column(prop="hash" label="Hash" min-width="150")
          template(slot-scope="scope")
            span.text-deal {{ scope.row.hash }}
        el-table-column(prop="number" :label="$t('message.block')" min-width="100")
          template(slot-scope="scope")
            a.toBlockHash(href="#" @click='testBlock(scope.row)') {{ scope.row.number }}
        el-table-column(prop="timestamp" :label="$t('message.Age')" min-width="120")
          template(slot-scope="scope")
            a.toBlockHash(href="#" @click="enterTxnByBlock(scope.row)") {{ (scope.row.transactions).length }} Txns
            span {{ scope.row.timestamp | timetransFilter }} 
        el-table-column(prop="validator" :label="$t('message.signer')" min-width="200")
          template(slot-scope="scope")
            span.text-deal {{ scope.row.validator }}
        el-table-column(prop="gasUsed" :label="$t('message.GasUsed')" min-width="120")
          template(slot-scope="scope")
            span {{ scope.row.gasUsed | gasUsedFilter }}
        el-table-column(prop="gasLimit" :label="$t('message.gasLimit')" min-width="120")
          template(slot-scope="scope")
            span {{ scope.row.gasLimit | gasLimitFilter }}
    el-button(style="margin-top: 8px" @click='loadMore' size="medium" round) View All Blocks
</template>

<script>
import moment from 'moment'
import blockChainApi from '@/api/blockChain'
import Web3 from 'web3'
const webjs = new Web3(Web3.utils)

export default {
  name: 'LatestBlockTable',
  components: {

  },
  data () {
    return {
      tableData: []
    }
  },
  filters: {
    timetransFilter(time) {
      const timestamp = moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
      return ` in ${timestamp.substr(-2, 2)} secs`
    },
    gasUsedFilter(val) {
      return webjs.fromWei(val, 'finney')
    },
    gasLimitFilter(val) {
      return webjs.fromWei(val, 'finney')
    }
  },
  created() {
    this.intervalid = setInterval(() => {
        this.getBlockTop10(this.messageStatus)
    }, 3000)
    this.getBlockTop10()
  },
  beforeDestroy() {
    clearInterval(this.intervalid)
  },
  methods: {
    header ({ row, column, rowIndex, columnIndex }) {
      return 'primary-row'
    },
    getBlockTop10() {
      return new Promise((resolve, reject) => {
        this.listLoading = true
        blockChainApi.block.getBlockTop10({}, res => {
          this.listLoading = false
          if (res.code === 1) {
            this.tableData = res.data
            resolve()
          } else {
            reject(res.message)
          }
        })
      }) 
    },
    enterTxnByBlock(row) {
      const id = row.number
      this.$router.push({ name: 'TransactionByblock', params: { id }})
    },
    testBlock(row) {
      const id = row.number
      this.$router.push({ name: 'blocks-detail', params: { id }})
    },
    loadMore() {
      this.$router.push({ path: '/blocks' })
    }
  }
}
</script>