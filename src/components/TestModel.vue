<template>
  <div @click="SeteffectTime()" class="testModel">
    <Top-List :name="name" :learnname="learnname">
      <div slot='volumename' v-if="volumeName != ''" class="volumeNames">{{'('+volumeName+')'}}</div>
    </Top-List>
    <div class="Testscores" v-show="showTestscores">你的答题结束了，答对了{{great}}空，答错了{{passNum}}空，你获得了{{Testscores}}分！！</div>
    <div class="dati">
      <div class="con">
        <div class="sj" v-if="questionList">
          <div class="listTyperadio questionType" v-if="singleChoiceList!=''">
            <h4 class="dati_title">一.单选题</h4>
            <!--（本大题共 {{listTyperadio.length}} 小题，{{radioqueestionNum}}个空，每空 {{EveryQuestionNum}}分，共 {{(radioqueestionNum*EveryQuestionNum).toFixed(1)}} 分）-->
            <div v-for="(itemlistTyperadio,index1) in singleChoiceList" :key="index1">
              <div class="di1" id="di1">
                <h5 class="title">
                  <span style="float: left;">{{index1+1}}.</span>
                  <span class="titleQuestion" v-html="itemlistTyperadio.question" :id="'di1'+index1"></span>
                </h5>
                <div class="xx" @click="elradio($event)">
                  <el-radio-group v-model="input.radio[itemlistTyperadio.id]" size="small">
                    <p class="p">
                      <el-radio label="A">
                        <span class="A">A</span>
                        <span v-html='itemlistTyperadio.option1'></span>
                      </el-radio>
                    </p>
                    <p class="p">
                      <el-radio label="B">
                        <span class="A">B</span>
                        <span v-html="itemlistTyperadio.option2"></span>
                      </el-radio>
                    </p>
                    <p class="p" v-if="itemlistTyperadio.option3!=''&&itemlistTyperadio.option3">
                      <el-radio label="C">
                        <span class="A">C</span>
                        <span v-html="itemlistTyperadio.option3"></span>
                      </el-radio>
                      <span></span>
                    </p>
                    <p class="p" v-if="itemlistTyperadio.option4!=''&&itemlistTyperadio.option4">
                      <el-radio label="D">
                        <span class="A">D</span>
                        <span v-html="itemlistTyperadio.option4"></span>
                      </el-radio>
                      <span></span>
                    </p>
                  </el-radio-group>
                </div>
                <div class="Answer" v-show="Showparse">答案:<span>{{itemlistTyperadio.answer}}</span></div>
                <div class="parse" v-show="Showparse"><span class="parsespan1">解析:</span><p class="parsespan2" v-html="itemlistTyperadio.parse==''?'无':itemlistTyperadio.parse"></p></div>
              </div>
            </div>
          </div>
          <div class="multipleChoiceQuestionList questionType" v-if="multipleChoiceQuestionList!=''">
            <h4 class="dati_title">二.多选题</h4>
            <div class="" v-for="(item,index) in multipleChoiceQuestionList" :key="index" >
              <h5 class="title">
                <span style="float: left;">{{index+1}}.</span>
                <span class="titleQuestion" v-html="item.question" :id="'di1'+index"></span>
              </h5>
              <el-checkbox-group v-model="input.radios[index]">
                  <el-checkbox label="A">
                    <span class="A">A</span>
                    <span v-html='item.option1'></span>
                  </el-checkbox>
                <el-checkbox label="B">
                  <span class="A">B</span>
                  <span v-html='item.option2'></span>
                </el-checkbox>
                <el-checkbox label="C">
                  <span class="A">C</span>
                  <span v-html='item.option3'></span>
                </el-checkbox>
                <el-checkbox label="D">
                  <span class="A">D</span>
                  <span v-html='item.option4'></span>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="listTypeInput questionType" v-if="completionList!=''">
            <div class="dierdati">
              <h4 class="dati_title">三.填空题</h4>
              <div v-for="(itemlistTyperadio,index2) in completionList" :key="index2">
                <div class="di3">
                   <span style="float: left;">{{index2+1}}.</span>
                   <span style="position: relative;top: -6px;"
                  v-html="itemlistTyperadio.question"
                  @click="ClickOn($event)"
                  :id="'di3'+index2"
                  class="inputquestion"></span>
                </div>
                <div class="parse" v-show="Showparse"><span class="parsespan1">解析:</span><p class="parsespan2" v-html="itemlistTyperadio.parse==''?'无':itemlistTyperadio.parse"></p></div>
              </div>

            </div>
          </div>
          <div class="listTypeMis questionType" v-if="judgmentQuestionList">
            <div class="disandati">
              <h4 class="dati_title">四.判断题</h4>
              <div class="di5" id="di5" v-for="(itemlistTyperadio,index3) in judgmentQuestionList" :key="index3">
                <h5 class="title">
                  <span style="float: left;">{{index3+1}}.</span>
                  <span v-html="itemlistTyperadio.question" :id="'di5'+index3"></span>
                </h5>
                <div class="xx">
                  <el-radio-group
                    v-model="input.trueOrfalse[itemlistTyperadio.id]"
                    size="small"
                  >
                  <p class="p">
                      <el-radio label="A">
                        <span class="A">A</span>
                        正确
                      </el-radio>
                    </p>
                    <p class="p">
                      <el-radio label="B">
                        <span class="A">B</span>
                        错误
                      </el-radio>
                    </p>
                  </el-radio-group>
                </div>
                <div class="Answer" v-show="Showparse">答案:<span>{{itemlistTyperadio.answer}}</span></div>
                <div class="parse" v-show="Showparse"><span class="parsespan1">解析:</span><p class="parsespan2" v-html="itemlistTyperadio.parse==''?'无':itemlistTyperadio.parse"></p></div>
              </div>
            </div>
          </div>
        </div>
        <div class="sj nonesj" v-else>{{mes}}</div>
        <div class="dtk" @click.stop>
          <div class="dtk_top">
            <i></i>
            <span>答题卡</span>
          </div>
          <div class="dtk_con">
            <div v-if="singleChoiceList!=''">
              <h4 class="dati_title">一.单选题</h4>
              <div class="dtk_xx">
                <a class="span1 xx_span1"
                  v-for="(itemlistTyperadio,index1) in singleChoiceList"
                  :key="index1"
                  :class="input.radio[itemlistTyperadio.id]==null?'':'color1' + ' '+itemlistTyperadio.id"
                  :href="'#di1'+index1"
                  :title="'点击跳到选择题的第'+(index1+1)+'题'"
                >{{index1+1}}</a>
              </div>
            </div>
            <div v-if="multipleChoiceQuestionList!=''">
              <h4 class="dati_title" style="margin-top: 15px;">二.填空题</h4>
              <div class="dtk_xx">
                <a
                  v-for="(itemlistTyperadio,index2) in multipleChoiceQuestionList"
                  :key="index2"
                  class="span1 xx_span1"
                  :href="'#di3'+index2"
                  :title="'点击跳到填空题的第'+(index2+1)+'题'"
                  :class="(input.radios[index2]==null||input.radios[index2]=='')?'':'color1'+ ' '+ index2"
                >{{index2+1}}</a>
              </div>
            </div>
            <div v-if="completionList!=''">
              <h4 class="dati_title" style="margin-top: 15px;">三.填空题</h4>
              <div class="dtk_xx">
                <a
                  v-for="(itemlistTyperadio,index2) in completionList"
                  :key="index2"
                  class="span1 xx_span1"
                  :href="'#di3'+index2"
                  :title="'点击跳到填空题的第'+(index2+1)+'题'"
                  :class="(input.input1[itemlistTyperadio.id]==null||input.input1[itemlistTyperadio.id]=='')?'':'color1'+ ' '+itemlistTyperadio.id"
                >{{index2+1}}</a>
              </div>
            </div>
            <div v-if="judgmentQuestionList!=''">
              <h4 class="dati_title" style="margin-top: 15px;">四.判断题</h4>
              <div class="dtk_xx">
                <a class="span1 xx_span5"
                  v-for="(itemlistTyperadio,index3) in judgmentQuestionList"
                  :class="input.trueOrfalse[itemlistTyperadio.id]==null?'':'color1'+ ' '+itemlistTyperadio.id"
                  :key="index3"
                  :href="'#di5'+index3"
                  :title="'点击跳到判断题的第'+(index3+1)+'题'"
                >{{index3+1}}</a>
              </div>
            </div>
          </div>
          <div class="dtk_bottom" v-if="questionList!=''">
            <div class="time">
              <i style="margin-right:8px;"></i>
              <span>{{timemin}}</span>
              <span>:</span>
              <span>{{timesec}}</span>
            </div>
            <div style="margin-left:15px;" @click="submit()">
              <span id="jiaojun">交卷</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-backtop class=".page-component__scroll .el-scrollbar__wrap" title="点击回到顶部"></el-backtop>
    <Keybord
      class="Keyborder"
      :fieldId="fieldId"
      :latexId="latexId"
      v-show="showKeyCode"
      showKeyCode.sync="showKeyCode"
    />
  </div>
