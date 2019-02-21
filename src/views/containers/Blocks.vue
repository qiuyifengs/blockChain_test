<template lang="pug">
div
  el-card.f-mb24(shadow="never" style="max-width: 1200px; margin: 76px auto 16px;" :body-style="{ padding: '5px' }")
    el-row(type="flex" justify="space-between")
      el-col(:span="6")
        h3.f-ml16 block
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
        el-table-column(type="index" width="50")
        el-table-column(prop="hash" :label="$t('message.hash')" min-width="150")
          template(slot-scope="scope")
            span.text-deal {{ scope.row.hash }}
        el-table-column(prop="number" label="Height" min-width="80")
            template(slot-scope="scope")
                a.toBlockHash.text-deal(href="#" @click='enterBlockDetail(scope.row)') {{ scope.row.number }}
        el-table-column(prop="timestamp" label="Age" min-width="100")
            template(slot-scope="scope")
                a.toBlockHash(href="#" @click="enterTxnBySigner(scope.row)") {{ scope.row.transactions.length }} Txns
                span {{ scope.row.timestamp | timetransFilter }}
        el-table-column(prop="validator" :label="$t('message.signer')" min-width="200")
            template(slot-scope="scope")
                a.toBlockHash.text-deal(href="#" @click="enterTxnBySigner(scope.row)") {{ scope.row.validator }}
        el-table-column(prop="gasUsed" :label="$t('message.GasUsed')" min-width="120")
            template(slot-scope="scope")
                span {{ scope.row.gasUsed | gasUsedFilter }} 
        el-table-column(prop="gasLimit" :label="$t('message.gasLimit')" min-width="120" )
            template(slot-scope="scope")
                span {{ scope.row.gasLimit | gasLimitFilter }}
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
import _ from 'lodash'
import moment from 'moment'
import blockChainApi from '@/api/blockChain'
import Web3 from 'web3'
const webjs = new Web3(Web3.utils)

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
    const self = this
    this.$getItem('BlockPageSize', (err, value) => {
      if (_.isNull(err) && value) self.pageSize = value
      this.getBlockAll()
    })
  },
  methods: {
    header ({ row, column, rowIndex, columnIndex }) {
      return 'primary-row'
    },

    enterTransactionDetail(row) {
        const id = row.hash
        this.$router.push({ name: 'TransactionsByAddress', params: { id }})
    },

    enterBlockDetail(row) {
        const id = row.number
        this.$router.push({ name: 'blocks-detail', params: { id }})
    },

    enterTxnBySigner(row) {
        const id = row.validator
        this.$router.push({ name: 'TransactionsByAddress', params: { id }})
    },
    
    sizeChange(size) {
      this.pageSize = size
      this.$setItem('BlockPageSize', size)
      this.getBlockAll()
    },

    currentChange(currentPage) {
      this.currentPage = currentPage
      this.getBlockAll()
    },

    async getBlockAll() {
       this.listLoading = true
        const param = {
            page: this.currentPage,
            limit: this.pageSize
        }
        await blockChainApi.block.getBlockAll(param, res => {
            this.listLoading = false
            if (res.code === 1) {
                this.tableData = res.data.docs
                this.total = res.data.total
            }
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
