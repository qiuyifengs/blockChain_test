<template lang="pug">
div
    el-card.f-mb24(shadow="never")
      el-table(:data="tableData" :header-cell-class-name="header" fit ref="Table" style="width: 100%")
        el-table-column(prop="nonce" label="高度" width="180")
        el-table-column(prop="from" label="时间" min-width="120" show-overflow-tooltip)
        el-table-column(prop="blockNumber" label="交易数量" min-width="150" show-overflow-tooltip)
        el-table-column(prop="gasPrice" label="交易金额(BTC)" min-width="150" show-overflow-tooltip)
        el-table-column(prop="gas" label="超级节点" min-width="200" show-overflow-tooltip)
        el-table-column(prop="transactionIndex" label="Size（KB）" min-width="120" show-overflow-tooltip)
    el-button(style="margin-top: 8px" @click='loadMore' size="medium" round) View more
</template>

<script>
import blockChainApi from '@/api/blockChain'
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
    }, 6000)
    this.getTxsTop10()
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
    loadMore() {
        const id = 1
        this.$router.push({ name: 'transactions-detail', params: { id }})
    }
  }
}
</script>