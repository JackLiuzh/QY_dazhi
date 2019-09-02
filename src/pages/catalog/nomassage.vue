<template>
  <view class="container">
    <navBar :title="'消息中心'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
    >
    </navBar>
    <view class="image">
      <img src="/static/images/kongkong@2x.png" class="img"/>
    </view>
    <text class="nomsg1">您暂时还没有消息、</text>
    <text class="nomsg2">兼职信息发布及企业信息认证会在这里通知显示</text>
  </view>



</template>

<script>
  import navBar from '@/components/navigationBar'
  export default {
    components: {
      navBar
    },
    data() {
      return {
        statusBarHeight: '', // 状态栏高度
        titleBarHeight: '', // 标题栏高度
        navBarHeight: '', // 导航栏总高度
      }
    }
  }
</script>

<style>
  .image {
    align-items: center;
    margin-top: 290rpx;
  }
  .image .img {
    width:514rpx;
    height:439rpx;
    background:rgba(255,255,255,1);
  }

  .nomsg1 {
    align-items: center;
    margin-top: 120rpx;
    height:31rpx;
    font-size:32rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(53,53,53,1);
  }

  .nomsg2 {
    align-items: center;
    margin-top: 52rpx;
    height:28rpx;
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
  }


</style>
