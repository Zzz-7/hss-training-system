<template>
  <div class="Coursereport">
    <Top :name="name" :learnname="learnname" />
    <section class="content">
      <h3 class="titleName">课程报告<span>({{userName}})</span></h3>
      <div class="learnSitution">
        <p><span class="learnName">学习课程数：</span><span class="learnNum">{{countStudyCourse}}</span><span class="learnName">个</span></p>
        <p><span class="learnName">共观看视频：</span><span class="learnNum">{{countWatchVideo}}</span><span class="learnName">个</span></p>
        <p><span class="learnName">共计</span><span class="learnNum">{{totalOnlineTime}}</span><span class="learnName">分钟</span></p>
      </div>
      <div class="reportDetail">
        <div class="courseDetail">
          <h3 class="courseName">{{userCourseReport.courseName}}</h3>
          <p class="learnProgress">
            <span>学习进度:</span>
            <span class="totalNum">
              <span class="progress" :style="{width:learnedNum/totalNum*200+'px'}"></span>
            </span>
            <span class="sectionDetail">
              <span class="learnedNum">{{learnedNum}}</span>/{{totalNum}}节
            </span>
          </p>
        </div>
      </div>
      <div class="reportList">
        <div class="charpter" v-for="(item,index) in userCourseReport.chapters" :key="index">
          <span class="charpterName">{{item.chapterName}}</span>
          <p class="sectionStatusList">
            <i
            :class="['status',item.status==4?'el-icon-error':item.status==3?'el-icon-over':item.status==2?'el-icon-time':item.status==1?'el-icon-success':'el-icon-normal']"
            v-for="(item,index) in item.userSections" :key="index"
            :title="item.status==4?'为测评通过':item.status==3?'已测评通过':item.status==2?'正在学习':item.status==1?'已学完':'未学'"></i>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Top from "./comment/Top";
import Bottom from "./comment/Bottom";
export default {
  components: { Top, Bottom },
  name: "Coursereport",
  data() {
    return {
      name: "学习报告",
      learnname: "返回",
      userName:'',
      userId:'',
      courseId:'',
      totalNum:'',
      learnedNum:'',
      userCourseReport:'',
      countStudyCourse:'',
      countWatchVideo:'',
      totalOnlineTime:'',
    };
  },

  methods: {
    //获取用户学习报告/studyStatus/findUserCourseReport
    async getUserCourseReport(){
      let res = await this.$api.get('/studyStatus/findUserCourseReport',{
        params:{
          // userId:this.userId,
          courseId:this.courseId
        }
      })
      if(res.data.code == 200){
        this.countStudyCourse = res.data.data.countStudyCourse
        this.countWatchVideo = res.data.data.countWatchVideo
        this.totalOnlineTime = res.data.data.totalOnlineTime
        this.userCourseReport = res.data.data.course
      }
    },
  },
  created() {
    this.userId = this.$route.query.userId
    this.courseId = this.$route.query.courseId
    this.userName = this.$route.query.userName
    this.totalNum = this.$route.query.totalNum
    this.learnedNum = this.$route.query.learnedNum
    this.getUserCourseReport()
  },
};
</script>

<style lang="scss">
.Coursereport {
  min-height: 100%;
  position: relative;
  padding-bottom: 40px;
  background: #ffffff;
  color: #333;
  .content{
    width: 1000px;
    padding-top: 20px;
    margin: 0 auto;
    .titleName{
      font-size: 24px;
      span{
        margin-left: 10px;
      }
    }
    .learnSitution{
      margin-top: 20px;
      display: flex;
      align-items: center;
      p{
        margin-right: 30px;
        .learnName{
          font-size: 14px;
          color: #333;
        }
        .learnNum{
          font-size: 16px;
          color: rgb(187, 49, 84);
        }
      }
    }
    .reportDetail{
      margin-top: 20px;
      .courseDetail{
        display: flex;
        align-items: center;
        .courseName{
          font-size: 20px;
        }
        .learnProgress{
          margin-left: 50px;
          font-size: 14px;
          .totalNum{
            margin-left: 15px;
            width: 200px;
            position: relative;
            height: 10px;
            background: #9ee4cf;
            border-radius: 5px;
            display: inline-block;
            .progress{
              position: absolute;
              height: 10px;
              border-radius: 5px;
              background: #27b148;
            }
          }
          .sectionDetail{
            margin-left: 10px;
            .learnedNum{
              font-size: 16px;
              color: rgb(187, 49, 84);
            }
          }
        }
      }
    }
    .reportList{
      margin-top: 20px;
      border: 1px solid #d7d7d7;
      border-radius: 8px;
      padding: 20px;
      min-height: 400px;
      .charpter{
        margin-bottom: 20px;
        display: flex;
        .charpterName{
          display: inline-block;
          color: #333;
          font-size: 18px;
          font-weight: 600;
          width: 300px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sectionStatusList{
          margin-left: 20px;
          display: flex;
          align-items: center;
          .status{
            border-radius: 10px;
            margin-right: 10px;
            font-size: 22px;
          }
          .el-icon-normal{
            border: 1px solid #999999;
            width: 20px;
            height: 20px;
            display: inline-block;
          }
          .el-icon-error{
            color: #f72c2c;
          }
          .el-icon-success{
            color: #008c72;
          }
          .el-icon-over{
            background: #999999;
            width: 20px;
            height: 20px;
            display: inline-block;
          }
          .el-icon-time{
            color: #999999;
          }
        }
      }
    }
  }
}
</style>
