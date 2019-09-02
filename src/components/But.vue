<template>
    <div>
         <view :style="{width: width +'rpx'}" @click="clickdd" class="job_bm">{{title}}</view>
    </div>
</template>
<script>
export default {
   props:{
     width: String,
     title: String,
   },
   methods:{
      clickdd (){
        this.$emit('clicked');
      }
   } 
}
</script>

<style>
.job_bm{
  /* width:690rpx; */
  height:90rpx;
  background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
  box-shadow:0px 2px 20px 0px rgba(40,185,235,0.3);
  border-radius:10rpx;
  color:white;
  text-align: center;
  line-height: 90rpx;
  margin-top: 50rpx;
  margin-bottom: 120rpx;
}
</style>
