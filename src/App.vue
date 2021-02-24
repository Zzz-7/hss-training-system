<template>
  <div id="app" ><!---@mouseenter="isLogin($event)"-->
    <router-view />
    <el-backtop class=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isTime: new Date().getTime(),
      clickTime: null,
    };
  },
  methods: {
    //当鼠标点击或者在当页面时，获取时间戳
    isLogin(e) {
      if($(e.target).children().hasClass('Login')){
        return false
      }else{
        this.clickTime = new Date().getTime();
      }
    },
  },
  created() {},
  watch: {
    clickTime: function (val) {
      if (this.$route.path == "/") {
        return false;
      } else {
        if (val - this.isTime > 1800000) {
          //超过30min没有点击屏幕就会重新登录
          this.$alert(
            "你已经长时间没有操作，登录已失效，请重新登录！",
            "系统提示",
            {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$router.push("/");
              },
            }
          );
          this.isTime = val;
        } else {
          this.isTime = val;
        }
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
img[src=""] {
  opacity: 0;
}
.el-backtop {
    background: url("./assets/normal@2x.png");
    background-size: 100% 100%;
    box-shadow: none;
    z-index: 100000;
    .el-icon-caret-top {
      display: none;
    }
  }
  .el-backtop:hover {
    background: url("./assets/click@2x.png");
    background-size: 100% 100%;
  }
</style>
