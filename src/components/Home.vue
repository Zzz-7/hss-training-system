<template>
  <div class="bodyHome">
    <!--头部header-->
    <header class="header">
      <div class="main head_main">
        <div class="logo">
<!--          <img src="../assets/images/favicon.png" alt="">-->
          <img src="../assets/logal@2x.png" alt="">
<!--          <h1 style="color: white;">红杉树培训系统</h1>-->
        </div>
        <div class="header_right">
          <ul>
            <li class="mit_book" @click.stop="mistickBook()">
              <i class="el-icon-s-order"></i>
              <span class="name">错题本</span>
            </li>
            <li class="report_book" @click.stop="learnReport()">
              <i class="el-icon-date"></i>
              <span class="name">学习报告</span>
            </li>
            <li class="info_pic" @click="userInfo()">
              <i class="el-icon-user-solid"></i>
              <span>{{userinfo.userName}}</span>
            </li>
            <li class="close" title="退出" @click="loginOut()">
              <i class="el-icon-switch-button"></i>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <!--中心模块-->
    <section class="center">
      <div class="main">
        <div class="center_top">
          <div class="center_top_left">
            <span class="kc"><i class='icon_kc'></i>{{courseName}}</span>
            <span class="gdkc" @click.stop="changekecheng()">更换课程</span>
            <!--册列表-->
            <div class="changekecheng" v-show="bookShow">
              <ul>
                <li
                  v-for="(item,index) in courseList"
                  :key="index.id"
                  @click.stop="changeBook(item)"
                >
                  <span>{{item.courseName}}</span>
                </li>
              </ul>
            </div>
            <i class="toggle_icon"></i>
            <span class="kcjd">学习进度:</span>
            <span class="jdt">
              <i class="icon_point" :class="80*(index)>232*(learnedNum/totalNum)?'isgray':''" v-for="(item,index) in 4" :key="index" :style="{left:80*(index)-2+'px'}"></i>
              <span class="jdted" :style="{width:240*(learnedNum/totalNum)+'px'}"></span>
            </span>
            <span class="kcjd mar1">{{parseInt((learnedNum/totalNum)*100)}}%</span>
            <span class="kcjd mar2">({{learnedNum}}/{{totalNum}}节)</span>
          </div>
          <div class="center_top_right">
            课程简介: {{userStudyCourseInfo.introduce==null?'无':userStudyCourseInfo.introduce}}
          </div>
        </div>
        <div class="center_main">
          <div class="section_left">
            <h3 class="h3">章节列表</h3>
            <div class="chapterList">
              <section class="chapter" @click="switchChapter(chapterIndex,chapterItem)" :class="chapterItem.id==chapterId?'isChapter':''" v-for="(chapterItem,chapterIndex) in userStudyCourseInfo.chapters" :key="chapterIndex">
                <p class="chapter_p">
                  <span class="chapterName">{{chapterItem.chapterName}}</span>
                  <i class="chapter_icon" :class="chapterItem.id==chapterId?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                </p>
                <ul class="sectionList">
                  <li @click.stop="switchSection(sectionIndex,sectionItem)" class="section" :class="[chapterItem.id==chapterId&&sectionItem.id==sectionId?'isSection':'']" v-for="(sectionItem,sectionIndex) in chapterItem.sections" :key="sectionIndex">
                    <p @mouseenter="mouseenter($event)" @mouseleave="mouseleave($event)" :title="sectionItem.sectionName">
                      <span class="text"><span>{{sectionItem.sectionName}}</span></span>
                    </p>
                  </li>
                </ul>
              </section>
            </div>
          </div>
          <div class="section_right">
            <h3 class="h3">
              {{sectionName}}
            </h3>
            <div class="section_right_main">
              <div class="videoAnalysis" @click="toVideoAnalysis()">
                <i class="el-icon-camera"></i>
                <span>视频讲解</span>
              </div>
              <div class="sectionTest" @click="toSectionTest()">
                <i class="el-icon-edit"></i>
                <span>本节测试</span>
                <span class="sectionScoreSpan">{{sectionScore}}</span>
                <div class="triangleRightDiv"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--底部Bottom-->
    <footer class="bottom">
    <div class="kun"></div>
    <div>
      <p v-show="false">推荐使用IE9及以上浏览器使用</p>
      <p>红杉树智能英语教育机构 北京国音红杉树教育科技有限公司 版权所有</p>
    </div>
    </footer>
  </div>
