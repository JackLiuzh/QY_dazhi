<template>
  <view class="container">
    <image class="search_title" :style="{height: navBarHeight + 'px'}" src="/static/images/search_beijing.png"></image>

    <view class="search_bar" :style="{height: navBarHeight + 'px'}" >
      <view  class="search_bar_line" :style="{height: statusBarHeight + 'px'}"></view>
      <view  class="search_bar_title" :style="{height: titleBarHeight + 'px'}" >
        <image class="back" src="/static/images/back.png" @click="back"></image>
        <text class="search_title_text" >公司详情</text>
      </view>
    </view>

    <view class="ci_box">
      <view class="job_xx">

          <view class="job_xx_v">

            <view class="job_xx_left">
              <image class="job_xx_left_img" src="/static/images/job_qiye.png"></image>

              <view class="job_xx_lefto">

                <view class="job_xx_left_top">
                  <text class="job_xx_left_top_text">启蒙艺术</text>

                  <!--<view class="job_xx_left_top_v"  >-->
                  <image class="ci_xx_left_top_img" src="/static/images/ci_shousang.png"></image>
                  <!--</view>-->

                </view>

                <view class="job_xx_left_bottom">
                  <image class="job_xx_left_bottom_img" src="/static/images/job_v.png"></image>
                  <text class="job_xx_left_bottom_text1">认证企业</text>

                  <text class="job_xx_left_bottom_text2">西安未央</text>
                  <text class="job_xx_left_bottom_text2">4个在职岗位</text>

                </view>
              </view>

            </view>
          </view>
      </view>

      <view class="ci_box_v">
        <view class="testNav">
          <view  id="nav1" :class="{'selected':tab === 1,'testTitle':true}"
                 @click="changTab(1)"
          >机构概况

          </view>

          <view id="nav2" :class="{'selected':tab === 2,'testTitle':true}"
                @click="changTab(2)"
          >其他职位</view>
        </view>

        <view class="index_box" v-if="istrue===true">
          <view class="index_box_left" v-if="tab===1">
            <text class="index_box_text1">企业基本信息</text>
            <view class="index_box_v">
              <text class="index_box_text2">公司全称</text>
              <text class="index_box_text3">西安启蒙美术责任有限公司</text>
            </view>

            <view class="index_box_v">
              <text class="index_box_text2">企业类型</text>
              <text class="index_box_text3">有限责任公司(自然人独资)</text>
            </view>

            <view class="index_box_v">
              <text class="index_box_text2">注册资本</text>
              <text class="index_box_text3">100万人民币</text>
            </view>

            <view class="index_box_v">
              <text class="index_box_text2">成立日期</text>
              <text class="index_box_text3">2017年08月08日</text>
            </view>

            <view class="index_box_v">
              <text class="index_box_text2">所属行业</text>
              <text class="index_box_text3">教育</text>
            </view>

            <view class="index_box_v">
              <text class="index_box_text2">统一社会信用代码</text>
              <text class="index_box_text3">90111011NA6UF9GQKF7G</text>
            </view>

            <view class="index_box_v">
              <text class="index_box_text2">经营范围</text>
              <text class="index_box_text3">但时间内的缴纳金你电视剧那肚腩加拿大那就是你金的那就你拿到手呢缴纳近视那寄到你甲酸钠鸡年大吉那见你紧紧的那谁叫你鸡年大吉那是那肚腩建设局你的缴纳时间内 鸡蛋卷你的缴纳时间内金但是紧紧的纳吉尼斯就你电视剧你电视剧年加拿大几十年那段是你接你大时间内觉得</text>
            </view>

            <view class="index_bars"></view>
            <view class="index_box_2">
              <text class="index_box_text4">公司介绍</text>
              <text class="index_box_text5">等你看上的内裤是你卡看你说你看看你可能卡丹尼斯的南宁市放你那建安费你几点睡难解难分饭等你十几年费南大街按实际那你是的缴纳金你发的就是你九年级阿凡达闪念胶囊反馈的女司机你反结案时的那就妇女节上动脑筋你姐夫电脑手机啊</text>
            </view>

          </view>
          <view class="index_bars" v-if="tab===2">
            <view class="index-v">

              <view class="index-v-list" v-for="(item,index) in items" :key="index"    @click="todetail">

                <view class="index-v-first">
                  <view class="index-v-first-v">
                    <image class="index-v-first-v-img" src="/static/images/index_remen.png"></image>
                    <text class="index-v-first-v-text">{{ item.title }}</text>
                  </view>
                  <text class="index-v-first-price">{{ item.price }}元/小时</text>
                </view>

                <view class="index-v-second">
                  <image class="index-v-second-image" src="/static/images/index_dizhi1.png"></image>
                  <text class="index-v-second-text">{{ item.position }}</text>
                  <image class="index-v-second-image1" src="/static/images/index_qiye.png"></image>
                  <text class="index-v-second-text2">{{ item.company }}</text>
                </view>

                <view class="index-v-throd">
                  <image class="index-v-throd-image" src="/static/images/index_yuan.png"></image>
                  <text class="index-v-throd-text">{{ item.time }}</text>
                  <image class="index-v-throd-image1" src="/static/images/index_yuan.png"></image>
                  <text class="index-v-throd-text">{{ item.way }}</text>
                  <image class="index-v-throd-image1" src="/static/images/index_yuan.png"></image>
                  <text class="index-v-throd-text">{{ item.other }}</text>
                </view>

              </view>

            </view>

            <view class="ci_v">
              <image class="ci_v_img" src="/static/images/ci_tu.png"></image>
              <text class="ci_v_text">该公司还没有发布其他职位</text>
            </view>
          </view>

          </view>


      </view>

    </view>
  </view>
