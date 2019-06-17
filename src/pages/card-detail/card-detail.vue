<template>
  <div class="wrapper">
    <div class="header">
      <h3 class="title">积分会员</h3>
      <div class="card">
        <p>卡号：{{assetsData.cardNo}}</p>
        <svg id="code" class="code"></svg>
        <p>向店员出示条形码，使用会员卡</p>
      </div>
    </div>
    <div class="tabs">
      <div :class="['tab-item', {active: tabIndex === 0}]" @click="tabIndex = 0">会员权益</div>
      <div :class="['tab-item', {active: tabIndex === 1}]" @click="tabIndex = 1">会员信息</div>
    </div>
    <div class="tab-cont">
      <rights v-show="tabIndex === 0"/>
      <info v-show="tabIndex === 1" :assets-data="assetsData"/>
    </div>
  </div>
</template>

<script>
import { getMemberInfo } from '@/api/anzheng';
import { getQueryString } from '@/utils';
import JsBarCode from 'jsbarcode';
import Rights from './components/rights.vue';
import Info from './components/info.vue';
/**
 * 生成条形码
 * */

export default {
  name: 'app',
  components: {
    Rights,
    Info,
  },
  data() {
    return {
      memberId: '',
      enterpriseId: '',
      tabIndex: 0,
      assetsData: {
        // 集团
        cliqueGradeName: '',
        cliqueStoredValue: 0,
        // 商户
        gradeName: '',
        storedValue: 0,
        cardNo: '',
      },
    }
  },
  methods: {
    getAssets() {
      const params = {
        type: 2,
        memberId: this.memberId,
        enterpriseId: this.enterpriseId,
      }
      getMemberInfo(params).then((res) => {
        const { result } = res;
        this.assetsData = Object.assign(this.assetsData, result);
        JsBarCode('#code', this.assetsData.cardNo, {
          height: 100,
          background: '',
          displayValue: false,
        });
      })
    },
  },
  created() {
    let wxaParam = getQueryString('wxaParam');
    wxaParam = JSON.parse(wxaParam);
    this.memberId = wxaParam.memberId;
    this.enterpriseId = wxaParam.enterpriseId;
    this.getAssets();
  },
};
</script>

<style scoped>
  .wrapper, .wrapper *{
    box-sizing: border-box;
  }

  .header {
    padding: 18px;
    width: 100%;
    height: auto;
    background: #243042;
  }

  .title {
    margin: 10px auto 15px;
    text-align: center;
    font-size: 18PX;
    color: #fff;
  }

  .card {
    padding: 10px;
    width: 100%;
    height: auto;
    text-align: center;
    color: #666;
    font-size: 14px;
    background: #f7f8f9;
    border-radius: 8px;
  }

  .card .code {
    max-height: 120px;
  }

  .tabs {
    display: flex;
    padding-top: 10px;
    padding-bottom: 20px;
    width: 100%;
    height: auto;
  }

  .tab-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 35px;
    font-size: 16px;
    color: #8E99AE;
  }

  .tab-item.active {
    color: #2C3038;
  }

  .tab-item.active:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 1;
    width: 30px;
    height: 0;
    transform: translate(-50%, 0);
    border-top: 2px solid #333;
  }

  .tab-cont {
    padding: 0 10px 10px;
  }
</style>
