<template>
  <view class="container">
    <navBar :title="'发布兼职'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
    >
    </navBar>

    <view class="layout1">
      <view class="tatle">
        <text class="text1">3/5 完善职位描述</text>
        <text class="text2">与职位类型匹配的描述可以提升报名效果</text>
      </view>
    </view>

    <view class="layout2">

      <text class="text3">职位标题</text>

      <view class="zebt">
        <input class="wenj1" @input="input" placeholder="校园兼职调查问卷"/>
      </view>

      <text class="heng"></text>

      <text class="text3">职位要求</text>

      <view  v-for="(item,id) in job_require">
        <view class="layout21" >
          <view class="text4">{{item.title}}
          </view>
          <view class="fwrq">
            <view v-for="(child,index) in item.children":key="index">
              <view :data-id="child.id" :data-index1="id" :data-index2="index" :class="[child.active?'rq2':'rq3']"  @click="change1" >
                {{child.title}}
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="layout22">
        <text class="text4" >标签</text>
        <view class="bq">
          <view v-for="(bq,index) in job_label":key="index">
            <view :data-key="index" :data-bqid="id" :class="[bq.active?'bq2':'bq3']"  @click="change2" >
              {{bq.title}}
            </view>
          </view>
        </view>
      </view>

    </view>

    <text class="text3">工作内容</text>

    <view v-for="(poscontent,index) in job_poscontent":key="index">
      <view class="content1">
        <view :data-key="index" :class="[poscontent.active?'cont2':'cont1']"  @click="change3" >
          <view class="text5">{{index+1}}.{{poscontent.jobcontent}}</view>
        </view>
      </view>
    </view>

    <text class="text3">文本生成(可自主编辑)</text>


    <view class="zwyq">
    <textarea :value="requirement" @input="contentinput" class="zwyqnr"  maxlength="500"></textarea>
      <view class="zs">{{word}}</view>
    </view>

<!--      auto-height="true"-->
<!--      <textarea :value="zwyq_content" @input="csinput" class="wqq"></textarea>-->

<!--      <view class="wqq">标签：<textarea :value="yqbq" @input="csinput"></textarea></view>-->

<!--      <view class="gznr">工作内容：-->
<!--        <textarea :value="gznr" @input="csinput" class="wqq"  maxlength="***"></textarea>-->
<!--&lt;!&ndash;        <view v-for="(poscontent,index) in job_poscontent":key="index">&ndash;&gt;-->
<!--&lt;!&ndash;          <view v-if="poscontent.active">&ndash;&gt;-->
<!--&lt;!&ndash;            <view class="wqq">{{index+1}}.{{poscontent.jobcontent}}</view>&ndash;&gt;-->
<!--&lt;!&ndash;          </view>&ndash;&gt;-->
<!--&lt;!&ndash;        </view>&ndash;&gt;-->
<!--&lt;!&ndash;      </view>&ndash;&gt;-->
<!--      </view>-->
<!--      <view class="zs">198/500</view>-->

<!--    </view>-->



<!--    <rich-text :nodes="nodes" @click="tap"></rich-text>-->
<!--    <div>-->
<!--      <wxParse :content="article" @preview="preview" @navigate="navigate" />-->
<!--    </div>-->


    <view class="button" @click="nextstep">
      <text class="bt">下一步</text>
    </view>

  </view>
</template>

