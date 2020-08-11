<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div v-for="(item,index) in tabMenu"
           :key="index"
           :class="{active: currentIndex === index}"
           class="menu-list-item"
           @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import scroll from 'components/common/bscroll/scroll'
  export default {
    name: 'TabMenu',
    components: {
      scroll
    },
    data(){
      return {
        currentIndex: 0
      }
    },
    props: {
      tabMenu: {
        type: Array,
        default(){
          return []
        }
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex = index
        this.$emit('itemClick',index)
      }
    }
  }
</script>

<style scoped>
  #tab-menu{
    width: 100px;
    background: #f6f6f6;
    height: 100%;
    box-sizing: border-box;
  }
  .menu-list-item{
    text-align: center;
    height: 45px;
    line-height: 45px;
    font-size: 14px;
  }
  .menu-list-item.active{
    font-weight: 700;
    color: var(--color-high-text);
    background: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>