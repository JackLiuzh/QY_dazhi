<template>
    <div class="container">
        <!-- <navBar :title="'兼职记录'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
        ></navBar> -->
        <div class="box">
            <div class="base">
                <!-- <div class="base_img">
                    <image style="height:216rpx;width:100%;"  src="/static/images/beijing2@2x.png" />
                </div> -->
                <div class="base_box">
                    <div class="box_record">
                        <div class="record_top">
                            <div class="top_title">
                                {{item.title}}
                            </div>
                            <div class="top_content">
                                {{item.salary}}元/次
                            </div>
                        </div>
                            <div class="record_mid">
                                <div class="mid_start">
                                    开始  {{item.startdate}}
                                </div>
                                <div class="mid_line">
                                    --
                                </div>
                                <div class="mid_end">
                                    结束  {{item.enddate}}
                                </div>
                            </div>
                            <div class="record_bot">
                                {{item.cycle}} {{item.worktime}}
                            </div>
                    </div>
                </div>
            </div >
        
            <div class="detail">
                <div class="detail_le">
                    信息详情
                </div>
                <div @tap="isdisplay(index)" class="detail_le">
                    <image v-if="item.isshow" style="width:18rpx;height:10rpx;" src="/static/images/shouqi@2x.png"/>
                    <image v-else style="width:18rpx;height:10rpx;" src="/static/images/zhankai @2x.png"/>
                </div>
            </div>
            <div class="con_detail" v-if="item.isshow">
                <div class="detail_de">
                    <div class="de_adress">
                        <div class="adress_top">
                            <image style="width:35rpx;height:34rpx;" src="/static/images/biaoji@2x.png" />
                            <span class="top_name">公司地址</span>
                            <span class="top_xian"></span>
                        </div>
                        <div class="adress_bot">
                            <div class="bot_le">
                                <image style="width:43rpx;height:49rpx;" src="/static/images/dizhi@2x.png"/>
                                <span class="le_name">{{item.address}}</span>
                            </div>
                            <div class="bot_ri">
                                <span class="ri_jian"></span>
                            </div>
                        </div>
                    </div>
                    <div class="de_adress">
                        <div class="adress_top">
                            <image style="width:35rpx;height:34rpx;" src="/static/images/biaoji@2x.png" />
                            <span class="top_name">公司信息</span>
                            <span class="top_xian"></span>
                        </div>
                        <div @tap="gocompany_detail(item.corpid)" class="cominfo_com">
                            <div class="com_le">
                                <div class="le_img">
                                        <image style="width:100rpx;height:100rpx;" src="/static/images/biaoji@2x.png" />
                                </div>
                                <div class="le_boxx">
                                    <div class="boxx_top">
                                        <span class="top_name">{{item.qy_name}}</span>
                                        <image v-for="i in credit" :key="i" style="width:37rpx;height:37rpx;" src="/static/images/xing1@2x.png" />
                                        <!-- <image style="width:37rpx;height:37rpx;" src="/static/images/xing1@2x.png" /> -->
                                    </div>
                                    <div class="boxx_bot">
                                            <div class="bot_tt">
                                                <image style="width:19rpx;height:18rpx;" src="/static/images/V@2x.png" />
                                                <span>认证企业</span>
                                            </div>
                                            <div class="bot_md">{{item.address}}</div>
                                            <div class="bot_end">{{item.job_count}}个在招职位</div>
                                        </div>
                                </div>
                                
                            </div>
                            <div class="com_ri">
                                <div class="ri_jian"></div>
                            </div>
                        </div>
                    </div>
                    <div class="de_adress">
                        <div class="adress_top">
                            <image style="width:35rpx;height:34rpx;" src="/static/images/biaoji@2x.png" />
                            <span class="top_name">职位描述</span>
                            <span class="top_xian"></span>
                        </div>
                        <div class="xinxi_bot" style="font-size:28rpx;color:#666;padding:43rpx 0;">
                                {{item.requirement}}
                        </div>
                    </div>
                </div>
                <div  class="chart" style="">
                    <div class="chart_title">
                        <div class="title_box">
                            企业评价
                        </div>
                    </div>
                    <div class="chart_tx">
                        <div class="tx_le">
                            综合评分
                        </div>
                        <div class="tx_ri">
                            {{prise.avg_score}}分
                        </div>
                    </div>
                    <div class="chart_box">
                        <canvas :canvas-id="cavid" style="text-align:center;height:300px;width:100%;"></canvas>
                    </div>
                    <div class="chart_word">
                        <div class="word_box">
                            {{prise.evaluate}}
                        </div>
                    </div>
                </div>
                <div class="chart">
                    <div class="chart_title">
                        <div class="title_box">
                            企业评价
                        </div>
                    </div>
                    <div class="chart_img">
                        <div class="img_none">
                            <image style="width:520rpx;height:418rpx;" src="/static/images/wupingjia@2x.png" />
                        </div>
                        <div class="img_tx">企业暂时没有评价</div>
                    </div>
                </div>
            </div>
            <!-- <div class="butbox">
                <div class="butbox_tou">
                    投诉
                </div>
                <div class="butbox_contact">
                    联系学生
                </div>
            </div> -->
        </div>
        
    </div>
