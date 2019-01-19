<template>
  <div>
    <el-card class="f-mb24" shadow="never" style="max-width: 1200px; margin: 76px auto 16px;">
       <div slot="header" class="clearfix">
         <span style="vertical-align: -webkit-baseline-middle">区块 #9999</span>
         <el-pagination
                        background
                     class="f-fr transactionsPage" 
                      @size-change="sizeChange" 
                      @current-change="currentChange" 
                      :current-page.sync="currentPage" 
                      :page-sizes="[10,20,30,40]" 
                      :page-size="pageSize"
                      prev-text="上一页"
                      next-text="下一页"
                      layout="prev, next" 
                      :total="total">
        </el-pagination>
        <h2 style="margin-bottom: 0; margin-top: 48px">信息概述</h2>
       </div>
       <el-row type="flex">
            <el-col :span="12">
                <el-form label-positio="left" label-width="100" :model="formInline" class="demo-form-inline">
            <el-form-item label="哈希值:">
                <span>8safasdfjhg23jhjjbsdjfgjhgsjf348safasdfjhg23jhjjbsdjfgjhgsjf3444</span>
            </el-form-item>
            <el-form-item label="交易金额:">
                <span>5.13464 BTC</span>
            </el-form-item>
            <el-form-item label="超级节点:">
                <span style="color: blue">5.13464 BTC</span>
            </el-form-item>
            <el-form-item label="发行时间:">
                <span>2019-01-19 09:39:34</span>
            </el-form-item>
            </el-form>
            </el-col>
            <el-col :span="8">
                <el-form label-positio="left" label-width="100" :model="formInline" class="demo-form-inline">
            <el-form-item label="交易数量:">
                <span>3</span>
            </el-form-item>
            <el-form-item label="佣金:">
                <span>5.13464 BTC</span>
            </el-form-item>
            <el-form-item label="块大小（字节）:">
                <span>1.12.123</span>
            </el-form-item>
            </el-form>
            </el-col>
        </el-row>
       
        <h2>交易</h2>
      <el-table :data="tableData" :header-cell-class-name="header" fit ref="Table" style="width: 100%">
          <el-table-column
            fixed
            prop="date"
            label="哈希值"
            width="180">
          </el-table-column>
          <el-table-column prop="name" label="区块" width="180"></el-table-column>
          <el-table-column prop="address" label="时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="类型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="时间" show-overflow-tooltip></el-table-column>

          <el-table-column prop="address" label="发送者" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="接收者" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="数量" show-overflow-tooltip></el-table-column>

      </el-table>
      <el-pagination  class="f-fr f-mt16 f-mb16"
                      background 
                      @size-change="sizeChange" 
                      @current-change="currentChange" 
                      :current-page.sync="currentPage" 
                      :page-sizes="[10,20,30,40]" 
                      :page-size="pageSize" 
                      layout="total, sizes, prev, pager, next, jumper" 
                      :total="total">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'home',
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
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  methods: {
    header ({ row, column, rowIndex, columnIndex }) {
      return 'primary-row'
    },
    sizeChange(size) {
      this.pageSize = size
    },

    currentChange(currentPage) {
      this.currentPage = currentPage
    },

  }
}
</script>

<style lang="scss">
.el-form-item__label {
  color: #6e707396 !important
}
.transactionsPage .el-pagination.is-background .btn-prev {
    border-right: none !important
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    padding: 0 8px !important;
    border: 1px solid #ccc;
    border-radius: 1px !important
}
</style>
