<template>
    <div class="">
        <navBar :title="'我的'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
        ></navBar>
        <div class="base">
             <div class="base_img">
                 <image style="height:216rpx;width:100%;"  src="/static/images/beijing2@2x.png" />
             </div>
             <div class="base_box">
                   <div @click="gotoinfo" class="box_ava">
                        <div class="ava_left">
                             <div class="left_img">
                                 <image style="width:120rpx;height:120rpx;border-radius:60rpx;" src="http://pic41.nipic.com/20140508/18609517_112216473140_2.jpg" />
                             </div>
                             <div class="left_text">
                                  <div class="text_name">
                                      <span>{{ data.info.realname }}</span>
                                      <image v-if="data.info.sex==0" style="width:20rpx;height:28rpx;margin-left:19rpx;" src="/static/images/mine_nv.png"/>
                                      <image v-else style="width:20rpx;height:28rpx;margin-left:19rpx;" src="/static/images/nan@2x.png"/>
                                  </div>
                                  <div v-if="data.info.position" class="text_info">{{data.info.position}}</div>
                             </div>
                        </div>
                        <div class="ava_right">
                             <div style="color:#999999;">></div>
                        </div>
                   </div>
                   <div class="box_tj">
                        <div @tap="goallevaluate" class="tj_item">
                            <div class="item_top">
                                {{data.evaluate_total}} 
                            </div>
                            <div class="item_bot">
                                全部评价
                            </div>
                        </div>
                        <div @tap="gonewevaluate" class="tj_item">
                            <div class="item_top">
                                {{data.evaluate_new}} 
                            </div>
                            <div class="item_bot">
                                新增评价
                            </div>
                        </div>
                   </div>
             </div>
        </div>
        <div class="zizhi">
                <div @tap="zizhiclick" class="zizhi_box">
                     <div class="box_le">
                          <image style="width:95rpx;height:95rpx;" src="/static/images/zizhi@2x.png"/>
                     </div>
                     <div class="box_ri">
                          <div class="ri_top">
                              资质认证
                          </div>
                          <div v-if="data.info.status == 0" class="ri_bot">
                              资质<span style="color:#2E9BFF;">未审核</span>
                          </div>
                          <div v-if="data.info.status == 1" class="ri_bot">
                              资质<span style="color:#2E9BFF;">已通过</span>
                          </div>
                          <div v-if="data.info.status == 2" class="ri_bot">
                              资质<span style="color:#2E9BFF;">未通过</span>
                          </div>
                     </div>
                 </div>
                 <div class="zizhi_box">
                     <div class="box_le">
                          <image style="width:95rpx;height:95rpx;" src="/static/images/xinxi@2x.png"/>
                     </div>
                     <div class="box_ri">
                          <div class="ri_top">
                              企业信息
                          </div>
                          <div v-if="data.info.status == 0" class="ri_bot">
                              信息<span style="color:#2E9BFF;">未审核</span>
                          </div>
                          <div v-if="data.info.status == 1" class="ri_bot">
                              信息<span style="color:#2E9BFF;">已通过</span>
                          </div>
                          <div v-if="data.info.status == 2" class="ri_bot">
                              信息<span style="color:#2E9BFF;">未通过</span>
                          </div>
                     </div>
                </div>
        </div>
        <div class="haocell">
            <div @tap="gomember" class="cell_item">
                 <div class="item_le">
                      <image style="width:32rpx;height:35rpx;vertical-align:middle;" src="/static/images/guanli@2x.png" />
                      <span class="le_tx">企业人员管理</span>
                 </div>
                 <div class="item_ri">
                      <div class="ri_jiantou">
                      </div>
                 </div>
            </div>
            <div class="cell_item">
                 <div class="item_le">
                      <image style="width:32rpx;height:35rpx;vertical-align:middle;" src="/static/images/kefu@2x.png" />
                      <span class="le_tx">客服电话</span>
                 </div>
                 <div class="item_ri">
                      <div class="ri_jiantou">
                      </div>
                 </div>
            </div>
            <div @tap="feedback" class="cell_item">
                 <div class="item_le">
                      <image style="width:32rpx;height:35rpx;vertical-align:middle;" src="/static/images/fankui@2x.png" />
                      <span class="le_tx">意见反馈</span>
                 </div>
                 <div class="item_ri">
                      <div class="ri_jiantou">
                      </div>
                 </div>
            </div>
            <div @tap="gosetting" class="cell_item">
                 <div class="item_le">
                      <image style="width:32rpx;height:35rpx;vertical-align:middle;" src="/static/images/shezhi@2x.png" />
                      <span class="le_tx">设置</span>
                 </div>
                 <div class="item_ri">
                      <div class="ri_jiantou">
                      </div>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
