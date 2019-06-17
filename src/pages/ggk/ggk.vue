
<template>
  <div id="ggk" :class="skinName">
    <component
      @reset="handleReset"
      :is="component"
      :gameWxInfoDetail="gameWxInfoDetail"
      :gameId="gameId"
      :memberId="memberId"
      :warn="warn"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { getQueryString, setTitle, checkEnv } from "@/utils/index";
import { checkGamePlayPermission, gameWxInfoDetail } from "@/api/dzp";

export default {
  name: 'dzp',
  data() {
    return {
      gameId: '',
      memberId: '',
      integralLess: false,
      skinName: '',
      component: '',
      // gameWxInfoDetail接口返回的数据，需要传递给子组件
      gameWxInfoDetail: {},
      warn: {}, //传给子组件的错误提示
    }
  },
  methods: {
    // 获取游戏设置
    async getGameWxInfoDetail(gameId, memberId) {
      const res = await gameWxInfoDetail({ gameId, memberId });
      const { gameDetail } = res.result;
      setTitle(gameDetail.gameName);
      this.gameWxInfoDetail = res.result;
      this.skinName = gameDetail.skinName;
      if (gameDetail.skinName === 'custom') {
        const custom = require("./module/custom.vue").default;
        Vue.component('custom', Vue.extend(custom)); // eslint-disable-line
        this.component = 'custom';
      } else {
        const skin = require("./module/skin.vue").default;
        Vue.component('skin', Vue.extend(skin));  // eslint-disable-line
        this.component = 'skin';
      }
    },
    // 校验游戏权限
    checkPermission() {
      const { gameId, memberId } = this;
      checkGamePlayPermission({ activityId: gameId, memberId })
        .then((result) => {
          this.getGameWxInfoDetail(gameId, memberId);
          if (result.result.res !== "ok") {
            throw new Error(); // eslint-disable-line
          }
        })
        .catch(() => {
          this.warn = {
            info: "您不符合游戏条件",
            type: 1,
          };
        });
    },
    // 重置游戏
    handleReset() {
      this.checkPermission();
    },
  },
  created() {
    if (checkEnv()) {
      const gameId = getQueryString("gameId");
      const memberId = getQueryString("memberId");
      if (gameId && memberId) {
        this.gameId = gameId;
        this.memberId = memberId;
        this.checkPermission();
      } else {
        alert("信息不全");
      }
    }
  },
}

</script>
