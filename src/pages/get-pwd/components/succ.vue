<template>
  <div class="succ">
    <h3 class="succ-title">获取成功</h3>
    <svg id="code">code</svg>
    <p class="succ-number">{{code}}</p>
    <p class="succ-desc">请于消费结算时向店员出示</p>
    <p class="succ-desc">限用一次</p>
    <p class="succ-tip">为了保障您的权益，请妥善保存消费密码，非本人使用切勿外露！</p>
  </div>
</template>

<script>
import JsBarCode from 'jsbarcode';
/**
 * 生成条形码
 * 数据绑定
 * */
export default {
  name: 'succ',
  props: {
    code: Number,
  },
  mounted() {
    this.$nextTick(() => {
      JsBarCode('#code', this.code, {
        format: 'CODE39',
        height: 100,
        background: '',
        displayValue: false,
      });
    })
  },
};
</script>

<style scoped>
  .succ {
    padding: 0 25px;
    width: 100%;
    text-align: center;
  }

  .succ-title {
    padding: 25px 0;
    font-size: 18px;
    color: #ff3232;
  }

  .succ-code {
    width: 100%;
    height: 100px;
    border: 1px solid red;
  }

  .succ-number {
    font-size: 14px;
    color: #666;
  }

  .succ-desc {
    margin-top: 25px;
    font-size: 18px;
    color: #333;
  }

  .succ-tip {
    margin-top: 25px;
    font-size: 16px;
    text-align: left;
    color: #666;
  }
</style>
