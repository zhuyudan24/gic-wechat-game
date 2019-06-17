
<template>
  <div class="luckMoney_container" :style="{backgroundImage: `url(${pageStyle.bodyBgImgUrl})`}">
    <!--活动规则入口-->
    <div class='luckMoney_tips'>
      <div
        class='luckMoney_rules'
        :style="{color: pageStyle.ruleBtnTextColor}"
        @click="showRule = true"
      >
        活动规则
        <i class="icon iconfont icon-arrow_right"></i>
      </div>
    </div>
    <!--中奖记录入口-->
    <div class='luckMoney_tips'>
      <div
        class='luckMoney_winningRecord'
        :style="{color: pageStyle.recordBtnTextColor}"
        @click="getRecordList()"
      >
        中奖记录
        <i class="icon iconfont icon-arrow_right"></i>
      </div>
    </div>
    <!-- 主界面 -->
    <div class='luckMoney_form'>
      <input class="luckMoney_input" type="text" placeholder="请输入口令"  v-model="password"/>
      <div
        class="luckMoney_sendBtn"
        :style="{backgroundImage: `url(${pageStyle.submitBtnImgUrl})`}"
        @click="luckyDraw">
      </div>

      <div v-if="pageStyle.tipUrl.length > 0" class='luckMoney_orderTips'>
        <!--从接口获取的url-->
        <a :href="pageStyle.tipUrl" :style="{color: pageStyle.tipBtnTextColor}">
          <i class="icon iconfont icon-tishi"></i>口令提示
        </a>
      </div>
    </div>
    <!--Toast提示框,分为黑底白字和红底白字 红底白色的Class是luckMoney_redToast-->
    <div
      :class="['luckMoney_toast', {'luckMoney_redToast': errorTipType === 2}]"
      v-show="showToast"
    >
      {{toastMsg}}
    </div>
    <!--活动规则弹窗-->
    <game-rule :game-introduction="gameIntroduction" :show-rule.sync="showRule"/>
    <!--中奖记录弹窗-->
    <record-list
      :record-list-data="recordList"
      :show-record-list="showRecordList"
      :authStatus="member.authStatus"
      @getPrizeInfo="getPrizeInfo"
      @getCardExt="getCardExt"
      @toMemberAddressList="toMemberAddressList"
      @logistics="logistics"
      @loadMore="loadMore"
      @close="closeRecordList"
    />
    <!-- 奖品信息弹窗 -->
    <prize-info
      :prize="prizeData"
      :show-prize.sync="showPrize"
      :brandName="brandName"
      :authStatus="authStatus"
      @toMemberAddressList="toMemberAddressList"
      @toAuth="toAuth"
      @getCardExt="getCardExt"
    />
    <!--游戏提醒框-->
    <div class="luckMoney_msgboxAll" v-show="showGameTip">
      <div class='luckMoney_mask' @click="showGameTip = false"></div>
      <div class="luckMoney_msgbox">
        <div class="luckMoney_msgbox_content">
          <div class="luckMoney_msgbox_message" v-html="gameTipMsg"></div>
          <button class="luckMoney_msgbox_btn" @click="showGameTip = false">知道了</button>
        </div>
      </div>
    </div>
    <!-- 未达到参与门槛的弹窗 -->
    <partake-sill
      :showPartake.sync="partakeSill.showPartake"
      :imgUrl="partakeSill.imgUrl"
      :msg="partakeSill.msg"
      gameName="klfl"
    />
  </div>
</template>

<script>
import '@/assets/css/klfl/klfl.css';
import '@/assets/css/iconfont.css';
import RecordList from './record-list.vue';
import GameRule from './game-rule.vue';
import PrizeInfo from './prize-info.vue';
import PartakeSill from '@/components/partake-sill.vue';
import { setWxConfig, hideShare } from '@/utils/wxShare';
import { getQueryString, setTitle, checkEnv } from '@/utils';
import {
  gameWxInfo,
  getRecordList,
  getPrizeInfo,
  getCardExt,
  updateGameStatus,
  verifyGamePassword,
  checkPermission,
} from '@/api/klfl';

