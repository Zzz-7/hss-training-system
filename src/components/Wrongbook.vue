<template>
  <div class="wrongbook">
    <Top :name="name" :learnname="learnname" />
    <div class="Top">
      <p>
      <span>选择册：</span>
        <el-select v-model="volumeValue" @change="choiesVo(volumeValue)">
          <el-option v-for="itemV in volumeList"
            :key="itemV.name"
            :label="itemV.name"
            :value="itemV.id"
          ></el-option>
        </el-select>
      </p>
      <p>
        <span>选择章：</span>
        <el-select v-model="chapterValue" placeholder="全部章" @change="choiesVl(chapterValue)">
          <el-option v-for="itemC in chapterList"
            :key="itemC.name"
            :label="itemC.name"
            :value="itemC.id"
          ></el-option>
        </el-select>
      </p>
      <p>
        <span>选择节：</span>
        <el-select v-model="sectionValue" placeholder="全部节" @change="choiesSe(sectionValue)">
          <el-option v-for="itemS in sectionList"
            :key="itemS.name"
            :label="itemS.name"
            :value="itemS.id"
          ></el-option>
        </el-select>
      </p>
    </div>
    <div class="min">
      <div class="questionList" v-if="WrongQuestion!=''">
        <div class="section"
          v-for="(item,index) in WrongQuestion"
          :key="index.id"
          @click="watchparse(index)">
          <div class="questionName">
            <el-checkbox class="checkbox" @change="checkbox(index)"></el-checkbox>
            <span class="questionNum questionNamespan">{{index+1}}.</span>
            <span class="questionNamespan" v-html="item.question"></span>
          </div>
          <div class="questionmsg">
            <ul>
              <li>
                <span>题型：</span>
                <span>{{questiontypes[item.questionType]}}</span>
              </li>
              <li :title="item.titleName">
                <span>知识点：</span>
                <span>{{item.titleName}}</span>
              </li>
              <li>
                <span>正确率：</span>
                <span>
                  <span>{{item.answerNum==0?0:(item.rightNum/item.answerNum*100).toFixed(2)}}</span>%（
                  <span>{{item.rightNum}}</span>/
                  <span>{{item.answerNum}}</span>）
                </span>
              </li>
              <li>
                <span>末次答结果：</span>
                <span style="color:#FF5858;">{{item.lastRightNum==0?'错误':'正确'}}</span>
              </li>
            </ul>
          </div>
          <div class="Learndetails" v-show="false">
            <!--item.questionType-->
            <p v-if="item.questionType==1" class="questionType">
              <span class="questionTypespan" v-if="item.option1!=''" v-html="'A.'+item.option1"></span>
              <span class="questionTypespan" v-if="item.option2!=''" v-html="'B.'+item.option2"></span>
              <span class="questionTypespan" v-if="item.option3!=''" v-html="'C.'+item.option3"></span>
              <span class="questionTypespan" v-if="item.option4!=''" v-html="'D.'+item.option4"></span>
            </p>
            <p v-if="item.questionType==2" class="questionType">
              <span class="questionTypespan">T.正确</span>
              <span class="questionTypespan">F.错误</span>
            </p>
            
            <p v-if="item.questionType==1" class="answer">
              <span class="answersapn1">【答案】</span>
              <span v-html="item.answer"></span>
            </p>
            <p v-if="item.questionType==2" class="answer">
              <span class="answersapn1">【答案】</span>
              <span v-html="item.answer"></span>
            </p>
            <p v-if="item.questionType==3" class="answer">
              <span class="answersapn1">【答案】</span>
              <span v-if="item.option1!=''" v-html="item.option1"></span>
              <span v-if="item.option2!=''" v-html="item.option2"></span>
              <span v-if="item.option3!=''" v-html="item.option3"></span>
              <span v-if="item.option4!=''" v-html="item.option4"></span>
            </p>
            <p class="parsing" v-if="item.parse">
              <span class="parsingspan1">【解析】</span>
              <span class="parsingspan2" v-html="item.parse"></span>
            </p>
          </div>
          <div class="watchparse" @click="opendetails(index)">
            <span>查看详情</span>
            <i class="icon el-icon-caret-bottom"></i>
          </div>
        </div>
        <div class="wbBottom">
          <div class="wbBottom_left">
            <el-checkbox class="AllCheckbox" @change="AllCheckbox($event)">全选</el-checkbox>
            <span class="CheckboxNum">
              <span>共选中</span>
              <span style="color:#28A1FF;padding:0 5px;">{{checkboxedNum}}</span>
              <span>题</span>
            </span>
            <div class="test" @click="Subject_test()">选题测试</div>
          </div>
          <div class="wbBottom_right">
            <span class="totalNum">
              <span>共</span>
              <span style="color:#28A1FF;padding:0 5px;">{{total}}</span>
              <span>条</span>
            </span>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="sizes, prev, pager, next"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div class="Nowrong" v-else>{{WrongQuestionmessage}}</div>
    </div>
  </div>
