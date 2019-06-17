<template>
<div class="winningRecord_box" v-show="showRecordList">
  <div class="winningRecord_header">
    <p class="winningRecord_header__title">
      中奖记录
      <i class="icon iconfont icon-guanbi" @click="handleClose"></i>
    </p>
  </div>
  <div class="winningRecord_list__title">
    <p>奖品</p>
    <p>领取记录</p>
  </div>
  <!--  <swiper :options="swiperOption" id="list-content">-->
  <swiper style="height: calc(100% - 2.6rem)" :options="swiperOption">
    <swiper-slide style="height: auto">
      <div class="record-item" v-for="item in recordListData" :key="item.enterpriseId">
        <!-- 积分奖励 -->
        <template v-if="item.prizeReferType === 1">
          <div class="winningRecord_pointPic"></div>
          <p class="winningRecord_name">{{item.prizeIntegral}}积分</p>
          <div class="winningRecord_state">
          <span
            :class="item.status===1?'winningRecord_state__unclaimed':'winningRecord_state__claimed'"
            @click="getPrize(item)"
          >
            已领取
          </span>
          </div>
        </template>
        <!-- 卡券奖励 -->
        <template v-if="item.prizeReferType === 2">
          <div class="winningRecord_vouchersPic"></div>
          <p class="winningRecord_name">{{item.cardName}}</p>
          <div class="winningRecord_state">
          <span
            :class="item.status===1?'winningRecord_state__unclaimed':'winningRecord_state__claimed'"
            @click="getPrize(item)"
          >
            {{item.status === 1 ? '立即领取' : '已领取'}}
          </span>
          </div>
        </template>
        <!-- 实物奖品 -->
        <template v-if="item.prizeReferType === 3">
          <div
            class="winningRecord_giftPic"
            :style="{backgroundImage: `url(${item.giftImgUrl})`}"
          >
          </div>
          <p class="winningRecord_name">{{item.giftName}}</p>
          <div class="winningRecord_state">
            <template v-if="item.status === 4">
            <span class="winningRecord_state__claimed" style="line-height: 0.2rem;">
              {{getBtnText(item.status)}}
            </span>
              <span
                class="winningRecord_state__logistics"
                style="line-height: 1.4rem"
                @click="logistics(item)"
              >
              查看物流
            </span>
            </template>
            <template v-else>
            <span
              :class="
              item.status===1 || item.status===2?
              'winningRecord_state__unclaimed':
              'winningRecord_state__claimed'"
              @click="getPrize(item)"
            >
              {{getBtnText(item.status)}}
            </span>
            </template>
          </div>
        </template>
      </div>
    </swiper-slide>
  </swiper>
</div>
</template>

<script>
/* eslint-disable-next-line */
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
/**
 * 中奖纪录列表
 * */

export default {
  name: 'record-list',
  props: {
    recordListData: Array,
    showRecordList: Boolean,
    authStatus: Number,
  },
  data() {
    /* eslint-disable-next-line */
    const self = this;
    return {
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true,
        on: {
          transitionEnd() {
            if (this.isEnd) {
              self.$emit('loadMore');
            }
          },
        },
      },
    }
  },
  components: {
    swiper,
    swiperSlide,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  methods: {
    getBtnText(status) {
      const buttonTextArray = ['立即领取','填写收货地址','待发货','已发货'];
      return buttonTextArray[status - 1];
    },
    handleClose() {
      this.$emit('close');
    },
    /**
     * 领取奖励相关
     * 未认证用户，弹出奖品信息弹窗，引导开卡认证
     * */
    getPrize(prize) {
      const {
        prizeReferType,
        wechatCardId,
        cardLogId,
        gameActivityWinRecordId,
      } = prize;

      if (prize.prizeReferType === 3) {
        /**
         * 这里不是bug
         * 这是产品要求实物奖励，一直可以点击进入地址列表页
         * */
        // 实物奖励
        this.$emit('toMemberAddressList', gameActivityWinRecordId);
      }

      if (prize.status !== 1) return;

      if (this.authStatus !== 1) {
        this.$emit('getPrizeInfo', gameActivityWinRecordId);
        return;
      }

      // 修改按钮状态
      prize.status = 2;

      // 领取卡券
      this.$emit('getCardExt', {
        wechatCardId,
        cardLogId,
        gameActivityWinRecordId,
      });
    },
    // 查看物流
    logistics(prize) {
      const { gameActivityWinRecordId, prizeReferId } = prize;
      this.$emit('logistics', { gameActivityWinRecordId, prizeReferId });
    },
  },
};
</script>
