<template>
  <div>
    <div class="bg">
      <img :src="bannerUrl" alt="">
    </div>
    <div class="bg bg2">
        <img :src="require(`@assets/img/ggk/${gameDetail.skinName}/bg_02.jpg`)" alt="">
        <p class="cqcs">
          <template v-if="gameDetail.freeCount > 0 && gameDetail.hasIntegral == 1">
            <!-- eslint-disable-next-line -->
            <template v-if="gameDetail.gameFreeDay == 1">今日</template>免费次数<strong> {{gameDetail.freeCount}} 次</strong>
          </template>
          <template v-else>
            抽奖需：<strong>{{gameDetail.gameIntegral}} </strong>积分/次
          </template>
        </p>
        <div class="eraser_box">
          <div class="score_box">
              <span class="myScore">{{userInfo.accumulatPoints}}</span>
          </div>
          <div class="wrapper light">
            <div class="eraser">
              <scratch-card
                ref="card"
                v-if="start"
                element-id='scratchWrap'
                :ratio="0.5"
                :move-radius="15"
                :skinName="gameDetail.skinName"
                :coverImg="require(`@assets/img/ggk/${gameDetail.skinName}/grey.jpg`)"
                :start-callback="startCallback"
                :clear-callback="clearCallback"
              >
                <p slot="result" class="e_info">{{winInfo}}</p>
              </scratch-card>
              <img v-show="!start" class="maskImg"
                :src="require(`@assets/img/ggk/${gameDetail.skinName}/grey.jpg`)" alt="">
              <button v-show="!start" @click="rollConditions"></button>
            </div>
          </div>
        </div>
    </div>
    <div class="bg">
        <img :src="require(`@assets/img/ggk/${gameDetail.skinName}/bg_03.jpg`)" alt="">
        <button class="link" @click="getPrize"></button>
    </div>
    <div class="bg">
      <img :src="require(`@assets/img/ggk/${gameDetail.skinName}/bg_04.jpg`)" alt="">
      <div class="list" id="maqBox">
        <ul id="con1" :class="{anim:animate===true}">
          <li v-for="(item,idx) in winList" :key="idx">
            <span>{{item.nick}}</span>
            <span class="ellipsis">{{item.price}}</span>
            <span>{{item.time}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg info">
      <img :src="require(`@assets/img/ggk/${gameDetail.skinName}/bg_05.jpg`)" alt="">
      <div class="rule_box"><p>{{gameDetail.gameIntroduction}}</p></div>
    </div>
    <!-- 中奖提示  积分/卡券 -->
    <div class="win_cash alert"
      v-show="(this.prize.prizeType === 1 || this.prize.prizeType === 2) && this.clear "
    >
        <div class="wrapper_box">
            <h3 class="title" v-if="gameDetail.skinName !== 'nihong'">恭喜您</h3>
            <div class="alert_main">
              <template v-if="prize.prizeType === 1">
                <p class="win_score_info">
                  获得<span class="score">{{prize.prizeIntegral}}</span>积分
                </p>
                <div class="win_score_box">
                  <img
                    :src="require(`@assets/img/ggk/${gameDetail.skinName}/win_icon_score.png`)"
                    alt="">
                  <span class="score_">{{prize.prizeIntegral}}</span>
                </div>
                <p class="win_score_detail">
                  <span class="score">{{prize.prizeIntegral}}</span>积分已放入您的账户中
                </p>
              </template>
              <template v-if="prize.prizeType === 2">
                <p class="win_cash_info">获得1张
                  <span class="cash ellipsis">{{prize.cardName}}</span>
                </p>
                <div class="win_cash_box">
                  <img
                    :src="require(`@assets/img/ggk/${gameDetail.skinName}/win_icon_cash.png`)"
                    alt="">
                  <span class="cash_">
                    <template v-if="prize.cardType === 0">
                      <i>￥</i>{{prize.cardDenomination}}
                    </template>
                    <template v-else-if="prize.cardType === 1">
                      {{prize.cardDenomination}}折
                    </template>
                    <template v-else>兑换</template>
                  </span>
                  <span class="quan">券</span>
                </div>
                <p class="win_cash_detail">
                  <span class="cash ellipsis">{{prize.cardName}}</span>已放入您的账户中
                </p>
              </template>
                <p class="win_cash_des"> 可在“我的-中奖记录”中查看</p>
                <div class="win_cash_btn">
                  <button class="again" @click="close">
                    {{ prize.cardType === 1 ? '再来一次' : '确定' }}
                  </button>
                  <button class="get" v-if="prize.cardType === 1" @click="getPrize">立即领取</button>
                </div>
            </div>
            <button class="close" @click="close"></button>
        </div>
    </div>
    <!-- 未中奖提示 -->
    <div class="fail alert" v-show="showFail">
      <div class="wrapper_box">
        <h3 class="title" v-if="gameDetail.skinName!=='nihong'">很遗憾</h3>
        <div class="alert_main">
          <div class="win_fail_box">
            <img :src="require(`@assets/img/ggk/${gameDetail.skinName}/fail.png`)" alt="">
          </div>
          <p class="win_score_detail"> 很遗憾</p>
          <p class="win_score_des">没有获得任何奖品…</p>
          <div class="win_score_btn"><button class="again" @click="close">再来一次</button></div>
        </div>
        <button class="close" @click="close"></button>
      </div>
    </div>
    <!-- 我的中奖列表 -->
    <div class="award_list alert" scroll="no" v-if="showMyPrize">
      <div class="list_main">
        <div class="close" @click="close"></div>
          <div class="award_main">
            <dm-my-win-record
            :gameType="ggk"
            :skinName="gameDetail.skinName"
            :myWinRecordList="myWinRecordList"
            :code="myWinRecordCode"/>
          </div>
      </div>
    </div>
    <!-- 积分/限制游戏提示 -->
    <div class="score_no alert" v-show="integralLess">
      <div>
        <span>{{warnInfo}}</span>
      </div>
    </div>
    <!-- 消耗积分提示 -->
    <dmConsumePrompt ckey="ggk"
      :integral="gameDetail.gameIntegral"
      :skinName="gameDetail.skinName"
      :show="showPrompt"
      @handleClosePrompt="handleClosePrompt"
      @cancel="cancel"
      @play="play">
      <span slot="consumeWarn">{{ consumeWarn }}</span>
    </dmConsumePrompt>
    <!-- 不符合门槛 -->
    <dmPartakeSill
      gameName="ggk"
      :showPartake="attendCondition.show"
      :msg="attendCondition.tipTitle"
      :imgUrl="attendCondition.tipImageUrl"/>
  </div>
</template>

<script>
import skin from './component';

export default skin;
</script>