</template>

<script>
  export default {
    name: "index.vue",
    data () {
      return {
        statusBarHeight: '', // 状态栏高度
        titleBarHeight: '', // 标题栏高度
        navBarHeight: '', // 导航栏总高度
        platform: '',
        model: '',
        brand: '',
        system: '',
        tab: 1,
        istrue: true,
        items: [ {title: '中国电信项目执行校园大使', price: '40', position: '莲湖其他爱德华', company: '西安领军智能科技', time: '长期', way: '日结', other: '有提成'},
          {title: '米琪蛋糕门店小时工招聘', price: '15', position: '莲湖其他爱德华', company: '西安领军智能科技', time: '长期', way: '日结', other: '有提成'},
          {title: '招聘周末大学生家教辅导老师', price: '12', position: '莲湖其他爱德华', company: '西安领军智能科技', time: '长期', way: '日结', other: '有提成'},
          {title: '室内文员兼职小时工', price: '12', position: '莲湖其他爱德华', company: '西安领军智能科技', time: '长期', way: '日结', other: '有提成'}],
      }
    },
    beforeMount () {
      const self = this
      wx.getSystemInfo({
        success (system) {
          console.log(`system:`, system)
          self.statusBarHeight = system.statusBarHeight
          self.platform = system.platform
          self.model = system.model
          self.brand = system.brand
          self.system = system.system

          let platformReg = /ios/i
          if (platformReg.test(system.platform)) {
            self.titleBarHeight = 44
          } else {
            self.titleBarHeight = 48
          }

          self.navBarHeight = self.statusBarHeight + self.titleBarHeight
        }
      })
    },
    methods:{
      back(){
        wx.navigateBack({
              delta: 1
            })
      },
      changTab (index) {
        this.istrue = true
        this.tab = index
      },

    }
  };
</script>

<style >
 page{
  background-color: #f5f8f9;
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
  padding: 0 20rpx;
  height: 100rpx;
  line-height: 100rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ci_box_v{
  width: 100%;
  background-color: white;
  margin-top: 20rpx;
}
.testTitle {
  flex: 1;
  text-align: center;
  font-size: 30rpx;
}
.selected {
  font-sie:30rpx;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(51,51,51,1);

  background:linear-gradient(0deg,rgba(46,155,255,1) 1.025390625%, rgba(27,243,196,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  border-bottom: 1px solid #00d0e0;
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
  display: none;
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
