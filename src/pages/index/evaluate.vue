<template>
 <div class="">
     <navBar :title="'企业评价'"
    :titleColor="'white'"
    :back-visible="true"
    ></navBar>
    <div style="background:white;height:180rpx;diplay:flex;">
       <view class="mini_head_v_top">
          <view class="mini_head_v_top_left">
            <image  class="mini_head_v_top_left_avatar" :src="stuinfo.avatar"></image>
            <view class="mini_head_v_top_left_v">
            </view>
            <view class="mini_head_v_top_left_wenzi">
              <view class="mini_head_v_top_left_wenzi_v">
                <text class="mini_head_v_top_left_wenzi_name">{{stuinfo.name}}</text>
                <image class="mini_head_v_top_left_wenzi_pic" src="/static/images/mine_nv.png"></image>
              </view>
              <text class="mini_head_v_top_left_wenzi_un">{{stuinfo.age}}岁  {{stuinfo.school_name}}</text>

            </view>
          </view>
        </view>
    </div>
    <div class="slider_box">
        <div class="item_slider" v-for="(item,index) in label_list" :key="index">
             <div class="slider_title">{{item.title}}</div>
             <div class="slider_self">
                    <van-slider
                    :value="item.score"
                    use-button-slot
                    @drag="onDrag"
                    :data-id="item.id"
                    :data-index="index"
                    :bar-height="'10rpx'"
                    :active-color="'#2E9BFF'"
                    >
                        <view style="width:53rpx;height:53rpx;border-radius:26rpx;background-image:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562856651475&di=a47499b94228515f75384415628017d5&imgtype=0&src=http%3A%2F%2Fupload.semidata.info%2Fnew.eefocus.com%2Farticle%2Fimage%2F2017%2F10%2F20%2F59e958c970f30.jpg);" class="custom-button" slot="button">
                           <view style="position:relative;top:-40rpx;color:#1BF3C4;width:200rpx;font-size:24rpx;">{{item.score}}分</view>
                        </view>
                    </van-slider>
             </div>
             <div class="slider_text">
                 <div class="text_left">较差</div>
                 <div class="text_right">优秀</div>
             </div> 
        </div>
    </div>
    <div class="evaluate_text">
         <div class="text_title">
              评价
         </div>
         <div class="text_content">
              <textarea style="min-height:380rpx;font-size:28rpx;padding:20rpx;" @input="bindTextAreaInput" placeholder-class="cl" auto-height placeholder="请评论" />
         </div>
         <div class="text_bottom">
              {{textareanum | 0}}/800
         </div>
    </div>
    <div class="but">
         <login-but :title="'提交评论'" :width="'690'" @clicked="confirm"></login-but>
    </div>
 </div>
</template>

<script>
  import navBar from '@/components/navigationBar'
  import api from '@/utils/api'
  import LoginBut from '@/components/But'
//   import mpButton from 'mpvue-weui/src/button'
//   import mpSlider from 'mpvue-weui/src/slider'
// Use Vuex
  export default {
    components: {
     navBar,
     LoginBut
    },   
    computed: {

    },
    data () {
      return {
        tab:1,
        currentValue: 50,//滑块默认值
        label_list:[],
        stuinfo:'',
        jobid:'',
        stuid:'',
        textareanum:'',//文本的字数
        text_evaluate:'',//文本内容
      }
    },
    beforeMount () {
      
    },
    mounted(){
        this.jobid = this.$route.query.jobid
        this.stuid = this.$route.query.stuid
        this.init()
    },
    methods: {
      async init(){
          const res = await api.gotoprise({jobid:this.jobid,stuid:this.stuid,uid:1})
          if(res.code == 1){
              // console.log("去评价的接口成功")
              this.label_list = res.data.label_list.map(o=>{return {id:o.id,title:o.title,score:50}})
              this.stuinfo = res.data.stuinfo
          }
      },
      async confirm(){
          const res = await api.savePrise({corpid:1,jobid:this.jobid,uid:1,stuid:this.stuid,evaluate:this.text_evaluate,scoreinfo:JSON.stringify(this.label_list)})
          if(res.code == 1){
              console.log("保存评价成功")
          }
      },
      bindTextAreaInput(e){
          var value = e.target.value
          this.text_evaluate = value
          var len = parseInt(value.length)
          if(len > 800) return;
              this.textareanum = len

      },
      onDrag(event){
          const index = event.target.dataset.index
          this.$set(this.label_list[index],'score',parseInt(event.target.value)) 
          // this.$forceUpdate()
      },
      // 返回跳转
      back(){
        wx.navigateBack({
          delta: 1
        })
      },
      changTab(index) {
        this.tab = index;
      },
      //去评价
      evaluationUrl(){
        wx.navigateTo({
          url: "../evaluation/main"
        });
      }
    }
  }
</script>

