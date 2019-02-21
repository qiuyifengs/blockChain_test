<template lang="pug">
div
  section.headerImage(:style="{ background: 'url('+ imageUrl +')' }")
    div.headerImage-inner
      h1(style="color: #fff; font-weight: 300") {{ $t('message.homeTip') }}
      div.homePageInput(style="margin-top: 15px; width: 600px")
        el-input(:placeholder="$t('message.searchPlaceholder')" @keyup.enter.native="search" @click="search" prefix-icon="el-icon-search" clearable v-model.trim="searchText")
          template(slot="append")
            span(@click="search") {{ $t('message.go') }}
      //- p.searchTip {{ $t('message.searchPlaceholder') }}
  section.homePageRadio(style="max-width: 1200px; margin: 16px auto; text-align: center")
    el-radio-group.f-mb16(v-model="currentLevel")
      el-radio-button(label="block") {{ $t('message.LatestBlock') }}
      el-radio-button(label="deal") {{ $t('message.LatestDeal') }}
    component(v-bind:is="getTableComponent(currentLevel)")
</template>

<script>
import blockChainApi from '@/api/blockChain'
import LatestBlockTable from './components/LatestBlock'
import LatestDealTable from './components/LatestDeal'
export default {
  name: 'blockChainHome',
  components: {
    LatestBlockTable,
    LatestDealTable
  },
  data () {
    return {
      imageUrl: require('@/assets/headerBg.png'),
      currentLevel: 'block',
      searchText: ''
    }
  },
  created() {
  },
  methods: {
    getTableComponent(val) {
      return this.currentLevel === 'block' ? 'LatestBlockTable' : 'LatestDealTable'
    },

    search(){
      if (/^[0-9]+$/.test(this.searchText)) {
        const id = Number(this.searchText)
        this.$router.push({ name: 'blocks-detail', params: { id }})
      } else {
        const id = this.searchText
        this.$router.push({ name: 'TransactionsByAddress', params: { id }})
      }
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
    height: 330px;
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
