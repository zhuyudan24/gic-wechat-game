<template>
  <!-- eslint-disable max-len -->
  <div class="wrapper light">
    <div class="main_box">
      <template v-if="prizeList.length > 0">
        <div class="item_box" v-for="(line, rowIdx) in [0, 1, 2]" :key="rowIdx">
          <div
            class="item"
            :class="current === y ? 'chosed':''"
            v-for="(y, colIdx) in colArr(line*3, line*3+2)"
            :key="colIdx" >
            <template v-if="y !== 4">
            <div class="item_main" >
              <img :src="require(`@assets/img/dzp/${skinName}/item_on.png?v2.0`)"
                    class="item_on"
                    alt="">
              <div class="price">
                <template v-if="y<4 && prizeList[y].prizeType===1">
                  <img class="jifen" :src="require(`@assets/img/dzp/${skinName}/qb_n.png?v2.0`)" alt="">
                  <div class="f_img"></div>
                  <p>{{prizeList[y].prizeIntegral}}积分</p>
                </template>
                <template v-else-if="y>4 && prizeList[y-1].prizeType===1">
                  <img class="jifen" :src="require(`@assets/img/dzp/${skinName}/qb_n.png?v2.0`)" alt="">
                  <div class="f_img"></div>
                  <p>{{prizeList[y-1].prizeIntegral}}积分</p>
                </template>
                <template v-else-if="y<4 && prizeList[y].prizeType===2">
                  <img class="quan" :src="require(`@assets/img/dzp/${skinName}/cash_n.png?v2.0`)" alt="">
                  <div class="f_img"></div>
                  <p>
                    {{ prizeList[y].cardName.length>6
                    ? prizeList[y].cardName.substring(0,6)
                    : prizeList[y].cardName }}
                  </p>
                </template>
                <template v-else-if="y>4 && prizeList[y-1].prizeType==2">
                  <img class="quan" :src="require(`@assets/img/dzp/${skinName}/cash_n.png?v2.0`)" alt="">
                  <div class="f_img"></div>
                  <p>
                    {{ prizeList[y-1].cardName.length>6
                    ? prizeList[y-1].cardName.substring(0,6)
                    : prizeList[y-1].cardName }}
                    </p>
                </template>
                <template v-else>
                  <img
                    class="fail"
                    :src="require(`@assets/img/dzp/${skinName}/face_n.png?v2.0`)"
                    alt=""/>
                  <div class="f_img"></div>
                  <p>再接再厉</p>
                </template>
              </div>
            </div>
            </template>
            <!-- 抽奖btn -->
            <template v-else>
              <div class="lottery">
                <button class="lottery_btn" @click="getGamePrize">
                </button>
                <!-- <button class="lottery_no_btn" ></button> -->
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { gameStart } from "@/api/dzp";

let timer;
const rollOrder = [0,1,2,5,8,7,6,3]; // 转动顺序
let orderIdx = 0; // 选中的rollOrder index
export default {
  name: 'nine',
  props: {
    prizeList: {
      type: Array,
      default() {
        return []
      },
    },
    skinName: {
      type: String,
      default: 'heijin',
    },
  },
  data() {
    return {
      flag: false, // 是否在转的标志
      current: -1, // 当前选中的项
      speed: 30, // 转动的速率
      goal: 0, // 中奖目标 0-8 没有4
    }
  },
  computed: {},
  methods: {
    // 重置转盘
    reset() {
      this.flag = false;
      // this.current = 0;
      this.speed = 30;
      this.goal = 0;
    },
    colArr(start, end) {
      const arr = [];
      for (let i = start; i <= end; i += 1) {
        arr.push(i);
      }
      return arr
    },
    // 开始转盘抽奖
    getGamePrize() {
      if (!this.flag) {
        // ajax获取数据
        // 调取父组件 - 是否满足条件转动
        this.$emit("rollConditions", (goal) => {
          this.goal = goal > 3 ? goal + 1 : goal;
          this.flag = true;
          this.roll();
        })
      }
    },
    // 转动转盘
    roll() {
      const that = this;
      return new Promise((resolve, reject) => {
        timer = setTimeout(() => {
          that.speed += 10;
          if (that.speed > 200 && this.goal === rollOrder[orderIdx]) {
            clearTimeout(timer);
            // that.flag = false;
            // 找到对应的中奖奖项
            let idx = that.current;
            idx = idx > 4 ? idx - 1 : idx; // -1点击按钮位置
            that.$emit('rollDone', that.prizeList[idx]);
          } else {
            if (orderIdx > 6) {
              orderIdx = 0;
            } else {
              orderIdx += 1;
            }
            that.current = rollOrder[orderIdx];
            that.roll();
          }
        }, that.speed);
      })
    },
  },
  destroyed() {
    this.timer = null;
  },
}
</script>
