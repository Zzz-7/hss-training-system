<template>
  <div class="Login">
    <div class="contain">
      <div class="top">
        <div class="logo">
          <img style="width:148px;height:32px;" src="../assets/logo@2x.png" alt />
        </div>
        <div class="Product_introduction" @click="GoProduct()">产品介绍</div>
      </div>
      <div class="content_Login">
        <!-- 轮播图块 -->
        <div class="banner">
          <el-carousel trigger="click" style="height:540px;">
            <el-carousel-item v-for="(item,index) in banner" :key="index">
              <img :src="item" alt />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- login块 -->
        <div class="login">
          <div class="title">
            <h3>红杉树培训系统</h3>
          </div>
          <div class="username">
            <input
              placeholder="账号"
              class="input__inner"
              type="text"
              v-model="username"
              @keyup.enter="login()"
            />
            <i class="el-user el_i"></i>
          </div>
          <div class="password">
            <input
              placeholder="密码"
              class="input__inner"
              type="password"
              v-model="password"
              @keyup.enter="login()"
            />
            <i class="el-lock el_i"></i>
          </div>
          <!--<div class="login_info">
            <span style="opacity: 0;">忘记密码</span>
            <span @click="registerToshow()">注册账号</span>
          </div>-->
          <div class="login_btn" @click="login()" @mouseenter="enter()" @mouseleave="leave()">
            <div>登录</div>
            <div class="hover1"></div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <p>
          <span>红杉树智能英语教育机构 北京国音红杉树教育科技有限公司 版权所有</span>
          <span class="_span"></span>
          <span>推荐使用IE10及以上浏览器</span>
        </p>
        <p>
          <span>京公网安备 10281920847号</span>
          <span class="_span"></span>
          <span>京ICP备 63758690</span>
          <span class="_span"></span>
          <span>维权热线 400-5647-1244</span>
        </p>
      </div>
    </div>
    <register-Vue
      v-show="registerShow"
      :registerShow="registerShow"
      v-on:listtenEvent="closeregisterShow"
      v-on:postregisterShow="postregisterShows"
    ></register-Vue>
  </div>
</template>

<script>
import registerVue from "./comment/register";
export default {
  components: { registerVue },
  name: "Login",
  data() {
    return {
      registerShow: false,
      // background: require("../assets/background_bg.png"),
      username: "",
      password: "",
      banner: [
        require("../assets/banner03@2x.png"),
        require("../assets/banner01.png"),
        require("../assets/banner02.png"),
      ],
      userinfo:'',
    };
  },
  methods: {
    enter() {
      $(".hover1").toggle();
    },
    leave() {
      $(".hover1").toggle();
    },
    //产品介绍
    GoProduct() {
      return false
      this.$router.push("/ProductIntroduction");
    },
    registerToshow() {
      // console.log(this.registerShow)
      this.registerShow = !this.registerShow;
    },
    postregisterShows(data) {
      this.registerShow = data;
    },
    closeregisterShow(data) {
      this.registerShow = data;
    },
    // 登录
    login() {
      if (this.username == "") {
        this.$message({
          message: "用户名不能为空",
          showCancelButton: true,
          confirmButtonText: "确定",
        });
      } else if (this.password == "") {
        this.$message({
          message: "密码不能为空",
          showCancelButton: true,
          confirmButtonText: "确定",
        });
      } else if (this.password != "" && this.username != "") {
        this.$api.post("/user/login",this.$qs.stringify({account: this.username,password: this.password,}))
        .then(res=>{
          if(res.data.code == 200){
            this.$router.push({
              path:"/home",
              query:{
                account:this.username
              }
            });
          }else if(res.data.code == 500){
            this.$message({
              message: res.data.mes+"用户名或密码不正确",
              showCancelButton: true,
              confirmButtonText: "确定",
            });
          }
        })


      }
    },
    //获取用户信息
    // async getuserinfo() {
    //   let res = await this.$api.get("/user/getUserInfo");
    //   this.userinfo = res.data.data.userInfo;
    //   // console.log("获取用户信息", res.data.data);
    //   this.$VueCookies.set('token',this.userinfo.token)
    // },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss">
.Login {
  width: 100%;
  min-height: 100%;
  overflow-x: auto;
  background: url("../assets/background_bg.png");
  padding-bottom: 24px;
  ._span {
    display: inline-block;
    margin: 0 11px;
    height: 12px;
    width: 1px;
    background: #999999;
  }
  .bottom {
    width: 1200px;
    margin: 40px auto 0;
    text-align: center;
  }
  .bottom p {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666666;
    font-size: 14px;
  }
  .bottom p:nth-child(2) {
    margin-top: 19px;
  }
  .contain {
    margin: 0 auto;
    width: 1200px;
  }
  .top {
    padding: 27px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  // .logo {
  //   background: url("../assets/logo@2x.png");
  //   width: 147px;
  //   height: 31px;
  //   background-size: 100% 100%;
  // }
  .Product_introduction {
    font-size: 16px;
    color: #666666;
    cursor: pointer;
  }
  .Product_introduction:hover{
    color: #28A2FF;
  }
  .content_Login {
    width: 1200px;
    height: 540px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 24px 0px rgba(229, 229, 229, 1);
    border-radius: 16px;
    margin-top: 43px;
    display: flex;
  }
  .banner {
    width: 720px;
    height: 540px;
    border-radius: 16px 0 0 16px;
    overflow: hidden;
    .el-carousel__container {
      height: 540px;
    }
  }
  .login {
    width: 480px;
    height: 100%;
    padding: 95px 76px;
  }
  .title {
    display: flex;
  }
  .title h3 {
    color: #333333;
    font-size: 26px;
    font-weight: 400;
    text-align: center;
    width: 100%;
  }
  .username,
  .password {
    width: 334px;
    height: 56px;
    margin-top: 60px;
    position: relative;
  }
  .password {
    margin-top: 32px;
  }
  .input__inner {
    width: 334px;
    height: 56px;
    border-radius: 8px;
    font-size: 16px;
    color: #666666;
    padding: 0 59px;
    border: 1px solid rgba(230, 230, 230, 1);
    outline: none;
  }
  .input__inner:focus{
     border: 1px solid #28A2FF;
  }
  .el_i {
    width: 24px;
    height: 24px;
    display: inline-block;
    position: absolute;
    left: 21px;
    top: 50%;
    margin-top: -12px;
  }
  .el-user {
    background: url("../assets/landing_icon_account.png");
    background-size:100% 100% ;
  }
  .el-lock {
    background: url("../assets/landing_icon_password.png");
    background-size:100% 100% ;
  }
  .login_info {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    font-size: 13px;
    color: #999999;
    span {
      cursor: pointer;
    }
    span:hover{
      color: #28A2FF;
    }
  }
  .login_btn {
    width: 334px;
    height: 56px;
    background: rgba(40, 161, 255, 1);
    border-radius: 8px;
    line-height: 56px;
    text-align: center;
    font-size: 20px;
    color: #ffffff;
    margin-top: 23px;
    cursor: pointer;
    position: relative;
    .hover1 {
      position: absolute;
      background: rgba($color: #000000, $alpha: 0.1);
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: none;
    }
  }
  .el-carousel {
    height: 100%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 50px;
    opacity: 0.75;
    line-height: 540px;
    text-align: center;
    margin: 0;
  }
  .el-carousel__item {
    height: 540px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .el-carousel__indicator {
    padding: 8px;
    .el-carousel__button {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
  }
}
</style>