</template>

<script>
import Top from "./comment/Top";
export default {
  components: { Top },
  name: "Wrongbook",
  data() {
    return {
      name: "错题本",
      learnname: "返回",
      volumeId: 0, //册id
      chapterId: 0, //章id
      sectionId:0,//小节id
      pageNum: 1, //当前页
      pageSize: 10, //每页的大小（条数）
      WrongQuestion: [],
      WrongQuestionmessage: "本章还没有错题哦!", //本章没有错题的提示信息
      questiontypes: {
        1: "选择题",
        2: "判断题",
        3: "填空题",
      },
      value:'',
      open: false,
      total: "",
      checkboxedNum: 0,//选中题目的数量
      questionIds: [], //获取多个问题，并处理成字符串'80-81-82'
      chapterValue:'',
      sectionValue:'',
      volumeValue:'',
      chapterList: [],//章列表
      sectionList:[],//节列表
      volumeList:[],//册列表
    };
  },
  methods: {
    //点击选题测试按钮获取列表
    Subject_test() {
      for (let i = 0; i < $(".checkbox").length; i++) {
        if ($(".checkbox").eq(i).hasClass("is-checked")) {
          this.questionIds.push(this.WrongQuestion[i].questionId);
        }
      }
      this.$router.push({
        path: "/home/TestModel",
        query: { questionIds: this.questionIds, volumeIds: this.volumeId,type:1 },
      });
    },
    //每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserWrongQuestionList();
    },
    //当前是第几页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getUserWrongQuestionList();
    },

    //全选按钮
    AllCheckbox() {
      // this.checkboxedNum = 0;
      if (!$(".AllCheckbox").hasClass("is-checked")) {
        $(".checkbox").addClass("is-checked").children(".el-checkbox__input").addClass("is-checked");
      } else {
        $(".checkbox").removeClass("is-checked").children(".el-checkbox__input").removeClass("is-checked");
      }
      if (this.checkboxedNum == $(".checkbox").length) {
        this.checkboxedNum = 0;
      } else {
        this.checkboxedNum = $(".checkbox").length;
      }
    },
    checkbox(index) {
      this.checkboxedNum = 0;
      setTimeout(() => {
        $(".checkbox").each((index, value) => {
          if (value.className == "el-checkbox checkbox is-checked") {
            this.checkboxedNum++;
          }
        });
        if (this.checkboxedNum == $(".checkbox").length) {
          $(".AllCheckbox").addClass("is-checked").children(".el-checkbox__input").addClass("is-checked");
          this.AllCheckboxs = true;
        } else {
          $(".AllCheckbox").removeClass("is-checked").children(".el-checkbox__input").removeClass("is-checked");
          this.AllCheckboxs = false;
        }
      }, 10);
    },

    opendetails(index) {
      $(".Learndetails").eq(index).slideToggle();
      if (this.open == false) {
        this.open = true;
        $(".icon")
          .eq(index)
          .removeClass("el-icon-caret-bottom")
          .addClass("el-icon-caret-top");
      } else if (this.open == true) {
        $(".icon")
          .eq(index)
          .addClass("el-icon-caret-bottom")
          .removeClass("el-icon-caret-top");
        this.open = false;
      }
    },
    watchparse(index) {
      $(".section")
        .eq(index)
        .css("background", "#FAFAFA")
        .siblings()
        .css("background", "#FFFFFF");
    },
    //选择册，调用错题本接口
    choiesVo(vid){
      this.volumeId = vid
      this.chapterId = 0
      this.chapterList = []
      this.volumeList.forEach((value,index)=>{
        if(value.id == vid){
          this.chapterList = value.chapterList
        }
      })
      var All = {
        id:0,
        name:'全部章'
      }
      this.chapterList = [All].concat(this.chapterList)
      this.chapterValue = '全部章'
      this.getUserWrongQuestionList()
    },
    //切换章节,调用错题本接口
    choiesVl(vid) {
      this.chapterId = vid;
      this.sectionId = 0
      this.sectionList = []
      this.chapterList.forEach((value,index)=>{
        if(value.id == vid){
          this.sectionList = value.sectionList
        }
      })
      var All = {
        id:0,
        name:'全部节'
      }
      this.sectionList = [All].concat(this.sectionList)
      this.sectionValue = '全部节'
      this.getUserWrongQuestionList()
    },
    //切换小节,调用错题本接口
    choiesSe(vid){
      this.sectionId = vid
      this.getUserWrongQuestionList()
    },
    //根据章节编号查找错题信息（默认显示全部错题信息）/userWrongQuestion/getWrongQuestionInfoByChapterId
    async getUserWrongQuestionList() {
      let res = await this.$api.get("/questionBook/getUserWrongQuestionList",{
          params: {
            volumeId:this.volumeId,
            chapterId: this.chapterId,
            sectionId:this.sectionId,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
        }
      );
      if (res.data.code == 1000) {
        this.WrongQuestion = res.data.data.questionList;
        this.total = res.data.data.totalNum;
      } else if (res.data.code == 2600) {
        this.WrongQuestionmessage = res.data.message;
        this.WrongQuestion = [];
      }
    },
    //获取用户在学册信息/course/getUserVolumeList
    async getUserVolumeList(){
      let res = await this.$api.get('/course/getUserCourseList')
      if(res.data.code == 1000){
        this.volumeList = res.data.data
        this.volumeValue = res.data.data[0].name
        this.volumeId = res.data.data[0].id

        this.chapterList = []
        this.volumeList.forEach((value,index)=>{
          if(value.id == this.volumeId){
            this.chapterList = value.chapterList
          }
        })
        var All = {
          id:0,
          name:'全部章'
        }
        this.chapterList = [All].concat(this.chapterList)
      }
    },
  },
  created() {
    this.volumeId = this.$route.query.volumeId;
    this.getUserVolumeList().then(()=>{
      this.getUserWrongQuestionList()
    })
    
  },
  mounted() {
    this.$nextTick(function () {
      if (!this.commonsVariable.isMathjaxConfig) {
          //判断是否初始配置，若无则配置。
          this.commonsVariable.initMathjaxConfig();
        }
        this.commonsVariable.MathQueue("section"); //传入组件id，让组件被MathJax渲染
    });
  },
  computed: {},
  watch: {
    WrongQuestion: function (val) {
      // console.log(val)
      this.$nextTick(function () {
      if (!this.commonsVariable.isMathjaxConfig) {
          //判断是否初始配置，若无则配置。
          this.commonsVariable.initMathjaxConfig();
        }
        this.commonsVariable.MathQueue("section"); //传入组件id，让组件被MathJax渲染
    });
    },
  },
};
</script>

