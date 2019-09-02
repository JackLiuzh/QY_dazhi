<template>
  <view class="container">
    <navBar :title="job_title"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
    >
    </navBar>

    <view  v-for="(list,index) in data_list">
      <view class="date"><text >{{list.time}}</text></view>



      <view class="bgbox">
        <view class="tatle">
          <text class="t">{{list.title}}</text>
        </view>
        <view class="content">{{list.content}}</view>
      </view>
    </view>

  </view>

</template>

<script>
  import apii from '@/utils/apii'
  import util from '@/utils/util1'
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
        jobid: '',
        data_list: [],
        job_title: '',
        // corp_info: [],
        // feedback_info: [],
      }
    },
    mounted () {
      this.getmessagebyjobid();
      // this.jobid = options.jobid;
      // console.log(util.getQuery().jobid);

    },
    methods: {
      async getmessagebyjobid () {
        this.jobid = util.getQuery().jobid;
        console.log(this.jobid);
        const res = await apii.getmessagebyjobid({ uid: this.uid , jobid: this.jobid });
        if (res.code === 1) {
          this.data_list = res.data.data_list;
          this.job_title = res.data.job_title;
          // this.standard.forEach(as => {
          //   this.$set(as, 'active', false);
          // });
          // this.$forceUpdate();
        }
      },
      // click: function () {
      //   wx.navigateTo({
      //     url: '/pages/catalog/survey'
      //   })
      // }
    }
  }
</script>

<style>
  .container{
    display: flex;
    flex-direction: column;
  }

  .date {
    /*margin-left: 300rpx;*/
    /*margin-top: 100rpx;*/
    margin-top: 20rpx;
    height:19rpx;
    font-size:24rpx;
    text-align:center;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .bgbox {
    display: flex;
    flex-direction: column;
    margin-left: 27rpx;
    margin-top: 40rpx;
    width:690rpx;
    height:390rpx;
    background:rgba(255,255,255,1);
    box-shadow:-3rpx 3rpx 28rpx 1rpx rgba(29,53,102,0.04);
    border-radius:10rpx;
  }

  .tatle {

    margin-top:50rpx;
    width:300rpx;
    height:70rpx;
    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    border-radius:0rpx 35rpx 35rpx 0rpx;
  }
  .tatle .t {
    margin-left: 25rpx;
    margin-top:50rpx;
    width:178rpx;
    height:28rpx;
    font-size:30rpx;
    text-align:center;
    line-height:70rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .content {
    margin-top: 30rpx;
    margin-left: 51rpx;
    width:586rpx;
    height:121rpx;
    font-size:26rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:48rpx;
  }
</style>