<style lang="less">
.cl{
  font-size: 28rpx;
  color:#CCCCCC;
}
.evaluate_text{
   margin-top: 20rpx;
   padding: 31rpx;
  //  min-height: 406rpx;
   .text_title{
     font-size: 28rpx;
     color: #333333;
     text-align: left;
   }
   .text_bottom{
     color: #999999;
     font-size: 28rpx;
     text-align: right;
   }
}
  .mini_head_v{
    /* width:690rpx ;
    height: 340rpx;
    background-color: white;
    border-radius: 5px;
    position: absolute;
    top: 170rpx; */
  }
  .mini_head_v_top{
    display: flex;
    height: 180rpx;
    flex-direction: row;
    /* align-items: center; */
    justify-content: flex-start;
  }
  .mini_head_v_bottom{
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;
  }
  .mini_head_v_top_left{
    display: flex;
    flex-direction: row;
  }
  .mini_head_v_top_left_avatar{
    width: 120rpx;
    height: 120rpx;
    margin: 40rpx;
  }
  .mini_head_v_top_left_notice{
    width: 30rpx;
    height: 30rpx;
    margin-left: -70rpx;
    margin-top: 40rpx;
  }
  .mini_head_v_top_left_v{
  }
  .mini_head_v_top_left_text{
    position: relative;
    font-size: 22rpx;
    color: white;
    left: -60rpx;
    top: -42rpx;
  }
  .mini_head_v_top_left_wenzi{
    height: 60px;
    display: flex;
    flex-direction: column;
    margin-top: 25px;
  }
  .mini_head_v_top_left_wenzi_un{
    font-size: 14px;
    color:#999999 ;
    margin-top: 10px;
  }
  .mini_head_v_top_left_wenzi_v{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .mini_head_v_top_left_wenzi_name{
    font-size: 16px;
    color:#000 ;
  }
  .mini_head_v_top_left_wenzi_pic{
    width: 10px;
    height:14px ;
    margin-left: 10px;
  }
  .mini_head_v_top_right{
    width: 78px;
    height: 30px;
    border-radius: 5px;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
    background: -webkit-linear-gradient(left, #2E9BFF , #1BF3C4); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #2E9BFF, #1BF3C4); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #2E9BFF, #1BF3C4); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #2E9BFF , #1BF3C4); /* 标准的语法 */
    color: white;
    margin-right: 20px;
  }
  .mini_head_v_bottom_v{
    width:50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .mini_head_v_bottom_num{
    color:#000 ;
    font-size: 25px;
  }
  .mini_head_v_bottom_text{
    color: #999;
    font-size: 11px;
  }
  .mine_xinyong{
    width: 100%;
    margin-top: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mine_xinyong_back{
    width:690rpx;
    height: 160rpx;
  }
  .mine_xinyong_num{
    color: white;
    font-size: 60rpx;
    position: absolute;
    right: 230rpx;
  }
  .mine_shenqing{
    width: 100%;
    height: 260rpx;
    background-color: white;
    margin-top: 20rpx;
    display: flex;
    flex-direction: column;
  }
  .mine_shenqing_title{
    color: #999;
    font-size: 26rpx;
    margin-left: 30rpx;
    margin-top: 30rpx;
  }
  .mine_shenqing_list{
    width: 100%;
    margin-top: 20rpx;
    display: flex;
    flex-direction: row;
  }
  .mine_shenqing_list_yibaoming{
    width:25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .mine_shenqing_list_text{
    color: #333;
    font-size: 28rpx;
  }
  .mine_shenqing_list_img{
    width: 84rpx;
    height: 94rpx;
  }
  .mine_custom{
    width: 100%;
    height: 90rpx;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    margin-top: 20rpx;
  }
  .mine_custom1{
    width: 100%;
    height: 90rpx;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    margin-top: 2rpx;
  }
  .mine_right{
    width: 10rpx;
    height: 20rpx;
    margin-right: 40rpx;
  }
  .mine_custom_left{
    display: flex;
    flex-direction:row;
    align-items: center;
  }
  .mine_custom_left_pic{
    width: 34rpx;
    height: 30rpx;
    margin-left: 30rpx;
  }
  .mine_custom_left_text{
    color:#333;
    font-size:28rpx ;
    margin-left: 30rpx;
  }
  .but{
    display: flex;
    justify-content: center;
  }
  /* slider开始 */
   .slider_box{
       .item_slider{
           padding:0 30rpx;
           .slider_title{
              font-size: 28rpx;
              color:#333333;
              margin-top:66rpx;
              margin-bottom: 60rpx;
           }
           .slider_self{
              margin-bottom:27rpx;
           }
           .slider_text{
              
              font-size: 24rpx;
              color: #666666;
              display: flex;
              justify-content: space-between;
           }
       }
   }
  /* slider结束 */
</style>
