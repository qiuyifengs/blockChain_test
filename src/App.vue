<template>
  <!--div#app
  el-container.layout
    el-header.layout-header(:style="{ 'background': isHaderTabBg === false ? '#020202' : '#020202'}")
      .components-top-nav-header-index-head
        .components-top-nav-header-index-main.components-top-nav-header-index-wide
          .components-top-nav-header-index-left
            .components-top-nav-header-index-logo
              a(href='#')
                img(alt="Vue logo" src="./assets/logo.png")
                h1 {{ $t('message.BlockChain') }}
            <rk-header></rk-header>
          .components-top-header-index-right
            .searchIputWrap
              input.searchIput(v-model="searchText" :placeholder="$t('message.searchPlaceholder')") | 
                span.focus-border
                i.el-icon-search(style="position: relative; color: #fff; cursor: pointer")
    el-main(style="padding: 0")
      router-view
    el-footer
      p.footBar Terms & Conditions ㅣ Privacy Policy© 2018 TTC Foundation PTE. All rights reserved.-->

  <div id="app">
    <el-container class="layout">
      <el-header class="layout-header" :style="{ 'background': isHaderTabBg === false ? '#020202' : '#020202'}">
      <div class="components-top-nav-header-index-head">
        <div class="components-top-nav-header-index-main components-top-nav-header-index-wide">
            <div class="components-top-nav-header-index-left">
              <div class="components-top-nav-header-index-logo">
                <a href="#"><img alt="Vue logo" src="./assets/logo.png">
                  <h1>{{ $t('message.BlockChain') }}</h1>
                </a>
              </div>
              <rk-header></rk-header>
            </div>
            <div class="components-top-header-index-right">
              <div class="searchIputWrap">
                <input class="searchIput" type="text" @keyup.enter="search" v-on:click.native="search" v-model.trim="searchText" :placeholder="$t('message.searchPlaceholder')"><span class="focus-border"></span>
                <i class="el-icon-search" style="position: relative; color: #fff; cursor: pointer" @click="search"></i>
              </div>
            </div>
        </div>
      </div>
      </el-header>
      <el-main style="padding: 0">
        <router-view :key="activeDate" />
      </el-main>
      <el-footer>
        <p class="footBar">Terms & Conditions ㅣ Privacy Policy© 2018 TTC Foundation PTE. All rights reserved.</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import RkHeader from '@/components/rk-header.vue'
import localforage from 'localforage'
export default {
  name: 'home',
  components: {
    RkHeader
  },
  data () {
    return {
      activeDate: '',
      isHaderTabBg: false,
      searchText: ''
    }
  },
  watch: { 
    $route(to, from) {
      this.activeDate = (new Date()).toString();
      this.isHaderTabBg = this.$route.name === 'home' ? false : true
    }
  },
  created() {
      this.$storageConfig({
        driver: [
          localforage.WEBSQL,
          localforage.INDEXEDDB,
          localforage.LOCALSTORAGE
        ],
        name: 'BlockChainStorage',
        version: 1.0,
        size: 4980736,
        storeName: 'keyValue'
      })
    },
  methods: {
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
.footBar { text-align: center;  color: rgba(0,0,0,.45) }
.searchIputWrap { width: 380px; position: relative }
.searchIput{ border: 0; background: none; outline: none; color: #fff; font-size: 13px; border-bottom: 1px solid #cccccc85; padding: 8px 0; width: 94%; margin-right: 2px;}
.searchIput ~ .focus-border{position: absolute; bottom: 0; left: 0; width: 100%; height: 1px; z-index: 99; top: 48px}
.searchIput ~ .focus-border:before, 
.searchIput ~ .focus-border:after {content: ""; position: absolute; bottom: 0; left: 0; width: 0; height: 100%; background-color: #3399FF; transition: 0.4s;}
.searchIput ~ .focus-border:after {left: auto; right: 0;}
.searchIput:focus ~ .focus-border:before, 
.searchIput:focus ~ .focus-border:after { width: 50%; transition: 0.4s; }

.searchIput::-webkit-input-placeholder {
  color: #fff
} 
.searchIput::-moz-placeholder {
  color: #fff    
}
.searchIput:-ms-input-placeholder {
  color: #fff       
}

.layout {
    position: absolute;
    width: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    flex: auto;
    background: #f8f9ff;
    min-height: 100vh;
    box-sizing: border-box;
    .layout-header {
        // background-image: linear-gradient(90deg, rgb(0, 4, 40) 0%, rgb(0, 52, 109) 100%);
        box-shadow: 0 1px 4px rgba(0,21,41,0.1);
        position: absolute;
        width: 100%;
        padding: 0 50px;
        height: 64px !important;
        line-height: 64px;
        .components-top-nav-header-index-head {
          width: 100%;
          transition: background .3s,width .2s;
          height: 64px;
          box-shadow: 0 1px 4px rgba(0,21,41,.08);
          position: relative;
          .components-top-nav-header-index-main {
            max-width: 1200px;
            margin: auto;
            padding-left: 0;
            .components-top-nav-header-index-left {
              flex: 1 1;
              display: flex;
              .components-top-nav-header-index-logo {
                  width: 165px;
                  height: 64px;
                  position: relative;
                  line-height: 64px;
                  transition: all .3s;
                  overflow: hidden;
                  img {
                    display: inline-block;
                    vertical-align: text-top;
                    height: 18px;
                  }
                  h1 {
                    color: #fff;
                    display: inline-block;
                    vertical-align: top;
                    font-size: 16px;
                    margin: 0 0 0 12px;
                    font-weight: 400;
                  }
              }
            }
            .components-top-header-index-right {
                float: right;
                height: 100%;
                overflow: hidden;
            }
          }
          .components-top-nav-header-index-wide {
            display: flex;
            height: 64px;
          }
        }
      }
    }
.layout-footer, .layout-header {
    flex: 0 0 auto;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,body,#app{
  height: 100%;
}
.container{
  padding-left: 30px;
  padding-right: 30px;
}
.wrapper{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  // &::-webkit-scrollbar {
  // }
}
</style>
