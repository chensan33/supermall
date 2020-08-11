<template>
  <div class="toast" v-show="isShow">
    <div class="content">
      {{message}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data(){
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message,duration=2000){
        this.message = message
        this.isShow = true

        setTimeout(()=>{
          this.message = ''
          this.isShow = false
        },duration)
      }
    }
  }
</script>
<style scoped>
  .toast{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 9;
  }
  .content{
    padding: 8px 10px;
    background: rgba(0, 0, 0, .6);
    color: #fff;
  }
</style>