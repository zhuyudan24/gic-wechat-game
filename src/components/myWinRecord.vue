<template>
  <ul>
    <li v-for="(item,idx) in myWinRecordList" :key="idx">
      <div v-if="item.prizeType === 1">
        <!-- 积分 -->
        <div class="price_info_box">
          <img :src="require(`@assets/img/${gameType}/${skinName}/price_icon_score.png`)" alt>
          <div><span>{{item.prizeIntegral}}积分</span></div>
        </div>
        <button class="Geted">已领取</button><!-- 积分会自己发放 -->
      </div>
      <div v-else>
        <!-- 卡券 -->
        <div class="price_info_box">
          <img :src="require(`@assets/img/${gameType}/${skinName}/price_icon_cash.png`)" alt>
          <div><span class="ellipsis">{{substringStr(item.cardName)}}</span></div>
        </div>
        <button
          v-if="item.getStatus === 1"
          class="toGet"
          @click="getCardUrl(item.wechatCardId, item.recordCode)"
        >立即领取</button>
        <button v-else class="Geted">{{ item.getStatus === 2 ? '已领取' : '已失效' }}</button>
      </div>
    </li>
  </ul>
</template>

<script>
import { gameGetCard } from '@/api/common'
import { substringStr } from "@/utils/index";

export default {
  name: "myWinRecord",
  props: {
    skinName: {
      type: String,
      default: "heijin",
    },
    gameType: {
      type: String,
      default: "dzp",
    },
    myWinRecordList: {
      type: Array,
      default() {
        return []
      },
    },
    code: {
      type: [String, Number],
      default: "dzp",
    },
  },
  methods: {
    // 获取领取卡券地址
    getCardUrl(wechatCardId, recordCode) {
      if (wechatCardId && recordCode && this.code) {
        gameGetCard({
          cardId: wechatCardId,
          outerId: `${this.code}${recordCode}`,
        }).then((url) => {
          document.location.replace(url.result);
        })
      } else {
        /*eslint-disable-next-line*/
        alert("未知错误");
      }
    },
    substringStr,
  },
};
</script>
