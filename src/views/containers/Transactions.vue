<template lang="pug">
div
  el-card.f-mb24(shadow="never" style="max-width: 1200px; margin: 76px auto 16px;" :body-style="{ padding: '5px' }")
    el-row(type="flex" justify="space-between")
      el-col(:span="6")
        h3.f-ml16 transaction
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
      el-table-column(type="index" width="50")
      el-table-column(prop="hash" :label="$t('message.hash')" min-width="150")
        template(slot-scope="scope")
            a.toBlockHash.text-deal(href="#" @click='enterTransactionsDetail(scope.row)') {{ scope.row.hash }}
      el-table-column(prop="blockNumber" label="Block" min-width="100")
        template(slot-scope="scope")
            a.toBlockHash.text-deal(href="#" @click='enterBlockDetail(scope.row)') {{ scope.row.blockNumber }}
      el-table-column(prop="gasPrice" label="gasPrice" min-width="80")
        template(slot-scope="scope")
          span {{ scope.row.gasPrice | gasPriceFilter }}
      el-table-column(prop="from" label="From" min-width="120")
        template(slot-scope="scope")
           a.toBlockHash.text-deal(@click="entetTxsByAddress(scope.row, 1)") {{ scope.row.from }}
      el-table-column(width="40")
        template(slot-scope="scope")
          el-button(type="success" size="mini" icon="el-icon-arrow-right" circle plain)
      el-table-column(prop="to" label="To" min-width="120")
        template(slot-scope="scope")
          el-row(type="flex")
            a.toBlockHash.text-deal(@click="entetTxsByAddress(scope.row, 2)") {{ scope.row.to }}
      el-table-column(prop="value" label="Value" min-width="150")
        template(slot-scope="scope")
          span {{ scope.row.value | valueFilter }}
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
import Web3 from 'web3'
import _ from 'lodash'
import blockChainApi from '@/api/blockChain'
const webjs = new Web3(Web3.utils)

export default {
  name: 'transaction',
  components: {
  },
  data () {
    return {
      address: this.id,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      listLoading: false,
      tableData: []
    }
  },
  filters: {
    gasPriceFilter(val) {
      return webjs.fromWei(val, 'finney')
    },
    valueFilter(val) {
      return `${ webjs.fromWei(val, 'ether')} Ether`
    }
  },
  created() {
    const self = this
    this.$getItem('transactionPageSize', (err, value) => {
      if (_.isNull(err) && value) self.pageSize = value
      this.getTxsAll()
    })
  },
  methods: {
    header ({ row, column, rowIndex, columnIndex }) {
      return 'primary-row'
    },

    entetTxsByAddress(row, type) {
        let id = type === 1 ? row.from : row.to
        this.$router.push({ name: 'TransactionsByAddress', params: { id }})
    },

    enterBlockDetail(row) {
        const id = row.blockNumber
        this.$router.push({ name: 'blocks-detail', params: { id }})
    },

    enterTransactionsDetail(row) {
      const id = row.hash
      this.$router.push({ name: 'transactions-detail', params: { id }})
    },

    sizeChange (size) {
      this.pageSize = size
      this.$setItem('transactionPageSize', size)
      this.getTxsAll()
    },

    currentChange (currentPage) {
      this.currentPage = currentPage
      this.getTxsAll()
    },

    async getTxsAll() {
      this.listLoading = true
      const param = {
        page: this.currentPage,
        limit: this.pageSize
      }
      await blockChainApi.transaction.getTxsAll(param, res => {
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
  
</style>
