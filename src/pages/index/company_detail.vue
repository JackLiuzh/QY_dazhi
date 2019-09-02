<template>
  <view class="">
    <navBar :title="'公司详情'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
    ></navBar>
    <view class="ci_box">
      <view class="job_xx">

          <view class="job_xx_v">

            <view class="job_xx_left">
              <image class="job_xx_left_img" :src="cop.logo"></image>

              <view class="job_xx_lefto">

                <view class="job_xx_left_top">
                  <text class="job_xx_left_top_text" > {{cop.qy_name}} </text>
                  <text class="job_xx_left_top_text" ></text>

                  <!--<view class="job_xx_left_top_v"  >-->
                  <image class="ci_xx_left_top_img" src="/static/images/shousang2@2x.png"></image>
                  <!--</view>-->

                </view>

                <view class="job_xx_left_bottom">
                  <image class="job_xx_left_bottom_img" src="/static/images/V@2x.png"></image>
                  <text class="job_xx_left_bottom_text1">认证企业</text>

                  <text class="job_xx_left_bottom_text2"> {{cop.address}} </text>
                  <text class="job_xx_left_bottom_text2">{{cop.job_count}}个在职岗位</text>

                </view>
              </view>

            </view>
          </view>
      </view>

      <view class="ci_box_v">
        <view class="testNav">
          <view class="top_ti" id="nav1">机构概况</view>
        </view>

        <view class="index_box" v-if="istrue===true">
          <view class="index_box_left" v-if="tab===1">
            <text class="index_box_text1">企业基本信息</text>
            <view class="index_box_v">
              <text class="index_box_text2">公司全称</text>
              <text class="index_box_text3"> {{cop.qy_name}}</text>
            </view>

            <view class="index_box_v">
              <text class="index_box_text2">企业类型</text>
              <text class="index_box_text3"> {{cop.type}}</text>
            </view>

            <view class="index_box_v">
              <text class="index_box_text2">注册资本</text>
              <text class="index_box_text3"> {{cop.regmoney}}</text>
            </view>

            <view class="index_box_v">
              <text class="index_box_text2">成立日期</text>
              <text class="index_box_text3"> {{cop.builddate}}</text>
            </view>

            <view class="index_box_v">
              <text class="index_box_text2">所属行业</text>
              <text class="index_box_text3"> {{cop.industry}}</text>
            </view>

            <view class="index_box_v">
              <text class="index_box_text2">统一社会信用代码</text>
              <text class="index_box_text3"> {{cop.socialcode}}</text>
            </view>

            <view class="index_box_v">
              <text class="index_box_text2">经营范围</text>
              <text class="index_box_text3"> {{cop.scope}}</text>
            </view>

            <view class="index_bars"></view>
            <view class="index_box_2">
              <text class="index_box_text4">公司介绍</text>
              <text class="index_box_text5">
                {{cop.intro}}
              </text>
            </view>

          </view>
          </view>


      </view>

    </view>
    <div v-if="butisshow" class="but">
         <loginbut @clicked="jiaru" title="加入"></loginbut>
    </div>
  </view>
</template>

<script>
import navBar from '@/components/navigationBar'
import loginbut from '@/components/But'
import api from '@/utils/api'
  export default {
    name: "index.vue",
    data () {
      return {
        tab: 1,
        istrue: true,
        copinfo:'',
        cop:'',
        corpid:'',
        butisshow:false
      }
    },
    components: {
       navBar,
       loginbut
    },
    beforeMount () {

    },
    mounted(){
        let pages = getCurrentPages()
        if (pages.length >= 2) {
            let prevpage = pages[pages.length - 2]
            // console.log(prevpage)
            if(prevpage.route === 'pages/index/search'){
                this.butisshow = true
                
            }
        }
        var corpid = this.$route.query.corpid
        this.corpid = corpid
        this.init(corpid)

    },
    methods:{
      jiaru(){
          var uid = wx.getStorageSync('uid')
          var corpid = this.corpid
          this.jiaruaction(corpid,uid)
          // console.log("jj")
      },
      async jiaruaction(corpid,uid){
          const res = api.index_jiarucom({corpid:corpid,uid:uid})
      },
      back(){
        wx.navigateBack({
              delta: 1
            })
      },
      changTab (index) {
        this.istrue = true
        this.tab = index
      },
      async init(corpid){
          const that = this
          const res = await api.index_look_info({corpid:corpid})
          if(res.code == 1){
            //   console.log(res.data.info)
              that.cop = res.data.info
          }
      }

    }
  };
</script>

