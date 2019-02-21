<template lang="pug">
div
    section(style="max-width: 1200px; margin: 85px auto 24px") 
        span Transactions Detail
        span.f-ml8.f-mr8(style="color: #77838f; ") {{ `${this.id}` }}
        el-tooltip(effect="dark" :content="clipboardTips" placement="right")
                    i(:class="isClipboardClass" v-clipboard:copy="this.id" v-clipboard:success="onCopy" v-clipboard:error="onError")
        el-button.f-fr(plain size="small" icon="el-icon-back" @click="back")
    el-card.f-mb24(shadow="never" style="max-width: 1200px; margin: 0 auto 16px;")
        el-form.blockForm(label-position="left" label-width="200px" :model="transactionDetailForm")
            el-form-item(label="Transaction Hash:")
                span.f-mr8 {{ transactionDetailForm.blockHash }}
                el-tooltip(effect="dark" :content="clipboardTips" placement="right")
                    i(:class="isClipboardClass" v-clipboard:copy="this.id" v-clipboard:success="onCopy" v-clipboard:error="onError")
            el-form-item(label="Status:")
                el-tooltip(effect="dark" :content="statusTips" placement="top")
                    el-button(icon="el-icon-success" plain type="success" size="mini" v-if="txsReceiptStatus") Success
                    el-button(icon="el-icon-error" plain type="danger" size="mini" v-else) failed
            el-form-item(label="Block:")
                a.toBlockHash(href="#" @click="enterBlockDetail") {{ transactionDetailForm.blockNumber }}
                el-tag.f-ml8(type="info" size="small" style="letter-spacing: 1px") {{ maxBlock - transactionDetailForm.blockNumber }} block confirmation
            el-form-item(label="Hash:")
                span {{ transactionDetailForm.hash }}
            el-form-item(label="From:")
                a.toBlockHash.f-mr8(href="#" @click="txsByAddress(1)") {{ transactionDetailForm.from }}
                el-tooltip(effect="dark" :content="clipboardTips" placement="right")
                    i(:class="isClipboardClass" v-clipboard:copy="transactionDetailForm.from" v-clipboard:success="onCopy" v-clipboard:error="onError")
            el-form-item(label="To:")
                a.toBlockHash.f-mr8(href="#" @click="txsByAddress(2)") {{ transactionDetailForm.to }}
                el-tooltip(effect="dark" :content="clipboardTips" placement="right")
                    i(:class="isClipboardClass" v-clipboard:copy="transactionDetailForm.to" v-clipboard:success="onCopy" v-clipboard:error="onError")
            el-form-item(label="Value:")
                el-tag(type="info" size="small") {{ transactionDetailForm.value | valueFilter }}
            el-form-item(label="Transaction Fee:")
                span
            el-form-item(label="Gas Used by Transaction:")
                span 
            el-form-item(label="gasPrice:")
                span {{ transactionDetailForm.gasPrice | gasPriceFilter }}
            el-form-item(label="Nonce:")
                span {{ transactionDetailForm.confirmations }}
                el-tag.f-ml4(type="info" size="small") {{ transactionDetailForm.transactionIndex }}
</template>

<script>
import blockChainApi from '@/api/blockChain'
import Web3 from 'web3'
const webjs = new Web3(Web3.utils)

export default {
  name: 'transactions-detail',
  props: {
    id: 0
  },
  components: {
  },
  data () {
    return {
        maxBlock: '',
        txsReceiptStatus: false,
        statusTips: 'A Status code indicating if the top-level call succeeded or failed (applicable for Post BYZANTIUM blocks only)',
        isClipboardClass: 'el-icon-document',
        clipboardTips: '将地址复制到剪贴版',
        transactionDetailForm: {
            blockHash: '',
            blockNumber: '',
            hash: '',
            from: '',
            to: '',
            gasPrice: ''
        },
        currentPage: 1,
        pageSize: 10,
        total: 0,
        listLoading: true
    }
  },
  filters: {
    gasPriceFilter(val) {
      return webjs.fromWei(val, 'ether')
    },
    valueFilter(val) {
      return `${ webjs.fromWei(val, 'ether')}`
    }
  },
  created() {
      this.getTxsByHash()
      this.getBlockTop10()
  },
  methods: {
    header ({ row, column, rowIndex, columnIndex }) {
      return 'primary-row'
    },

    enterBlockDetail(row) {
      const id = this.transactionDetailForm.blockNumber
      this.$router.push({ name: 'blocks-detail', params: { id }})
    },

    txsByAddress(type) {
      const id = type === 1 ? this.transactionDetailForm.from : this.transactionDetailForm.to
      this.$router.push({ name: 'TransactionsByAddress', params: { id }})
    },

    async getBlockTop10() {
        await blockChainApi.block.getBlockTop10({}, res => {
            const result = res.data
            let blockArr = []
            result.filter((item) => {
                blockArr.push(item.number)
            })
            let newArray = Array.from(new Set(blockArr))
            this.maxBlock = Math.max(...newArray)
        })
    },
    
    async getTxsByHash() {
        await blockChainApi.transaction.getTxsByHash({ number: this.id }, res => {
            if (res.code === 1) {
                this.transactionDetailForm = res.data[0]
                this.txsReceiptStatus = this.transactionDetailForm.txsReceipt.status
            }
        })
    },

    sizeChange(size) {
      this.pageSize = size
      this.getBlockAll()
    },

    currentChange(currentPage) {
      this.currentPage = currentPage
      this.getBlockAll()
    },

    onCopy() {
        // this.isClipboardClass = 'el-icon-check'
        this.clipboardTips = 'Copied'
        setTimeout(() => {
            // this.isClipboardClass = 'el-icon-document'
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
.label--badge-in {
    position: relative;
    padding-left: 20px;
    letter-spacing: .8px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-weight: 500;
    color: #77838f;
    background-color: rgba(119, 131, 143, 0.1);
    display: inline-block;
    -webkit-transition: .2s ease-in-out;
    transition: .2s ease-in-out;
    line-height: 2;
    padding-right: 10px;
    &:after {
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
        border-left: 12px solid #fff;
    }
}
.label--badge-out {
    position: relative;
    padding-right: 10px;
    letter-spacing: .5px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    &:after {
        position: absolute;
        left: 100%;
        top: 0;
        content: "";
        border-top: 15px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 15px solid rgba(119,131,143,.1);
    }
}
.blockForm .el-form-item{
    margin-bottom: 5px
}
.blockForm .el-form-item__label {
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
