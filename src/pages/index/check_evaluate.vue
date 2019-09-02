<template>
   <div>
       <navBar :title="'查看评论'"
       :titleColor="'white'"
       :back-visible="true"
       ></navBar>
       <div style="background:white;height:180rpx;diplay:flex;">
            <view class="mini_head_v_top">
                <view class="mini_head_v_top_left">
                    <image v-if="userinfo.avatar" class="mini_head_v_top_left_avatar" :src="userinfo.avatar"></image>
                    <view class="mini_head_v_top_left_v">
                    </view>
                    <view class="mini_head_v_top_left_wenzi">
                    <view class="mini_head_v_top_left_wenzi_v">
                        <text class="mini_head_v_top_left_wenzi_name">{{userinfo.name}}</text>
                        <image class="mini_head_v_top_left_wenzi_pic" src="/static/images/mine_nv.png"></image>
                    </view>
                    <text class="mini_head_v_top_left_wenzi_un">{{userinfo.age}}岁 {{userinfo.school_name}}</text>

                    </view>
                </view>
            </view>
        </div>
        <div class="content">
            <div class="con_con">
                <view class="con_xing">
                    <div class="xing_box">
                        <div v-for="dex of xingnum" :key="dex" class="box_item">
                            <image style="width:67rpx;height:64rpx;" src="/static/images/xing1@2x.png"/>
                        </div>
                        <div v-if="(5-xingnum)>0" v-for="d in (5-xingnum)" :key="d" class="box_item">
                            <image style="width:67rpx;height:64rpx;" src="/static/images/xing2@2x.png"/>
                        </div>
                    </div>
                    <div class="xing_fen">
                        {{evaluate_info.avg_score}}
                    </div>
                </view>
                <div class="con_chart">
                    <div class="chart_box">
                        <canvas canvas-id="radarCanvas" style="text-align:center;height:300px;width:375px;"></canvas>
                    </div>
                </div>
                <div class="con_word">
                    <div class="word_box">
                         {{evaluate_info.evaluate}}
                    </div>
                </div>
            </div>
            <div  class="con_but">
                <!-- <login-but :title="'删除'" :width="'690'" @clicked="confirm"></login-but>   -->
            </div>
        </div>
   </div>
</template>

<script>
import navBar from '@/components/navigationBar'
import wxCharts from '@/utils/wxChats/wxcharts'
import LoginBut from '@/components/But'
import api from '@/utils/api'
import { breakStatement } from 'babel-types';
export default {
    data(){
        return {
           widowwidth:'',
           jobid:'',//兼职信息id
           stuid:'',//学生id
           userinfo:'',//学生信息
           evaluate_info:'',//评价详情
           xingnum:1,
           categories_title:[],
           categories_num:[],
        }
    },
    components: {
       navBar,
       LoginBut
    },
    mounted(){
        // console.log(this.$route.query)
        this.jobid = this.$route.query.jobid
        this.stuid = this.$route.query.stuid
        this.init()
    },
    methods:{
         charts(){
            new wxCharts({
                canvasId: 'radarCanvas',
                type: 'radar',
                categories: this.categories_title,
                series: [{
                    name: '企业评价',
                    data: this.categories_num
                }],
                width: 375,
                height: 263,
                extra: {
                    radar: {
                        max: 150
                    }
                }
            })
         },
         async init(){
              var that = this
              const res=await api.evaluate_detail({uid:this.stuid,jobid:this.jobid})
              if(res.code==1){
                //    console.log("查看评价的接口成功")
                   this.userinfo = res.data.userinfo
                   this.evaluate_info = res.data.evaluate_info
                   var score = parseInt(res.data.evaluate_info.avg_score)
                   var scorein = res.data.evaluate_info.scoreinfo
                   scorein.forEach(function(val,index){
                        console.log(val)
                        that.categories_title.push(val.title)
                        that.categories_num.push(val.score)
                   })
                   that.charts()
                   if(score){
                        switch(true){
                            case score>0 && score<=20:
                                this.xingnum = 1;
                                break;
                            case score>20 && score<=40:
                                this.xingnum = 2;
                                break;
                            case score>40 && score<=60:
                                this.xingnum = 3;
                                break;
                            case score>60 && score<=80:
                                this.xingnum = 4;
                                break;
                            default:
                                this.xingnum = 5;
                        }
                   }
                  
              }
         },
         confirm() {
             console.log("hh")
         }
    },
    beforeMount() {
        const self = this;
        wx.getSystemInfo({
            success(system) {
                console.log(`system:`, system);
                self.widowwidth = system.windowWidth/2;
                console.log(self.widowwidth)
            }
        });
    },
    onShow(){
        
    }
}

</script>
<style lang="less">
page{
    background: #F5F8F9;
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
  .content{
      margin-top:20rpx;
      .con_con{
          height: 1202rpx;
          background: #fff;
          .con_xing{
              display: flex;
              padding-top:44rpx;
              padding-left: 19rpx;
              padding-right: 19rpx;
              justify-content: space-between;
              align-items: center;
              .xing_box{
                  display: flex;
                  align-items: center;
                  .box_item{
                     margin-right: 45rpx;
                     
                     image{
                          vertical-align: middle;
                     }
                  }
              }
              .xing_fen{
                  font-size: 50rpx;
                  color:rgba(51,51,51,1);
                  background:linear-gradient(0deg,rgba(46,155,255,1) 0.2685546875%, rgba(27,243,196,1) 100%);
                 -webkit-background-clip:text;
                 -webkit-text-fill-color:transparent;
              }
              
          }
          .con_chart{
              display: flex;
              justify-content: center;
            //   align-items: center;
              margin-top: 79rpx;
              .chart_box{
                //   width:100%;
                //   height:527rpx;
              }
          }
          .con_word{
              font-size: 28rpx;
              color: #666666;
              line-height:48rpx;
              padding: 30rpx;
              .word_box{
                 padding: 40rpx;
                 border:1px dotted #1BF3C4;
                 background: #F4FAFF;
                //  background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1)); 
              }
          }
      }
      .con_but{
          display: flex;
          justify-content: center;
      }
  }
</style>