<style>
  page{
  background-color: #f5f8f9;
}
.top_ti{
    font-size:29rpx;
    font-weight:500;
    color:rgba(51,51,51,1);
    background:linear-gradient(0deg,rgba(46,155,255,1) 1.025390625%, rgba(27,243,196,1) 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px;
  padding-bottom: 300rpx;
}
.search_title{
  width: 750rpx;
  height: 128rpx;
}
.back{
  width: 36rpx;
  height: 36rpx;
  padding-top: 10rpx;
  padding-bottom: 10rpx;
  padding-left: 30rpx;
}
.search_bar{
  width: 100%;
  background-color:RGBA(0,0,0,0);
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search_title_text{
  width: 100%;
  text-align: center;
  color: white;
  font-size:34rpx;
  margin-right: 61rpx;
}
.search_bar_title{
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}
.search_bar_line{
  width: 100%;
}
.ci_box{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.job_xx{
  margin-top: 10rpx;
  width: 100%;
  height:200rpx;
  display: flex;
  background-color: white;
  align-items: center;
}

.job_xx_v{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 30rpx;
  margin-left: 40rpx;
}
.job_xx_left{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.job_xx_left_img{
  width: 100rpx;
  height: 100rpx;
}
.job_xx_left_top_text{
  color: #333;
  font-size: 30rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
}
.job_xx_left_top_star{
  width: 38rpx;
  height: 38rpx;
  margin-left: 10rpx;
}
.job_xx_left_top{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.job_xx_left_top_v{
  display: flex;
  flex-direction: row;
}
.job_xx_left_bottom{
  display: flex;
  align-items: center;
  margin-top: 15rpx;
}
.job_xx_left_bottom_img{
  width: 20rpx;
  height: 18rpx;
  margin-left: 20rpx;
}
.job_xx_left_bottom_text1{
  font-size:22rpx;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(51,51,51,1);
  background:linear-gradient(0deg,rgba(46,155,255,1) 1.025390625%, rgba(27,243,196,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  margin-left: 5rpx;
}
.job_xx_left_bottom_text2{
  color: #999;
  font-size: 22rpx;
  margin-left: 40rpx;
}
.job_xx_lefto{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.ci_xx_left_top_img{
  width: 36rpx;
  height: 36rpx;
}
.testNav {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ci_box_v{
  width: 100%;
  background-color: white;
  margin-top: 20rpx;
}
.testTitle {
  /* flex: 1; */
  text-align: center;
  font-size: 30rpx;
  margin:0 100rpx;
  width:140rpx;
  font-size:30rpx;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  border-bottom: 5rpx solid #fff;
}
.selected {
  color:rgba(51,51,51,1);
  background:linear-gradient(0deg,rgba(46,155,255,1) 1.025390625%, rgba(27,243,196,1) 100%);
  -webkit-text-fill-color:transparent;
  border-bottom: 5rpx solid #00d0e0;
  -webkit-background-clip:text;
}
.index_box{
  width: 750rpx;
  display: flex;
  flex-direction: column;
}
.index_box_left{
  display: flex;
  flex-direction: column;
  margin-top: 30rpx;
}
.index_box_text1{
  color: #000;
  font-size: 30rpx;
  margin-bottom: 10rpx;
  margin-left: 40rpx;
  margin-right: 30rpx;
}
.index_box_v{
  display: flex;
  flex-direction: row;
  margin-top: 20rpx;
  margin-left: 40rpx;
  margin-right: 30rpx;
}
.index_box_text2{
  color: #999;
  font-size: 28rpx;
  white-space: nowrap;
}
.index_box_text3{
  color: #333;
  font-size: 28rpx;
  margin-left: 40rpx;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.index_box_text4{
  margin-top: 40rpx;
  color: #000;
  font-size: 30rpx;
  margin-left: 40rpx;
  margin-right: 30rpx;
}
.index_box_text5{
  color: #333;
  font-size: 28rpx;
  margin-top: 30rpx;
  margin-left: 40rpx;
  margin-right: 30rpx;
}
.index_box_2{
  padding-bottom: 40rpx;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.index_bars{
  width: 100%;
  height: 20rpx;
  background-color: #f5f8f9;
  margin-top: 20rpx;
}
.index-v{
  width: 100%;
  margin-top: -10rpx;
}
.index-v-list{
  width: 750rpx;
  height: 204rpx;
  background-color: white;
  margin-top:10rpx;
}
.index-v-first{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 20rpx;
}
.index-v-first-v{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 20rpx;

}
.index-v-first-v-img{
  width: 40rpx;
  height: 46rpx;
}
.index-v-first-v-text{
  color: #353535;
  font-size: 32rpx;
  font-weight: bold;
  margin-left: 10rpx;
}
.index-v-first-price{
  font-size:34rpx;
  font-weight:bold;
  color:rgba(255,102,2,1);
  background:linear-gradient(0deg,rgba(255,115,82,1) 0%, rgba(255,175,108,1) 98.9990234375%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  margin-right: 20rpx;
}
.index-v-second{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20rpx;
}
.index-v-throd{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 25rpx;
}
.index-v-second-image{
  width: 20rpx;
  height: 26rpx;
  margin-left: 30rpx;
}
.index-v-second-image1{
  width: 20rpx;
  height: 26rpx;
  margin-left: 40rpx;
}
.index-v-throd-image{
  width: 40rpx;
  height: 40rpx;
  margin-left: 20rpx;
}
.index-v-throd-image1{
  width: 40rpx;
  height: 40rpx;
  margin-left: 30rpx;
}
.index-v-second-text{
  font-size: 26rpx;
  color: #999;
  margin-left: 20rpx;
  width:140rpx;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.index-v-second-text2{
  font-size: 26rpx;
  color: #999;
  margin-left: 20rpx;
}
.index-v-throd-text{
  font-size: 26rpx;
  color: #999;
  margin-left: 10rpx;
  margin-top: -5rpx;
}
.ci_v{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ci_v_img{
  width: 514rpx;
  height:440rpx ;
  margin-top: 150rpx;
}
.ci_v_text{
  margin-top: 80rpx;
  font-size: 32rpx;
  color: #353535;
}
</style>