</template>

<script>
import {mouseenter,mouseleave} from './globalVariable/hiddenText'
export default {
  components: {},
  name: "Home",
  data() {
    return {
      userinfo: "",//用户个人信息
      account:'',//账号
      bookShow:false,
      courseList:'',//用户课程信息列表
      courseName:'',//用户在学课程名称
      courseId:'',//用户在学课程Id
      totalNum:1,//课程总节数
      learnedNum:0,//课程已经学过的数量
      userStudyCourseInfo:'',
      sectionName:'',//小节名称
      sectionId:'',//小节Id
      chapterId:'',//章Id
      sectionScore:''//节得分
    };
  },
  methods: {
    //个人中心
    userInfo(){
      this.$router.push({
        path:'/home/userInfo',
        query:{
          account:this.account
        }
      })
    },
    //学习报告
    learnReport(){
      this.$router.push({
        path:'/home/coursereport',
        query:{
          // userId:this.userinfo.id,
          courseId:this.courseId,
          userName:this.userinfo.userName,
          totalNum:this.totalNum,
          learnedNum:this.learnedNum
        }
      })
    },
    //本节测试
    toSectionTest(){
      this.$router.push({
        path:'/home/TestModel',
        query:{
          type:5,
          sectionId:this.sectionId,
          sectionName:this.sectionName,
          // userId:this.userinfo.id
        }
      })
    },
    //视频讲解
    toVideoAnalysis(){
      this.$router.push({
        path:'/home/videoAnalysis',
        query:{
          type:5,
          sectionId:this.sectionId,
          sectionName:this.sectionName,
        }
      })
    },
    //切换小节
    switchSection(sectionIndex,sectionItem){
      this.sectionId = sectionItem.id
      this.sectionName = sectionItem.sectionName
      this.findUserSectionScore();
    },
    //切换章节
    switchChapter(chapterIndex,chapterItem){
      this.chapterId = chapterItem.id
      this.sectionId = chapterItem.sections[0].id
      this.sectionName = chapterItem.sections[0].sectionName
      this.findUserSectionScore();
    },
    //打开课程列表
    changekecheng(){
      this.bookShow = !this.bookShow
    },
    //更换课程
    changeBook(item){
      this.bookShow = !this.bookShow
      this.courseId = item.id
      this.findLastStudyCourseInfoByAccount();
      // console.log(item)
      /*
        bookShow:false,
        courseList:'',//用户课程信息列表
        courseName:'',//用户在学课程名称
        courseId:'',//用户在学课程Id
        totalNum:1,//课程总节数
        learnedNum:0,//课程已经学过的数量
        userStudyCourseInfo:'',
        sectionName:'',//小节名称
        sectionId:'',//小节Id
        chapterId:'',//章Id*/
    },
    mouseenter(e){
      mouseenter(e,'.text')
    },
    mouseleave(e){
      mouseleave(e,'.text')
    },
    //获取用户信息/user/findUserInfoByAccount
    async getuserinfo(){
      let res = await this.$api.get('/user/findCurrentLoginUserInfo',{
        /*params:{
          account:this.account
        }*/
      })
      if(res.data.code == 200){
        this.userinfo = res.data.data
      }
    },
    // 退出登录
    loginOut() {
      let res = this.$api.get("/user/logout");
      this.$router.push("/");
    },
    //获取用户课程信息列表/course/findCourseList
    async getCourseList(){
      let res = await this.$api.get('/course/findCourseList')
      if(res.data.code == 200){
        this.courseList = res.data.data
        /*this.courseList.forEach((value,index)=>{
          if(index == 0){
            this.courseName = value.courseName
            this.courseId = value.id
          }
        })*/
      }
    },
    //获取最后学习的课程(/studyStatus/findUserStudyCourseStatusInfo?)
    async findLastStudyCourseInfoByAccount(){
      let res = await this.$api.get('/studyStatus/findUserStudyCourseStatusInfo?',{
        params:{
          // userId:this.userinfo.id,
          courseId:this.courseId
        }
      })
      if(res.data.code == 200){
        this.userStudyCourseInfo = res.data.data.courseInfo
        this.totalNum = this.userStudyCourseInfo.sectionNum
        this.learnedNum = res.data.data.learnProgress==null?0:res.data.data.learnProgress
        this.courseId = res.data.data.courseInfo.id
        this.courseName = res.data.data.courseInfo.courseName
        this.chapterId = res.data.data.lastStudyChapterId==null?this.userStudyCourseInfo.chapters[0].id:res.data.data.lastStudyChapterId
        this.sectionId = res.data.data.lastStudySectionId==null?this.userStudyCourseInfo.chapters[0].sections[0].id:res.data.data.lastStudySectionId
        this.sectionScore = res.data.data.lastStudySectionScore == null ? "未测" : res.data.data.lastStudySectionScore + "分"
        //遍历取出节名称
        let lastSectionName = "";
        $.each(this.userStudyCourseInfo.chapters, function(index, chapter) {
          $.each(chapter.sections, function(i, section) {
            if (section.id == res.data.data.lastStudySectionId){
              lastSectionName = section.sectionName;
              return;
            }
          });
        });
        this.sectionName = res.data.data.lastStudySectionId == null ? this.userStudyCourseInfo.chapters[0].sections[0].sectionName : lastSectionName;
      }
    },
    //查询用户本节测评得分
    async findUserSectionScore(){
      let res = await this.$api.get('/studyStatus/findUserSectionScore',{
        params:{
          sectionId: this.sectionId
        }
      })
      if(res.data.code == 200){
        this.sectionScore = res.data.data
      }
    }
  },
  created() {
    this.volumeId = this.$route.query.volumeId; // 这是第一次登录时通过路由来找到用户选择了那一册的书
    this.account = this.$route.query.account
    this.getuserinfo().then(()=>{
      this.getCourseList().then(()=>{
        this.findLastStudyCourseInfoByAccount()
      })
    })

  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss">
  .bodyHome {
    //  .plan{}
    position: relative;
    min-height: 100%;
    padding-bottom: 40px;
    background: #EFF9FF;
    .FirstTestRemind {
        position: fixed;
        top: 0;
        left: 0;
    }
    .switchTheme {
        position: absolute;
        top: 0px;
        right: 40px;
        width: 56px;
        height: 55px;
        cursor: pointer;
        z-index: 1000;
        text-align: center;
        background: url('../assets/index_icon_exchange_normal.png');
        background-size:100% 100% ;
        &:hover{
            background: url('../assets/index_icon_exchange_hover.png');
            background-size:100% 100% ;
        }
    }
    // .bottom {
    //   width: 100%;
    //   height: 100px;
    //   background: rgba(31, 44, 55, 1);
    //   overflow: hidden;
    //   position: absolute;
    //   bottom: 0;
    // }
    .changekecheng {
        position: absolute;
        width: 313px;
        height: 260px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 13px 0px rgba(230, 230, 230, 1);
        border-radius: 12px;
        z-index: 10;
        top: 35px;
        /*left: 130px;*/
        overflow: hidden;
        overflow-y: visible;
        li {
            height: 52px;
            cursor: pointer;
            text-align: center;
            line-height: 52px;
            font-size: 16px;
            span {
                font-weight: bold;
                color: #666666;
            }
        }
        li:hover {
            color: #28a1ff;
            background: #f2f2f2
        }
    }
    .xx_top_aside {
        z-index: 10;
    }
    .xx_top_aside {
        overflow-y: visible !important;
    }
    .bodyHome {
        overflow: hidden;
        font-family: "Microsoft YaHei";
        width: 100%;
        height: 100%;
        .bottom {
            margin: 0;
        }
    }
    .header {
        width: 100%;
        height: 70px;
        background: rgba(40, 161, 255, 1);
    }
    .main {
        width: 1200px;
        margin: 0 auto;
        height: 100%;
        // overflow: hidden;
    }
    .head_main {
        display: flex;
        justify-content: space-between;
        background: rgba(40, 161, 255, 1);
    }
    .logo {
        display: flex;
        align-items: center;
        img{
          width: 148px;
          height: 32px;
        }
    }
    .header_right {
        float: right;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .header_right ul {
        height: 100%;
        width: 100%;
    }
    .report_book,
    .backtask,
    .mit_book,
    .info_pic,
    .close {
        padding: 0 14px;
        position: relative;
        float: left;
        height: 100%;
        overflow: hidden;
        line-height: 70px;
        cursor: pointer;
        display: flex;
        align-items: center;
        i{
          font-size: 22px;
          color: #fff;
        }
        .el-icon-switch-button{
          font-size: 28px;
        }
        span {
          font-size: 18px;
          color: #ffffff;
          margin-left: 5px;
        }
        &:hover {
          background: rgba(0, 0, 0, 0.1);
          border-top: 2px #ffe61c solid;
        }
    }
    .icon_report {
        background: url("../assets/images/functionCenter/index_icon_personalcenter.png");
        background-size: 100% 100%;
    }
    .glod {
        padding: 0 13px;
    }
    .icon_glod {
        background: url("../assets/images/index_icon_goldcoin.png");
    }
    .close {
        padding: 0 15px;
    }
    .icon_close {
        width: 22px !important;
        height: 22px !important;
        background: url("../assets/images/index_icon_close.png");
        background-size: 100% 100%;
    }
    .center {
        width: 100%;
        border-radius: 12px;
        margin-bottom: 30px;
    }
    .center_top {
        width: 1200px;
        height: 80px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        margin-top: 30px;
        padding: 24px 28px;
        display: flex;
        align-items: center;
    }
    .center_main {
        width: 1200px;
        height: 680px;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
    }
    .center_top_left {
        display: flex;
        align-items: center;
        position: relative;
    }
    .kc {
        font-size: 24px;
        color: #333333;
        display: flex;
        align-items: center;
        .icon_kc{
            background: url('../assets/images/book.png');
            width: 25px;
            height: 25px;
            display: inline-block;
            background-size: 100%;
            margin-right:10px ;
        }
    }
    .gdkc {
        font-size: 14px;
        color: #666666;
        font-weight: 400;
        cursor: pointer;
        margin-left: 20px;
    }
    .gdkc:hover {
        color: #28a1ff;
    }
    .gdkc:hover~i.toggle_icon {
        background: url("../assets/images/index_icon_toggle_normal@2x.png");
        background-size: 100% 100%;
    }
    .toggle_icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url("../assets/images/index_icon_toggle_normal.png");
        margin-left: 3px;
    }
    .kcjd {
        color: #666666;
        font-size: 16px;
        font-weight: 400;
        margin-left: 32px;
    }
    .jdt {
        display: flex;
        background: #EEEEEE;
        height: 6px;
        width: 240px;
        border-radius: 7px;
        margin-left: 11px;
        position: relative;
        .icon_point{
            top: -2px;
            position: absolute;
            width: 10px;
            height: 10px;
            background: #ffffff;
            border: 3px solid #28a1ff;
            border-radius: 50%;
        }
        .isgray{
            border: 3px solid #EEEEEE;
        }
        span {
            display: inline-block;
            background: #28a1ff;
            height: 7px;
            border-radius: 7px;
            width: 20px;
        }
    }
    .mar1 {
        font-size: 16px;
        font-weight: bold;
        margin-left: 15px;
        color: #28a1ff;
    }
    .mar2 {
        font-size: 13px;
        margin-left: 6px;
    }
    .center_top_right {
        font-size: 16px;
        color: #666666;
        height: 100%;
        line-height: 32px;
        cursor: pointer;
        display: flex;
        margin-left: 50px;
        .center_top_right_span {
          margin-left: 30px;
          line-height: 22px;
          display: flex;
          align-items: center;
        }
    }

    .section_left {
        width: 270px;
        height: 100%;
        background: #fff;
        padding: 24px;
        border-radius: 10px;
        .h3{
          font-size: 16px;
          /*color: #666666;*/
          font-weight: 400;
          padding-bottom: 30px;
          background: #fff;
        }
        .chapterList{
            width: 270px;
            height: 600px;
            overflow-y: auto;
            padding-bottom: 30px;
            margin-left: -24px;
            .chapter{
                cursor: pointer;
                position: relative;
                .chapter_p{
                    padding: 15px 24px;
                    font-size: 18px;
                    color: #666;
                    .chapter_icon{
                        font-weight: 600;
                        margin-right: 8px;
                        float: right;
                    }
                }
                .sectionList{
                    font-weight: normal;
                    display: none;
                    margin-top: 4px;
                    padding-left: 24px;
                    .section{
                        padding-left:20px;
                        color: #999;
                        .line{
                            width: 1px;
                            height: 30px;
                            border-left: 1px dotted #666666;
                            margin-left: 7px;
                        }
                        p{
                            display: flex;
                            align-items: center;
                            padding: 1px 0;
                            font-size: 16px;
                            i{
                                width: 16px;
                                height: 16px;
                                margin-right: 8px;
                            }
                            .icon_learn_no{
                                background: url('../assets/images/icon_sectionStatus_normal.png');
                                background-size: 100%;
                            }
                            .icon_video_play{
                                background: url('../assets/images/icon_sectionStatus_play.png');
                                background-size: 100%;
                            }

                            .icon_circle_check{
                                background: url('../assets/images/icon_sectionStatus_right.png');
                                background-size: 100%;
                            }
                            .icon_tickets{
                                width: 13px;
                                height: 16px;
                                background: url('../assets/images/icon_sectionStatus_chapterReport.png');
                                background-size: 100%;
                                margin:0 8px 0 2px;
                            }
                            .el-icon-learn-no{
                                width: 21px;
                                height: 21px;
                                border-radius: 50%;
                                border: 1px solid #666666;
                            }
                            .text {
                                display: inline-block;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                width: 158px;
                                position: relative;
                                height: 22px;
                                span {
                                    overflow: hidden;
                                    transition: left 1s;
                                    position: initial;
                                    left: 0;
                                }
                            }
                        }
                    }

                }
            }
            .isChapter{
                .chapter_p{
                    border-left: 3px solid #28a1ff;
                    background: rgba($color: #28a1ff, $alpha: 0.1);
                }
                .chapterName,.chapter_icon{
                    color: #28a1ff;
                }
                .sectionList{
                    display: block;
                    .isSection{
                        color: #28a1ff;
                    }
                }
            }
        }
    }
    .section_right {
        width: 906px;
        height: 100%;
        padding-left: 16px;
        background: #fff;
        border-radius: 10px;
        padding: 24px;
        margin-left: 24px;
        .h3{
        padding-top: 50px;
          font-weight: 400;
          text-align: center;
          color: #333;
          font-size: 20px;
        }
        .section_right_main{
            width: 564px;
            height: 370px;
            margin: 80px auto 0;
            position: relative;
            .videoAnalysis,
            .sectionTest{
                position: absolute;
                width: 564px;
                height: 140px;
                background: #fff;
                border: 1px solid #E2E2E2;
                border-radius: 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #333333;
                span{
                  font-size: 30px;
                }
                i{
                  margin-right: 15px;
                  font-size: 36px;
                }
                .el-icon-camera{
                  margin-top: 8px;
                }
            }
            .sectionTest{
              bottom: 0px;
            }
        }

    }
    .footer {
        width: 1920px;
        height: 100px;
        background: rgba(31, 44, 55, 1);
        overflow: hidden;
    }
    .footer div {
        margin: 0 auto;
        text-align: center;
        font-size: 12px;
        color: #cdcdcd;
    }
    .footer div:nth-child(1) {
        margin-top: 29px;
    }
    .footer div:nth-child(2) {
        margin-top: 17px;
    }
    .bottom {
        position: absolute;
        width:100%;
        height: 40px;
        background: rgba(31, 44, 55, 1);
        bottom: 0;
      }
      .kun {
          width: 100%;
          height: 6px;
          background: #28a1ff;
        }

      .bottom p {
        display: flex;
        justify-content: center;
        font-size: 12px;
        color: #cdcdcd;
        margin-top:8px;
      }
      .relativeBottom{
          position: relative;
      }

    .triangleRightDiv {
      position: absolute;
      right: -1px;
      top: -1px;
      width: 0;
      height: 0;
      border-color: transparent #31b92f;
      border-width:0 50px 50px 0;
      border-style:solid;
    }
    .sectionScoreSpan {
      font-family: SourceHanSansSC;
      font-size: 14px !important;
      color: rgba(250, 250, 250, 1);
      width: 50px;
      top: 14px;
      z-index: 9;
      transform: rotate(46deg);
      right: -15px;
      position: absolute;
    }
}
</style>