</template>

<script>
import TopList from "./comment/Top";
import Keybord from "./comment/Keybord";
import { getContentHtml } from "./globalVariable/getquestion";
import { getUserAnswer } from "./globalVariable/Submitanswer";
export default {
  components: { TopList, Keybord},
  name: "TestModel",
  data() {
    return {
      showKeyCode: false,//软键盘的显示
      sectionId: "", //节id
      name: "",
      learnname: "退出检测",
      questionList: [],
      answer: {
        input1: [],
        input2: [],
        input3: [],
        input4: [],
        input5: [],
        input6: [],
        input7: [],
        input8: [],
        input9: [],
        input10: [],
        radio: [],
        trueOrfalse: [],
        radios:{}
      },
      quizResult: [],
      result: true,
      input: {
        input1: [],
        input2: [],
        input3: [],
        input4: [],
        input5: [],
        input6: [],
        input7: [],
        input8: [],
        input9: [],
        input10: [],
        radio: [],
        trueOrfalse: [],
        radios:{}
      },
      passNum: 0, //错误次数
      great: 0, //正确次数
      timer: null,
      timemin: "00",
      timesec: "00",
      Testscores: 0, //分数
      Totalquestion: 0, //总题数
      radioqueestionNum: 0, //每一类题型有多少空并计算所有体型总数
      InputqueestionNum: 0,
      MisquestionNum: 0,
      submitflage: true,
      scrollTop: "",
      EveryQuestionNum: "", //每一空多少分
      IntoTime: new Date().getTime(), //进入页面时的时间戳
      NewTime: new Date().getTime(), //每一次点击的当前时间戳
      LastTime: "", //上一次点击的时间戳
      EndTime: "", //提交试卷时的时间戳
      TotalTime: "", //计算两次点击时间间隔超过30s的总无效时长
      latexId: "",
      fieldId: "",
      Showparse:false,//提交试卷解析显示
      showTestscores:false,//检测答题得分显示
      questionId:'',//测试小题信息
      courseId:'',//测试id，小节测试则为小节id，本章测试则为章id，本书测试为册id
      volumeName:'',
      progress:'',//用于本书检测出现20%等情况


      singleChoiceList:[], //单选题
      completionList: [], //填空题
      judgmentQuestionList: [], //判断题
      multipleChoiceQuestionList:[],//多选题
      // userId:'',
      mes:'',
    };
  },
  methods: {
    //questionType 单选1   判断2     填空3     多选4
    elradio(e) {
      if ($(e.target).hasClass("p")) {
        $(e.target).find("label.el-radio").addClass("is-checked");
      } else if ($(e.target).has("span")) {
        $(e.target).siblings("label.el-radio").addClass("is-checked");
      }
    },
    ClickOn(e) {
      if ($(e.target).hasClass("optionDiv")) {
        // console.log(e.target.getBoundingClientRect().top,e.target.getBoundingClientRect().left,document.documentElement.scrollTop)
        e.stopPropagation();
        $('.optionDiv').removeClass('fouce')
        $(e.target).addClass('fouce')
        $(".keybord").css({
          top:document.documentElement.scrollTop+e.target.getBoundingClientRect().top+$(".keybord").height() * 0.5 -114,
          left: e.target.getBoundingClientRect().left- $(".keybord").width()/2+8,
        });
        this.showKeyCode = true;
        this.latexId = $(e.target).siblings("code").attr("id");
        this.fieldId = $(e.target).children("div").attr("id");
      }else if ($(e.target).closest("div").hasClass("mq-math-mode")) {
        this.showKeyCode = true;
        $(".keybord").css({
          top:document.documentElement.scrollTop+e.target.getBoundingClientRect().top+$(".keybord").height() * 0.5 -114,
          left: e.target.getBoundingClientRect().left- $(".keybord").width()/2+8,
        });
        $(".optionDiv").removeClass("fouce");
        $(e.target).closest("div").parent().addClass("fouce");
        this.latexId = $(e.target).closest("div").parent().siblings("code").attr("id");
        this.fieldId = $(e.target).closest("div").attr("id");
        this.ValueIndex = $(e.target).closest("div").parent().siblings("code").attr("id");
        e.stopPropagation();
      }
    },
    //计算有效时间
    SeteffectTime() {
      getUserAnswer(this.input, this.completionList);
      if (!$(event.target).hasClass("keybord") && this.showKeyCode) {
        this.showKeyCode = false;
        $('.optionDiv').removeClass('fouce')
      }
      this.LastTime = this.NewTime;
      this.NewTime = new Date().getTime();
      if (this.NewTime - this.LastTime > 60000) {
        //计算无效时间的总和
        this.TotalTime += this.NewTime - this.LastTime;
      }
    },
    //获取本节检测试题列表getSectionQuestionList
    async getSectionQuestionList() {
      let res = await this.$api.get("studyFlow/findSectionQuestionnaireBySectionId", {
        params: { sectionId: this.sectionId },
      });
      if (res.data.code == 200) {
        res.data.data.forEach((value,index)=>{
          if(value.questionType==1){
            this.singleChoiceList = value.questionList
          }else if(value.questionType==2){
            this.judgmentQuestionList = value.questionList
          }else if(value.questionType==3){
            this.completionList = value.questionList
          }else if(value.questionType==4){
            this.multipleChoiceQuestionList = value.questionList
          }
          value.questionList.forEach((value,index)=>{
            this.questionList.push(value)
          })
        })
        for(const index in this.multipleChoiceQuestionList){
          this.$set(this.input.radios,index, [])
        }
      }else{
        this.mes = res.data.mes
      }
    },
    // 计算本节测试的答题结果
    async computeSectionQuizResult() {
      let res = await this.$api.get("/studyFlow/saveUserSectionCheckResult",{
        params:{
          sectionId:this.sectionId,
          score:this.Testscores,
          checkTime:parseInt((this.EndTime - this.IntoTime) / 1000)
        }
      });
      if (res.data.code === 200) {
        this.$message.success({
          message: "交卷成功！",
        });
      } else {
        this.$message.error({
          message: "交卷出现错误！！",
        });
      }
    },

    //交卷按钮
    submit() {
      this.EndTime = new Date().getTime();
      this.effectTime = parseInt(
        (this.EndTime - this.IntoTime - this.TotalTime) / 1000
      );
      $('.spanAnswer').show()
      // console.log('有效时长',this.effectTime)
      //获取用户的答案
      getUserAnswer(this.input, this.completionList);
      if (this.submitflage) {//提交之后不能再次提交
        this.submitflage = false;
        for (let i = 0; i < this.questionList.length; i++) {
          let questionId = this.questionList[i].id
          if (this.questionList[i].questionType == 3) {
            var optionArr = this.questionList[i].question.split('inputMath')
            var index = 0;
            for(let j = 0; j < optionArr.length-1; j ++){
              var inputs = 'input' + (j+1)
              if (this.input[inputs][questionId] !='' && this.answer[inputs][questionId].indexOf(this.input[inputs][questionId])!=-1) {
                this.great++;
                $("a"+"." + questionId).addClass("right");
                $('.inputMath'+'.'+questionId).eq(j).addClass("rightBorder");
              } else if(this.input[inputs][questionId] == '' || this.answer[inputs][questionId].indexOf(this.input[inputs][questionId])==-1){
                this.passNum++;
                index ++
                $("a"+"." + questionId).addClass("worng");
                $('.inputMath'+'.'+questionId).eq(j).addClass("worngBorder");
              }
            }
            if(index==0){
              this.result = true
              this.quizResult.push({questionId: questionId,result: this.result,});
            }else{
              this.result = false
              this.quizResult.push({questionId: questionId,result: this.result,});
            }
          } else if (this.questionList[i].questionType == 1) {
            if (this.input.radio[questionId] == this.answer.radio[questionId]) {
              this.great++;
              this.result = true;
              $("a"+"." + questionId).addClass("right");
            } else {
              this.passNum++;
              this.result = false;
              $("a"+"." + questionId).addClass("worng");
            }
            this.quizResult.push({questionId: questionId,result: this.result,});
          } else if (this.questionList[i].questionType == 2) {
            console.log(questionId);
            console.log(this.input);
            console.log(this.answer);
            if (this.input.trueOrfalse[questionId] == this.answer.trueOrfalse[questionId]) {
              console.log("正确");
              this.great++;
              this.result = true;
              $("a"+"." + questionId).addClass("right");
            } else {
              console.log("错误");
              this.passNum++;
              this.result = false;
              $("a"+"." + questionId).addClass("worng");
            }
            this.quizResult.push({questionId: questionId,result: this.result,});
          } else if(this.questionList[i].questionType == 4){
            var index = 0
            this.input.radios[index].sort((a,b)=>a.localeCompare(b))
            if(this.input.radios[index].join(',') == this.answer.radios[index]){
              this.great++;
              this.result = true;
              $("a"+"." + index).addClass("right");
            }else{
              this.passNum++;
              this.result = false;
              $("a"+"." + index).addClass("worng");
            }
            index ++
            this.quizResult.push({questionId: questionId,result: this.result,});
          }
        }
        this.Testscores = parseInt(this.great * (100 / this.Totalquestion));
        this.timestamp = new Date().getTime();
        this.calculateDiffTime(this.timestamp, this.startTime).then(() => {
           if (this.type == 5) {
            //   提交小节答题接口
            this.computeSectionQuizResult().then(() => {
              this.ShowPoints();
              this.Showparse=true
            });
          }
        });
        //清除计时器，停止计时
        clearInterval(this.timer);
        this.timer = null;
        this.submitThenGoTop()
      } else {
        return false;
      }
    },
    //获取不同的题型和答案
    getQuestionList() {
      for (let i = 0; i < this.questionList.length; i++) {
        let questionId = this.questionList[i].id
        if(this.questionList[i].collectStatus!=undefined){
          this.collectList[questionId] = this.questionList[i].collectStatus
        }
        // 提取单选题
        if (this.questionList[i].questionType == 1) {
          this.radioqueestionNum++;
          this.answer.radio[questionId] = this.questionList[i].answer;
        }
        // 判断题
        if (this.questionList[i].questionType == 2) {
          this.answer.trueOrfalse[questionId] = this.questionList[i].answer;
          this.MisquestionNum++;
        }
        //提取填空题
        if (this.questionList[i].questionType == 3) {
          this.questionList[i].question = getContentHtml(this.questionList[i],questionId,false);
          var optionArr = this.questionList[i].question.split('inputMath')
          for(let j = 0;j<optionArr.length-1;j++){
            let inputs = 'input' + (j+1)
            let options = 'option' + (j+1)
            this.answer[inputs][questionId] = this.questionList[i][options];
            this.answer[inputs][questionId] = this.answer[inputs][questionId].replace(/[(]/g,'\\left(')
            this.answer[inputs][questionId] = this.answer[inputs][questionId].replace(/[)]/g,'\\right)')
            this.InputqueestionNum++;
          }
        }
        // 提取多选题
        if (this.questionList[i].questionType == 4) {
          this.radioqueestionNum++;
          var index = 0
          this.answer.radios[index] = this.questionList[i].answer;
          index ++
        }
      }
      this.Totalquestion =this.radioqueestionNum + this.InputqueestionNum + this.MisquestionNum; //计算所有空的个数
      this.EveryQuestionNum = (100 / this.Totalquestion).toFixed(1);//计算每一空的分数
    },
    // 计算时间 将时间戳转为多少秒
    async calculateDiffTime(start_time, end_time) {
      // console.log(start_time,end_time)
      var startTime = 0,
        endTime = 0;
      if (start_time < end_time) {
        startTime = start_time;
        endTime = end_time;
      } else {
        startTime = end_time;
        endTime = start_time;
      }
      var timeDiff = parseInt((endTime - startTime) / 1000); //相差时间戳除以1000之后用于计算
      // var hour = Math.floor(timeDiff / 36000); //小时
      // var minute = Math.floor(timeDiff / 6000); //分钟
      var second = (await timeDiff) % 60; //秒数
      this.effectTime = timeDiff;
    },
    //提交试卷之后回到顶部查看分数和分析
    submitThenGoTop(){
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    // 保存滚动值，这是兼容的写法
    handleScroll() {
      this.scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    },
    //答题结果的显示
    ShowPoints() {
      if (this.Testscores < 90) {
        this.showTestscores = true
        $(".Testscores").addClass("worng");
      } else {
        this.showTestscores = true
      }
      window.scroll({
        top: 0,
      });
    },
    //计时器
    Question() {
      if (this.questionList != "") {
        this.timer = setInterval(() => {
          if (this.timesec <= 60) {
            this.timesec++;
            if (this.timesec == 60) {
              this.timesec = 0;
              this.timemin++;
              this.timemin = `${
                this.timemin < 10 ? "0" + this.timemin : this.timemin
              }`;
            }
          }
          this.timesec = `${
            this.timesec < 10 ? "0" + this.timesec : this.timesec
          }`;
        }, 1000);
      }
    },
    getMath(){
      this.$nextTick(function () {
        //这里要注意，使用$nextTick等组件数据渲染完之后再调用MathJax渲染方法，要不然会获取不到数据
        if (!this.commonsVariable.isMathjaxConfig) {
          //判断是否初始配置，若无则配置。
          this.commonsVariable.initMathjaxConfig();
        }
        //传入组件id，让组件被MathJax渲染
        this.commonsVariable.MathQueue("di1");
        this.commonsVariable.MathQueue('p')
        this.commonsVariable.MathQueue('di3')
        this.commonsVariable.MathQueue("di5");
        this.commonsVariable.MathQueue("parse");
      });
    },
  },
  created() {
    if (this.$route.query.type==5) {
      this.sectionId = parseInt(this.$route.query.sectionId);
      this.type = this.$route.query.type
      this.volumeName = this.$route.query.sectionName
      // this.userId = this.$route.query.userId
      this.deviceType = 4
      this.name = "本节检测";
      this.getSectionQuestionList()
        .then(() => {
          this.getQuestionList();
        })
        .then(() => {
          this.Question();
        });
    }
  },
  mounted() {
    this.getMath()
    window.addEventListener("scroll", this.handleScroll, true);
    if(document.documentElement.clientHeight<800){
      $('.dtk').height(500).css('overflow-y','auto')
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
    // 离开该页面需要移除这个监听的事件，不然会报错
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    //监听答题卡的位置变化
    scrollTop: (val) => {
      if($('.bookTestDetail').is(':visible') && $('.Testscores').is(':visible')){
        if(val >= $('.bookTestDetail').height()+$('.Testscores').height()+100){
          $(".dtk").css({top: val - $('.bookTestDetail').height()-$('.Testscores').height()-190 + "px",});
        }else{
          $(".dtk").css({top: 0 + "px",});
        }
      }else if($('.bookTestDetail').is(':visible')==false && $('.Testscores').is(':visible')){
        if(val >= $('.Testscores').height()+100){
          $(".dtk").css({top: val - $('.Testscores').height() - 120 + "px",});
        }else{
          $(".dtk").css({top: 0 + "px",});
        }
      }else if($('.bookTestDetail').is(':visible') && $('.Testscores').is(':visible')==false){

        if(val >= $('.bookTestDetail').height()+100){
          $(".dtk").css({top: val - $('.bookTestDetail').height() - 150 + "px",});
        }else{
          $(".dtk").css({top: 0 + "px",});
        }
      }else if($('.bookTestDetail').is(':visible')==false && $('.Testscores').is(':visible')==false){
        if(val >= 100){
          $(".dtk").css({top: val-80 + "px",});
        }else{
          $(".dtk").css({top: 0 + "px",});
        }
      }
    },
    //当questionList不为空的时候渲染公式
    questionList:function(){
      this.getMath()
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.testModel {
  min-height: 100%;
  overflow: hidden;
  background: #f2f2f2;
  .di1,.p,.di3,.di5,.parse{
    opacity: 0;
  }
  .Answer{
    margin-top:24px;
    font-size:14px;
    color:#999;
    span{
      color: #0dcd95;
      margin-left: 8px;
    }
  }
  .parse{
    margin-top: 8px;
    font-size:14px;
    overflow: hidden;
    .parsespan1{
      color:#999;
      float: left;
    }
    .parsespan2{
      color:#0dcd95;
      line-height: 160%;
      float: left;
      max-width: 600px;
      margin-left: 8px;
    }
  }
  .listTyperadio{
    .dati_title{
      margin-bottom: 32px;
    }
  }
  .multipleChoiceQuestionList{
    margin-top: 40px;
    .title{
      margin-bottom: 24px;
    }
    .el-checkbox-group{
      display: flex;
      flex-wrap: wrap;
      .el-checkbox{
        flex:1;
        .el-checkbox__input{
          display: none;
        }
        .el-checkbox__label{
          span{
            color: #1a1a1a;
          }
          .A{
            display: inline-block;
            width: 0.64rem;
            height: 0.64rem;
            background: #cccccc;
            border-radius: 50%;
            text-align: center;
            line-height: 0.64rem;
            font-size: 0.426667rem;
            font-weight: bold;
            color: #ffffff;
            margin-right: 0.213333rem;
          }
        }
      }
      .is-checked{
        .el-checkbox__label{
          .A{
            background: #28a1ff;
          }
        }
      }
    }
  }
  .listTypeInput{
    margin-top: 40px;
    .dati_title{
      margin-bottom: 32px;
    }
    .di3{
      margin-top: 32px;
    }
  }
  .el-backtop{
    background: url('../assets/normal@2x.png');
    background-size: 100% 100%;
    box-shadow:none;
    .el-icon-caret-top{
      display: none;
    }
  }
  .el-backtop:hover{
    background: url('../assets/click@2x.png');
    background-size: 100% 100%;
  }
  .keybord::after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-top: 10px solid #ffffff !important;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent !important;
    border-left: 10px solid transparent;
    top: 100% !important;
    left: 50%;
    margin-left: -5px;
    display: none;
  }
  .nonesj {
    font-size: 18px;
    text-align: center;
    line-height: 127px;
    font-weight: bold;
    color: #4d4d4d;
  }
  input {
    font-size: 14px;
  }
  .Testscores {
    width: 1000px;
    margin: 20px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background: #0dcd95;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
  }

  .el-radio-group {
    display: flex;
    align-items: center;
    p {
      margin-right: 30px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      flex: 1;
    }
  }
  .el-radio {
    margin-right: 0;
    .A {
      display: inline-block;
      width: 24px;
      height: 24px;
      background: #cccccc;
      border-radius: 50%;
      text-align: center;
      line-height: 24px;
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
      margin-right: 8px;
    }
  }
  .el-radio__input.is-checked + .el-radio__label .A {
    background: #28a1ff;
  }
  .el-radio__input.is-checked+.el-radio__label {
    color: #1a1a1a;
}
  .el-radio__label {
    padding: 0;
    font-size: 18px;
    color: #1a1a1a;
    display: flex;
    align-items: center;
    img{
      max-width: 230px;
    }
  }
  .el-radio__input {
    display: none;
  }
  .di3 {
    .spanAnswer{
      display: inline-block;
      color: #0dcd95;
      margin:0 8px;
    }
    .optionDiv {
      //width: 150px;
      height: 36px;
      background: rgba(255, 255, 255, 1);
      border: 0;
      padding: 0 8px 0px 8px;
      border: 1px #ccc solid;
      display: inline-block;
      position: relative;
      border-radius: 4px;
      margin:0 8px;
      .mq-editable-field{
        box-shadow: none;
        font-size: 100%;
        position: relative;
        top: -3px;
        outline: none;
        border: 0;
      }
    }
    .fouce{
      border:1px solid rgba(40, 161, 255, 1) !important;
    }
    input {
      width: 100px;
      height: 36px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(204, 204, 204, 1);
      border-radius: 4px;
      padding: 0 8px;
      outline: #28a1ff;
      font-size: 16px;
      margin: 0 8px;
    }
    input:focus{
      border:1px solid rgba(40, 161, 255, 1) ;
    }
  }

  .time {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-radio-button {
    border: none !important;
  }
  .el-radio-group {
    font-size: 18px !important;
    display: flex;
    flex-wrap: wrap;
    p {
      cursor: pointer;
    }
  }
  .con {
    width: 1000px;
    margin: 0 auto 40px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  .con_right {
    float: right;
    height: 60px;
  }

  .fanhui {
    width: 80px;
    height: 32px;
    background: rgba(36, 147, 232, 1);
    border-radius: 16px;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    line-height: 32px;
    margin-top: 13px;
  }
  .dtk_con {
    margin-top: 23px;
    margin-bottom: 50px;
  }
  .dati {
    width: 100%;
    padding-top: 20px;
  }

  .sj {
    padding: 32px;
    width: 746px;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    overflow: hidden;
    min-height: 400px;
    .questionType:first-child{
      margin-top: 0 !important;
    }
  }

  .dtk {
    width: 238px;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    padding: 32px;
    position: absolute;
    top: 0;
    right:0;
    // height: 780px;
  }

  .dati_title {
    font-size: 18px;
    color: #4d4d4d;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .di1 {
    margin-top: 32px;
  }

  .title {
    font-size: 18px;
    font-weight: 400;
    color: #262626;
    line-height: 1.5;
    .titleQuestion{
      img{
        max-width: 680px;
      }
    }
  }

  .xx {
    margin-top: 32px;
    margin-left: 10px;
  }

  .xx ul {
    list-style: none;
  }

  .xx ul li {
    float: left;
    margin-left: 39px;
  }

  .xx ul li:nth-child(1) {
    margin-left: 0;
  }

  .color1 {
    background: #28a1ff !important;
  }

  .di1 .xx ul li:hover .span1 {
    background: #28a1ff !important;
  }

  .span1 {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    line-height: 24px;
    text-align: center;
    background: #cccccc;
    color: #ffffff;
    margin-right: 8px;
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 12px;
  }

  .span2 {
    display: inline-block;
    margin-left: 10px;
    color: #262626;
  }

  .di2 {
    margin-top: 80px;
  }

  .dtk_top {
    margin: 0px auto 0;
    height: 40px;
    padding: 0 20px;
    border-bottom: 1px dashed rgba(230, 230, 230, 1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dtk_top i {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url("../assets/images/basic_learn_img/test_icon_answersheet.png");
  }

  .dtk_top span {
    font-size: 18px;
    color: #4d4d4d;
    font-weight: bold;
    display: inline-block;
    position: relative;
    top: -3px;
    left: 5px;
  }

  .dtk_xx {
    margin-top: 15px;
  }

  .xx_span2,
  .xx_span4,
  .xx_span6 {
    margin-left: 20px;
  }

  .di3 {
    color: #262626;
    font-size: 18px;
    font-weight: 400;
    display: flex;
    width: 100%;
    .inputquestion{
      max-width: 670px;
      img{
        max-width: 670px;
      }
    }
    .answer-result {
      margin-top: 0px !important;
    }
    .border{
      border-radius: 4px;
    }
  }
  .fanhui {
    cursor: pointer;
  }

  .disandati {
    margin-top: 24px;
  }

  .di5 {
    margin-top: 24px;
  }

  .dtk_bottom {
    padding: 0 32px;
    // position: absolute;
    // bottom: 0;
    // left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .time i {
    display: inline-block;
    width: 32px;
    height: 32px;
    background: url("../assets/images/basic_learn_img/test_icon_clock.png");
  }

  .time span {
    font-size: 16px;
    font-family: "Arial";
    font-weight: bold;
    color: rgba(40, 161, 255, 1);
    display: inline-block;
  }

  #jiaojun {
    width: 80px;
    height: 40px;
    background: linear-gradient(
      90deg,
      rgba(255, 201, 98, 1),
      rgba(255, 172, 40, 1)
    );
    border-radius: 20px;
    display: inline-block;
    line-height: 40px;
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  .right {
    background: #0dcd95 !important;
  }
  .rightBorder {
    border: 1px solid #0dcd95 !important;
    box-shadow: 0px 0px 3px 0px #0dcd95;
  }
  .worng {
    background: #ff5757 !important;
  }
  .worngBorder {
    border: 1px solid #ff5757 !important;
    box-shadow: 0px 0px 3px 0px #ff5757;
  }
  .volumeNames{
    font-weight: bold;
    margin-left: 4px;
  }
}
</style>
