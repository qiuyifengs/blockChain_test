<template lang="pug">
div
    el-card.f-mb24(shadow="never" style="max-width: 1200px; margin: 76px auto 16px;")
        .clearfix(slot="header")
            span(style="vertical-align: -webkit-baseline-middle") Blockchain #9999
            el-pagination.f-fr.transactionsPage(background
                     class="f-fr transactionsPage" 
                      @size-change="sizeChange" 
                      @current-change="currentChange" 
                      :current-page.sync="currentPage" 
                      :page-sizes="[10,20,30,40]" 
                      :page-size="pageSize"
                      prev-text="prev"
                      next-text="next"
                      layout="prev, next" 
                      :total="total")
            h2(style="margin-bottom: 0; margin-top: 28px") Information overview
        
        el-row(type="flex")
            el-col(:span="12")
                el-form(label-positio="left" label-width="100" :model="formInline" class="blockForm")
                    el-form-item(label="HashValue:")
                      span 8safasdfjhg23jhjjbsdjfgjhgsjf348safasdfjhg23jhjjbsdjfgjhgsjf3444
                    el-form-item(label="TransactionAmount:")
                        span 5.13464 BTC
                    el-form-item(label="SuperNode:")
                        span 5.13464 BTC
                    el-form-item(label="IssueTime:")
                        span 2019-01-19 09:39:34
            el-col(:span="8")
                el-form(label-positio="left" label-width="100" :model="formInline" class="blockForm")
                    el-form-item(label="TransactionAmount:")
                        span 3
                    el-form-item(label="Commission:")
                        span 5.13464 BTC
                    el-form-item(label="BlockSize(byte):")
                        span 1.23.344
        h2 Transaction
        el-table(:data="tableData" :header-cell-class-name="header" fit ref="Table" style="width: 100%")
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

        el-pagination.f-fr.f-mt16.f-mb16(
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
  props: {
    id: 0
  },
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
        listLoading: true,
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
