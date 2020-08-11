<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button :isChecked="isCheckedAll"
                    class="check-button" 
                    @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="add">
      价钱: {{totalPrice}}
    </div>
    <div class="length" @click="moneyClick">
      去结算({{length}})
    </div>
  </div>
</template>
  
<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import {mapGetters} from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice(){
        return '¥' + this.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      length(){
        return this.cartList.filter(item=>{
          return item.checked
        }).length
      },
      isCheckedAll(){
        if(this.cartList.length === 0) return false

        // filter函数：筛选出符合条件的所有元素，没有则返回
        // return !(this.cartList.filter(item => !item.checked).length)

        // find函数：获取数组中符合条件的第一个元素，没有则返回undefined
        // return !(this.cartList.find(item => !item.checked))

        // every函数：数组中的每一个元素都符合条件就返回true，否则返回false
        return this.cartList.every(item => item.checked)
      }
    },
    methods: {
      checkClick(){
        if(this.isCheckedAll){
          return this.cartList.forEach(item => item.checked = false)
        }else{
          return this.cartList.forEach(item => item.checked = true)
        }
      },
      moneyClick(){
        if(this.cartList.every(item => !item.checked)){
          this.$toast.show('请选择商品再结算')
        }else{
          this.$toast.show('结算成功')
          this.cartList.forEach(item => item.checked = false)
        }
      }
    }
  }
</script>
  
<style scoped>
  .cart-bottom-bar{
    background: #eee;
    height: 40px;
    position: relative;
    display: flex;
    bottom: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
  }
  .check-content{
    align-items: center;
    display: flex;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    width: 22px;
    height: 22px;
    line-height: 22px;
  }
  .add{
    flex: 1;
  }
  .length{
    width: 90px;
    background: red;
    color: #fff;
  }
</style>