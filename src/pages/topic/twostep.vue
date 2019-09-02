<template>
  <view class="layout">
    <navBar :title="'发布兼职'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
    >
    </navBar>

    <view class="tatle">
      <text class="text1">2/5 选择职位薪资</text>
      <text class="text2">给岗位选择一个相应的薪资</text>
    </view>

    <view class="bbox">

      <view v-for="(as,index) in standard">
        <view :data-id="as.id" :class="[as.active?'button1':'button']"  @click="change" >
          {{as.name}}
          <!--          <view  class="button" hover-class="button4" @click="hh(child.id)">-->
        </view>
        <!--            <view  class="button">{{as.name}}</view>-->
        <!--        </view>-->
      </view>

    </view>



    <view class="pay">
      <input class="price" @input="input"/>
      <text class="yuan">元</text>
    </view>

    <text class="heng"></text>

    <view class="button4" @click="nextstep">
      <text class="bt4">下一步</text>
    </view>


  </view>

  </view>
</template>

<script>
  import apii from '@/utils/apii'
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
        uid: 2,
        job: '',
        salary_stand_id: '',
        salary: '',
        // id: '',
        standard: []
      }
    },
    mounted () {
      this.Jobstep2();
    },
    methods: {
      async Jobstep2 () {
        const res = await apii.Jobstep2({ uid: this.uid });
        if (res.code === 1) {
          this.job = res.data.jobinfo;
          this.standard = res.data.salary_standard;
          this.standard.forEach(as => {
            this.$set(as, 'active', false);
          });
          this.$forceUpdate();
        }
      },
      change: function (e) {
        let that = this
        // var code = e.currentTarget.id;
        let b = e.currentTarget.dataset.id;
        console.log(b)
        // for(n;n<6;n++){
        //   for(m;m<6;m++){
        // for(n;n<this.position.length;n++){
        that.standard.forEach(item => {
          // console.log(item.id)
          if(b == item.id){
            item.active = true;
            this.salary_stand_id = item.id
            // console.log(this.salary_stand_id)
            wx.setStorageSync('salary_stand_id', this.salary_stand_id)
          }else {
            item.active = false;
          }
        })

      },
      input: function (e) {
        this.salary = e.mp.detail.value
        wx.setStorageSync('salary', this.salary)
        // console.log(this.salary)
      },
      nextstep: function () {
        // this.id = wx.getStorageSync('salary_stand_id')
        // console.log(this.id)
        wx.navigateTo({
          url: '/pages/topic/thrstep'
        })
      }
    }
  }
</script>

<style>
  page{
    background-color: #fff;
  }
  .layout{
    display: flex;
    flex-direction: column;
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
  .bbox{
    display: flex;
    flex-wrap: wrap;
  }
  .button1{
    text-align:center;
    margin-left:90rpx;
    margin-top:101rpx;
    width:130rpx;
    height:60rpx;
    font-size:28rpx;
    text-align:center;
    line-height:60rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
    background:rgba(249,249,249,1);
    border-radius:4rpx;
    color:rgba(255,255,255,1);
    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    border-radius:4rpx 0rpx 0rpx 4rpx;
  }
  .button{
    text-align:center;
    margin-left:90rpx;
    margin-top:101rpx;
    width:130rpx;
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
  .button2{
    text-align:center;
    margin-left:100rpx;
    margin-top:60rpx;
    width:130rpx;
    height:60rpx;
    background:rgba(249,249,249,1);
    border-radius:4rpx;
  }
  .button3{
    text-align:center;
    margin-left:80rpx;
    margin-top:60rpx;
    width:130rpx;
    height:60rpx;
    background:rgba(249,249,249,1);
    border-radius:4rpx;
  }
  .bt{
    width:54rpx;
    height:26rpx;
    font-size:28rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
  }
  .pay{
    margin-left:330rpx;
    margin-top:109rpx;
  }
  .price{
    /*margin-left:10rpx;*/
    /*padding-top:100rpx;*/
    width:100rpx;
    height:30rpx;
    font-size:50rpx;
    /*text-align:center;*/
    /*line-height:30rpx;*/
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .yuan{
    margin-left:225rpx;
    margin-top:11rpx;
    width:28rpx;
    height:26rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .heng{
    margin-left:100rpx;
    margin-top:30rpx;
    width:550rpx;
    height:2rpx;
    background:rgba(236,236,236,1);
  }
  .button4{
    text-align:center;
    line-height:90rpx;
    margin-left:30rpx;
    margin-top:120rpx;
    width:690rpx;
    height:90rpx;
    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    box-shadow:0rpx 2rpx 10rpx 0rpx rgba(46,155,255,0.5);
    opacity:0.3;
    border-radius:10rpx;
  }
  .bt4{
    width:85rpx;
    height:27rpx;
    font-size:29rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
</style>
