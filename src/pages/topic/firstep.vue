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
        <text class="text1">5/5 岗位要求</text>
        <text class="text2">设置招聘偏好，让报名更加精准</text>
      </view>
    </view>

    <view class="layout2">
      <view class="v1">
        <view class="v2">性别要求</view>
        <view class="v3">
          <picker :value="xb" :range="sex_list" range-key="name" @change="bindPickerChange1">
            <view class="picker" >
              {{sex_list[xb].name}}
            </view>
          </picker>
        </view>
        <view class="v4">
          <picker :value="xb" :range="sex_list" range-key="name" @change="bindPickerChange1">
            <img src="/static/images/dianji@2x.png" class="img1">
          </picker>
        </view>
      </view>
      <!--      <view class="v5"></view>-->

      <view class="v1">
        <view class="v2">学历要求</view>
        <view class="v3">
          <picker :value="xl" :range="edulevel_list" range-key="name" @change="bindPickerChange2">
            <view class="picker" >
              {{edulevel_list[xl].name}}
            </view>
          </picker>
        </view>
        <view class="v4"><picker :value="xl" :range="edulevel_list" range-key="name" @change="bindPickerChange2">
          <img src="/static/images/dianji@2x.png" class="img1">
        </picker>
        </view>
      </view>
      <!--      <view class="v5"></view>-->

      <view class="v1">
        <view class="v2">年龄要求</view>
        <view >
          <picker @change="Arange" mode = "multiSelector" :value="multiIndex" :range="multiArray">
            <view class="v3">
              {{multiArray[0][multiIndex[0]]}}岁-{{multiArray[1][multiIndex[1]]}}岁
            </view>
          </picker>
        </view>
        <view class="v4">
          <picker @change="Arange" mode = "multiSelector" :value="multiIndex" :range="multiArray">
            <img src="/static/images/dianji@2x.png" class="img1">
          </picker>
        </view>
      </view>
    </view>

    <view class="layout3">

      <view class="v6">职位要求</view>
      <view class="v5"></view>

      <view class="v1">
        <view class="v7"><img src="/static/images/xinghao@2x.png" class="img2"></view>
        <view class="v8">招聘人数</view>
        <input class="v9" @input="input"/>
        <view class="v10">人</view>
      </view>
      <!--      <view class="v5"></view>-->

      <view class="v1">
        <view class="v7"><img src="/static/images/xinghao@2x.png" class="img2"></view>
        <view class="v8">结算方式</view>

        <view  v-for="(pay,index) in paytype_list">
          <view :data-id="pay.id" :class="[pay.active?'bt2':'bt1']"  @click="change1" >
            {{pay.name}}
          </view>
        </view>

      </view>
      <!--      <view class="v5"></view>-->

      <view class="v20">

        <view class="v11">职位福利</view>

        <view class="button">

          <view  v-for="(wf,index) in welfare">
            <view :data-key="index" :class="[wf.active?'bt4':'bt3']"  @click="change2" >
              {{wf.name}}
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="layout4">

      <view class="v6">时间地点</view>
      <view class="v5"></view>

      <view class="v1">
        <view class="v7"><img src="/static/images/xinghao@2x.png" class="img2"></view>
        <view class="v8">开始时间</view>

        <picker mode="date" :value="startdate"  @change="bindDateChange1">
          <view class="v12">
            {{startdate}}
          </view>
        </picker>
        <!--          <view class="v12">2019-03-20</view>-->
        <view class="v4">
          <picker mode="date" :value="date1" @change="bindDateChange1">
            <img src="/static/images/dianji@2x.png" class="img1">
          </picker>
        </view>
      </view>
      <!--        <view class="v5"></view>-->

      <view class="v1">
        <view class="v7"><img src="/static/images/xinghao@2x.png" class="img2"></view>
        <view class="v8">结束时间</view>
        <picker mode="date" :value="enddate"  @change="bindDateChange2">
          <view class="v12">
            {{enddate}}
          </view>
        </picker>
        <!--          <view class="v12">2019-06-30</view>-->
        <view class="v4">
          <picker mode="date" :value="date2"  @change="bindDateChange2">
            <img src="/static/images/dianji@2x.png" class="img1">
          </picker>
        </view>
      </view>

      <view class="v20">
        <view class="v7"><img src="/static/images/xinghao@2x.png" class="img2"></view>
        <view class="v13">工作周期</view>
        <view class="button">

          <view  v-for="(cy,index) in cycle">
            <view :data-key="index" :class="[cy.active?'bt6':'bt5']"  @click="change3" >
              {{cy.name}}
            </view>
          </view>

        </view>
      </view>

      <view class="layout5">

        <view class="v1">
          <view class="v7"><img src="/static/images/xinghao@2x.png" class="img2"></view>
          <view class="gzsj">工作时间</view>
          <view class="tianjia">
            <picker @change="Trange" mode = "multiSelector" :value="dateIndex" :range="dateArray">
              <img src="/static/images/tianjia@2x.png" class="img3">
            </picker>
          </view>
          <view class="tj">
            <picker @change="Trange" mode = "multiSelector" :value="dateIndex" :range="dateArray">
              添加时间
            </picker>
          </view>
          <view class="v4">
            <picker @change="Trange" mode = "multiSelector" :value="dateIndex" :range="dateArray" >
              <img src="/static/images/dianji@2x.png" class="img1">
            </picker>
          </view>
        </view>

        <view  v-for="(arr_d,index) in worktime" >
          <view class="v14">
            <view class="v15" >
              {{arr_d[0]}}:00-{{arr_d[1]}}:00
            </view>
            <view class="shan" :data-key="index" @click="deletePerson"><img src="/static/images/shanchu@2x.png" class="img4"></view>
          </view>
        </view>

      </view>
    </view>

    <view class="layout6">

      <view class="v6">联系方式</view>
      <view class="v5"></view>

      <view class="v1">
        <view class="v7"><img src="/static/images/xinghao@2x.png" class="img2"></view>
        <view class="v8">联系人</view>
        <view class="v12" >{{userinfo.realname}}</view>
      </view>
      <!--      <view class="v5"></view>-->

      <view class="v1">
        <view class="v7"><img src="/static/images/xinghao@2x.png" class="img2"></view>
        <view class="v8">咨询方式</view>
        <view class="v12">电话</view>
      </view>
      <!--      <view class="v5"></view>-->

      <view class="v1">
        <view class="v7"><img src="/static/images/xinghao@2x.png" class="img2"></view>
        <view class="v8">联系电话</view>
        <!--        <view  v-for="(user,index) in userinfo" >-->
        <view class="v12" >{{userinfo.phone}}</view>
        <!--        </view>-->
      </view>
      <!--      <view class="v5"></view>-->

      <view class="v1">
        <view class="v16">
          <picker @change="Tjzx" :value="tjzxindex" :range="tjzx">
            {{tjzx[tjzxindex]}}
          </picker>
        </view>
        <view class="zx">
          <picker @change="Tjzx" :value="tjzxindex" :range="tjzx"  >
            <img src="/static/images/tianjia@2x.png" class="img3">
          </picker>
        </view>
      </view>



      <view class="vfs" >
        {{fs}}
      </view>

      <view class="v1">
        <view class="v17">报名截止</view>
        <picker mode="date" :value="regdeadline" @change="bindDateChange3">
          <view class="v12">
            {{regdeadline}}
          </view>
        </picker>
        <!--        <view class="v12">2019-06-30</view>-->
        <view class="v4">
          <picker mode="date" :value="date3"  @change="bindDateChange3">
            <img src="/static/images/dianji@2x.png" class="img1">
          </picker>
        </view>
      </view>
      <view class="v5"></view>

    </view>

    <view class="button1" @click="nextstep">
      <text class="bt">下一步</text>
    </view>

  </view>

  </view>

