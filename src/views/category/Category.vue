<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :tabMenu="categoryMenu" @itemClick="itemClick" />
      <scroll id="tab-content" :probeType="3" ref="scroll" >
        <Content :subArray="subCategory" />
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabMenu from './childComps/TabMenu'
  import Content from './childComps/Content'

  import scroll from 'components/common/bscroll/scroll'

  import {getCategory,getSubcategory} from 'network/category'
  export default {
    name: 'Category',
    components: {
      NavBar,
      TabMenu,
      scroll,
      Content
    },
    data(){
      return {
        categoryMenu: [],
        subCategory: []
      }
    },
    created() {
      this._getCategory()
    },
    methods: {
      _getCategory(){
        getCategory().then(res=>{
          this.categoryMenu = res.data.data.category.list
          // console.log(this.categoryMenu)


          this._getSubcategory(0)
        })
      },
      _getSubcategory(index){
        const maitKey = this.categoryMenu[index].maitKey
        getSubcategory(maitKey).then(res=>{
          this.subCategory = res.data.data.list
          // console.log(this.subCategory)
        })
      },
      itemClick(index){
        this._getSubcategory(index)

        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0,0,0)
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
    position: relative;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
    
    overflow: hidden;
  }
  #tab-content{
    height: 100%;
    flex: 1;
  }
</style>