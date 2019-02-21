<template lang="pug">
div
    el-card.f-mb24(shadow="never")
      el-table(:data="tableData" :header-cell-class-name="header" fit ref="Table" style="width: 100%")
        el-table-column(type="index" width="50")
        el-table-column(prop="hash" :label="$t('message.hash')" min-width="150")
          template(slot-scope="scope")
            a.toBlockHash.text-deal(href="#" @click='testTransactions(scope.row)') {{ scope.row.hash }}
        el-table-column(prop="blockNumber" label="Block" min-width="80")
          template(slot-scope="scope")
            a.toBlockHash(href="#" @click="enterBlockDetail(scope.row)") {{ scope.row.blockNumber }}
        el-table-column(prop="gasPrice" label="GasPrice" min-width="80")
          template(slot-scope="scope")
            span {{ scope.row.gasPrice | gasPriceFilter }}
        el-table-column(prop="from" label="From" min-width="120")
          template(slot-scope="scope")
            a.toBlockHash.text-deal(href="#" @click="txsByAddress(scope.row, 1)") {{ scope.row.from }}
        el-table-column(prop="to" label="TO" min-width="120")
          template(slot-scope="scope")
            a.toBlockHash.text-deal(href="#" @click="txsByAddress(scope.row, 2)") {{ scope.row.to }}
    el-button(style="margin-top: 8px" @click='loadMore' size="medium" round) View All Transactions
</template>

<script>
import Web3 from 'web3'
import _ from 'lodash'
import blockChainApi from '@/api/blockChain'
const webjs = new Web3(Web3.utils)

export default {
  name: 'LatestDealTable',
  components: {

  },
  data () {
    return {
      tableData: []
    }
  },
  created() {
    this.intervalid = setInterval(() => {
        this.getTxsTop10(this.messageStatus)
    }, 3000)
    this.getTxsTop10()
  },
  filters: {
    gasPriceFilter(val) {
      return webjs.fromWei(val, 'finney')
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalid)
  },
  methods: {
    header ({ row, column, rowIndex, columnIndex }) {
      return 'primary-row'
    },
    getTxsTop10() {
      return new Promise((resolve, reject) => {
        this.listLoading = true
        blockChainApi.transaction.getTxsTop10({}, res => {
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
    txsByAddress(row, type) {
      const id = type === 1 ? row.from : row.to
      this.$router.push({ name: 'TransactionsByAddress', params: { id }})
    },

    testTransactions(row) {
      const id = row.hash
      this.$router.push({ name: 'transactions-detail', params: { id }})
    },

    enterBlockDetail(row) {
      const id = row.blockNumber
      this.$router.push({ name: 'blocks-detail', params: { id }})
    },

    loadMore() {
      this.$router.push({ path: '/transactions' })
    }
  }
}
</script>