</template>

<script>
  import apii from '@/utils/apii'
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
        uid: 2,
        sex: 0,
        edulevel: 0,
        sum: 0,
        paytype: 0,
        age: '',
        // worktime: '',
        userinfo: [],
        multiArray: [[], []],
        multiIndex: [0, 10],
        dateArray: [[], []],
        dateIndex: [9, 17],
        worktime: [],
        panduan: 0,
        fs: '',
        cs: '',
        tjzxindex: 0,
        tjzx: ['添加咨询方式','邮箱', 'QQ'],
        // arr_list1: [],
        // arr_list2: [],
        sex_list: [
          {
            id: 1,
            name: '男'
          },
          {
            id: 2,
            name: '女'
          },
          {
            id: 3,
            name: '男女不限'
          }
        ],
        edulevel_list: [
          {
            id: 1,
            name: '大专'
          },
          {
            id: 2,
            name: '本科'
          },
          {
            id: 3,
            name: '研究生'
          },
          {
            id: 4,
            name: '博士生'
          },
          {
            id: 5,
            name: '博士后'
          },
          {
            id: 6,
            name: '无限制'
          }
        ],
        startdate: '2019-09-01',
        enddate: '2019-09-01',
        regdeadline: '2019-09-01',
        // edulevel: [],
        paytype_list: [],
        welfare: [],
        cycle: [],
        xl: 0,
        xb: 0
      }
    },
    mounted () {
      this.Jobstep5()
      for(var n=0;n<2;n++){
        for (var m = 16; m < 51; m++) {
          this.multiArray[n].push(m)
        }
      }
      for(var x=0;x<2;x++){
        for (var y = 0; y < 25; y++) {
          this.dateArray[x].push(y)
        }
      }
    },
    methods: {
      async Jobstep5 () {
        const res = await apii.Jobstep5({ uid: this.uid });
        if (res.code === 1) {
          this.userinfo = res.data.userinfo;
          // this.edulevel = res.data.edulevel_list;
          this.paytype_list = res.data.paytype_list;
          this.welfare = res.data.welfare_list;
          this.cycle = res.data.cycle_list;
          this.paytype_list.forEach(item => {
            this.$set(item, 'active', false);
          });
          this.welfare.forEach(item => {
            this.$set(item, 'active', false);
          });
          this.cycle.forEach(item => {
            this.$set(item, 'active', false);
          });
          this.$forceUpdate();
        }
      },
      change1: function (e) {
        let that = this
        let a = e.currentTarget.dataset.id;
        // console.log(this.userinfo)
        that.paytype_list.forEach(item => {
          if(a == item.id){
            item.active = true;
            this.paytype = item.id
            wx.setStorageSync('paytype', this.paytype)
            this.cs = wx.getStorageSync('paytype')
            console.log(this.paytype)
          }else {
            item.active = false;
          }
        })
      },
      change2: function (e) {
        var that = this;
        var index = e.currentTarget.dataset.key;
        var list = that.welfare;
        // 判断是否选中
        list[index].active = !list[index].active;
        console.log(list[index].id)

      },
      change3: function (e) {
        var that = this;
        var index = e.currentTarget.dataset.key;
        var list = that.cycle;
        // 判断是否选中
        list[index].active = !list[index].active;

      },
      Arange (e) {
        this.multiIndex = e.mp.detail.value
        this.age += this.multiArray[0][this.multiIndex[0]] + '~' + this.multiArray[1][this.multiIndex[1]]
        wx.setStorageSync('age', this.age)
        // console.log(this.age)
      },
      // kk: function(e){
      //   var tt = e.currentTarget.dataset.key1;
      //   console.log(tt)
      // },
      Trange (e) {
        let that = this
        // var tt = e.currentTarget.dataset.key1;
        that.dateIndex = e.mp.detail.value
        that.worktime.push([that.dateArray[0][that.dateIndex[0]],that.dateArray[1][that.dateIndex[1]]])
        // this.worktime += this.multiArray[0][this.multiIndex[0]] + '~' + this.multiArray[1][this.multiIndex[1]]
        wx.setStorageSync('worktime', this.worktime)
        console.log(this.worktime)
      },
      deletePerson: function(e) {
        var ar = e.currentTarget.dataset.key;
        this.arr_date.splice(ar,1);
      },
      Tjzx (e) {
        let that = this
        // var tt = e.currentTarget.dataset.key1;
        that.tjzxindex = e.mp.detail.value
        console.log(that.tjzxindex)
        if(that.tjzxindex == 1){
          that.fs = that.userinfo.email
        }
        else if(that.tjzxindex == 2){
          that.fs = that.userinfo.qq
        }else if(that.tjzxindex == 0){
          that.fs = ''
        }
        console.log(that.fs)
      },

      bindPickerChange1: function (e) {
        // console.log(e)
        // console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.xb = e.mp.detail.value
        this.sex = this.sex_list[this.xb].id
        wx.setStorageSync('sex', this.sex)
        // this.cs = wx.getStorageSync('sex')
        // console.log(this.cs)
      },
      bindPickerChange2: function (e) {
        // console.log(e)
        // console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.xl = e.mp.detail.value
        this.edulevel = this.edulevel_list[this.xl].id
        wx.setStorageSync('edulevel', this.edulevel)
      },
      bindDateChange1: function (e) {
        // console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.startdate = e.mp.detail.value
        wx.setStorageSync('startdate', this.startdate)
        this.cs = wx.getStorageSync('startdate')
        console.log(this.cs)
      },
      bindDateChange2: function (e) {
        // console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.enddate2 = e.mp.detail.value
        wx.setStorageSync('enddate', this.enddate)
      },
      bindDateChange3: function (e) {
        // console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.regdeadline = e.mp.detail.value
        wx.setStorageSync('regdeadline', this.regdeadline)
      },
      input: function (e) {
        this.sum = e.mp.detail.value
        wx.setStorageSync('sum', this.sum)
        console.log(this.sum)
      },
      nextstep: function () {
        wx.navigateTo({
          url: '/pages/topic/submit'
        })
      }
    }
  }
