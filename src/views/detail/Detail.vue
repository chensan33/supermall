<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content"
            ref="scroll" 
            :probeType="3" 
            @scrollclick = "contentScroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top v-show="isShow" @click.native="backClick" />
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import scroll from 'components/common/bscroll/scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetailData,Goods,Shop,GoodsParam,getDetailRecommends} from 'network/detail'
  import {debounce} from 'common/utils/debounce'
  import {itemImgListenerMixin,backTopMixin} from 'common/utils/mixin'
  import { mapActions } from 'vuex'


  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      scroll,
      GoodsList,
    },
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    mixins: [itemImgListenerMixin,backTopMixin],
    created(){
      //1.获取iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetailData(this.iid).then(res=>{
        //1.获取轮播图数据
        const data = res.data.result
        this.topImages = data.itemInfo.topImages

        //2. 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //3.店铺信息
        this.shop = new Shop(data.shopInfo)

        //4.保存商品信息
        this.detailInfo = data.detailInfo

        //5.保存商品参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.保存评论信息
        if (data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

        this.getThemeTopY = debounce(()=>{
            this.themeTopYs = []
          this.themeTopYs.push(0),
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
        },100)
      }),
      
      //3.请求推荐数据
      getDetailRecommends().then(res=>{
        this.recommends = res.data.data.list
      })
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('imageLoad',this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad(){
        this.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
        this.isShow = (-position.y) > 1000
        const positionY = -position.y
        
        let length = this.themeTopYs.length
        for(let i = 0; i < length - 1; i++){
          if(this.currentIndex != i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          } 
        }
      },
      addToCart(){
        //1.获取购物车需要展示的数据
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res)
        // })
        this.addCart(product).then(res=>{
          // console.log(res)
          // this.message = res
          // this.isShow = true

          // setTimeout(()=>{
          //   this.message = ''
          //   this.isShow = false
          // },1500)
          this.$toast.show(res)
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    background-color: #fff;
    height: calc(100% - 44px - 49px);
  }
</style>