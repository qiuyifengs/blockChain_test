<template lang="pug">
div
  el-card.f-mb24(shadow="never" style="max-width: 1200px; margin: 76px auto 16px;" :body-style="{ padding: '5px' }")
    el-row(type="flex" justify="space-between")
      el-col(:span="6")
        h3.f-ml16 区块
      el-col(:span="18") 
        el-pagination.f-fr.f-mb16.f-mt16.f-mr16(
                      background 
                      @size-change="sizeChange" 
                      @current-change="currentChange" 
                      :current-page.sync="currentPage" 
                      :page-sizes="[10,20,30,40]" 
                      :page-size="pageSize" 
                      layout="total, sizes, prev, pager, next, jumper" 
                      :total="total")
    el-table(:data="tableData" :header-cell-class-name="header" fit ref="Table" style="width: 100%" v-loading.body="listLoading")
        el-table-column(prop="hash" label="哈希值" min-width="180" show-overflow-tooltip)
            template(slot-scope="scope")
                a.toBlockHash(href="#") {{ scope.row.hash }}
        el-table-column(prop="timestamp" label="时间" sortable min-width="180" show-overflow-tooltip)        
        el-table-column(prop="nonce" label="区块" sortable min-width="180" show-overflow-tooltip)
        el-table-column(prop="totalDifficulty" label="价值" sortable min-width="180" show-overflow-tooltip)
        el-table-column(prop="parentHash" label="发送方" min-width="180" show-overflow-tooltip)
            template(slot-scope="scope")
                a.toBlockHash(href="#") {{ scope.row.parentHash }}
        el-table-column(prop="receiptsRoot" label="接收方" min-width="180" show-overflow-tooltip)
            template(slot-scope="scope")
                a.toBlockHash(href="#") {{ scope.row.receiptsRoot }}
        el-table-column(prop="difficulty" label="类型" min-width="180" show-overflow-tooltip)
        el-table-column(prop="number" label="数量" sortable min-width="180" show-overflow-tooltip)

    el-pagination.f-fr.f-mt16.f-mb16.f-mr16(
                    background 
                    @size-change="sizeChange" 
                    @current-change="currentChange" 
                    :current-page.sync="currentPage" 
                    :page-sizes="[10,20,30,40]" 
                    :page-size="pageSize" 
                    layout="total, sizes, prev, pager, next, jumper" 
                    :total="total")
</template>

<script>
import blockChainApi from '@/api/blockChain'
export default {
  name: 'Blocks',
  components: {
  },
  data () {
    return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        listLoading: false,
        tableData: []
    }
  },
  created() {
      this.getBlockAll()
  },
  methods: {
    header ({ row, column, rowIndex, columnIndex }) {
      return 'primary-row'
    },
    sizeChange(size) {
      this.pageSize = size
      this.getBlockAll()
    },
    currentChange(currentPage) {
      this.currentPage = currentPage
      this.getBlockAll()
    },
    getBlockAll() {
        return new Promise((resolve, reject) => {
            this.listLoading = true
            const param = {
                page: this.currentPage,
                limit: this.pageSize
            }
            blockChainApi.block.getBlockAll(param, res => {
            this.listLoading = false
            if (res.code === 1) {
                this.tableData = res.data.docs
                this.total = res.data.total
                resolve()
            } else {
                reject(res.message)
            }
        })
      }) 
    }
  }
}
</script>

<style lang="scss">
.blockForm .el-form-item{
    margin-bottom: 5px
}
.blockForm .el-form-item__label {
  color: #6e707396 !important
}
/*.transactionsPage .el-pagination.is-background .btn-prev {
    border-right: none !important
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    padding: 0 8px !important;
    border: 1px solid #ccc;
    border-radius: 1px !important
}*/
</style>
