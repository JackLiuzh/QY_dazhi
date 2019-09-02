<template >
  <view class="container">
    <navBar :title="'消息中心'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
    >
    </navBar>

    <view class="layout" >
      <view class="mod" v-for="(list,index) in jobtitle_list" :data-id="list.jobid" @click="click1">
        <view  class="gg">
          <img src="/static/images/xiaoxi@2x.png" class="img1"/>
        </view>


        <view class="xx">
          <text class="tatle">{{list.job_title}}</text>
          <text class="left">{{list.title}}</text>
        </view>

        <view class="xx">
          <text class="date">{{list.time}}</text>
          <text v-if='list.unread!=0' class="num">{{list.unread}}</text>
        </view>
      </view>

    </view>


    <view class="layout" @click="click2" >
      <view class="mod" >
        <view class="gg">
          <img src="/static/images/xiaoxi@2x.png" class="img1"/>
        </view>


        <view class="xx">
          <text class="tatle">企业信息、资质认证</text>
          <text class="left">{{corp_info.title}}</text>
        </view>

        <view class="xx">
          <text class="date">{{corp_info.time}}</text>
          <text v-if='corp_info.unread!=0' class="num">{{corp_info.unread}}</text>
        </view>
      </view>

    </view>
    <view class="layout" @click="click3">
      <view class="mod">
        <view class="gg">
          <img src="/static/images/fankui.png" class="img1"/>
        </view>
        <view class="xx">
          <text class="tatle">反馈结果通知</text>
          <text class="left">{{feedback_info.title}}</text>
        </view>

        <view class="xx">
          <text class="date">{{feedback_info.time}}</text>
          <text v-if='feedback_info.unreead!=0' class="num">{{feedback_info.unreead}}</text>
        </view>
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
    data() {
      return {
        statusBarHeight: '', // 状态栏高度
        titleBarHeight: '', // 标题栏高度
        navBarHeight: '', // 导航栏总高度
        uid: 2,
        jobid: 0,
        jobtitle_list: [],
        corp_info: [],
        feedback_info: [],
      }
    },
    mounted () {
      this.message();
      // this.jobid = this.jobtitle_list.jobid;

    },
    methods: {
      async message () {
        const res = await apii.message({ uid: this.uid });
        if (res.code === 1) {
          this.jobtitle_list = res.data.jobtitle_list;
          this.jobid = this.jobtitle_list.jobid;
          this.corp_info = res.data.corp_info;
          this.feedback_info = res.data.feedback_info;
          // this.standard.forEach(as => {
          //   this.$set(as, 'active', false);
          // });
          // this.$forceUpdate();
        }
        // console.log(this.jobid)
      },
      click1: function (e) {
        let b = e.currentTarget.dataset.id;
        console.log(b)
        // this.jobid = b
        wx.navigateTo({
          url: '/pages/catalog/survey?jobid=' + b
        })
      },
      click2: function () {
        wx.navigateTo({
          url: '/pages/catalog/qiye'
        })
      },
      click3: function () {
        wx.navigateTo({
          url: '/pages/catalog/fankui'
        })
      }
    }
  }
</script>

<style>
  page {
    height: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
  }

  .mod {
    display:flex;

    width:750rpx;
    height:162rpx;
    background:rgba(255,255,255,1);
  }

  .gg {
    margin-left: 30rpx;
    margin-top: 31rpx;
  }
  .tu {
    /*position: relative;*/
    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    opacity:0.1;
    border-radius:50%;

  }
  .img1 {
    /*position: absolute;*/
    width:100rpx;
    height:100rpx;

  }

  .xx {
    display: flex;
    flex-direction:column;

  }

  .xx .tatle {
    margin-left: 27rpx;
    margin-top: 39rpx;
    width:270rpx;
    height:29rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);
  }

  .xx .date {
    margin-left: 163rpx;
    margin-top: 44rpx;
    width:143rpx;
    height:19rpx;
    font-size:24rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
  }

  .xx .left {
    margin-left:28rpx;
    margin-top:29rpx;
    width:190rpx;
    height:25rpx;
    font-size:26rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
  }

  .xx .num {
    margin-left: 263rpx;
    margin-top: 32rpx;
    width:30rpx;
    height:30rpx;
    font-size:23rpx;
    text-align:center;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    background:linear-gradient(135deg,rgba(255,8,68,1),rgba(255,94,111,1));
    border-radius:50%;
    color:rgba(245,247,249,1);
  }

  .catalog {
    flex: 1;
    width: 100%;
    background: #fff;
    display: flex;
    border-top: 1px solid #fafafa;
  }

  .catalog .nav {
    width: 162rpx;
    height: 100%;
  }

  .catalog .nav .item {
    text-align: center;
    line-height: 90rpx;
    width: 162rpx;
    height: 90rpx;
    color: #333;
    font-size: 28rpx;
    border-left: 6rpx solid #fff;
  }

  .catalog .nav .item.active {
    color: #ab2b2b;
    font-size: 36rpx;
    border-left: 6rpx solid #ab2b2b;
  }

  .catalog .cate {
    border-left: 1px solid #fafafa;
    flex: 1;
    height: 100%;
    padding: 0 30rpx 0 30rpx;
  }

  .banner {
    display: block;
    height: 222rpx;
    width: 100%;
    position: relative;
  }

  .banner .image {
    position: absolute;
    top: 30rpx;
    left: 0;
    border-radius: 4rpx;
    height: 192rpx;
    width: 100%;
  }

  .banner .txt {
    position: absolute;
    top: 30rpx;
    text-align: center;
    color: #fff;
    font-size: 28rpx;
    left: 0;
    height: 192rpx;
    line-height: 192rpx;
    width: 100%;
  }

  .catalog .hd {
    height: 108rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .catalog .hd .txt {
    font-size: 24rpx;
    text-align: center;
    color: #333;
    padding: 0 10rpx;
    width: auto;
  }

  .catalog .hd .line {
    width: 40rpx;
    height: 1px;
    background: #d9d9d9;
  }

  .catalog .bd {
    height: auto;
    width: 100%;
    overflow: hidden;
  }

  .catalog .bd .item {
    display: block;
    float: left;
    height: 216rpx;
    width: 144rpx;
    margin-right: 34rpx;
  }

  .catalog .bd .item.last {
    margin-right: 0;
  }

  .catalog .bd .item .icon {
    height: 144rpx;
    width: 144rpx;
  }

  .catalog .bd .item .txt {
    display: block;
    text-align: center;
    font-size: 24rpx;
    color: #333;
    height: 72rpx;
    width: 144rpx;
  }

</style>
