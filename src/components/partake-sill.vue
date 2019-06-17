<template>
  <div class="pop-bg" v-show="showPartake">
    <div class="pop-cont">
      <h3 class="pop-title">你还未满足参与游戏条件！</h3>
      <img class="pop-img" :src="imgSrc" alt="">
      <p class="pop-text">{{msg}}</p>
    </div>
  </div>
</template>

<script>
import { forbidBodyScroll } from "@/utils/index";

export default {
  name: 'partake-sill',
  props: {
    imgUrl: String,
    msg: String,
    showPartake: Boolean,
    gameName: {
      type: String,
      required: true,
    },
  },
  computed: {
    imgSrc() {
      // eslint-disable-next-line
      return this.imgUrl && this.imgUrl.indexOf('http') === 0 ? this.imgUrl : require(`@/assets/img/common/attend/${this.gameName}.png`);
    },
  },
  watch: {
    showPartake: {
      handler(newVal) {
        // document.getElementsByTagName("body")[0].style.overflow = newVal ? 'hidden' : 'auto';
        // forbidBodyScroll(newVal);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.pop-bg{
  color: #303133;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
}
.pop-cont {
  position: relative;
  padding: 0.6rem 0.4rem;
  width: 70%;
  /* height: 60%; */
  background: #fff;
  border-radius: 15px;
  text-align: center;
}
.pop-title {
  font-size: 0.45rem;
  text-align: center;
}
.pop-img {
  margin: 0 auto;
  max-width: 80%;
  max-height: 80%;
}
.pop-text {
  font-size: 0.35rem;
  line-height: 0.6rem;
  text-align: center;
  width: 100%;
  text-align: center;
}
</style>