</template>
<script>
import navBar from '@/components/naviImage'
import wxCharts from '@/utils/wxChats/wxcharts'
export default {
   props:['item','prise','cavid','index'], 
   data(){
       return{
           iszhankai:false,
       }
   },
   components: {
       navBar
    },
    computed:{
        calist(){
            var dd = []
            if(this.prise.scoreinfo != null){
                this.prise.scoreinfo.forEach(function(value,index){
                dd.push(value.title)
                })
            }
            return dd
        },
        nulist(){
            var dd = []
            if(this.prise.scoreinfo !=null){
               this.prise.scoreinfo.forEach(function(value,index){
                dd.push(value.score)
              })
            }
            return dd
        },
        credit(){
            var score = this.item.credit
            switch(true){
                case score>0 && score<=20:
                    return 1;
                    break;
                case score>20 && score<=40:
                    return  2;
                    break;
                case score>40 && score<=60:
                    return  3;
                    break;
                case score>60 && score<=80:
                    return 4;
                    break;
                default:
                    return 5;
            }
            
        },
        pri(){
            var evaluate = this.prise.evaluate
            var avg_score = this.prise.avg_score
            if(evaluate || avg_score){
                return false
            }else{
                return true
            }
        }
    },
    mounted(){
        // if(this.charts1){
        //     this.charts1()
        // }if(this.charts2){
        //     this.charts1()
        //     this.charts2()
        // }if(this.charts3){
        //     this.charts1()
        //     this.charts2()
        //     this.charts3()
        // }
        this.charts1()
    },
    methods:{
        gocompany_detail(corpid){
            this.$router.push({path:'/pages/index/company_detail',query:{corpid:corpid}})
        },
        isdisplay(index){
            console.log(index)
            // this.item.isshow = true
            this.$set(this.item,'isshow', !this.item.isshow)
        },
        zhankai(){
            this.iszhankai= false
        },
        tabswitch(e){
            console.log(e)
        },
        charts1(){
            new wxCharts({
                canvasId: this.cavid,
                type: 'radar',
                categories: this.calist,
                series: [{
                    name: '企业评价',
                    data: this.nulist
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
        // charts2(){
        //     new wxCharts({
        //         canvasId: 'radarCanvas2',
        //         type: 'radar',
        //         categories: ['业务能力', '工作态度', '团队协作', '工作积极性', '沟通表达', '实践能力'],
        //         series: [{
        //             name: '企业评价',
        //             data: [90, 110, 125, 95, 87, 122]
        //         }],
        //         width: 375,
        //         height: 263,
        //         extra: {
        //             radar: {
        //                 max: 150
        //             }
        //         }
        //     })
        // },
    },
}
</script>
<style lang="less">
page {
    background: #F2F6F7;
}
.box{
    // height: 290rpx;
    // overflow-y: hidden;
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
        // height: 245rpx;
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
        .box_record{
            display: flex;
            height: 180rpx;
            flex-direction: column;
            justify-content: space-between;
            .record_top{
                display: flex;
                justify-content: space-between;
               .top_title{
                    font-size:32rpx;
                    font-weight:500;
                    color:rgba(0,0,0,1);
               }
               .top_content{
                    font-size:40rpx;                   
                    font-weight:bold;
                    color:rgba(0,0,0,1);
                    background:linear-gradient(0deg,rgba(255,8,68,1) 0%, rgba(255,177,153,1) 100%);
                    -webkit-background-clip:text;
                    -webkit-text-fill-color:transparent;
               }
            }
            .record_mid{
                font-size:28rpx;
                font-weight:400;
                color:rgba(102,102,102,1);
                display: flex;
            }
            .record_bot{
                font-size:28rpx;
                font-weight:400;
                color:rgba(102,102,102,1);
            }
            .record_more{
                text-align: center;
                .more_text{
                   font-size: 24rpx;
                   color: #333333;
                }
                .more_jian{
                    display: inline-block;
                    width:10rpx;
                    height: 10rpx;
                    border-top: 2rpx solid  #666666;
                    border-right: 2rpx solid #666666;
                    transform: rotate(135deg);
                    margin-left: 17rpx;
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
.detail{
  margin-top:292rpx;
  display: flex;
  justify-content: space-between;
  min-height: 100rpx;
  background: white;
  padding: 0 30rpx;
  align-items: center;
  font-size: 28rpx;
  color: #333333;
}
.chart{
    margin-top: 20rpx;
    // min-height: 1180rpx;
    padding: 41rpx 0rpx;
    background-color: white;
    box-sizing: border-box;
    .chart_title{
        display: flex;
        justify-content: center;
        align-items: center;
        .title_box{
            font-size: 29rpx;
            height: 23rpx;
            width: 239rpx;
            color:#333333;
            background-image: url("data:image/png;base64,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");
            // background-position: center center;
            background-color: white;
            background-size: cover;
            text-align: center;
            line-height: 23rpx;
        }
    }
    .chart_tx{
        display: flex;
        justify-content: space-between;
        // padding: 0 30rpx;
        margin-top: 52rpx;
        align-items: center;
        padding: 0 30rpx;
        .tx_le{
                font-size:30rpx;
                font-weight:500;
                color:rgba(0,0,0,1);
        }
        .tx_ri{
            font-size:50rpx;
            font-weight:bold;
            color:rgba(51,51,51,1);
            background:linear-gradient(0deg,rgba(46,155,255,1) 0.2685546875%, rgba(27,243,196,1) 100%);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
        }
    }
    .chart_box{
        margin: 0 auto;
    }
    .chart_word{
        font-size:29rpx;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:48rpx;
        padding: 30rpx;
        .word_box{
            border:1px dotted #1BF3C4;
            background:#F3FEFC;
            padding: 34rpx;
        }
    }
    .chart_img{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        margin-top: 39rpx;
        .img_tx{
            font-size: 31rpx;
            color:#333333;
            text-align: center;
        }
    }
}
.con_detail{
    // height: 0rpx;
    // overflow-y: hidden;
    .detail_de{
        height: 80rp;
        background: white;
        padding: 0 30rpx;
        .de_adress{
            .adress_top{
                .top_name{
                   font-size: 28rpx;
                   color:#333333; 
                   padding-left: 21rpx;
                   padding-right: 21rpx;
                }
                .top_xian{
                   display: inline-block;
                   height: 2rpx;
                   background: #F5F8F9;
                   width:70%;
                   vertical-align: middle
                }
            }
            .adress_bot{
                 display: flex;
                 justify-content: space-between;
                 align-items: center;
                 height: 120rpx;
                 .bot_le{
                     padding-left: 22rpx;
                     image{
                         vertical-align: middle;
                     }
                    .le_name{
                       padding-left: 13rpx;
                       color: #666666;
                       font-size: 30rpx;
                       vertical-align: middle;
                    }
                 }
                 .bot_ri{
                    .ri_jian{
                        display: inline-block;
                        width:10rpx;
                        height: 10rpx;
                        border-top: 2rpx solid  #999999;
                        border-right: 2rpx solid #999999;
                        transform: rotate(45deg);
                    }
                 }
            }
        }
        .de_adress{
            .cominfo_com{
                display: flex;
                height: 100rpx;
                justify-content: space-between;
                align-items: center;
                padding: 40rpx 0rpx;
                .com_le{
                    display: flex;
                    .le_boxx{
                        margin-left: 30rpx;
                        .boxx_top{
                            .top_name{
                                font-size: 28rpx;
                                color: #333333;
                                padding-right: 25rpx;
                            }
                        }
                        .boxx_bot{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 22rpx;
                            font-size: 22rpx;
                            color: #999999;
                            .bot_tt{
                                font-size:22rpx;
                                font-weight:500;
                                color:rgba(51,51,51,1);
                                background:linear-gradient(0deg,rgba(46,155,255,1) 1.025390625%, rgba(27,243,196,1) 100%);
                                -webkit-background-clip:text;
                                -webkit-text-fill-color:transparent;
                                margin-right: 70rpx;
                            }
                            .bot_md{
                                margin-right: 70rpx;
                            }
                        }
                    }
                }
                .com_ri{
                    .ri_jian{
                        width:10rpx;
                        height: 10rpx;
                        border-top: 2rpx solid  #999999;
                        border-right: 2rpx solid #999999;
                        transform: rotate(45deg);
                    }
                }
            }
        }
    }
}
</style>



