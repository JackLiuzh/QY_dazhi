<template>
    <div class="container">
        <navBar :title="'基础信息'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
        ></navBar>
        <div v-if="isshow" class="box1">
        <div class="base">
             <div class="base_img">
                 <image style="height:216rpx;width:100%;"  src="/static/images/beijing2@2x.png" />
             </div>
             <div class="base_box">
                   <div class="box_ava">
                        <div class="ava_left">
                             <div class="left_img">
                                 <image style="width:120rpx;height:120rpx;" src="/static/images/mine_avatar.png" />
                             </div>
                             <div class="left_text">
                                  <div class="text_name">
                                      <span>{{info.name}}</span>
                                      <image style="width:20rpx;height:28rpx;margin-left:19rpx;" src="/static/images/mine_nv.png"/>
                                  </div>
                                  <div class="text_info">{{info.age}}岁 {{info.school_name}}</div>
                             </div>
                        </div>
                        <div class="ava_right">
                             <div class="right_num">{{info.credit}}</div>
                             <div class="right_text">兼职信用</div>
                        </div>
                   </div>
                   <div class="box_list">
                        <div class="list_item">
                            <div class="item_le">学历</div>
                            <div class="item_ri">{{info.level}}</div>
                        </div>
                        <div class="list_item">
                            <div class="item_le">专业</div>
                            <div class="item_ri">{{info.subject}}</div>
                        </div>
                        <div class="list_item">
                            <div class="item_le">身高</div>
                            <div class="item_ri">{{info.height}}cm</div>
                        </div>
                        <div class="list_item">
                            <div class="item_le">在校时间</div>
                            <div class="item_ri">{{info.startdate}} — {{info.enddate}}</div>
                        </div>
                   </div>
             </div>
        </div >
        <div class="wish">
             <div class="wish_top">
                 <image style="width:30rpx;height:30rpx;" src="/static/images/biaoqian@2x.png"/>
                 <span class="top_tx">期望工作时间</span>
             </div>
             <div class="wish_lab">
                    <div v-for="(item,index) in info.worktimelist" :key="index" class="lab_item">{{item.name}}</div>
             </div>
        </div>
        <div class="info">
            <div class="info_title">
                自我介绍  
            </div>
            <div class="info_contetent">
                {{info.intro}}
            </div>
        </div>
        <div class="info">
            <div class="info_title">
                在校经历  
            </div>
            <div class="info_contetent">
                {{info.experience}}
            </div>
        </div>
        <div class="butbox">
              <div class="butbox_tou">
                   投诉
              </div>
              <div class="butbox_contact">
                   联系学生
              </div>
        </div>
        </div>
        <div v-else class="box2">
            hie
        </div>
    </div>
</template>
<script>
import navBar from '@/components/naviImage'
import api from '@/utils/api'
export default {
   data(){
       return{
           jobid:'',
           stuid:'',
           info:'',
           isshow:true
       }
   },
   components: {
       navBar,
    },
    created(){
        
    },
    beforeMount(){
        
    },
    mounted(){
        this.jobid = this.$route.query.jobid
        this.stuid = this.$route.query.stuid
        this.init()
    },
    
    methods:{
        tabswitch(e){
            console.log(e)
            if(e===0){
                this.isshow = true
            }else{
                this.isshow = false
            }
        },
        async init(){
            const res = await api.get_userinfo({stuid:this.stuid,jobid:this.jobid})
            if(res.code==1){
                // console.log(res.data)
                this.info = res.data.datainfo
            }
        }
    }
}
</script>
<style lang="less">
page {
    background: #F2F6F7;
}
.box1{
    position: relative;
}
.base{
    // position: relative;
    .base_box{
        position:absolute;
        width:690rpx;
        left: 50%;
        margin-left: -345rpx; 
        margin-top:16rpx;
        z-index: 1;
        height: 490rpx;
        background:white;
        padding: 40rpx;
        box-sizing: border-box;
        border-radius: 10rpx;
        .box_ava{
            background: white;
            border-top-left-radius: 10rpx;
            border-top-right-radius: 10rpx;
            display:flex;
            justify-content: space-between;
            .ava_left{
                display:flex;
                .left_text{
                    margin-left: 41rpx;
                    .text_info{
                        color: #999999;
                        font-size: 29rpx;
                        margin-top:26rpx;
                    }
                    .text_name{
                        color: #000000;
                        font-size: 32rpx;
                        margin-top: 14rpx;
                    }
                }
            }
            .ava_right{
               .right_num{
                    font-size:63rpx;
                    font-weight:bold;
                    color:rgba(0,0,0,1);
                    background:linear-gradient(0deg,rgba(46,155,255,1) 0%, rgba(27,243,196,1) 100%);
                    -webkit-background-clip:text;
                    -webkit-text-fill-color:transparent;
               }
               .right_text{
                    font-size:25rpx;
                    font-weight:400;
                    color:rgba(153,153,153,1);
               }
            }
        }
        .box_list{
            background: white;
            margin-top:40rpx;
            height: 250rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .list_item{
                display: flex;
                justify-content: space-between;
                font-size: 29rpx;
                .item_le{
                   color:rgba(102,102,102,1); 
                }
                .item.ri{
                   color:rgba(51,51,51,1);
                }
            }
        }
    }
    .base_img{
        position:absolute;
        height:216rpx;
        width:100%;
        z-index: -1;
    }

}
.wish{
    min-height: 190rpx;
    background: white;
    margin-top:530rpx;
    padding: 30rpx;
    .wish_top{
        font-size:29rpx;
        font-weight:500;
        color:rgba(51,51,51,1);
        .top_tx{
            margin-left:19rpx;
        }
    }
    .wish_lab{
        display: flex;
        margin-top: 31rpx;
        .lab_item{
            font-size:25rpx;
            font-weight:500;
            color:rgba(102,102,102,1);
            text-align: center;
            min-width: 150rpx;
            height:50rpx;
            background:rgba(249,249,249,1);
            margin-right: 30rpx;
        }
    }
}
.info{
    padding: 34rpx;
    background: white;
    margin-top:20rpx;
    .info_title{
        font-size:29rpx;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .info_contetent{
        font-size:29rpx;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:52rpx;
    }
}
.butbox{
    margin:30rpx 0;
    display: flex;
    font-size: 29rpx;
    color:rgba(255,255,255,1); 
    line-height: 90rpx;
    text-align: center;
    padding: 0 30rpx;
    .butbox_tou{
       width:200rpx;
       height:90rpx;
       border:2rpx solid rgba(170,170,170,1);
       background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
       border-radius:10rpx 0rpx 0rpx 10rpx;
    }
    .butbox_contact{
        width:490rpx;
        height:90rpx;
        background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
        box-shadow:0rpx 2rpx 10rpx 0rpx rgba(46,155,255,0.5);
        border-radius:0rpx 10rpx 10rpx 0rpx;

    }
}

</style>



