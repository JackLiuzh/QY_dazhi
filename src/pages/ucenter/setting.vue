<template>
 <div class="container">
     <navBar :title="'设置'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
      ></navBar>
     <div style="width: 100%;background-color: #fff;margin-bottom: 20rpx;">
        <div class="con" style="">
            <div class="con-l">更换手机号</div>
            <div class="con-r">1380966222200 <img src="/static/images/mine_right.png" style="width: 10rpx; height: 20rpx;vertical-align: middle;margin-left: 20rpx;"></div>
        </div>
     </div>
     <div style="width: 100%;background-color: #fff;margin-bottom: 100rpx;">
        <div @tap="modelshow" class="con" style="">
            <div class="con-l"> 更换账号类型</div>
            <div class="con-r">我要招人/我是学生 <img src="/static/images/mine_right.png" style="width: 10rpx; height: 20rpx;vertical-align: middle;margin-left: 20rpx;"></div>
        </div>
     </div>

     <div class="lix">
        退出登录
     </div>
     <!-- 弹出层 -->
     <div class="modalMask" v-if="isModel"></div>
     <div class="modalDialog" v-if="changeModel">
         <img src="/static/images/close.png" @tap="tapCancel" class="img-close">
         <img src="/static/images/zhanghao@2x.png"  class="img-set-phone" />
         <div style="font-size:28rpx;color: #666666;text-align: center;margin: 60rpx 0 50rpx;font-weight: 500;">更换账号类型</div>
         <div class="modalContent">
             <div class="modal-l">我要招人</div>
             <div class="modal-r">我是学生</div>
         </div>
     </div>

 </div>
</template>

<script>
import navBar from '@/components/navigationBar'
import api from '@/utils/api'
  // Use Vuex
  export default {
    computed: {

    },
    components:{
      navBar
    },
    data () {
      return {
        statusBarHeight: '', // 状态栏高度
        titleBarHeight: '', // 标题栏高度
        navBarHeight: '', // 导航栏总高度
        platform: '',
        model: '',
        brand: '',
        system: '',
        isModel:false,
        changeModel:false

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
    methods: {
      modelshow(){
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;  
      },
      // 返回跳转
      back(){
        wx.navigateBack({
          delta: 1
        })
      },
      //  弹框取消
      tapCancel(){
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
      }
    }
  }
</script>

<style>
  page{
    background-color: #f5f8f9;
  }




  .lix{
      line-height: 100rpx;
      height: 100rpx;
      text-align: center;
      color: #000000;
      font-size: 30rpx;
      width: 100%;
      background-color: #fff;
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
  .con{
      background: #fff;
      margin:0 30rpx;
      display: flex;
      justify-content: space-between;
      line-height: 100rpx;
      height: 100rpx;
  }

  .con-l{
      color: #000000;
      font-size:30rpx;
      font-weight:400;
  }
  .con-r{
      font-size:30rpx;
      font-weight:400;
      color:#999999;
  }

  .modalMask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #000;
      opacity: 0.5;
      overflow: hidden;
      z-index: 9000;
      color: #fff;
  }
  .modalDialog {
      box-sizing: border-box;
      width: 590rpx;
      height: 576rpx;
      overflow: hidden;
      position: fixed;
      top: 30%;
      left: 0;
      z-index: 9999;
      background: #fff;
      border-radius: 8px;
      text-align: center;
      margin: 0 80rpx;
  }
   .img-close{
       width: 26rpx;
       height: 26rpx;
       position: absolute;
       right: 40rpx;
       top: 40rpx;
   }
    .img-set-phone{
        width: 230rpx;
        height: 230rpx;
        margin: 70rpx 0 0;
        display: inline-block;
    }
  .modalContent{
      display: flex;
      justify-content: center;

  }
  .modal-l{
      height: 90rpx;
      line-height: 90rpx;
      width: 220rpx;
      border:2rpx solid #2E9BFF;
      font-weight:500;
      color:rgba(255,255,255,1);
      font-size:28rpx;
      background:linear-gradient(0deg,rgba(46,155,255,1) 1.025390625%, rgba(27,243,196,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      text-align: center;
      margin-right: 50rpx;
  }
  .modal-r {
      height: 90rpx;
      line-height: 90rpx;
      width: 220rpx;
      font-weight: 500;
      color: #fff;
      font-size: 28rpx;
      background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
      box-shadow:0rpx 2rpx 10rpx 0rpx rgba(46,155,255,0.5);
      border-radius:10rpx;
      text-align: center;
  }
</style>
