<template>
    <div class="videoAnalysisDiv">
        <Top :name="name" :learnname="learnname"/>
        <div class="contain">
            <h2 class="sectionName">{{sectionName}}</h2>
            <div class="videoDiv">
                <video id="video" class="video" controls :src="src" ref="video">
<!--                    <source :src="src" type="video/mp4">-->
                </video>
                <div class="rate">
                    <span class="msg" @click="showRateList()">倍速</span>
                    <ul class="rateList" v-show="rateListShow">
                        <li @click="switchRate(item)" :class="isRateing==item?'isRateing':''" v-for="(item,index) in rate" :key="index">{{item}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Top from "./comment/Top";
    export default {
        name:'VideoAnalysis',
        components: { Top },
        data() {
            return {
                name: "视频讲解",
                learnname: "返回",
                sectionName:'',
                sectionId:'',
                type:'',
                src:'',
                rate:[0.5,1.0,1.25,1.5,2.0],
                rateListShow:false,
                isRateing:1.0,
                intoTime: new Date().getTime(), //进入页面时间戳
                destoryTime: new Date().getTime(),//页面销毁时间戳
                historyTime:'',
                isFinishProgress:0
            }
        },
        methods: {
            showRateList(item){
                this.rateListShow = !this.rateListShow
            },
            switchRate(item){
                let video = document.getElementById('video')
                this.isRateing = video.playbackRate = item
                video.play()
                this.rateListShow = false
            },
            async getVideoSrc(){
                let res = await this.$api.get('studyFlow/findUserSectionVideoStudyInfo',{
                    params:{
                        // userId:this.userId,
                        sectionId:this.sectionId
                    }
                })
                if(res.data.code == 200){
                    this.src = res.data.data.videoExplainName;
                }
            },
            async saveUserWatchVideoInfo(){
              let res = await this.$api.get('studyFlow/saveUserWatchVideoInfo',{
                params:{
                  sectionId: this.sectionId,
                  studyTime: Math.floor((this.destoryTime - this.intoTime)/1000),
                  historyTime: this.historyTime,
                  isFinishProgress: this.isFinishProgress
                }
              })
            }
        },
        created() {
            this.sectionId = parseInt(this.$route.query.sectionId);
            this.type = this.$route.query.type
            this.sectionName = this.$route.query.sectionName
            // this.userId = this.$route.query.userId
            this.getVideoSrc()
        },
        beforeDestroy() {
          let video = this.$refs.video;
          this.historyTime = Math.floor(video.currentTime);
          if (Math.floor(video.currentTime) == Math.floor(video.duration)){
            this.isFinishProgress = 1;
          }
          this.destoryTime = new Date().getTime();
          this.saveUserWatchVideoInfo();
        },
    }
</script>

<style lang="scss">
.videoAnalysisDiv{
    min-height: 100%;
    background: #fefefe;
    .contain{
        margin:50px auto 0;
        width: 1000px;
        .sectionName{
            font-size: 30px;
        }
        .videoDiv{
            margin-top: 50px;
            height: 500px;
            overflow: hidden;
            border-radius: 10px;
            position: relative;
            background: #e8e8e8;
            .video{
                width: 100%;
                height: 100%;
                border-radius: 10px;
                outline: none;
            }
            .rate{
                position: absolute;
                bottom: 40px;
                left: 150px;
                cursor: pointer;
                span{
                    font-size: 14px;
                    color: #e8e8e8;
                }
                .rateList{
                    display:flex;
                    position: absolute;
                    top: -30px;
                    left: -80px;
                    background: #fff;
                    border-radius: 15px;
                    overflow: hidden;
                    .isRateing{
                        background: #eeeeee;
                    }
                    li{
                        padding: 5px 10px;
                        color: #333;
                        font-size: 14px;
                        &:hover{
                            background: #eeeeee;
                        }
                    }
                }
            }
        }
    }
}
</style>