<style lang="scss">
.wrongbook {
  .el-input__inner{
    border: 1px solid #cccccc;
  }
  .el-checkbox__inner{
    border-radius: 4px;
  }
  .Top {
    margin: 20px auto;
    width: 1000px;
    height: 56px;
    border-radius: 12px;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding: 19px 32px 21px;
    .title {
      font-size: 16px;
      color: #333333;
      font-weight: bold;
    }
    p {
      margin-left: 15px;
      font-size: 14px;
      color: #1a1a1a;
      display: flex;
      align-items: center;
    }
    .el-select {
      width: 156px;
      .el-input__inner {
        height: 28px;
      }
      .el-input__icon {
        line-height: 28px;
      }
    }
  }
  .min {
    margin: 20px auto 40px;
    width: 1000px;
    background: #ffffff;
    border-radius: 12px;
    .questionList {
      border-radius: 12px;
      .section {
        border-bottom: 1px dashed #e6e6e6;
        padding: 24px 32px 24px;
        position: relative;
        .questionName {
          display: flex;
          align-items: flex-start;
          .questionNamespan {
            font-size: 18px;
            color: #1a1a1a;
          }
          .questionNum {
            margin-left: 12px;
          }
        }
        .questionmsg {
          display: flex;
          align-items: center;
          margin-top: 23px;
          ul {
            display: flex;
            align-items: center;
            li {
              display: flex;
              align-items: center;
              height: 36px;
              background: rgba(40, 161, 255, 0.1);
              margin-right: 24px;
              padding: 0 12px;
              border-radius: 4px;
              span {
                color: #4d4d4d;
                font-size: 16px;
              }
            }
            li:nth-child(2){
              max-width: 220px;
              span:nth-child(1){
                width: 64px;
              }
              span:nth-child(2){
                max-width: 130px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
        .Learndetails {
          margin-top: 24px;
          .questionType {
            color: #333333;
            font-size: 16px;
            display: flex;
            flex-direction: column;
             .questionTypespan{
              font-size: 16px;
              line-height: 2;
            }
          }
          .answer {
            margin-top: 15px;
            margin-left: -7px;
            .answersapn1 {
              color: #4d4d4d;
              font-size: 16px;
              font-weight: bold;
            }
            span:nth-child(2) {
              color: #28a1ff;
              font-size: 18px;
              font-weight: bold;
              margin-left: 5px;
            }
            span:nth-child(3) {
              color: #28a1ff;
              font-size: 18px;
              font-weight: bold;
              margin-left: 5px;
            }
            span:nth-child(4) {
              color: #28a1ff;
              font-size: 18px;
              font-weight: bold;
              margin-left: 5px;
            }
            span:nth-child(5) {
              color: #28a1ff;
              font-size: 18px;
              font-weight: bold;
              margin-left: 5px;
            }
          }
          .parsing {
            margin-top: 15px;
            margin-left: -7px;
            // display: flex;
            // justify-content: space-between;
            overflow: hidden;
            .parsingspan1 {
              color: #4d4d4d;
              font-size: 16px;
              font-weight: bold;
              float: left;
              line-height: 2;
            }
            .parsingspan2 {
              max-width: 873px;
              font-size: 16px;
              color: #1a1a1a;
              line-height: 2;
              float: left;
            }
          }
        }
        .watchparse {
          position: absolute;
          top: 50%;
          margin-top: -16px;
          right: 32px;
          width: 96px;
          height: 32px;
          background: rgba(229, 241, 251, 1);
          border-radius: 16px;
          display: none;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          span {
            color: #28a1ff;
            font-size: 14px;
          }
          i {
            margin-left: 5px;
            color: #28a1ff;
          }
        }
      }
      .section:hover .watchparse{
        display: flex;
      }
      .wbBottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 32px;
        border-radius: 0 0 12px 12px;
        .wbBottom_left {
          display: flex;
          align-items: center;
          .AllCheckbox {
            color: #1a1a1a;
            font-size: 16px;
          }
          .CheckboxNum {
            color: #1a1a1a;
            font-size: 16px;
            margin-left: 15px;
          }
          .test {
            width: 80px;
            height: 32px;
            background: rgba(40, 161, 255, 1);
            border-radius: 8px;
            margin-left: 15px;
            line-height: 32px;
            text-align: center;
            font-size: 14px;
            color: #ffffff;
            cursor: pointer;
          }
        }
        .wbBottom_right {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .totalNum {
            font-size: 16px;
            color: #1a1a1a;
          }
          .divselect {
            width: 96px;
            height: 28px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(204, 204, 204, 1);
            border-radius: 4px;
            line-height: 28px;
            text-align: center;
            font-size: 14px;
            color: #1a1a1a;
            margin-left: 10px;
          }
          .el-pagination {
            margin-left: 10px;
          }
        }
      }
    }
    .Nowrong {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      padding: 32px 32px 23px;
    }
  }
  
}
</style>