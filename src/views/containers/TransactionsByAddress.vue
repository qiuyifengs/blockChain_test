<template lang="pug">
div
    section(style="max-width: 1200px; margin: 85px auto 24px") 
        span(style="vertical-align: sub;") address
        span.f-ml8.f-mr8(style="color: #77838f; vertical-align: sub;") {{ `${this.address}` }}
        el-tooltip(effect="dark" :content="clipboardTips" placement="right")
            el-button(type="info" size="mini" :icon="isClipboard"
                v-clipboard:copy="this.id"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                circle
                plain)
        el-button.f-fr(plain size="small" icon="el-icon-back" @click="back")
    el-card.f-mb24(shadow="never" style="max-width: 1200px; margin: 0 auto 16px;")
        el-table(:data="tableData" :header-cell-class-name="header" fit ref="Table" style="width: 100%")
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
                    span.text-deal(v-if="scope.row.from === address") {{ scope.row.from }}
                    a.toBlockHash.text-deal(@click="entetTxsByAddress(scope.row, 1)" v-else) {{ scope.row.from }}
            el-table-column(width="70")
                template(slot-scope="scope")
                    el-tag(type="warning" size="small" v-if="scope.row.from === address") OUT
                    el-tag(size="small" v-else) IN
            el-table-column(prop="to" label="To" min-width="120")
                template(slot-scope="scope")
                    el-row(type="flex")
                        el-col(:span="2" v-if="scope.row.from === address")
                            el-tooltip(effect="dark" content="contract" placement="bottom")
                                i.el-icon-document
                        el-col(:span="22")
                            a.toBlockHash.text-deal.f-ml4(v-if="scope.row.from === address" @click="entetTxsByAddress(scope.row, 2)") {{ scope.row.to }}
                            span.text-deal(v-else) {{ scope.row.to }}
            el-table-column(prop="value" label="Value" min-width="150")
                template(slot-scope="scope")
                    span {{ scope.row.value | valueFilter }}
        el-pagination.f-fr.f-mt16.f-mb16(background
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
  name: 'TransactionsByAddressTable',
  props: {
    id: 0
  },
  components: {
  },
  data () {
    return {
        address: this.id,
        transactionDetailForm: {},
        isClipboard: 'el-icon-document',
        clipboardTips: '将地址复制到剪贴版',
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        listLoading: true
    }
  },
  watch: {    
    '$route' (to, from) {   
        this.$router.go(0)
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
    this.$getItem('TxsByAddressPageSize', (err, value) => {
      if (_.isNull(err) && value) self.pageSize = value
      this.getTxsByAddress()
    })
  },
  methods: {
    header ({ row, column, rowIndex, columnIndex }) {
      return 'primary-row'
    },

    enterBlockDetail(row) {
      const id = row.blockNumber
      this.$router.push({ name: 'blocks-detail', params: { id }})
    },

    entetTxsByAddress(row, type = 0) {
        let address = type === 1 ? row.from : type === 2 ? row.to : this.id
        const param = {
            page: this.currentPage,
            limit: this.pageSize 
        }
        this.address = address
        blockChainApi.transaction.getTxsByAddress({ id: this.address }, param, res => {
            if (res.code === 1) {
                this.tableData = res.data.docs
                this.total = res.data.total
                this.listLoading = false
            }
        })
    },

    enterTransactionsDetail(row) {
      const id = row.hash
      this.$router.push({ name: 'transactions-detail', params: { id }})
    },

    async getTxsByAddress() {
        this.listLoading = true
        const param = {
            page: this.currentPage,
            limit: this.pageSize 
        }
        await blockChainApi.transaction.getTxsByAddress({ id: this.id }, param, res => {
            if (res.code === 1) {
                this.tableData = res.data.docs
                this.total = res.data.total
                this.listLoading = false
            }
        })
    },

    sizeChange(size) {
      this.pageSize = size
      this.$setItem('TxsByAddressPageSize', size)
      this.getTxsByAddress()
    },

    currentChange(currentPage) {
      this.currentPage = currentPage
      this.getTxsByAddress()
    },
    
    onCopy() {
        this.isClipboard = 'el-icon-check'
        this.clipboardTips = 'Copied'
        setTimeout(() => {
            this.isClipboard = 'el-icon-document'
            this.clipboardTips = '将地址复制到剪贴版'
        }, 1000)
    },

    onError() {
        this.$message.error('复制失败')
    },

    back() {
        this.$router.go(-2)
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
</style>
