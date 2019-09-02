<template >
<view class="container">
    <navBar :title="'发布'"
    :titleColor="'white'"
    :back-visible="true"
    ></navBar>
    
</view>
</template>

<script>
import navBar from '@/components/navigationBar'
export default {
  components: {
     navBar
  },  
  computed: {
  
  },
  async mounted () {
    // await Promise.all([
    //   this.getIndexData()
    // ])
  },

  methods: {
    
  },

  // 原生的分享功能
  onShareAppMessage: function () {
    return {
      title: 'xbyjShop',
      desc: '大职网',
      path: '/pages/index/index'
    }
  }
}
</script>

<style>
page{
    background-color: #f5f8f9;
  }
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0px;
  }
  .mine_head{
    width: 100%;
    height: 484rpx;
    display: flex;
    justify-content: center;
  }
  .mini_head_img{
    width: 100%;
    height: 280rpx;
  }
  
  
</style>
