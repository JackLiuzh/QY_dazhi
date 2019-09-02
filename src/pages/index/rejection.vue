<template>
    <div>
       <navBar :title="'审核拒绝'"
       :titleColor="'white'"
       :back-visible="true"
       ></navBar>
       <div class="con">
            <div class="con_toptext">审核驳回</div>
            <div class="con_result">
                 <div class="result_tx">
                     拒绝原因
                 </div>
                 <div class="result_con">
                     您的职位【兼职平台-校园代理】未通过审核，拒绝理由是“该职位工作内容描述不清楚，请检查您的职位描述，或联系客服。”请及时修改职位哦。
                 </div>
            </div>
            <div class="con_yijian">
                <div class="yijian_top">
                    修改意见
                </div>
                <div class="yijian_tex">
                     <div class="tex_icon"><image style="width:39rpx;height:39rpx;" src="/static/images/yuan@2x.png"/></div>
                     <div class="tex_wo">如仍有问题，请咨询客服电话：4007333300</div>
                </div>
            </div>
            <div class="con_bu">如需修改公司信息，修改后需要再次提交职位</div>
            <div class="con_but">
                <login-but :title="'修改职位信息'" :width="'690'" @clicked="confirm"></login-but>
            </div>
       </div>
    </div>
</template>
<script>
import navBar from '@/components/navigationBar'
import LoginBut from '@/components/But'
export default {
    components: {
        navBar,
        LoginBut
    },
}
</script>
<style lang="less">
page{
    background: #F5F8F9;
}
.con{
    .con_toptext{
        height: 70rpx;
        background: #FFA467;
        font-size: 28rpx;
        color:#FFFFFF;
        line-height: 70rpx;
        padding-left: 32rpx;
    }
    .con_result{
            min-width: 258rpx;
            background: white;
            margin-top:30rpx;
            padding:30rpx;
            .result_tx{
                color:#FFA467;
                font-size: 28rpx;
            }
            .result_con{
                font-size:26rpx;
                color:rgba(102,102,102,1);
                line-height:48rpx;
            }
    }
    .con_yijian{
        min-height: 162rpx;
        background: white;
        margin-top:30rpx;
        padding: 30rpx;
        .yijian_top{
           font-size: 28rpx;
           color:rgba(255,164,103,1);
           background:linear-gradient(0deg,rgba(46,155,255,1) 0%, rgba(27,243,196,1) 100%);
           -webkit-background-clip:text;
           -webkit-text-fill-color:transparent;
        }
        .yijian_tex{
           display: flex;
           margin-top:30rpx;
           .tex_icon{

           }
           .tex_wo{
               font-size:26rpx;
               color:rgba(102,102,102,1);
           }
        }
    }
    .con_bu{
        font-size:24rpx;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:48rpx;
        padding-left: 31rpx;
    }
    .con_but{
        display: flex;
        justify-content: center;
    }
    
 
}
</style>

