<template>
  <div id="home">
    <nav-bar id="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                  class="tab-control" 
                  @itemClick="tabClick" 
                  ref="tabcontrol1"
                  v-show="isShowFixed" />

    <scroll class="content" 
            ref="scroll" 
            :probeType="3" 
            @scrollclick="scrollclick"
            :pull-up-load="true"
            @pullingUp="moreLoad">
      <home-swiper :banners="banners" @imageLoad="imageLoad" />
      <home-recommend :recommends="commends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']"
                   @itemClick="tabClick" 
                   ref="tabcontrol2"
                   :class="{fixed: isShowFixed}" />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import scroll from 'components/common/bscroll/scroll'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import FeatureView from './childComps/FeatureView'

  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils/utils'
  import {itemImgListenerMixin,backTopMixin} from 'common/utils/mixin'

  export default {
    name: 'Home',
    components: {
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      scroll
    },
    data(){
      return {
        banners: [],
        commends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentType: 'pop',
        isShow: false,
        tabControlOffset: 0,
        isShowFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },

    mixins: [itemImgListenerMixin,backTopMixin],
    created(){
      //  1.请求多个数据
      this.getHomeMultidata();
      //  2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //1.保存y值
      this.saveY = this.$refs.scroll.getScrollY()

      //2.取消全局事件的监听
      this.$bus.$off('imageLoad',this.itemImgListener)
    },
    methods: {
      /*
        事件监听相关的方法
      */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabcontrol1.currentIndex = index;
        this.$refs.tabcontrol2.currentIndex = index
      },
      scrollclick(position){
        //1.控制backTop显示
        this.isShow = (-position.y) > 1000
        //2.控制tabcontrol隐藏
        this.isShowFixed = (-position.y) > this.tabControlOffset
      },
      moreLoad(){
        this.getHomeGoods(this.currentType)
      },
      imageLoad(){
        this.tabControlOffset = this.$refs.tabcontrol2.$el.offsetTop
      },
      /*
        网络请求的方法
      */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners = res.data.data.banner.list
          this.commends = res.data.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  #home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>