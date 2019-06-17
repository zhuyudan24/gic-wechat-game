<template>
  <div class="info">
    <h3 class="title">会员信息</h3>
    <div class="table-item">
      <div class="card">集团会员卡</div>
      <h4 class="sub-title">
        {{assetsData.cliqueStoredValue ? assetsData.cliqueStoredValue : 0}}<span>元</span>
      </h4>
      <p class="tip">集团储值余额（抵用实付价）</p>
      <table class="group">
        <tr>
          <th>等级</th>
          <th :class="['level01', {'active-level': assetsData.cliqueGradeName === '普卡'}]">普卡</th>
          <th :class="['level02', {'active-level': assetsData.cliqueGradeName === '金卡'}]">金卡</th>
          <th :class="['level03', {'active-level': assetsData.cliqueGradeName === '白金卡'}]">白金卡</th>
          <th :class="['level04', {'active-level': assetsData.cliqueGradeName === '钻石卡'}]">钻石卡</th>
        </tr>
        <tr>
          <td>升级条件</td>
          <td colspan="4" class="colspan">与您在安正集团的品牌卡等级中的最高级别保持一致</td>
        </tr>
      </table>
    </div>
    <div class="table-item">
      <div class="card">品牌会员卡</div>
      <h4 class="sub-title">
        {{assetsData.storedValue ? assetsData.storedValue : 0}}<span>元</span>
      </h4>
      <p class="tip">品牌预存余额（抵用吊牌价）</p>
      <table class="brand">
        <tr>
          <th>等级</th>
          <th :class="['level01', {'active-level': assetsData.gradeName === '普卡'}]">普卡</th>
          <th :class="['level02', {'active-level': assetsData.gradeName === '金卡'}]">金卡</th>
          <th :class="['level03', {'active-level': assetsData.gradeName === '白金卡'}]">白金卡</th>
          <th :class="['level04', {'active-level': assetsData.gradeName === '钻石卡'}]">钻石卡</th>
        </tr>
        <tr :class="{active: activeIndex === 0}" @click="activeIndex = 0">
          <td>JZ</td>
          <td>注册</td>
          <td>4280≤近一年实付&gt;12800</td>
          <td>12800≤近一年实付&gt;22800</td>
          <td>近一年实付≥22800</td>
        </tr>
        <tr :class="{active: activeIndex === 1}" @click="activeIndex = 1">
          <td>IMM</td>
          <td>注册</td>
          <td>800≤近一年实付&gt;18800</td>
          <td>18800≤近一年实付&gt;28800</td>
          <td>近一年实付≥28800</td>
        </tr>
        <tr :class="{active: activeIndex === 2}" @click="activeIndex = 2">
          <td>FIONACHEN</td>
          <td>注册</td>
          <td>3880≤近一年实付&gt;15800</td>
          <td>15800≤近一年实付&gt;25800</td>
          <td>近一年实付≥25800</td>
        </tr>
        <tr :class="{active: activeIndex === 3}" @click="activeIndex = 3">
          <td>ANZHENG</td>
          <td>注册</td>
          <td>4280≤近一年实付&gt;15800</td>
          <td>15800≤近一年实付&gt;25800</td>
          <td>近一年实付≥25800</td>
        </tr>
        <tr :class="{active: activeIndex === 4}" @click="activeIndex = 4">
          <td>Moissac</td>
          <td>注册</td>
          <td>3880≤近一年实付&gt;15800</td>
          <td>15800≤近一年实付&gt;25800</td>
          <td>近一年实付≥22800</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  props: {
    assetsData: Object,
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
};
</script>

<style scoped>
  .info, .info * {
    box-sizing: border-box;
  }

  .info {
    margin: 0 auto;
    padding: 22px 10px 20px;
    background: #F7F7F7;
    border: 1px solid #AEAEAE;
    border-radius: 8px;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
  }

  .title {
    position: relative;
    padding-bottom: 8px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 20px;
    color: #2C3038;
  }

  .title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 1;
    display: block;
    width: 30px;
    height: 0;
    transform: translate(-50%, 0);
    border-top: 2px solid #AEAEAE;
  }

  .table-item {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    border: 1px solid #8C8C8C;
  }

  .table-item:first-child {
    margin-top: 0;
  }

  .card {
    position: absolute;
    top: 12px;
    right: 0;
    z-index: 1;
    padding-left: 5px;
    width: 85px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
    color: #63666B;
    background: #E0E0E0;
  }

  .card::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -16px;
    z-index: 1;
    display: block;
    width: 20px;
    height: 20px;
    transform: rotateZ(40deg);
    background: #F7F7F7;
    /*border: 1px solid red;*/
  }

  .sub-title {
    text-align: center;
    font-size: 18px;
    color: #45484D;
  }

  .sub-title span {
    padding-left: 8px;
    font-size: 12px;
    color: #63666B;
  }

  .tip {
    margin: 8px 0 18px;
    text-align: center;
    font-size: 12px;
    color: #8B94A3;
  }

  .group th, .group td {
    padding: 5px 0;
    text-align: center;
    color: #63666B;
  }

  .group th:first-child, .group td:first-child {
    color: #2C3038;
  }

  .group th {
    position: relative;
    padding-top: 34px;
  }

  .group th:first-child {
    padding: 0;
    width: 60px;
  }

  td.colspan {
    padding: 0 12px;
    text-align: left;
  }

  .brand {
    /*border: 1px solid #8C8C8C;*/
  }

  .brand tr {
    border-top: 1px solid #8C8C8C;
  }

  .brand th {
    position: relative;
    padding: 34px 2px 2px;
    color: #2C3038;
    background-color: #ECECEC;
  }

  .brand th, .brand td {
    text-align: center;
  }

  .brand th:nth-child(2) {
    width: 52px;
  }

  .brand td {
    padding: 2px;
    color: #63666B;;
  }

  .brand th:first-child {
    padding: 2px;
    border-right: 1px solid #8C8C8C;
  }

  .brand td:first-child {
    color: #2C3038;
    border-right: 1px solid #8C8C8C;
  }

  .active {
    background: #E0E0E0;
  }

  .active td:first-child {
    border-right: none;
  }

  .level01 {
    background-image: url("../img/01.png");
    background-size: 15px 18px;
    background-repeat: no-repeat;
    background-position: center 16px;
  }

  .level02 {
    background-image: url("../img/02.png");
    background-size: 15px 18px;
    background-repeat: no-repeat;
    background-position: center 16px;
  }

  .level03 {
    background-image: url("../img/03.png");
    background-size: 16px 16px;
    background-repeat: no-repeat;
    background-position: center 16px;
  }

  .level04 {
    background-image: url("../img/04.png");
    background-size: 16px 16px;
    background-repeat: no-repeat;
    background-position: center 16px;
  }

  .active-level.level01 {
    background-image: url("../img/01-pre.png");
    background-size: 21px 18px;
    background-position: 12px 16px;
  }

  .active-level.level02 {
    background-image: url("../img/02-pre.png");
    background-size: 21px 18px;
    background-position: 12px 16px;
  }

  .active-level.level03 {
    background-image: url("../img/03-pre.png");
  }

  .active-level.level04 {
    background-image: url("../img/04-pre.png");
  }

  .active-level::before {
    content: '当前等级';
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 1;
    display: block;
    width: 50px;
    transform: translate(-50%, 0);
    color: #CCA962;
  }
</style>
