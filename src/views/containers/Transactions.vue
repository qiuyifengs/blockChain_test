<template lang="pug">
div
  el-card.f-mb24(shadow="never" style="max-width: 1200px; margin: 76px auto 16px;" :body-style="{ padding: '5px' }")
    el-row(type="flex" justify="space-between")
      el-col(:span="6")
        h3.f-ml16 交易
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
    el-table(:data="tableData"
            :header-cell-class-name="header" 
            fit
            highlight-current-row
            ref="Table" 
            style="width: 100%" 
            v-loading.body="listLoading")
      el-table-column(prop="blockHash" label="交易哈希值" min-width="180" show-overflow-tooltip)
        template(slot-scope="scope")
          a.toBlockHash(href="#") {{ scope.row.blockHash }}
      el-table-column(prop="nonce" label="区块" sortable min-width="180" show-overflow-tooltip)
      el-table-column(prop="gasPrice" label="价值" sortable min-width="180" show-overflow-tooltip)
      el-table-column(prop="s" label="发送方" min-width="180" show-overflow-tooltip)
        template(slot-scope="scope")
          a.toBlockHash(href="#") {{ scope.row.s }}
      el-table-column(prop="r" label="接收方" min-width="180" show-overflow-tooltip)
        template(slot-scope="scope")
          a.toBlockHash(href="#") {{ scope.row.r }}
      el-table-column(prop="type" label="类型" min-width="180" show-overflow-tooltip)
      el-table-column(prop="blockNumber" label="数量" sortable min-width="180" show-overflow-tooltip)
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
  name: 'transaction',
  components: {
  },
  data () {
    return {
      formInline: {
          user: '',
          region: ''
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      listLoading: false,
      tableData: []
    }
  },
  created() {
    this.getTxsAll()
  },
  methods: {
    header ({ row, column, rowIndex, columnIndex }) {
      return 'primary-row'
    },
    sizeChange (size) {

      this.pageSize = size
      this.getTxsAll()
    },
    currentChange (currentPage) {
      this.currentPage = currentPage
      this.getTxsAll()
    },

    getTxsAll() {
      return new Promise((resolve, reject) => {
        this.listLoading = true
        const param = {
          page: this.currentPage,
          limit: this.pageSize
        }
        blockChainApi.transaction.getTxsAll(param, res => {
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
  
</style>