export default {
  name: 'klfl',
  components: {
    RecordList,
    GameRule,
    PrizeInfo,
    PartakeSill,
  },
  data () {
    return {
      // 页面样式等配置相关
      pageStyle: {
        // 页面背景图片
        bodyBgImgUrl: '',
        // 提交按钮的背景图片
        submitBtnImgUrl: '',
        // 活动规则按钮的字体颜色
        ruleBtnTextColor: '',
        // 中奖纪录按钮的字体颜色
        recordBtnTextColor: '',
        // 口令提示按钮的字体颜色
        tipBtnTextColor: '',
        // 口令提示按钮的跳转链接
        tipUrl: '',
      },
      // 参与门槛弹窗的数据
      partakeSill: {
        canPlay: false,
        showPartake: false,
        imgUrl: '',
        msg: '',
      },

      // 输入的口令
      password: '',
      isPending: false,

      // 是否展示toast
      showToast: false,
      toastMsg: '',
      // toast窗类型
      errorTipType: 1,

      // 是否现在活动规则弹窗
      showRule: false,
      // 活动规则描述
      gameIntroduction: '',

      // 是否显示游戏提醒
      showGameTip: false,
      gameTipMsg: '',

      // 是否展示奖品信息弹窗
      showPrize: false,
      // 奖品数据
      prizeData: {},
      // 商家名称
      brandName: '',
      gameActivityId: '',

      // 是否显示中奖记录列表
      showRecordList: false,
      // 获奖列表数据
      recordList: [],
      // 用户信息
      member: {
        authStatus: 0,
      },
      authStatus: 0,
      // 中奖记录列表分页相关
      pageSize: 50,
      currentPage: 1,
    }
  },
  methods: {
    // gameActivityId获取和使用有点混乱，有时间再优化。。。
    // 校验用户有没有达到参与门槛
    checkPermission() {
      const params = {
        activityId: getQueryString('activityId'),
        memberId: getQueryString('memberId'),
      };
      checkPermission(params).then((res) => {
        if (res.result.res === 'ok') {
          // 可以玩
          this.partakeSill.canPlay = true;
        } else {
          // 不可以玩
          this.partakeSill.showPartake = true;
          this.partakeSill.canPlay = false;
        }
      })
    },
    // 参与游戏
    luckyDraw() {
      const params = {
        gamePassword: this.password,
        gameActivityId: this.gameActivityId,
        memberId: getQueryString('memberId'),
      };
      if (!this.partakeSill.canPlay && this.partakeSill.msg.length > 0) {
        this.partakeSill.showPartake = true;
        return;
      }
      if (this.isPending) return;
      this.isPending = true;
      verifyGamePassword(params).then((res) => {
        const { errcode, errmsg, gameBeginDate } = res.returnMap.verifyCodeResInfo;
        this.isPending = false;
        if (errcode === 0) {
          // 中奖了
          this.prizeData = res.returnMap.verifyCodeResInfo;
          this.brandName = res.returnMap.brandName;
          this.authStatus = res.returnMap.authStatus || 0;
          this.showPrize = true;
          return;
        }
        switch (errcode) {
          case 1004:
            //游戏未开始
            this.showGameTipBox(`游戏将在${gameBeginDate}开始<br/>请耐心等待哦!`);
            break;
          case 1005:
            this.showGameTipBox(`哎呀，游戏已经结束了!`);
            break;
          default:
            this.showToastBox(errmsg);
            break;
        }
      })
    },
    // 获取页面信息
    getWxInfo() {
      const params = {
        activityId: getQueryString('activityId'),
        memberId: getQueryString('memberId'),
      };
      gameWxInfo(params).then((res) => {
        if (res.errorCode === 0) {
          const {
            gameActivityDTO,
            gameWinRecordId,
            addressStatus,
            title,
          } = res.result;
          const {
            buttonImgUrl,
            backgroudImgUrl,
            gameIntroduction,
            gameActivityId,
            shareSetting,
            shareLink,
            shareFlag,
          } = gameActivityDTO;
          const {
            gameRuleTitleFontColor,
            winRecordTitleFontColor,
            tipFontColor,
            tipUrl,
            errorTipType,
          } = gameActivityDTO.activityCustom;

          const {
            tipImageUrl,
            tipTitle,
          } = res.result.attendCondition ? res.result.attendCondition : {};

          this.pageStyle.submitBtnImgUrl = buttonImgUrl || require('@/assets/img/klfl/page-btn.png');
          this.pageStyle.bodyBgImgUrl = backgroudImgUrl || require('@/assets/img/klfl/page-bg.jpg');
          this.pageStyle.ruleBtnTextColor = gameRuleTitleFontColor;
          this.pageStyle.recordBtnTextColor = winRecordTitleFontColor;
          this.pageStyle.tipBtnTextColor = tipFontColor || '#333';
          this.pageStyle.tipUrl = tipUrl;

          this.errorTipType = errorTipType;
          this.gameIntroduction = gameIntroduction;
          this.gameActivityId = gameActivityId;
          setTitle(title);
          this.partakeSill.msg = tipTitle;
          this.partakeSill.imgUrl = tipImageUrl;

          this.checkPermission();
          if (gameWinRecordId && addressStatus && addressStatus === 1 ) {
            this.showGameTipBox('礼品等待发货<br/>可至中奖记录查看礼品状态');
          }
          if (shareFlag) {
            setWxConfig(getQueryString('memberId'), shareSetting, shareLink, 'klfl');
          } else {
            hideShare(getQueryString('memberId'));
          }
        }
      });
    },
    // 获取奖励记录数据 并展示奖励记录列表
    getRecordList() {
      const params = {
        gameActivityId: getQueryString('activityId'),
        memberId: getQueryString('memberId'),
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      };
      getRecordList(params).then((res) => {
        if (res.errorCode === 0) {
          let result = res.result.result || [];
          const returnMap = res.returnMap || {};
          /**
           * 这里不是bug
           * 这是产品要求实物奖励，一直可以点击进入地址列表页
           * 我不想改渲染逻辑，所以在这里指定实物奖励的status为2
           * */
          result = result.map((item) => {
            if (item.prizeReferType === 3) {
              item.status = 2;
            }
            return item;
          })
          this.recordList.splice(this.recordList.length, 1, ...result);
          this.member = { ...{ authStatus: 0 } , ...returnMap.member };
        }
        this.showRecordList = true;
      })
    },
    // 获取奖品信息
    getPrizeInfo(gameActivityWinRecordId) {
      getPrizeInfo({ winRecordId: gameActivityWinRecordId }).then((res) => {
        this.prizeData = res.result;
        this.brandName = res.returnMap.brandName;
        this.authStatus = res.returnMap.authStatus || 0;
        this.showPrize = true;
      });
    },
    /**
     * 领取卡券
     * 领取成功之后，更新领取按钮的状态，同事将卡券添加到微信卡券包
     * 添加成功之后，更新游戏状态
     * */
    getCardExt(opt) {
      const { wechatCardId, cardLogId, gameActivityWinRecordId } = opt;
      getCardExt({ wechatCardId, cardLogId, memberId: getQueryString('memberId') }).then((res) => {
        if (res.errorCode === 0) {
          // 将卡券添加到卡包
          /* eslint-disable-next-line */
          wx.addCard({
            // 需要添加的卡券列表
            cardList: [{
              cardId: wechatCardId,
              cardExt: res.message,
            }],
            success() {
              this.showPrize = false;
              this.showRecordList = false;
              // 更新游戏状态
              updateGameStatus({ winRecordId: gameActivityWinRecordId, status: 2 });
            },
          });
        }
      });
    },
    // 跳转到地址页面
    toMemberAddressList(gameActivityWinRecordId) {
      window.location.href = `${window.location.origin}/gicfwh/member-address-list?gameWinRecordId=${gameActivityWinRecordId}}`;
    },
    // 跳转到物流信息页面
    logistics(opt) {
      window.location.href = `${window.location.origin}/gicfwh/show_gift_logistics_details?winRecordId=${opt.gameActivityWinRecordId}&prizeReferId=${opt.prizeReferId}`;
    },
    // 跳转到认证页面
    toAuth(gameActivityId) {
      window.location.href = `${window.location.origin}/gicfwh/to_auth_page?activityId=${gameActivityId}&gicRedirect=true`;
    },
    // 显示toast
    showToastBox(msg, type) {
      this.toastMsg = msg;
      this.errorTipType = type || 1;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
    // 展示游戏提示信息
    showGameTipBox(msg) {
      this.gameTipMsg = msg;
      this.showGameTip = true;
    },
    // 加载下一页的数据
    loadMore() {
      this.currentPage = this.currentPage + 1;
      this.getRecordList();
    },
    // 关闭奖励列表
    closeRecordList() {
      this.showRecordList = false;
      this.recordList.splice(0);
      this.currentPage = 1;
    },
  },
  mounted() {
    if (checkEnv()) {
      this.getWxInfo();
    }
  },
}
</script>