</script>

<style>
  .container{
    display: flex;
    flex-direction: column;
  }
  .section__title{
    margin-bottom: 20rpx;
  }
  .section{
    margin: 50rpx 0;
    font-size: 30rpx;
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
    margin-top:20rpx;
    background:rgba(255,255,255,1);
  }
  .v1{
    display: flex;
    height:100rpx;
  }
  .v20{
    display: flex;
    height:200rpx;
  }
  .v2{
    margin-left:30rpx;
    margin-top:35rpx;
    width:120rpx;
    height:28rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(119,119,119,1);
  }
  .v3{
    margin-left:92rpx;
    margin-top:35rpx;
    width:164rpx;
    height:30rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .v4{
    margin-left:290rpx;
    margin-top:35rpx;
  }
  .img1{
    width:10rpx;
    height:20rpx;
  }
  .v5{
    margin-left:30rpx;
    margin-top:36rpx;
    width:690rpx;
    height:2rpx;
    background:rgba(245,248,249,1);
  }

  .layout3{
    display: flex;
    flex-direction: column;
    margin-top:20rpx;
    background:rgba(255,255,255,1);
  }
  .v6{
    margin-left:31rpx;
    margin-top:35rpx;
    width:121rpx;
    height:29rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:bold;
    color:rgba(0,0,0,1);
  }
  .v7{
    margin-left:30rpx;
    margin-top:41rpx;
  }
  .img2{
    width:18rpx;
    height:18rpx;
  }
  .v8{
    margin-left:21rpx;
    margin-top:35rpx;
    width:122rpx;
    height:29rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(119,119,119,1);
  }
  .v9{
    margin-left:56rpx;
    margin-top:38rpx;
    width:80rpx;
    height:23rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .v10{
    margin-left:350rpx;
    margin-top:36rpx;
    width:28rpx;
    height:28rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .bt1{
    margin-left:40rpx;
    margin-top:23rpx;
    width:140rpx;
    height:54rpx;
    text-align:center;
    line-height:54rpx;
    font-size:26rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
    background:rgba(249,249,249,1);
    border-radius:8rpx;
  }
  .bt2{
    margin-left:40rpx;
    margin-top:23rpx;
    width:140rpx;
    height:54rpx;
    text-align:center;
    line-height:54rpx;
    font-size:26rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    border-radius:8rpx;
  }

  .button{
    display: flex;
    flex-wrap: wrap;
    margin-left:20rpx;
  }
  .v11{
    margin-left:31rpx;
    margin-top:34rpx;
    width:180rpx;
    height:29rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(119,119,119,1);
  }
  .bt3{
    margin-left:30rpx;
    margin-top:20rpx;
    width:180rpx;
    height:54rpx;
    text-align:center;
    line-height:54rpx;
    font-size:26rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
    background:rgba(249,249,249,1);
    border-radius:8rpx;
  }
  .bt4{
    margin-left:30rpx;
    margin-top:20rpx;
    width:180rpx;
    height:54rpx;
    text-align:center;
    line-height:54rpx;
    font-size:26rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    border-radius:8rpx;
  }
  .bt5{
    margin-left:20rpx;
    margin-top:23rpx;
    width:140rpx;
    height:54rpx;
    text-align:center;
    line-height:54rpx;
    font-size:26rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
    background:rgba(249,249,249,1);
    border-radius:8rpx;
  }
  .bt6{
    margin-left:20rpx;
    margin-top:23rpx;
    width:140rpx;
    height:54rpx;
    text-align:center;
    line-height:54rpx;
    font-size:26rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
    border-radius:8rpx;
  }

  .layout4{
    display: flex;
    flex-direction: column;
    margin-top:20rpx;
    background:rgba(255,255,255,1);
  }
  .v12{
    margin-left:56rpx;
    margin-top:38rpx;
    width:180rpx;
    height:23rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(0,0,0,1);
  }
  .v13{
    margin-left:21rpx;
    margin-top:34rpx;
    width:180rpx;
    height:29rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(119,119,119,1);
  }
  .gzsj{
    margin-left:31rpx;
    margin-top:37rpx;
    width:120rpx;
    height:29rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(119,119,119,1);
  }

  .layout5{
    display: flex;
    flex-direction: column;
    margin-top:20rpx;
    background:rgba(255,255,255,1);
  }
  .tianjia{
    margin-left:31rpx;
    margin-top:28rpx;

  }
  .img3{
    width:23rpx;
    height:23rpx;
  }
  .tj{
    margin-left:2rpx;
    margin-top:37rpx;
    width:150rpx;
    height:40rpx;
    font-size:26rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);

    background:linear-gradient(0deg,rgba(46,155,255,1) 0.2685546875%, rgba(27,243,196,1) 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }
  .dianji{
    margin-left:355rpx;
    margin-top:37rpx;
  }

  .v14{
    display: flex;
    margin-left:220rpx;
    margin-top:23rpx;
    width:230rpx;
    height:54rpx;
    background:rgba(249,249,249,1);
    border-radius:8rpx;
  }
  .v15{
    margin-left:26rpx;
    margin-top:17rpx;
    width:150rpx;
    height:21rpx;
    text-align:center;
    line-height:21rpx;
    font-size:26rpx;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
  }
  .shan{
    margin-left:5rpx;
    margin-top:16rpx;
  }
  .img4{
    width:26rpx;
    height:26rpx;
  }

  .layout6{
    display: flex;
    flex-direction: column;
    margin-top:20rpx;
    background:rgba(255,255,255,1);
  }
  .v16{
    margin-left:31rpx;
    margin-top:36rpx;
    width:180rpx;
    height:29rpx;
    font-size:30rpx;
    /*text-align:center;*/
    /*line-height:29rpx;*/
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(119,119,119,1);
  }
  .zx {
    margin-left: 483rpx;
    margin-top: 36rpx;
  }
  .v17{
    margin-left:31rpx;
    margin-top:36rpx;
    width:120rpx;
    height:29rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(119,119,119,1);
  }
  .button1{
    text-align:center;
    line-height:90rpx;
    margin-left:30rpx;
    margin-top:34rpx;
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
  .vfs{
    margin-left:35rpx;
    margin-top:10rpx;
    width:220rpx;
    height:23rpx;
    font-size:30rpx;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(0,0,0,1);
  }

</style>