<script>
  import apii from '@/utils/apii'
  // import wxParse from 'mpvue-wxparse'
  import navBar from '@/components/navigationBar'
  export default {
    components: {
      navBar
    },
    data () {
      return {
        statusBarHeight: '', // 状态栏高度
        titleBarHeight: '', // 标题栏高度
        navBarHeight: '', // 导航栏总高度
        // article: '<div>我是HTML代码</div>',
        posid: 10,
        job_require: [],
        job_poscontent: [],
        job_label: [],
        // tt: ['','','',''],
        // qqq: [[]],
        tt0: [],
        tt1: [],
        tt2: [],
        tt3: [],
        tt4: [],
        tt5: [],
        qqq0: [],
        qqq1: [],
        qqq2: [],
        qqq3: [],
        qqq4: [],
        qqq5: [],
        nr0: [],
        nr1: [],
        nr2: [],
        nr3: [],
        nr4: [],
        nr5: [],
        zwyq_content: '',
        title: '',
        service_groups: '',
        skills: '',
        images: '',
        subjects: '',
        labelscs: [],
        labels: '',
        workcontentcs: [],
        workcontent: '',
        cs: '',
        gznr: [],
        requirement: '',
        kong: '',
        word: '',
        yqbq: []
      }
    },
    mounted () {
      this.Jobstep3();
    },
    methods: {
      async Jobstep3 () {
        var y = 0
        const res = await apii.Jobstep3({ posid: this.posid });
        if (res.code === 1) {
          this.job_require = res.data.job_require;
          this.job_label = res.data.job_label;
          this.job_poscontent = res.data.job_poscontent;
          this.job_label.forEach(item => {
            this.$set(item, 'active', false);
          });
          this.$forceUpdate();
          this.job_poscontent.forEach(item => {
            this.$set(item, 'active', false);
          });
          this.$forceUpdate();
          for(y;y<this.job_require.length;y++){
            this.job_require[y].children.forEach(item => {
              this.$set(item, 'active', false);
            });
            this.$forceUpdate();
          }
        }
      },
      tap: function (){
        console.log('tap')
      },
      change1: function (e) {
        var n=0
        var m=0

        let a = e.currentTarget.dataset.id;
        let b = e.currentTarget.dataset.index1;
        let c = e.currentTarget.dataset.index2;
        for(n;n<this.job_require.length;n++){
          this.job_require[n].children.forEach(item => {
            if(a == item.id){
              item.active = !item.active;
              if(b==0) {
                if (item.active) {
                  this.qqq0.push(this.job_require[b].children[c].id)
                  this.tt0.push(this.job_require[b].children[c].title )
                  // console.log(this.tt0)
                } else {
                  var cs = 0;
                  for (cs; cs < this.qqq0.length; cs++) {
                    if (item.id == this.qqq0[cs]) {
                      this.qqq0.splice(cs, 1)
                      this.tt0.splice(cs, 1)
                    }
                  }
                }
                this.nr0 = this.job_require[b].content.replace(/【】/g, this.tt0)
                // console.log(this.nr0)
                this.service_groups = this.qqq0.join()
                console.log(this.service_groups)
              }else if(b==1){
                if (item.active) {
                  this.qqq1.push(this.job_require[b].children[c].id)
                  this.tt1.push(this.job_require[b].children[c].title )
                  // console.log(this.qqq1)
                } else {
                  var cs = 0;
                  for (cs; cs < this.qqq1.length; cs++) {
                    if (item.id == this.qqq1[cs]) {
                      this.qqq1.splice(cs, 1)
                      this.tt1.splice(cs, 1)

                    }
                  }
                }
                this.nr1 = this.job_require[b].content.replace(/【】/g, this.tt1)
                this.skills = this.qqq1.join()
                console.log(this.skills)
              }
              else if(b==2){
                if (item.active) {
                  this.qqq2.push(this.job_require[b].children[c].id)
                  this.tt2.push(this.job_require[b].children[c].title )
                  // console.log(this.qqq2)
                } else {
                  var cs = 0;
                  for (cs; cs < this.qqq2.length; cs++) {
                    if (item.id == this.qqq2[cs]) {
                      this.qqq2.splice(cs, 1)
                      this.tt2.splice(cs, 1)

                    }
                  }
                }
                this.nr2 = this.job_require[b].content.replace(/【】/g, this.tt2)
                this.images = this.qqq2.join()
                console.log(this.images)
              }
              else if(b==3){
                if (item.active) {
                  this.qqq3.push(this.job_require[b].children[c].id)
                  this.tt3.push(this.job_require[b].children[c].title )
                  // console.log(this.qqq3)
                } else {
                  var cs = 0;
                  for (cs; cs < this.qqq3.length; cs++) {
                    if (item.id == this.qqq3[cs]) {
                      this.qqq3.splice(cs, 1)
                      this.tt3.splice(cs, 1)

                    }
                  }
                }
                this.nr3 = this.job_require[b].content.replace(/【】/g, this.tt3)
                this.subjects = this.qqq3.join()
                console.log(this.subjects)
              }
              else if(b==4){
                if (item.active) {
                  this.qqq4.push(this.job_require[b].children[c].id)
                  this.tt4.push(this.job_require[b].children[c].title )
                  // console.log(this.qqq4)
                } else {
                  var cs = 0;
                  for (cs; cs < this.qqq4.length; cs++) {
                    if (item.id == this.qqq4[cs]) {
                      this.qqq4.splice(cs, 1)
                      this.tt4.splice(cs, 1)

                    }
                  }
                }
                this.nr4 = this.job_require[b].content.replace(/【】/g, this.tt4)
                console.log(this.qqq4)
              }
              else if(b==5){
                if (item.active) {
                  this.qqq5.push(this.job_require[b].children[c].id)
                  this.tt5.push(this.job_require[b].children[c].title )
                  // console.log(this.qqq5)
                } else {
                  var cs = 0;
                  for (cs; cs < this.qqq5.length; cs++) {
                    if (item.id == this.qqq5[cs]) {
                      this.qqq5.splice(cs, 1)
                      this.tt5.splice(cs, 1)
                    }
                  }
                }
                this.nr5 = this.job_require[b].content.replace(/【】/g, this.tt5)
                console.log(this.qqq5)
              }
            }
          })
        }

        this.zwyq_content ='\n' + this.nr0 +'\n' + this.nr1 +'\n' + this.nr2 +'\n' + this.nr3 +'\n' + this.nr4
        console.log(this.zwyq_content)
        // this.zonghe = this.zwyq_content + '需要' + this.yqbq
        this.requirement = '职位要求：'+'\n' + this.zwyq_content + '需要' + this.kong +'\n' +  '工作内容：' + '\n' + this.gznr
        console.log(this.requirement)
        // return this.biubiu
      },
      change2: function (e) {
        var that = this;
        // var bqid = e.currentTarget.dataset.bqid;
        var index = e.currentTarget.dataset.key;
        var list = that.job_label;
        // 判断是否选中
        list[index].active = !list[index].active;
        // for(let i =0;i<list.length;i++){
        if (list[index].active) {
          this.labelscs.push(list[index].id)
          this.yqbq.push(list[index].title)
        } else {
          var cs = 0;
          for (cs; cs < this.labelscs.length; cs++) {
            if (list[index].id == this.labels[cs]) {
              this.labelscs.splice(cs, 1)
              this.yqbq.splice(cs, 1)
            }
          }
        }
        // }
        // this.yqbq += list[index].title + '、'
        // this.labels += list[index].id + ','
        this.labels = this.labelscs.join()
        this.kong = this.yqbq +'\n'
        console.log(this.labels)
        console.log(this.yqbq)
        this.requirement = '职位要求：'+'\n' + this.zwyq_content + '需要' + this.kong +'\n' +  '工作内容：' + '\n' + this.gznr
        // this.zonghe = this.zwyq_content  + '标签:' + this.yqbq
        console.log(this.requirement)
        return this.requirement
      },
      change3: function (e) {
        var that = this;
        var index = e.currentTarget.dataset.key;
        var list = that.job_poscontent;
        // 判断是否选中
        list[index].active = !list[index].active;
        if (list[index].active) {
          this.workcontentcs.push(list[index].id)
          this.gznr.push(list[index].jobcontent)
        } else {
          var cs = 0;
          for (cs; cs < this.workcontentcs.length; cs++) {
            if (list[index].id == this.workcontent[cs]) {
              this.workcontentcs.splice(cs, 1)
              this.gznr.splice(cs, 1)
            }
          }
        }
        this.workcontent = this.workcontentcs.join()
        // if (list[index].active) {
        //   this.gznr = this.gznr + '\n' + list[index].jobcontent
        // }
        this.requirement = '职位要求：'+'\n' + this.zwyq_content + '需要' + this.kong +'\n' +  '工作内容：' + '\n' + this.gznr
        console.log(this.gznr)
        console.log(this.requirement)
      },
      input: function (e) {
        this.title = e.mp.detail.value

        console.log(this.title)
      },
      nextstep: function () {
        // this.cs = wx.getStorageSync('service_groups')
        // console.log(this.cs)
        wx.setStorageSync('title', this.title)
        wx.setStorageSync('service_groups', this.service_groups)
        wx.setStorageSync('skills', this.skills)
        wx.setStorageSync('images', this.images)
        wx.setStorageSync('subjects', this.subjects)
        wx.setStorageSync('labels', this.labels)
        wx.setStorageSync('requirement', this.requirement)
        wx.setStorageSync('workcontent', this.workcontent)
        wx.navigateTo({
          url: '/pages/topic/forstep'
        })
      },
      contentinput: function (e) {
        this.requirement = e.mp.detail.value;
        let len = parseInt(this.requirement.length);
        console.log(len)
        if (len < 500){
          this.word = len + '/500'
        }
        else{
          this.word = "500/500";
        }
        // wx.setStorageSync('title', this.title)
        console.log(this.requirement)
      },
    }
  }
