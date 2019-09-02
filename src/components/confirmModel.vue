<template>
<div>
    <!--填写手机号弹框-->
    <div class="modalMask" v-if="isshow"></div>
    <div class="modalDialog" v-if="isshow">
        <div class="modalContent">
            <div class="cha" @tap="tapCancel">x</div>
            <p class="contentTip">{{title}}</p>
            <div class="context">{{content}}</div>
            <div class="modalFooter">
               <div class="btnCancel" @tap="tapCancel">取消</div>
               <div class="btnConfirm" @tap="confirmSend(uid)">确定</div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: "reliefInsureInfo.vue",
    props: ['noCarProposalInfo','imageInfo','isshow','title','content','uid'],
    data(){
      return{
        changeModel: false,
        isModel: false,
        phoneNumber: '',
        isshow: false
        
      }
    },
    watch:{
    },
    methods:{
      // 打开输入手机号的模态框
      tapSendTele(){
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
      },
      //  弹框取消
      tapCancel(){
        this.phoneNumber = '';
        this.changeModel = !this.changeModel;
        this.isshow = !this.isshow;
        this.isModel = !this.isModel;
        this.$emit('cancelshow');
      },
      //  确认发送
      confirmSend(e){
        // console.log(e.currentTarget.dataset.uid)
        console.log(e)
        // console.log(this.phoneNumber);
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
        this.isshow = !this.isshow;
        this.$emit('confirmSend',this.phoneNumber);
        this.phoneNumber='';
      },
     }
  };
</script>
<style lang="less">
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
      position: relative;  
      box-sizing: border-box;
      width: 560rpx;
      // height: 330px;
      overflow: hidden;
      position: fixed;
      top: 50%;
      left: 0;
      z-index: 9999;
      background: #fff;
      margin: -180px 95rpx;
      border-radius: 8rpx;
      .modalContent {
        box-sizing: border-box;
        display: flex;
        padding: 50rpx 53rpx;
        font-size: 36rpx;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .contentTip{
          text-align: center;
          font-size: 30rpx;
          color: #333333;
          margin-top: 26rpx;
        }
        .teleStyle{
          background: #FAFAFA;
          // border: 1rpx solid #979797;
          border-radius: 6rpx;
          line-height: 80rpx;
          height: 80rpx;
          box-sizing: border-box;
          padding-left: 12rpx;
          width: 460rpx;
          font-size: 28rpx;
          /*color: rgba(0,0,0,0.25);*/
          margin-top: 30rpx;
        }
      }
      .modalFooter {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 160rpx;
        // border-top: 1rpx solid #E5E5E5;
        font-size: 36rpx;
        line-height: 100rpx;
        width: 100%;
        margin-top: 40rpx;
      }
      .btnCancel {
        width: 210rpx;
        font-size: 28rpx;
        color:#1BF3C4;
        height: 90rpx;
        text-align: center;
        border:2rpx solid rgba(191,191,191,1);
        box-shadow:0rpx 2rpx 10rpx 0rpx rgba(46,155,255,0.5);
        border-radius:10rpx;
      }
      .btnConfirm {
        font-size: 28rpx;
        color:rgba(255,255,255,1);
        width: 210rpx;
        height: 90rpx;
        text-align: center;
        background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
        box-shadow:0px 2rpx 19rpx 0rpx rgba(40,185,235,0.3);
        border-radius:8rpx;
      }
    }
    .cha{
       position: absolute;
       top: 30rpx;
       right: 40rpx;
       color: #CCCCCCFF;
       height: 50rpx;
       width: 50rpx;
       line-height: 26rpx;
       text-align: center;  
    }
    .context{
        margin-top: 20rpx;
        font-size: 30rpx;
        color: #666666;
    }
</style>


