<template>
  <view class="container">
    <navBar :title="'发布兼职'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
    >
    </navBar>
    <view class="tatle">
      <text class="text1">1/5 选择岗位类型</text>
      <text class="text2">给岗位选择一个相应的职位类型！</text>
    </view>

    <view class="bbox1">
      <view  v-for="(p,index) in dataInfo">
        <view :data-id="p.id" :class="[p.active?'button1':'button2']"  @click="change1" >
          {{p.name}}
        </view>
      </view>
    </view>

    <view  v-for="(item,id) in position">
      <view class="text3">{{item.name}}</view>

      <view class="bbox2">
        <view v-for="(child,cindex) in item.children":key="cindex">
          <view :data-id="child.id" :class="[child.active?'button3':'button']"  @click="changeClass" >
            {{child.name}}
            <!--          <view  class="button" hover-class="button4" @click="hh(child.id)">-->
          </view>
        </view>
      </view>
    </view>

    <view class="button4" @click="nextstep" >下一步</view>

  </view>
</template>

<script>
  import apii from '@/utils/apii'
  import wx from 'wx'
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
        uid: 2,
        dataInfo: [],
        type: '',
        posid: '',
        position: []
      }
    },
    mounted () {
      this.Jobstep1()

    },
    // computed: {
    //   UpdateLi () {
    //     return this.position
    //   }
    // },
    methods: {

      async Jobstep1 () {
        var y=0
        const res = await apii.Jobstep1({ uid: this.uid });
        if (res.code === 1) {
          this.dataInfo = res.data.job_type;
          this.position = res.data.position_type;
          this.dataInfo.forEach(item => {
            this.$set(item, 'active', false);
          });
          this.$forceUpdate();
          for(y;y<this.position.length;y++){
            this.position[y].children.forEach(item => {
              this.$set(item, 'active', false);
            });
            this.$forceUpdate();
          }
        }
      },
      // hh:function(id) {
      //   console.log('当前被点击的id='+id)
      // },
      change1: function (e) {
        let that = this
        // var code = e.currentTarget.id;
        let b = e.currentTarget.dataset.id;
        // for(n;n<6;n++){
        //   for(m;m<6;m++){
        // for(n;n<this.position.length;n++){
        that.dataInfo.forEach(item => {
          // console.log(item.id)
          if(b == item.id){
            item.active = true;
          }else {
            item.active = false;
          }
        })
      },
      // }
      // if (this.isActive == true) {
      //     this.isActive = false;
      //     } else {
      //     this.isActive = true;
      //     }
      // let arr = this.position.children;
      //
      // console.log(this.position[n].children.active);
      // console.log(a)
      // this.isChecked = code;
      // this.hh = a;
      // if(this.hh == this.isChecked){
      //   this.isActive = false;
      // }
      changeClass: function (e) {
        var n=0
        var m=0
        // var code = e.currentTarget.id;
        let a = e.currentTarget.dataset.id;
        // for(n;n<6;n++){
        //   for(m;m<6;m++){
        for(n;n<this.position.length;n++){
          this.position[n].children.forEach(item => {
            if(a == item.id){
              // console.log(a)
              item.active = true;
              this.posid = item.id
              console.log(this.posid)
              wx.setStorageSync('posid', this.posid)
            }else {
              item.active = false;
            }
          })
        }

      },

      nextstep: function () {
        wx.navigateTo({
          url: '/pages/topic/twostep'
        })
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
  .tatle{
    display: flex;
    flex-direction: column;
  }
  .bbox1{
    margin-left:80rpx;
    display: flex;
  }
  .bbox2{
    display: flex;
    flex-wrap: wrap;
  }
  .text1{
    margin-left:34rpx;
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
  .button2{
    margin-top:70rpx;
    width:295rpx;
    height:90rpx;
    text-align:center;
    line-height:90rpx;
    font-size:32rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
    background:rgba(249,249,249,1);
    border-radius:0rpx 4rpx 4rpx 0rpx;
  }
  .button1{
    margin-top:70rpx;
    width:295rpx;
    height:90rpx;
    text-align:center;
    line-height:90rpx;
    font-size:32rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    border-radius:4rpx 0rpx 0rpx 4rpx;
  }
  .text3{
    margin-left:65rpx;
    margin-top:50rpx;
    height:26rpx;
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .button{
    margin-left:65rpx;
    margin-top:30rpx;
    width:170rpx;
    height:60rpx;
    font-size:28rpx;
    text-align:center;
    line-height:60rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
    background:rgba(249,249,249,1);
    border-radius:4rpx;
  }
  .button3{
    margin-left:65rpx;
    margin-top:30rpx;
    width:170rpx;
    height:60rpx;
    font-size:28rpx;
    text-align:center;
    line-height:60rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    border-radius:4rpx;
  }
  .button4{
    margin-left:30rpx;
    margin-top:59rpx;
    width:690rpx;
    height:90rpx;
    font-size:29rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    text-align:center;
    line-height:90rpx;
    color:rgba(255,255,255,1);
    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    box-shadow:0rpx 2rpx 10rpx 0rpx rgba(46,155,255,0.5);
    opacity:0.3;
    border-radius:10rpx;
  }
</style>
