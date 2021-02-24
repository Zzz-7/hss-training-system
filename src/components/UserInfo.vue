<template>
    <div class="userInfo">
        <Top :name='name' :learnname='learnname'/>
        <div class="container">
            <div class="left">
                <ul class="leftList">
                    <li class="personalData" v-for="(item,index) in leftList" :key="index" @click="switchIndex(index)" :class="showIndex==index?'show':''">{{item}}</li>
                </ul>
            </div>
            <div class="right" v-if="userinfo">
                <div v-show="showIndex==0" class="personalDataDetail">
                    <p class="userName"><span class="msgTitle">姓名</span><span class="name">{{userinfo.userName}}</span></p>
                    <p class="accountNumber"><span class="msgTitle">账号</span><span class="number">{{userinfo.mobilePhone.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")}}</span></p>
                    <p class="campus"><span class="msgTitle">校区</span><span class="campusName">{{userinfo.agentName}}</span></p>
                </div>
                <div v-show="showIndex==1" class="modifyDataDetail">
                    <p class="oldPassword"><span class="msgTitle">原密码</span><el-input placeholder="请输入原密码" v-model="oldPassword" show-password></el-input></p>
                    <p class="newPassword"><span class="msgTitle">新密码</span><el-input placeholder="请输入新密码" v-model="newPassword" show-password></el-input></p>
                    <p class="confirmPassword"><span class="msgTitle">确认密码</span><el-input placeholder="请输入新密码" v-model="confirmPassword" show-password></el-input></p>

                    <el-button size="mini" @click="preservation()">保存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Top from './comment/Top'
    export default {
        name:'UserInfo',
        components:{Top},
        data() {
            return {
                name:'个人中心',
                learnname:'返回',
                showIndex:0,
                leftList:['个人资料','修改密码'],
                userinfo:'',
                account:'',
                oldPassword:'',
                newPassword:'',
                confirmPassword:'',
            }
        },
        methods: {
            preservation(){
                //放在后台比计较了
                /*if(this.oldPassword!=this.userinfo.password){
                    this.$message('原密码不匹配')
                }else{

                }*/
              if(this.newPassword != this.confirmPassword){
                this.$message('两次输入的密码不一致')
              }else{
                this.$api.get('user/updatePassword',{
                  params:{
                    // account:this.account,
                    originalPassword:this.oldPassword,
                    newPassword:this.newPassword
                  }
                }).then((res)=>{
                  this.$message(res.data.mes)
                  /*if(res.data.code == 200){
                      this.$message(res.data.msg)
                  }*/
                })
              }
            },
            switchIndex(index){
                this.showIndex = index
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
        },
        created() {
            this.account = this.$route.query.account
            this.getuserinfo()
        },
    }
</script>

<style lang="scss">
.userInfo{
    min-height: 100%;
    background: #ffffff;
    .container{
        margin: 30px auto 0;
        height: 700px;
        width: 1000px;
        display: flex;
        justify-content: space-between;
        .left{
            width: 150px;
            border-right: 1px solid #bbbbbb;
            .leftList{
                .personalData{
                    font-size: 20px;
                    color: #333333;
                    cursor: pointer;
                    margin-bottom: 30px;
                }
                .show{
                    color: #66b871;
                }
            }
        }
        .right{
            width: 850px;
            padding:30px 0 0 48px;
            font-size: 18px;
            .userName,.accountNumber,.campus{
                margin-bottom: 30px;
                .msgTitle{
                    color: #999;
                    margin-right: 40px;
                }
            }
            .oldPassword,.newPassword,.confirmPassword{
                display: flex;
                margin-bottom: 30px;
                align-items: center;
                .msgTitle{
                    color: #999;
                    width: 80px;
                    text-align: right;
                }
                .el-input{
                    margin-left: 30px;
                    width: 200px;
                    height: 32px;
                }
            }
        }
    }
}
</style>
