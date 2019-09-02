<template>
 <div>
    <!--填写手机号弹框-->
    <div class="modalMask" v-if="isshow"></div>
    <div class="modalDialog" v-if="isshow">
        <div class="modalContent">
            <div class="cha" @tap="tapCancel">x</div>
            <p class="contentTip">添加新同事</p>
            <input type="number" placeholder="请输入新同事微信绑定的手机号" placeholder-style="color:#CCCCCC" class="teleStyle" v-model="phoneNumber" maxlength="11">
            </div>
            <div class="modalFooter">
            <!-- <div class="btnCancel" @tap="tapCancel">取消</div> -->
            <div class="btnConfirm" @tap="confirmSend">提交</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: "reliefInsureInfo.vue",
    props: ['noCarProposalInfo','imageInfo','isshow'],
    data(){
      return{
        changeModel: false,
        isModel: false,
        phoneNumber: '',
        isshow: false,
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
      confirmSend(){
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
        justify-content: center;
        height: 160rpx;
        // border-top: 1rpx solid #E5E5E5;
        font-size: 36rpx;
        line-height: 100rpx;
      }
      .btnCancel {
        width: 50%;
        font-size: 36rpx;
        color: #333;
        text-align: center;
        border-right: 1rpx solid #E5E5E5;
      }
      .btnConfirm {
        font-size: 31rpx;
        color:rgba(255,255,255,1);
        width: 80%;
        height: 90rpx;
        text-align: center;
        background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
        box-shadow:0px 2rpx 19rpx 0rpx rgba(40,185,235,0.3);
        border-radius:8rpx;
        margin-top: 40rpx;
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
</style>


