<template>
  <div class="bookTestDetail">
    <h3 class="answerAnalyze">
      <i class="icon_Analyze"></i>
      <span class="name_Analyze">答题分析</span>
    </h3>
    <p class="charpterName">{{type==4?'节名称':'章名称'}}</p>
    <div class="analyzeDetail">
        <div class="contentList">
            <p class="charpterTestMsg" v-for="(item,index) in testBookDetail" :key="index">
               <span class="isCharpterName" :title="item.chapterName || item.sectionName">{{item.chapterName || item.sectionName}}</span>
               <span class="testEfficiency" :style="{width:item.accuracy/100*630+'px'}" :class="item.accuracy>=90?'greatTest':'failingTest'">{{item.accuracy}}</span>
            </p>
        </div>
    </div>
    <p class="masterDeep">
      <span class="point" v-for="(item, index) in masterList" :key="index">{{item}}</span>
      <span class="deepMsg">掌握程度</span>
    </p>
  </div>
</template>

<script>
export default {
    props:['testBookDetail','type'],
  data() {
    return {
      masterList: [0, 25, 50, 75, 100],
    };
  },
};
</script>

<style lang="scss" scoped>
.bookTestDetail {
  width: 1000px;
//   height: 500px;
  background: #ffffff;
  border-radius: 12px;
  margin: 20px auto 0;
  padding: 24px 32px;
  overflow: hidden;
  .answerAnalyze {
    display: flex;
    align-items: center;
    .icon_Analyze {
      background: url("../../assets/images/FunctionCenter/icon_analyse.png");
      width: 24px;
      height: 24px;
      background-size: 100% 100%;
      margin-right: 8px;
    }
    .name_Analyze {
      color: #4d4d4d;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .charpterName {
    color: #4d4d4d;
    font-weight: bold;
    font-weight: 14px;
    margin: 28px 0 0 130px;
  }
  .analyzeDetail {
    padding: 0 56px 0 180px;
    width: 100%;
    overflow: hidden;
    .contentList{
        background: #FAFAFA;
        padding:20px 0px 10px 0px ;
        .charpterTestMsg{
            position: relative;
            margin-bottom: 26px;
            display: flex;
            height: 24px;
            text-align: center;
            .isCharpterName{
                width: 9em;
                position: absolute;
                top: 0px;
                line-height: 24px;
                left: -136px;
                text-align: right;
                font-size: 14px;
                color: #1a1a1a;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .testEfficiency{
                display: inline-block;
                border-radius: 0 12px 12px 0;
                padding-right: 12px;
                text-align: right;
                line-height: 24px;
                color: #FFFFFF;
                font-size: 16px;
                font-family: Arial;
                max-width: 630px;
            }
            .greatTest{
                background: #0DCE95;
            }
            .failingTest{
                background: #FF5858;
            }
        }
        .charpterTestMsg:last-child{
            margin: 0;
        }
    }
  }
  .masterDeep {
    margin-top: 15px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    span {
      flex: 1;
      text-align: center;
      font-size: 18px;
      color: #4d4d4d;
      font-family: Arial;
      text-align: right;
    }
    .deepMsg{
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        flex: 0.8;
    }
  }
}
</style>