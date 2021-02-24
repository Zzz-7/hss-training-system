<template>
  <div class="collection" :class="collectList? 'isCollection' : ''" @click="btnCollection($event)">
    <i class="icon_collection" :class="collectList? 'icon_collection_shi' : ''"></i>
    <span :class="collectList? 'icon_collection_span' : ''">{{ collectList?'已收藏':"收藏" }}</span>
  </div>
</template>

<script>
export default {
  props: ["questionId", "deviceType", "courseId", "titleId", "collectList"],
  data() {
    return {
      
    };
  },
  methods: {
    //收藏和取消收藏
    btnCollection(e){
      if (this.collectList == true) {
        this.cancelCollectQuestion()
      }else{
        this.collection()
      }
      e.stopPropagation();
    },
    //收藏题目/questionBook/collectQuestion
    async collection() {
      let res = await this.$api.get("/questionBook/collectQuestion", {
        params: {
          questionId: this.questionId,
          titleId: this.titleId == undefined ? null : this.titleId,
          deviceType: this.deviceType,
          courseId: this.courseId,
        },
      }).then((res)=>{
        this.$emit("update:collectList", true);
        this.$message('已收藏')
      }).catch((err)=>{
        this.$message('收藏失败，该题可能还不在题库中哦！')
      });
    },
    //取消收藏/questionBook/cancelCollectQuestion
    async cancelCollectQuestion(){
      let res = await this.$api.get('/questionBook/cancelCollectQuestion',{
        params:{questionId:this.questionId}
      }).then((res)=>{
        this.$emit("update:collectList", false);
        this.$message('取消收藏成功！')
      }).catch((err)=>{
        this.$message('取消收藏失败！')
      });
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>

.collection {
  top: 0;
  left: 0;
  box-shadow: 0px 0px 8px 0px #d3cece;
  background: #fff;
  position: fixed;
  height: 50px;
  width: 120px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon_collection {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url("../../assets/images/FunctionCenter/select.png");
    background-size: 100% 100%;
    margin-right: 8px;
  }
  .icon_collection_shi {
    background: url("../../assets/images/FunctionCenter/select_collection.png");
    background-size: 100% 100%;
  }
  span {
    display: inline-block;
    font-size: 18px;
    color: #666;
  }
  .icon_collection_span{
    color: #28a1ff;
  }
}
.collection::after {
  content: "";
  position: absolute;
  border-bottom: 10px solid #ffffff;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid transparent;
  top: -20px;
}
.collection:hover span {
  color: #28a1ff;
}
.isCollection{
  border: 1px solid #28a1ff;
}
</style>