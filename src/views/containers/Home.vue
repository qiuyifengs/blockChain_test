<template>
<div>
  <section class="headerImage" :style="{ background: 'url('+ imageUrl +')' }">
    <div class="headerImage-inner">
      <h1 style="color: #fff; font-weight: 300">欢迎使用幽灵区块链浏览器</h1>
     <div class="homePageInput" style="margin-top: 15px; width: 600px">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input4">
        <template slot="append">GO</template>
      </el-input>
    </div>
    <p class="searchTip">你可搜索的内容例如：地址/交易哈希/区块/代币名称</p>
    </div>
  </section>
  <section class="homePageRadio" style="max-width: 1200px; margin: 16px auto; text-align: center">
    <el-radio-group v-model="radio3" class="f-mb16">
      <el-radio-button label="最新区块"></el-radio-button>
      <el-radio-button label="最新交易"></el-radio-button>
    </el-radio-group>
    <el-card class="f-mb24" shadow="never">
      <el-table :data="tableData" :header-cell-class-name="header" fit ref="Table" style="width: 100%">
          <el-table-column
            fixed
            prop="date"
            label="高度"
            width="180">
          </el-table-column>
          <el-table-column prop="address" label="时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="交易数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="交易金额（BTC）" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="超级节点" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="大小（KB）" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-button style="margin-top: 8px" size="medium" round>查看更多</el-button>
    </el-card>
  </section>
</div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },
  data () {
    return {
      imageUrl: require('@/assets/headerBg.png'),
      input4: '',
      radio3: '最新区块',
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
    }
  }
}
</script>

<style lang="scss">
  .headerImage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 350px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    background-image: linear-gradient(90deg, rgb(0, 4, 40) 0%, rgb(0, 52, 109) 100%);;
    .headerImage-inner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: auto;
      margin: 0px auto;
      box-sizing: border-box;
      padding: 20px
    }
  }

.searchTip {
  color: #fff;
  font-size: 12px;
  letter-spacing: 1px;
}

.homePageInput .el-input__prefix{
  color: #000 !important
}
.homePageInput .el-input-group__append {
  background: none;
  background-image: linear-gradient(90deg, #22e4c1 0%, #22b1fe 100%);
  color: #fff;
  cursor: pointer;
  border: none !important;
}
.homePageInput .el-input__inner {
  border: none !important;
  height: 39px;
  line-height: 39px
}

.homePageRadio .el-radio-group {
  background-color: #5B6371;
  border-radius: 25px;
}

.homePageRadio .el-radio-button__inner {
  border-radius: 25px !important;
  border:none;
  background: none;
  color: #fff !important
}
.homePageRadio .el-radio-button:first-child .el-radio-button__inner {
  border: none;
}

.homePageRadio .el-radio-button__orig-radio:checked+.el-radio-button__inner {
  background-image: linear-gradient(90deg, #22e4c1 0%, #22b1fe  100%);
  border: none;
}

</style>
