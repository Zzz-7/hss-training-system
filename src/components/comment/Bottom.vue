<template>
  <footer class="bottom">
    <div class="kun"></div>
    <div>
      <p v-show="false">推荐使用IE9及以上浏览器使用</p>
      <p>红杉树智能英语教育机构 北京国音红杉树教育科技有限公司 版权所有</p>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>

.bottom {
  position: absolute;
  width:100%;
  height: 40px;
  background: rgba(31, 44, 55, 1);
  bottom: 0;
}
.kun {
    width: 100%;
    height: 6px;
    background: #28a1ff;
  }

.bottom p {
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: #cdcdcd;
  margin-top:8px;
}
.relativeBottom{
    position: relative;
  }
</style>