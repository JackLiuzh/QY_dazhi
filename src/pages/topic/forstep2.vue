<template>
  <view class="container">
    <navBar :title="'添加工作地点'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
    >
    </navBar>

    <view class="layout1">

      <!--      <view class="xa">{{region[1]}}</view>-->
      <!--        <picker class="image" mode="region" @change="bindRegionChange" :value="region" >-->
      <!--            <img src="/static/images/sanjiao@2x.png" class="img1">-->
      <!--        </picker>-->
      <input class="ss" @input="getsuggest" placeholder="请输入地点" />

      <view class="qx">取消</view>
    </view>

    <view class="layout2">
      <view v-for="(item,index) in suggestion" :key="index" >
        <view class="v1"  :data-id="index"  @tap="back">
          {{item.title}}</view>
        <view class="v2">{{item.addr}}</view>
        <!--        <view class="v5"></view>-->
      </view>
    </view>


  </view>
</template>

<script>
  import QQMapWX from '../../../static/qqmap-wx-jssdk.js'
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
        region: ['陕西省', '西安市'],
        suggestion: [],
        hu: []
        // backtitle: [],
        // backaddr: []
        // customItem: '全部'
      }
    },
    created () {
      // let app = getApp()
      // 实例化API核心类
      this.qqMapSdk = new QQMapWX({
        key: 'DY6BZ-P3ORX-UJO4J-ZJ6I6-LT662-KKBRX'
      })
    },
    methods: {
      bindRegionChange: function (e) {
        // var ee = e.mp.detail.value
        this.region = e.mp.detail.value
      },
      back: function (e) {
        var id = e.currentTarget.dataset.id;
        console.log(this.$router)
        // this.$router.push({path:'/pages/topic/forstep',query:{},isTab: true})

        // console.log(id)
        for (var i = 0; i < this.suggestion.length; i++) {
          if (i == id) {
            // console.log('hh')
            this.hu.push({
              title: this.suggestion[i].title,
              addr: this.suggestion[i].addr
            })
            wx.setStorageSync('wp', this.hu)
          }
        }
        wx.navigateBack({
          delta: 1
        })
      },
      getsuggest: function (e) {
        var that = this;
        that.qqMapSdk.getSuggestion({
          keyword: e.mp.detail.value,
          success: function (res) {
            console.log(res);
            var sug = [];
            for (var i = 0; i < res.data.length; i++) {
              sug.push({
                title: res.data[i].title,
                id: res.data[i].id,
                addr: res.data[i].address,
                city: res.data[i].city,
                district: res.data[i].district,
                latitude: res.data[i].location.lat,
                longitude: res.data[i].location.lng
              });
            }
            that.suggestion = sug
          }
        })
        // fail: function(error) {
        //   console.error(error);
        // },
        // complete: function(res) {
        //   console.log(res);
        // },
      }
    }
  }
</script>

<style>
  .container{
    display: flex;
    flex-direction: column;

  }

  .layout1{
    display: flex;
    margin-left:30rpx;
    margin-top:30rpx;
    width:690rpx;
    height:90rpx;
    background:rgba(255,255,255,1);
    border-radius:8rpx;
  }

  .ss{
    margin-left:30rpx;
    margin-top:32rpx;
    height:26rpx;
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .qx{
    margin-left:280rpx;
    margin-top:35rpx;
    width:60rpx;
    height:27rpx;
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .layout2{
    display: flex;
    flex-direction: column;
    margin-left:30rpx;
    margin-top:2rpx;
    width:690rpx;
    background:rgba(255,255,255,1);
    border-radius:8rpx;
  }
  .v1{
    margin-left:29rpx;
    margin-top:50rpx;
    /*width:269rpx;*/
    height:28rpx;
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .v2{
    margin-left:30rpx;
    margin-top:15rpx;
    /*width:338rpx;*/
    height:23rpx;
    font-size:24rpx;
    line-height:54rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }



</style>
