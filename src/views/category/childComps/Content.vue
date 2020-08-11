<template>
  <div id="content">
    <div class="content">
      <div v-for="(item,index) in subArray" :key="index" class="content-item">
        <a :href="item.link">
          <img :src="item.image" class="item-img" alt="">
          <div class="text">{{item.title}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Content',
    props: {
      subArray: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .content{
    display: flex;
    flex-wrap: wrap; /* flex-wrap: 让弹性布局可以分行 */
    padding: 10px 8px;
  }
  .content-item{
    text-align: center;
    font-size: 12px;
    width: 33%;
    margin-top: 10px;
  }
  .item-img{
    width: 80%;
  }
  .content-img img{
    width: 100%;
  }
  .text{
    margin-top: 15px;
  }
</style>