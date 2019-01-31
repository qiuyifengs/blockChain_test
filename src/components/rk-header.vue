<template lang="pug">
  div
    nav
      router-link.rk-nav-link(to="/") {{ $t('message.home') }}
      router-link.rk-nav-link(to="/blocks") {{ $t('message.blocks') }}
      router-link.rk-nav-link(to="/transactions") {{ $t('message.transaction') }}
      router-link.rk-nav-link(to="/representatives") {{ $t('message.superNode') }}
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .rk-nav-link {
    text-decoration: none;
    margin: 0 18px;
    padding: 5px 10px;
    border-radius: 6px;
    color: #e8e8e8;
    opacity: .8;
    will-change: opacity, background-color;
    transition: opacity .3s, background-color .3s;
    &:hover, &:active{
      opacity: 1;
      background-color: rgba(255,255,255,.07);
      box-shadow: 0 3px 6px 0 rgba(0,0,0,.1), 0 1px 3px 0 rgba(0,0,0,.08);
    }
  }
  .rk-nav-auto {
    border-radius: 4px;
    padding: 1px 6px;
    background-color: rgba(255,255,255,.07);
    box-shadow: 0 3px 6px 0 rgba(0,0,0,.1), 0 1px 3px 0 rgba(0,0,0,.08);
  }
</style>
