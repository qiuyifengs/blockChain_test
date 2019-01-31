<template lang="pug">
div
    el-card.f-mb24(shadow="never")
      el-table(:data="tableData" :header-cell-class-name="header" fit ref="Table" style="width: 100%")
        el-table-column(prop="nonce" label="高度" width="180")
          template(slot-scope="scope")
            a.toBlockHash(href="#" @click='testBlock') {{ scope.row.nonce }}
        el-table-column(prop="timestamp" label="时间" min-width="120" show-overflow-tooltip)
            template(slot-scope="scope")
                span {{ scope.row.timestamp | timetrans }}
        el-table-column(prop="number" label="交易数量" min-width="150" show-overflow-tooltip)
        el-table-column(prop="receiptsRoot" label="交易金额(BTC)" min-width="150" show-overflow-tooltip)
        el-table-column(prop="totalDifficulty" label="超级节点" min-width="200" show-overflow-tooltip)
        el-table-column(prop="size" label="Size（KB）" min-width="120" show-overflow-tooltip)
    el-button(style="margin-top: 8px" @click='loadMore' size="medium" round) View more
</template>

<script>
import blockChainApi from '@/api/blockChain'
export default {
  name: 'LatestBlockTable',
  components: {

  },
  data () {
    return {
      tableData: []
    }
  },
  created() {
    this.intervalid = setInterval(() => {
        this.getBlockTop10(this.messageStatus)
    }, 6000)
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
    testBlock() {
      const id = 1
      this.$router.push({ name: 'blocks-detail', params: { id }})
    },
    loadMore() {
      this.$router.push({ path: '/blocks' })
    }
  }
}
</script>