</script>

<style>
  @import url("~mpvue-wxparse/src/wxParse.css");
  page{
    background-color: #fff;
  }
  .container{
    display: flex;
    flex-direction: column;
  }

  .layout1{
    display: flex;
    flex-direction: column;
    width:750rpx;
    height:193rpx;
    background:rgba(255,255,255,1);
  }
  .tatle{
    display: flex;
    flex-direction: column;
  }
  .text1{
    margin-left:32rpx;
    margin-top:50rpx;
    height:38rpx;
    font-size:40rpx;
    font-family:PingFang-SC-Medium;
    font-weight:bold;
    color:rgba(0,0,0,1);
  }
  .text2{
    margin-left:31rpx;
    margin-top:28rpx;
    height:27rpx;
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }

  .layout2{
    display: flex;
    flex-direction: column;
    width:750rpx;
    background:rgba(255,255,255,1);
  }
  .text3{
    margin-left:31rpx;
    margin-top:60rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);
  }
  .wenj1{
    margin-left:31rpx;
    margin-top:50rpx;
    height:29rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }

  .heng{
    margin-left:30rpx;
    margin-top:34rpx;
    width:690rpx;
    height:2rpx;
    background:rgba(236,236,236,1);
  }
  .wqq{
    /*display: flex;*/
    /*margin-top:25rpx;*/
    width:680rpx;
    height:800rpx;
    font-size:28rpx;
    line-height:45rpx;
    font-family:PingFang-SC-Regular;
    color:rgba(102,102,102,1);
  }
  .zwyqnr{
    /*display: flex;*/
    margin-top:25rpx;
    width:680rpx;
    height:800rpx;
    font-size:28rpx;
    line-height:45rpx;
    font-family:PingFang-SC-Regular;
    color:rgba(102,102,102,1);
  }
  .layout21{
    display: flex;
    flex-direction: column;
    margin-left:30rpx;
    margin-top:49rpx;
    width:690rpx;
    height:200rpx;
    background:rgba(247,247,247,1);
  }
  .text4{
    margin-left:32rpx;
    margin-top:10rpx;
    width:120rpx;
    height:29rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .fwrq{
    display: flex;
    flex-wrap: wrap;
  }

  .rq2{
    margin-left:35rpx;
    margin-top:25rpx;
    width:190rpx;
    height:40rpx;
    font-size:28rpx;
    text-align:center;
    line-height:40rpx;
    font-family:PingFang-SC-Regular;
    font-weight:bold;
    color:rgba(102,102,102,1);

    background:linear-gradient(0deg,rgba(46,155,255,1) 0.2685546875%, rgba(27,243,196,1) 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }
  .rq3{
    margin-left:37rpx;
    margin-top:25rpx;
    width:190rpx;
    height:40rpx;
    font-size:28rpx;
    text-align:center;
    line-height:40rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }

  .layout22{
    display:flex;
    flex-direction:column;
    margin-left:30rpx;
    margin-top:30rpx;
    width:690rpx;
    height:400rpx;
    background:rgba(247,247,247,1);
  }
  .bq{
    display: flex;
    flex-wrap: wrap;
  }
  .bq2{
    margin-left:38rpx;
    margin-top:15rpx;
    width:252rpx;
    height:40rpx;
    font-size:28rpx;
    text-align:center;
    line-height:40rpx;
    font-family:PingFang-SC-Regular;
    font-weight:bold;
    color:rgba(102,102,102,1);

    background:linear-gradient(0deg,rgba(46,155,255,1) 0.2685546875%, rgba(27,243,196,1) 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }
  .bq3{
    margin-left:38rpx;
    margin-top:15rpx;
    width:252rpx;
    height:40rpx;
    font-size:28rpx;
    text-align:center;
    line-height:40rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }

  .content1{
    margin-left:32rpx;
    margin-top:30rpx;
    width:690rpx;
    background:rgba(247,247,247,1);
    /*border:2rpx solid rgba(112,112,112,1);*/
    /*border:2rpx solid rgba(46,155,255,1);*/
    /*background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));*/
  }
  .cont1{
    width:690rpx;
    line-height:48rpx;
  }
  .text5{
    margin-left:32rpx;
    width:600rpx;
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }

  .cont2{
    width:690rpx;
    border:2rpx solid rgba(46,155,255,1);
    line-height:48rpx;
  }

  .wb{
    margin-left:31rpx;
    margin-top:50rpx;
    width:690rpx;
    height:rpx;
    background:rgba(247,247,247,1);
  }

  .zwyq{
    margin-left:31rpx;
    margin-top:50rpx;
    width:690rpx;
    /*height:600rpx;*/
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    background:rgba(247,247,247,1)
  }
  .yq{
    margin-left:31rpx;
    /*margin-top:50rpx;*/
    display:flex;
    flex-wrap: wrap;
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    color:rgba(102,102,102,1);
    line-height:50rpx;
  }
  .ts{
    color:#2E9BFF
  }
  .gznr{
    /*margin-left:31rpx;*/
    margin-top:50rpx;
    width:690rpx;
    /*height:600rpx;*/
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    background:rgba(247,247,247,1)
  }
  .nr{
    margin-left:32rpx;
    font-size:28rpx;
    font-weight:400;
    font-family:PingFang-SC-Regular;
    color:rgba(51,51,51,1);
    line-height:60rpx;
  }
  .zs{
    margin-left:550rpx;
    /*margin-top:31rpx;*/
    width:111rpx;
    height:28rpx;
    font-size:28rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    /*line-height:50rpx;*/
  }

  .button{
    text-align:center;
    line-height:90rpx;
    margin-left:30rpx;
    margin-top:120rpx;
    width:690rpx;
    height:90rpx;
    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    box-shadow:0rpx 2rpx 10rpx 0rpx rgba(46,155,255,0.5);
    border-radius:10rpx;
  }
  .bt{
    width:85rpx;
    height:27rpx;
    font-size:29rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .text6{
    /*margin-left:38rpx;*/
    margin-top:25rpx;
    width:180rpx;
    height:40rpx;
    font-size:28rpx;
    text-align:center;
    line-height:40rpx;
    font-family:PingFang-SC-Regular;
    font-weight:bold;
    color:rgba(102,102,102,1);

    background:linear-gradient(0deg,rgba(46,155,255,1) 0.2685546875%, rgba(27,243,196,1) 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }

</style>
