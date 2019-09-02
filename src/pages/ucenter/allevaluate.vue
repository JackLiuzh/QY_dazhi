<template>
  <view class="container">
    <navBar :title="'全部评价'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
    ></navBar>
    <view class="job_pj">
      <view class="job_pj_v">
          <view id="nan" class="job_pj_btn1" v-for="(item,index) in regions" :key="index"
          :class="item.ischeck ==true?'nanstyle':''"  :data-checked="item.ischeck"   :data-index="index" :data-id="item.id" :data-label="item.label"  @click="regionsclikzidingyi" >{{item.label}}({{item.count}})
          </view>
    </view>

   </view>
    <view class="el_box" v-for="(item,index) in evaluate_list" :key="index">
      <view class="job_xx_v">

        <view class="job_xx_left">
          <image class="job_xx_left_img"  :src="item.avatar"></image>

          <view class="job_xx_lefto">

            <view class="job_xx_left_top">
              <text class="job_xx_left_top_text">{{item.realname}}</text>

              <!--<view class="job_xx_left_top_v"  >-->
              <text class="job_xx_left_top_text2">{{item.time}}</text>
              <!--</view>-->

            </view>

            <view class="job_xx_left_bottom">
              <text class="job_xx_left_bottom_text2">兼职岗位:</text>
              <text class="job_xx_left_bottom_text2">{{item.job_title}}</text>
            </view>
          </view>

        </view>
      </view>

      <view class="el_box_v">
        <text class="el_box_v_tv1">{{item.content}}</text>
        <view v-if="item.pics" class="el_box_v_imgs" >
          <image class="el_box_v_img" :src=item1.imageurl v-for="(item1,index1) in item.imgs" :key="index1"></image>
        </view>


        <view class="el_box_v_hf" v-for="(item2,index2) in item.reply_list" :key="index2">
          <text class="el_box_v_hf_time">{{item2.time}}</text>
          <view class="el_box_v_hf_cot">
            <text class="el_box_v_hf_text1">{{item2.name}}</text>
            <text class="el_box_v_hf_text2">{{item2.msg}}</text>
          </view>
        </view>
        <div class="con-huifu">
            <input type="text" confirm-type="send" :data-eid="item.id" @confirm="huifuitext"  placeholder="  企业回复"  class="huifu"/>
        </div>

      </view>

    </view>

  </view>
</template>

<script>
  import navBar from '@/components/navigationBar'
  import api from '@/utils/api'
  export default {
      components: {
       navBar
    },
    data () {
      return {
        regions:[{
          label: "全部",
          count:'',
          ischeck:true
        },{
          label: "有图",
          count:'',
          ischeck:false
        },{
          label: "好评",
          count:'',
          ischeck:false
        },{
          label: "差评",
          count:'',
          ischeck:false
        }],
        labb:[],
        evaluate_list:[],
        currentStatus:'',
        infolist:[{
          txurl: "/static/images/mine_avatar.png",
          name:"安**",
          content:"公司位置在雁塔区西影路96号，3号线青龙寺c口对吗，位置很好找，我兼职玩第二天就把工资结清了，很nice",
          gangwei:"市场调查员",
          time:"2019-09-21",
          imgs:[{imageurl:"/static/images/biaoqian@2x.png"},{imageurl:"/static/images/biaoqian@2x.png"},{imageurl:"/static/images/biaoqian@2x.png"}],
          huifus:[
            {name:"企业回复:",content:"公司位置在雁塔区西影路96号，3号线青龙寺C口对面，位置很好找",time:"2019-10-01"},
            {name:"牛犇犇:",content:"公司真的很不错哦~建议大家投递简历",time:"2019-10-02"},
          ]
        },{
          txurl: "/static/images/mine_avatar.png",
          name:"安**",
          content:"公司位置在雁塔区西影路96号，3号线青龙寺c口对吗，位置很好找，我兼职玩第二天就把工资结清了，很nice",
          gangwei:"市场调查员",
          time:"2019-09-21",
          imgs:[],
          huifus:[
          ]
        },{
          txurl: "/static/images/mine_avatar.png",
          name:"安**",
          content:"公司位置在雁塔区西影路96号，3号线青龙寺c口对吗，位置很好找，我兼职玩第二天就把工资结清了，很nice",
          gangwei:"市场调查员",
          time:"2019-09-21",
          imgs:[],
          huifus:[
          ]
        }],
      }
    },
    mounted(){
        
    },
    beforeMount () {
        this.init_label()
        this.initlistbyid('')
    },
    methods:{
      async init_label(){
          var that = this
          const res = await api.ucenter_evaluate_total({corpid:2})
          if(res.code === 1){
              console.log(11)
              that.labb = res.data.label_count.map(o=>{return {id:o.id,label:o.title,ischeck:false,count:o.count}})
              // that.labb = dd
              // console.log(dd)
              that.regions = that.regions.concat(that.labb)
              that.regions[0].count = res.data.all_count
              that.regions[1].count = res.data.haspic_count
              that.regions[2].count = res.data.good_count
              that.regions[3].count = res.data.bad_count  
          }
          
      },
      async initlistbyid(status){
           const res = await api.ucenter_evaluate_list({corpid:2,status:status})
           if(res.code ==1){
               this.evaluate_list = res.data.evaluate_list
           }
      },
      async save_reply(eid,msg){
           const res = await api.ucenter_save_reply({eid:eid,msg:msg})
           if(res.code ==1){
              console.log("保存回复成功")
              this.initlistbyid(this.currentStatus)
           }else {
             console.log("保存回复失败")
           }
      },
      huifuitext(e){
          var msg = e.mp.detail.value
          var eid = e.mp.currentTarget.dataset.eid
          this.save_reply(eid,msg)
          

      },
      regionsclikzidingyi(e){
        let index1=e.target.dataset.index;
        let label = e.target.dataset.label
        let id = e.target.dataset.id
        let that=this;
        if(e.target.dataset.checked==false){
          // that.regions[index].ischeck=true;
          this.regions.forEach(function(item,index) {
            if(index==index1){
              item.ischeck = true;
            }else {
              item.ischeck = false;
            }

          })
          if(id){
             that.initlistbyid(id)
             that.currentStatus = id
          }else {
              that.initlistbyid(label)
              that.currentStatus= label
          }
          
          that.$set(that.regions, index1, that.regions[index1]);

        }else {
          that.regions[index1].ischeck=false;
          that.$set(that.regions, index1, that.regions[index1]);
        }
      }
    },
    created () {
      // let app = getApp()

      let that=this
      // that.regions.forEach(el => {
      //   console.log(el)
      //   console.log(regions.index)
      //   el.ischeck = false;
      // });
      this.regions.forEach(function(item,index) {
          if(index==0){
            item.ischeck = true;
          }else {
            item.ischeck = false;
          }

      })
    }
  }
