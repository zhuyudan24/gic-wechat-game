<template>
  <div class='dialog_box' v-show="showPrize">
    <div class='luckMoney_mask'></div>
    <div class='dialog-container'>
      <!--中奖信息弹窗 积分-->
      <template v-if="prize.prizeReferType === 1">
        <p class="dialog-title">恭喜你，抢到{{prize.prizeIntegral}}积分</p>
        <div class="pointPic">
          <span class="voucherText">{{prize.prizeIntegral}}</span>
        </div>

        <div class="dialog-tips">
          <p>奖励已发放至您的会员账户</p>
          <p>请至<a href="javascript:;">积分服务</a>查看</p>
        </div>

        <div class="dialog-footer">
          <template v-if="authStatus">
            <div class="dialog-btn dialog-btn_right" @click="handleClose">知道了</div>
          </template>
          <template v-else>
            <div class="dialog-btn dialog-btn_left" @click="handleClose">知道了</div>
            <div class="dialog-btn dialog-btn_right" @click="toAuth">立即开卡</div>
          </template>
        </div>
      </template>
      <!--中奖信息弹窗 抵金券-->
      <template v-if="prize.prizeReferType === 2">
        <p class="dialog-title">恭喜你，抢到1张{{getCardTypeName()}}</p>
        <div class="vouchersPic">
          {{prize.prizeName.replace(/^(.{8})(.*)/, '$1...')}}
          <span class="voucherText"></span>
        </div>

        <!--判断不同的奖品不同的提示信息-->
        <div class="dialog-tips">
          <template v-if="authStatus">
            <p>奖励已发放至您的会员账户</p>
            <p>请至<a href="javascript:;">会员中心</a>查看</p>
          </template>
          <template v-else>
            <p>您还不是{{brandName}}的会员</p>
            <p><a href="javascript:;">请先开卡后领取</a></p>
          </template>
        </div>

        <!--判断不同的奖品不同的提示信息-->
        <div class="dialog-footer">
          <template v-if="authStatus">
            <div class="dialog-btn dialog-btn_right" @click="getCardExt">立即领取</div>
          </template>
          <template v-else>
            <div class="dialog-btn dialog-btn_left" @click="handleClose">放弃领券</div>
            <div class="dialog-btn dialog-btn_right" @click="toAuth">立即开卡</div>
          </template>
        </div>
      </template>
      <!--中奖信息弹窗 小礼品-->
      <template v-if="prize.prizeReferType === 3">
        <p class="dialog-title">恭喜你，抢到{{prize.prizeName}}</p>
        <div class="giftPic" :style="{backgroundImage: `url(${prize.imageUrl})`}">
          <span class="voucherText"></span>
        </div>

        <!--判断不同的奖品不同的提示信息-->
        <div class="dialog-tips">
          <template v-if="authStatus">
            <p>奖励已发放</p>
            <p>请至<a href="javascript:;">中奖记录</a>查看</p>
          </template>
          <template v-else>
            <p>您还不是{{brandName}}的会员</p>
            <a href="javascript:;">请先开卡后领取</a>
          </template>
        </div>

        <!--判断不同的奖品不同的提示信息-->
        <div class="dialog-footer">
          <template v-if="authStatus">
            <div class="dialog-btn dialog-btn_left" @click="handleClose">放弃礼品</div>
            <div class="dialog-btn dialog-btn_right" @click="toMemberAddressList">填写收货地址</div>
          </template>
          <template v-else>
            <div class="dialog-btn dialog-btn_left" @click="handleClose">放弃礼品</div>
            <div class="dialog-btn dialog-btn_right" @click="toAuth">立即开卡</div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
/**
 * 查看奖品信息、开卡引导
 * */
export default {
  name: 'prize-info',
  props: {
    prize: Object,
    showPrize: Boolean,
    brandName: String,
    authStatus: Number,
  },
  methods: {
    getCardTypeName() {
      const cardTypeArr = ['抵金券', '折扣券', '兑换券'];
      return cardTypeArr[this.prize.cardType];
    },
    // 关闭弹窗
    handleClose() {
      this.showPrize = false;
      this.$emit('update:showPrize', false);
    },
    // 跳转到认证页面
    toAuth() {
      this.$emit('toAuth', this.prize.gameActivityId);
    },
    // 跳转到地址列表页面
    toMemberAddressList() {
      this.$emit('toMemberAddressList', this.prize.gameActivityId);
    },
    // 领取卡券
    getCardExt() {
      const { wechatCardId, cardLogId, gameActivityWinRecordId } = this.prize;
      this.$emit('getCardExt', { wechatCardId, cardLogId, gameActivityWinRecordId });
    },
  },
};
</script>

<style scoped>

</style>
