export default {
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      //payLoad 新添加的商品

      //第一种
      // let oldProduct = null
      // for(let item of state.cartList){
      //   if(item.iid == payload.iid){
      //     oldProduct = item;
      //   }
      // }

      //第二种
      // let oldProduct = state.cartList.find(function(item){
      //   return item.iid === payload.iid
      // })

      //第三种 查找之前数组中是否存在该商品
      let oldProduct = context.state.cartList.find(item => item.iid===payload.iid)

      if(oldProduct){
        context.commit('addCount',oldProduct)
        resolve('商品的数量+1')
      }else {
        context.commit('addToCart',payload)
        resolve('添加了新的商品')
      }
    })
  }
}