</script>

<style>
.huifu{
  height:70rpx;
  line-height:70rpx;
  background-color:#F9F9F9;
  color:#999999;
  font-size:26rpx;
  margin-top:30rpx;
}
  .index_box_shaixuan_v{
  width: 100%;
  margin-top: 20rpx;
  display: flex;
  flex-direction:column;
  background-color: white;
}
.index_box_shaixuan_v_block{
  width:100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10rpx;
  margin-left: -10rpx;
  flex-wrap: wrap;
  /*word-break: break-all;*/
  /*word-wrap: break-word;*/
}
.index_box_shaixuan_v_block_btn1{
  width: 156rpx;
  height: 60rpx;
  background-color:#F9F9F9 ;
  font-size: 30rpx;
  color: #666;
  text-align: center;
  line-height: 60rpx;
  margin-left: 30rpx;
  margin-top: 20rpx;
}
.job_pj_btn1{
  padding-left: 30rpx;
  padding-right: 30rpx;
  height: 60rpx;
  background-color:#F9F9F9 ;
  font-size: 28rpx;
  color: #666;
  text-align: center;
  line-height: 60rpx;
  margin-left: 30rpx;
}
.job_pj{
  width: 100%;
  height:160rpx;
  display: flex;
  background-color: white;
}

.job_pj_v{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

}
.nanstyle{
  background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
  border-radius:10rpx;
  color: white;
}
.el_box{
  margin-top: 20rpx;
  width: 100%;
  padding-bottom: 30rpx;
  padding-top: 30rpx;
  background-color: white;
}
.el_box2{
  width: 100%;
  padding-bottom: 30rpx;
  padding-top: 30rpx;
  background-color: white;
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
  width: 80rpx;
  height: 80rpx;
  border-radius: 180rpx;
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
.job_xx_left_bottom_text2{
  color: #999;
  font-size: 22rpx;
  margin-left: 20rpx;
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
.job_xx_left_top_text2{
  color: #999;
  font-size: 22rpx;
  margin-right: 80rpx;
}
.el_box_v{
  margin-top: 20rpx;
  margin-left:130rpx;
  display: flex;
  flex-direction: column;
  margin-right: 40rpx;
}
.el_box_v2{
  margin-top: 20rpx;
  margin-left:40rpx;
  display: flex;
  flex-direction: column;
  margin-right: 40rpx;
}
.el_box_v_imgs{
  margin-top: 20rpx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -20rpx;
  margin-bottom: 40rpx;
}
.el_box_v_imgs2{
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  margin-bottom: 40rpx;
  align-items: center;
  justify-content: center;
}
.el_box_v_img{
   width: 180rpx;
   height: 180rpx;
   margin-left: 20rpx;
}

.el_box_v_img2{
  width: 690rpx;
  height: 460rpx;
  margin-top: 20rpx;
}
.el_box_v_hf{
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
}
.el_box_v_tv1{
  color: #333;
  font-size: 28rpx;
}
.el_box_v_hf_time{
  color: #999;
  font-size: 22rpx;
}
.el_box_v_hf_cot{
  margin-top: 20rpx;
  display: flex;
  flex-direction: row;
}
.el_box_v_hf_text1{
  color:#2E9BFF;
  font-size: 28rpx;
  white-space: nowrap;
}
.el_box_v_hf_text2{
  color:#333;
  font-size: 28rpx;
}


</style>
