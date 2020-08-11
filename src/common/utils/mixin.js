import {debounce} from 'common/utils/debounce'
import BackTop from 'components/content/backTop/BackTop'

export const itemImgListenerMixin = {
  data(){
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted(){
    this.refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImgListener = ()=>{
      this.refresh()
    }
    this.$bus.$on('imageLoad',this.itemImgListener)
  }
}

export const backTopMixin = {
  data(){
    return {
      isShow: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}