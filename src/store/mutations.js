export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的事件比较单一一点
  addCount(state,payLoad){
    payLoad.count++ 
  },
  addToCart(state,payLoad){
    payLoad.count = 1
    payLoad.checked = true
    state.cartList.push(payLoad)
  }
}