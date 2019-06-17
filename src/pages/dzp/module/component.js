import { formatUrl, substringStr } from "@/utils/index";
import dmMyWinRecord from "@/components/myWinRecord.vue";
import dmConsumePrompt from "@/components/consumePrompt.vue";
import dmPartakeSill from "@/components/partake-sill.vue";
import { setWxConfig, hideShare } from "@/utils/wxShare";
import {
  getMemberIntegral, gameWinRecord, myWinRecord, gameStart,
} from "@/api/dzp";
import "../../../assets/css/dzp.scss";
import nine from "./nine.vue";

let timer;
const backgroundColor = "#D8043D";
let callback = () => { };
export default {
  props: {
    gameId: {
      type: String,
      required: true,
    },
    memberId: {
      type: String,
      required: true,
    },
    gameWxInfoDetail: {
      type: Object,
      required: true,
    },
    warn: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false, // 获取中奖结果
      firstTime: true, // 首次进入
      show: false, // 显示页面
      bannerUrl: '',
      prizeList: [],
      integralLess: false, // 积分不足
      showMyPrize: false, // 显示我的中奖列表
      showGameResult: false, // 是否显示中奖结果
      // 中奖信息
      prize: {
        prizeId: "", // 奖品id
        prizeType: "",
        prizeIntegral: 0,
        cardName: "",
        cardDenomination: 0,
        cardType: '',
      },
      // 中奖榜单
      animate: false,
      winList: [],
      // 游戏配置信息
      gameDetail: {
        gameId: "",
        skinName: "heijin", // 皮肤名称
        gameIntroduction: "", //活动规则
        freeCount: 0,
        gameFreeDay: null,
        hasIntegral: 0,
      },
      // 用户信息
      userInfo: {
        accumulatPoints: 0, // 积分
      },
      myWinRecordList: [], // 我的中奖列表
      myWinRecordCode: "", // 卡券url所需字段
      warnInfo: "", // 积分不足等不满足游戏提示
      showPrompt: false, // 显示提示弹窗
      closePrompt: false, // 选择本次不再提示
      // 门槛信息
      attendCondition: {
        show: false,
      },
      consumeWarn: '', // 消耗积分提示
    };
  },
  components: {
    nine,
    dmMyWinRecord,
    dmConsumePrompt,
    dmPartakeSill,
  },
  watch: {
    // 控制body滚动
    showMyPrize(val) {
      let ov = "auto";
      if (val) {
        ov = "hidden";
      }
      document.getElementsByTagName("body")[0].style.overflow = ov;
    },
    gameWxInfoDetail: {
      handler(newName) {
        const { gameId, memberId, warn } = this;
        this.setGameWxInfoDetail();
        // 用户有错误信息
        if (warn.info) {
          if (warn.type === 1) {
            // 不符合游戏门槛
            this.attendCondition.show = true;
          }
        } else {
          this.getGameWinRecord(gameId);
          // 获取用户积分
          getMemberIntegral({ memberId }).then((res) => {
            this.userInfo.accumulatPoints = res.result.accumulatPoints || 0;
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // ------------- 子组件 -------------
    // 本次是否再显示消耗提示
    handleClosePrompt(checked) {
      this.closePrompt = checked;
    },
    // 显示中奖结果
    respond(prize) {
      switch (prize.prizeType) {
        case 1: // 获得积分
          this.prize.prizeIntegral = prize.prizeIntegral;
          break;
        case 2: // 获得卡券
          this.prize.cardType = prize.cardType;
          this.prize.cardName = substringStr(prize.cardName);
          this.prize.cardDenomination = prize.cardDenomination;
          this.prize.prizeIntegral = prize.prizeIntegral;
          break;
        case 3: // 没有中奖
        default:
          break;
      }
      this.showGameResult = true;
    },
    // 是否满足转盘条件
    rollConditions(cb) {
      callback = cb;
      const {
        gameTime,
        limitCount,
        gameLimitDay,
        hasIntegral,
        gameLimitCount,
      } = this.gameDetail;
      new Promise((resolve, reject) => {
        if (gameTime === 2) {
          // 游戏进行中
          if (limitCount === 0) {
            if (gameLimitDay === 0) {
              reject(new Error(`抱歉，您最多可参与${gameLimitCount}次`));
            } else if (gameLimitDay == 1) {
              reject(new Error(`今日最多可参与${gameLimitCount}次`));
            }
          } else if (hasIntegral === 0) {
            reject(new Error("对不起，您的积分不足，去赚点积分再来吧"));
          } else {
            resolve();
          }
        } else if (gameTime == "3") {
          reject(new Error("游戏已结束"));
        } else {
          reject(new Error("游戏未开始"));
        }
      }).then(() => {
        if (!this.closePrompt) {
          // 显示弹窗提示
          if (this.gameDetail.freeCount > 0 && this.gameDetail.hasIntegral == 1) {
            this.consumeWarn = `您的免费次数还有${this.gameDetail.freeCount}次`;
          } else {
            this.consumeWarn = `每次游戏将消耗${this.gameDetail.gameIntegral}积分`;
          }
          this.showPrompt = true;
        } else {
          this.play();
        }
      }).catch((err) => {
        this.warnInfo = err.message;
        this.integralLess = true;
      })
    },
    // 获取游戏结果
    async getGoal() {
      const { gameId, hasIntegral } = this.gameDetail;
      if (!this.loading) {
        this.loading = true;
        const res = await gameStart({ gameId, hasIntegral, memberId: this.memberId }); // 获取游戏结果
        const data = res.result;
        let goal;
        if (!data) { // 未中奖
          this.prize.prizeType = 3; // 设置成一个不为1,2的数
          // 匹配随机一个再接再厉
          const fail = this.prizeList.filter(v => v.prizeType !== 1 && v.prizeType !== 2);
          const random = parseInt(Math.random() * fail.length);
          goal = fail[random].idx;
        } else {
          // 匹配中奖目标
          this.prize.prizeType = data.prizeType;
          this.prize.prizeId = data.prizeId;
          const winning = this.prizeList.find(v => v.prizeId === data.prizeId);
          goal = winning.idx;
        }
        callback(goal);
        this.loading = false;
      }
    },
    // 立即领取
    // 获取我的中奖列表
    getPrize() {
      const { memberId, gameId } = this;
      // const { gameType, gameId } = this.gameDetail;
      // const gameTypeArr = ["dzp", "dzp", "ggk"];
      myWinRecord({ gameId, memberId }).then((res) => {
        if (res.success) {
          // 渲染中奖列表
          this.myWinRecordList = res.list;
          this.myWinRecordCode = res.result;
          // 隐藏其他
          this.prize.prizeType = "";
          this.integralLess = false;
          this.showMyPrize = true;
        }
      });
    },
    // 关闭
    close() {
      // document.location.replace(formatUrl(window.location.href));
      this.$refs.nine.reset();
      this.prize.prizeType = '';
      this.showGameResult = false;
      this.showMyPrize = false;
      clearInterval(timer);
      this.$emit("reset");
    },
    // 中奖列表滚动
    scroll() {
      this.animate = true;
      setTimeout(() => {
        this.winList.push(this.winList[0]);
        this.winList.shift();
        this.animate = false;
      }, 500);
    },
    // -------- 请求 --------------
    setGameWxInfoDetail() {
      // 获取游戏设置
      const {
        gameDetail,
        prizeList,
        shareLink,
        attendCondition,
      } = this.gameWxInfoDetail;
      Object.assign(this.gameDetail, gameDetail);
      // 自定义皮肤
      if (gameDetail.skinName === 'custom') {
        document.getElementById("dzp").style.backgroundColor = this.gameDetail.background || backgroundColor;
      }
      // 设置banner
      if (gameDetail.gameImageUrl.indexOf("http") === -1) {
        this.bannerUrl = require(`@assets/img/dzp/${gameDetail.skinName}/img_01.jpg`); // eslint-disable-line
      } else {
        this.bannerUrl = gameDetail.gameImageUrl;
      }
      this.prizeList = prizeList.map((v, idx) => {
        v.idx = idx;
        return v;
      });
      // 门槛信息
      Object.assign(this.attendCondition, attendCondition);
      setTimeout(() => {
        this.show = true;
      }, 0)
      if (this.firstTime) { // 首次进入
        this.firstTime = false;
        if (gameDetail.shareFlag) {
          setWxConfig(this.memberId, gameDetail.shareSetting, shareLink, 'dzp');
        } else {
          hideShare(this.memberId);
        }
      }
    },
    // 获取中奖榜单
    getGameWinRecord(gameId) {
      gameWinRecord({ gameId }).then((res) => {
        if (res.success) {
          this.winList = res.list.map(e => ({
            nick: `${e.memberName.substring(0, 1)}***${e.memberName.substring(
              e.memberName.length - 1,
              e.memberName.length,
            )}`,
            price: e.winPrize,
            time: e.winDate,
          }));
          // 超过7个才滚动
          if (this.winList.length > 7) {
            timer = setInterval(this.scroll, 1000);
          }
        }
      });
    },
    // 积分消耗
    cancel() {
      this.showPrompt = false;
    },
    play() {
      this.showPrompt = false;
      this.getGoal(); // 获取游戏结果
    },
  },
  // mounted() {

  // },
  destroyed() {
    timer = null;
  },
};
