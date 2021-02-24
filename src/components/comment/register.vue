<template>
  <div>
    <!-- 注册Daloging -->
    <div class="registered">
      <div class="registered_content">
        <div class="closeregister">
          <i class="el-icon-close" @click="closeregisterShow()"></i>
        </div>
        <h6 class="title">注册新账号</h6>
        <div style="margin-top:31px;">
          <div style="position: relative;display: flex; ">
            <input type="text" placeholder="手机号" v-model="phone" class="input phoneNumber" />
            <span
              id="send_Verification_code"
              @click="getVerificationcode()"
              v-show="true"
            >{{btnTitle}}</span>
            <span v-show="false" class="daojishi">
              <!--<span>{{min}}</span>:-->
              <span>{{sec}}s</span>
            </span>
          </div>
          <el-button :plain="false">{{codemsg}}</el-button>
          <div class="mar_top">
            <input type="text" placeholder="验证码" v-model="Verificationcode" class="input" />
          </div>
          <div class="mar_top">
            <input type="password" placeholder="设置密码" v-model="password" class="input" />
          </div>
          <div class="mar_top" @click="register()"  @mouseenter="hover()" @mouseleave="leave()">
            <input type="button" value="注册" class="input button_registered" />
            <div class="input hover"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["registerShow"],
  data() {
    return {
      phone: "",
      Verificationcode: "",
      password: "",
      btnTitle: "发送验证码",
      codemsg: "",
      // min: 5,
      sec: 60,
      timer: false,
    };
  },
  methods: {
    hover() {
      $(".hover").toggle();
    },
    leave() {
      $(".hover").toggle();
    },
    //   关闭注册
    closeregisterShow() {
      this.$emit("listtenEvent", false);
    },
    //判断输入的手机号是否合法
    validatePhone() {
      if (!this.phone) {
        this.codemsg = "手机号码不能为空";
        return false;
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.codemsg = "请输入正确是手机号";
        return false;
      } else {
        return true;
      }
    },
    //   获取验证码
    getVerificationcode() {
      // console.log(this.phone);
      if (this.validatePhone()) {
        this.$api
          .post("/user/sendAuthCode", this.$qs.stringify({ phone: this.phone }))
          .then((res) => {
            // console.log(res);
            if (res.data.code == 1000) {
              $("#send_Verification_code").hide();
              $(".daojishi").show();
              this.validateBtn();
              this.codemsg = "";
            }else{
              this.$message({
              message: res.data.message,
              showCancelButton: true,
              confirmButtonText: "确定",
            });
            }
          })
          .catch((err) => {
            this.$message({
              message: "获取验证码失败",
              showCancelButton: true,
              confirmButtonText: "确定",
            });
          });
      } else {
        // console.log(1);
      }
    },
    // 注册
    register() {
      this.$api.post("/user/registerAccount",
          this.$qs.stringify({
            phone: this.phone,
            authCode: this.Verificationcode,
            password: this.password,
          })
        )
        .then((res) => {
          // console.log(res.data);
          if (res.data.code == 2006) {
            this.$message({
              message: "该用户已被注册",
              showCancelButton: true,
              confirmButtonText: "确定",
            });
          } else if (res.data.code == 1000) {
            this.$emit("postregisterShow", false);
            this.$message({
              message: "注册成功",
              showCancelButton: true,
              confirmButtonText: "确定",
            });
          } else if (res.data.code == 2005) {
            this.$message({
              message: res.data.message,
              showCancelButton: true,
              confirmButtonText: "确定",
            });
          } else if (res.data.code == 2002) {
            this.$message({
              message: res.data.message,
              showCancelButton: true,
              confirmButtonText: "确定",
            });
          }else if(res.data.code==2004){
            this.$message({
              message: res.data.message,
              showCancelButton: true,
              confirmButtonText: "确定",
            });
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    validateBtn() {
      //倒计时五分钟
      // this.timer = true;
      // this.sec = 59;
      // this.min = 4;
      // let timers = setInterval(() => {
      //   this.sec--;
      //   if (this.sec < 10) {
      //     this.sec = "0" + this.sec;
      //   }
      //   if (this.sec == 0) {
      //     this.sec = 60;
      //     this.min--;
      //   } else if (this.min == 0) {
      //     $(".daojishi").hide();
      //     $("#send_Verification_code").show();
      //     this.min = 5;
      //     this.sec = "00";
      //     this.timer = false;
      //     clearInterval(timers);
      //   }
      // }, 1000);

      /*倒计时60秒*/
      this.timer = true;
      this.sec = 59;
      let timers = setInterval(() => {
        this.sec--;
        if (this.sec < 10) {
          this.sec = "0" + this.sec;
        }
        if (this.sec == 0) {
          $(".daojishi").hide();
          $("#send_Verification_code").show();
          this.btnTitle = "重新发送验证码";
          this.timer = false;
          clearInterval(timers);
        }
      }, 1000);
    },
  },
  created() {},
  watch: {},
};
</script>

<style lang="scss">
.registered {
  width: 100%;
  height: 1080px;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  .daojishi {
    position: absolute;
    top: 0;
    right: 20px;
    height: 56px;
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #28a1ff;
  }
  .el-button {
    padding: 0;
  }
  .closeregister {
    position: absolute;
    right: 30px;
    top: 20px;
    cursor: pointer;
    i {
      font-size: 20px;
    }
  }

  .registered_content {
    width: 590px;
    height: 450px;
    background: rgba(250, 250, 250, 1);
    border-radius: 24px;
    position: absolute;
    top: 20%;
    left: 50%;
    margin-left: -245px;
    padding: 44px 84px;
    z-index: 1000;
    .el-button {
      position: absolute;
      top: 162px;
      border: 0;
      color: red;
      background: transparent !important;
    }
  }

  .title {
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    color: #333333;
  }

  .input {
    width: 422px;
    height: 56px;
    background: rgba(250, 250, 250, 1);
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 8px;
    padding-left: 31px;
    color: #666666;
    font-size: 16px;
    outline: none;
  }

  .input:focus {
    border: 1px solid #28a1ff;
  }

  .mar_top {
    margin-top: 24px;
    position: relative;
  }

  .button_registered {
    background: rgba($color: #28a1ff, $alpha: 1);
    font-size: 20px;
    color: #fafafa;
    padding: 0;
    text-align: center;
    line-height: 56px;
    border: 0;
  }
  .hover {
    background: rgba($color: #000000, $alpha: 0.1);
    position: absolute;
    left: 0;
    top: 0;
    border: 0;
    display: none;
    cursor: pointer;
  }

  #send_Verification_code {
    font-size: 16px;
    color: #28a1ff;
    position: absolute;
    top: 50%;
    margin-top: -11px;
    right: 33px;
    width: auto;
    cursor: pointer;
  }
}
</style>