import navBar from '@/components/navigationBar'
import api from '@/utils/api'
export default {
    data(){
        return{
            data:{info:{}}
        }
    },
    components: {
       navBar
    },
    mounted(){
        this.init()
    },
    methods:{
        gomember(){
            this.$router.push({path:'/pages/ucenter/member'})
        },
        gosetting(){
            this.$router.push({path:'/pages/ucenter/setting',query:{}})
        },
        gonewevaluate(){
            this.$router.push({path:'/pages/ucenter/newevaluate',query:{}})
        },
        goallevaluate(){
            this.$router.push({path:'/pages/ucenter/allevaluate',query:{}})
        },
        gotoinfo(){
            this.$router.push({path:'/pages/ucenter/baseinfo',query:{}})
        },
        zizhiclick(){
            this.$router.push({path:'/pages/ucenter/renzhen'})
        },
        feedback(){
            this.$router.push({path:'/pages/ucenter/feedback'})
        },
        tabswitch(e){
            console.log(e)
        },
        async init(){
            var that = this
            var uid = that.globalData.uid
            const res = await api.mine_page({uid:uid})
            if(res.code ==1){
                that.data = res.data
            }
        }
    }
}
</script>
<style lang="less">
page {
    background: #F2F6F7;
}
.base{
    position: relative;
    .base_box{
        position:absolute;
        width:690rpx;
        left: 50%;
        margin-left: -345rpx; 
        margin-top:16rpx;
        z-index: 1;
        // height: 490rpx;
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
                align-self: center;
            }
        }
        .box_tj{
            display: flex;
            justify-content: space-around;
            margin-top: 50rpx;
            .tj_item{
                .item_top{
                  text-align: center;
                  font-size:50rpx;
                  font-weight:500;
                  color:rgba(0,0,0,1);
                }
                .item_bot{
                    font-size:22rpx;
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
.zizhi{
    margin-top: 415rpx;
    display: flex;
    height: 192rpx;
    background-color: white;
    justify-content: space-around;
    align-items: center;
    .zizhi_box{
        display: flex;
        .box_le{
           display: inline-flex;
           justify-content: center;
           align-items: center; 
        }
        .box_ri{
            .ri_top{
                font-size:30rpx;
                font-weight:500;
                color:rgba(51,51,51,1);
            }
            .ri_bot{
              margin-top:19rpx; 
              font-size:26rpx;
              font-weight:400;
              color:rgba(153,153,153,1);
            }
        }

    }
}
.haocell{
  .cell_item{
    margin-top: 10rpx;  
    display: flex;
    justify-content: space-between;
    height: 100rpx;
    align-items: center;
    background-color: white;
    padding: 0 30rpx;
    .item_le{
       .le_tx{
            margin-left: 26rpx;
            font-size:28rpx;
            font-weight:500;
            color:rgba(51,51,51,1);
       }
    }
    .item_ri{
       .ri_jiantou{
          width:10rpx;
          height: 10rpx;
          border-top: 2rpx solid  #999999;
          border-right: 2rpx solid #999999;
          transform: rotate(45deg);
       }
    }
  }
}
</style>



