<template>
  <view class="container">
    <navBar :title="'提交成功'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
    >
    </navBar>
    <view class="image">
      <img src="/static/images/tijiao@2x.png" class="img"/>
    </view>
    <text class="text1">兼职提交成功</text>
    <text class="text2">审核成功后会在消息中心提醒您，请注意查看</text>
    <button type="button" class="btn">
      <text class="text3">返回</text>
    </button>
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
  page{
    background-color: #fff;
  }
  .container{
    display: flex;
    flex-direction: column;
  }
  .image{
    margin-left:260rpx;
    margin-top: 180rpx;
  }
  .image .img{
    width:230rpx;
    height:232rpx;
  }
  .text1{
    margin-left:268rpx;
    margin-top: 79rpx;
    width:222rpx;
    height:34rpx;
    font-size:36rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .text2{
    margin-left:117rpx;
    margin-top: 49rpx;

    width:520rpx;
    height:26rpx;
    font-size:26rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .btn{
    margin-left:60rpx;
    margin-top: 220rpx;
    width:630rpx;

    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    box-shadow:0rpx 2rpx 20rpx 0rpx rgba(40,185,235,0.3);
    border-radius:10rpx;
  }
  .text3{
    width:54rpx;
    height:27rpx;
    font-size:29rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
</style>
