<template>
  <div v-show="show" class="consumePrompt" :class="skinName">
    <div class="content">
      <p class="title">提 示</p>
      <div class="ct">
        <p class="warnText"><slot name="consumeWarn"></slot></p>
        <div class="prompt-checkbox">
          <div class="check-mask" :class="checked ? 'checked':''">
            <input type="checkbox" v-model="checked"></div>
            不再提示
        </div>
        <div class="prompt-btn">
          <button class="left" @click="cancel">不玩</button>
          <button class="right" @click="play">玩</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Cookies from "js-cookie"
import "@/assets/css/consumePrompt.scss";

export default {
  name: 'consumePrompt',
  props: {
    skinName: { // 提示图片的路径
      type: String,
      required: true,
      defdault: 'heijin',
    },
    integral: { // 积分数
      type: Number,
      default: 0,
    },
    show: { // 显示隐藏
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checked: false,
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    play() {
      // 保存消耗提示
      this.$emit("handleClosePrompt", this.checked);
      this.$emit("play");
    },
  },
}
</script>
