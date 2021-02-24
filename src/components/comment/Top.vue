<template>
  <div class="top">
    <div class="con">
      <div class="con_left">
        <div v-show="false">学习中心</div>
        <div v-show="false"></div>
        <div style="font-weight:bold;">{{name}}</div>
        <slot name="volumename"></slot>
      </div>
      <div class="con_right">
        <div class="tuichu" @click="exitLearn($event)">{{learnname}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "learnname"],
  data() {
    return {};
  },
  methods: {
    //退出
    exitLearn(e) {
      e.stopPropagation();
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 60px;
  background: rgba(40, 161, 255, 1);

  .con {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .con_left {
    height: 60px;
    display: flex;
    align-items: center;
  }

  .con_left div {
    color: #ffffff;
    font-size: 16px;
  }

  .con_left div:nth-child(2) {
    width: 16px;
    height: 16px;
    background: url("../../assets/images/test_icon_back.png");
    margin: 2px 5px 0;
    background-size:100%;
  }

  .con_right {
    height: 60px;
    display: flex;
    align-items: center;
  }

  .tuichu {
    width: 80px;
    height: 32px;
    background: rgba(36, 147, 232, 1);
    border-radius: 16px;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
  }
}
</style>
