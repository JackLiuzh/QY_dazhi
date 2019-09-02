<template>
  <view class="container">
    <navBar :title="'提交成功'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
    >
    </navBar>
    <view class="image">

    </view>
    <text class="text1">兼职发布无权限！</text>
    <text class="text2">您的评价率低于90%，因此不能发布兼职信息</text>
    <button type="button" class="btn">
      <text class="text3">去评价</text>
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
    margin-left:118rpx;
    margin-top: 200rpx;
  }
  .image .img{
    width:514rpx;
    height:413rpx;
  }
  .text1{
    margin-left:243rpx;
    margin-top: 70rpx;

    height:34rpx;
    font-size:36rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .text2{
    margin-left:93rpx;
    margin-top: 49rpx;

    height:29rpx;
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .btn{
    margin-left:30rpx;
    margin-top: 121rpx;
    width:690rpx;

    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    box-shadow:0rpx 2rpx 10rpx 0rpx rgba(46,155,255,0.5);
    border-radius:10rpx;
  }
  .text3{

    width:85rpx;
    height:27rpx;
    font-size:29rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
</style>
