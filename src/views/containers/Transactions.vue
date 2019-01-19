<template>
  <div>
    <el-card class="f-mb24" shadow="never" style="max-width: 1200px; margin: 76px auto 16px;">
       <span style="vertical-align: -webkit-baseline-middle">区块 #9999</span>
       <el-pagination  class="f-fr f-mb16"
                      background 
                      @size-change="sizeChange" 
                      @current-change="currentChange" 
                      :current-page.sync="currentPage" 
                      :page-sizes="[10,20,30,40]" 
                      :page-size="pageSize" 
                      layout="total, sizes, prev, pager, next, jumper" 
                      :total="total">
        </el-pagination>
         
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
    sizeChange (size) {
      this.pageSize = size
    },
    currentChange (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss">

</style>
