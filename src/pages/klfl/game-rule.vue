<template>
  <div class='luckMoney_RuleModal' v-show="showRule">
    <div class='luckMoney_mask' @click="handleClose"></div>
    <div class='ruleModal-container'>
      <div class='ruleModal-containerHeader'>
        <p>活动规则</p>
        <div @click="handleClose">
          <i class="icon iconfont icon-close"></i>
        </div>
      </div>
      <div class='ruleModal-containerContent'>
        <p>{{gameIntroduction}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'game-rule',
  props: {
    gameIntroduction: String,
    showRule: Boolean,
  },
  methods: {
    handleClose() {
      this.showRule = false;
      this.$emit('update:showRule', false);
    },
  },
};
</script>
