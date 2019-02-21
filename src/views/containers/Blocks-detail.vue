<template lang="pug">
div
    section(style="max-width: 1200px; margin: 85px auto 24px") 
        span block #
        span.f-ml8.f-mr8(style="color: #77838f; ") {{ `${this.blockDetailForm.number}` }}
        el-button.f-fr(plain size="small" icon="el-icon-back" @click="back")
    el-card.f-mb24(shadow="never" style="max-width: 1200px; margin: 0 auto 16px;")
        el-form(label-position="left" label-width="200px" :model="blockDetailForm" class="blockForm")
                    el-form-item.heightPage(label="Block Height:")
                        span.f-mr8 {{ blockDetailForm.number }}
                        el-button(plain size="mini" icon="el-icon-arrow-left" @click="getBlockByNumber(1)")
                        el-button(plain size="mini" icon="el-icon-arrow-right" @click="getBlockByNumber(2)")
                    el-form-item(label="TimeStamp:")
                        i.el-icon-time.f-mr4
                        span {{ blockDetailForm.timestamp | timestampFilter }} ({{ blockDetailForm.timestamp | timestampFormatFilter }})
                    el-form-item(label="Transactions:")
                        el-button(type="primary" plain size="mini") {{ (blockDetailForm.transactions).length }} transactions
                    el-form-item(label="Block Hash:")
                        span.text-deal {{ blockDetailForm.hash }}
                    el-form-item(label="Parent Hash:")
                        span.text-deal {{ blockDetailForm.parentHash }}
                    el-form-item(label="MinedBy:")
                      span {{ blockDetailForm.validator }}
                    el-form-item(label="ExtraData")
                        el-tooltip(:content="blockDetailForm.extraData" placement="bottom-start" effect="dark")
                            span.text-deal {{ blockDetailForm.extraData }}
                    el-form-item(label="Size:")
                        span {{ blockDetailForm.size }} bytes
                    el-form-item(label="GasUsed:")
                        span {{ blockDetailForm.gasUsed | gasUsedFilter }}
                    el-form-item(label="GasLimit:")
                        span {{ blockDetailForm.gasLimit | gasLimitFilter }}
                    el-form-item(label="Nonce:")
                        span {{ blockDetailForm.nonce | nonceFilter }}
</template>

<script>
import moment from 'moment'
import blockChainApi from '@/api/blockChain'
import Web3 from 'web3'
const webjs = new Web3(Web3.utils)

export default {
  name: 'BlockDefailTable',
  props: {
    id: 0
  },
  components: {
  },
  data () {
    return {
        blockDetailForm: {},
        currentPage: 1,
        listLoading: true,
        tableData: []
    }
  },
  filters: {
    timestampFilter(time) {
      const timestamp = moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
      return `${timestamp.substr(-2, 2)} secs`
    },
    timestampFormatFilter(time) {
        return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    nonceFilter(val) {
        return webjs.fromWei(val, 'ether')
    },
    gasUsedFilter(val) {
        return webjs.fromWei(val, 'finney')
    },
    gasLimitFilter(val) {
        return webjs.fromWei(val, 'finney')
    }
  },
  created() {
      this.getBlockByNumber()
  },
  methods: {
    async getBlockByNumber(operate = 0) {
        let blockNumber = operate === 1 ? this.blockDetailForm.number -= 1 : operate === 2 ? this.blockDetailForm.number += 1 : this.id
        await blockChainApi.block.getBlockByNumber({ number: blockNumber }, res => {
                if (res.code === 1) {
                    this.blockDetailForm = res.data[0]
                }
            })
    },

    back() {
        this.$router.go(-2)
    }
  }
}
</script>

<style>
.heightPage .el-button--mini {
    padding: 5px !important
}
.heightPage .el-button+.el-button {
    margin-left: 4px !important
}
</style>

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
