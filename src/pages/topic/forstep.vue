<template>
  <view class="container">
    <navBar :title="'发布兼职'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
    >
    </navBar>

    <view class="layout1">
      <view class="tatle">
        <text class="text1">4/5 职位工作地点</text>
        <text class="text2">精确的工作地点可以让周围的求职者找到您！</text>
      </view>
    </view>

    <view class="layout2">
      <view class="gzdd">工作地点</view>
      <view class="tianjia"><img src="/static/images/tianjia@2x.png" class="img1"></view>
      <view class="tj" @click="tj">点击添加</view>
      <view class="dianji" @click="tj">
        <img src="/static/images/dianji@2x.png" class="img2"></view>
    </view>

    <view v-for="(item,index) in hu" :key="index" >
      <view class="layout3">
<!--        <view class="layout31">-->
          <text class="v1">{{item.title}}</text>
          <text class="v2">{{item.addr}}</text>
<!--      </view>-->
      </view>
    </view>

    <view class="button" @click="nextstep">
      <text class="bt">下一步</text>
    </view>


  </view>
</template>

<script>
  // import apii from '@/utils/apii'
  // import wx from 'wx'
  import navBar from '@/components/navigationBar'
  export default {
    components: {
      navBar
    },
    data () {
      return {
        statusBarHeight: '', // 状态栏高度
        titleBarHeight: '', // 标题栏高度
        navBarHeight: '', // 导航栏总高度
        // uid: 2,
        // job: '',
        // standard: []
        // setData: function (key,value) {
        //   this[key] = value
        // },
        // backa: []
        hu: [],
        // title: [],
        // addr: []
      }
    },
    mounted () {
      // this.Jobstep2();

      // this.title = this.$route.query.title;
      // this.addr = this.$route.query.addr;
    },
    onShow () {
      // this.title = wx.getStorageSync('wpm')
      // this.addr = wx.getStorageSync('wpa')
      this.hu = wx.getStorageSync('wp')
      // console.log(this.title)
    },
    methods: {

      tj: function () {
        wx.navigateTo({
          url: '/pages/topic/forstep2'
        })
      },
      nextstep: function () {
        wx.navigateTo({
          url: '/pages/topic/firstep'
        })
      }
    }
  }
</script>

<style>
  /*page{*/
  /*  background-color: #fff;*/
  /*}*/
  .container{
    display: flex;
    flex-direction: column;

  }

  .layout1{
    display: flex;
    flex-direction: column;
    width:750rpx;
    height:193rpx;
    background:rgba(255,255,255,1);
  }
  .tatle{
    display: flex;
    flex-direction: column;
  }
  .text1{
    margin-left:32rpx;
    margin-top:50rpx;
    height:38rpx;
    font-size:40rpx;
    font-family:PingFang-SC-Medium;
    font-weight:bold;
    color:rgba(0,0,0,1);
  }
  .text2{
    margin-left:31rpx;
    margin-top:28rpx;
    height:27rpx;
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }

  .layout2{
    display: flex;
    width:750rpx;
    height:100rpx;
    background:rgba(255,255,255,1);
  }
  .gzdd{
    margin-left:31rpx;
    margin-top:37rpx;
    width:115rpx;
    height:26rpx;
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .tianjia{
    margin-left:31rpx;
    margin-top:28rpx;

  }
  .img1{
    width:23rpx;
    height:23rpx;
  }
  .tj{
    margin-left:2rpx;
    margin-top:37rpx;
    width:120rpx;
    height:40rpx;
    font-size:26rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);

    background:linear-gradient(0deg,rgba(46,155,255,1) 0.2685546875%, rgba(27,243,196,1) 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }
  .dianji{
    margin-left:355rpx;
    margin-top:37rpx;
  }
  .img2{
    width:10rpx;
    height:20rpx;
  }

  .button{
    text-align:center;
    line-height:90rpx;
    margin-left:30rpx;
    margin-top:60rpx;
    width:690rpx;
    height:90rpx;
    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    box-shadow:0px 2px 10px 0px rgba(46,155,255,0.5);
    opacity:0.3;
    border-radius:10rpx;
  }
  .bt{
    width:85rpx;
    height:27rpx;
    font-size:29rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .layout3{
    display: flex;
    flex-direction: column;
    margin-top:40rpx;
    margin-left:30rpx;
    height:180rpx;
    width:690rpx;
    background:rgba(255,255,255,1);
    border-radius:10rpx;
  }
  .layout31 {
    display: flex;
    flex-direction: column;
  }
  .v1{
    margin-left:29rpx;
    margin-top:30rpx;
    /*width:269rpx;*/
    height:28rpx;
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .v2{
    margin-left:30rpx;
    margin-top:10rpx;
    /*width:338rpx;*/
    height:23rpx;
    font-size:24rpx;
    line-height:54rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
</style>
