<template>
  <div class="main">
    <div v-if="showInfo">
      <h3 class="info-title">会员信息</h3>
      <ul class="info-list">
        <li>
          <span>姓名：</span>
          <span>{{infoData.name}}</span>
        </li>
        <li>
          <span>会员卡号：</span>
          <span>{{infoData.cardNo}}</span>
        </li>
        <li>
          <span>会员等级：</span>
          <span>{{infoData.gradeName}}</span>
        </li>
        <li>
          <span>会员生日：</span>
          <span>{{infoData.birthday}}</span>
        </li>
        <li>
          <span>专属服务门店：</span>
          <span>{{infoData.storeName}}</span>
        </li>
        <li>
          <span>当前可用积分：</span>
          <span>{{infoData.accumulatePoints}}</span>
        </li>
        <li>
          <span>品牌储值余额：</span>
          <span>{{infoData.storedValue ? infoData.storedValue : 0}}</span>
        </li>
        <li>
          <span>集团储值余额：</span>
          <span>{{infoData.cliqueStoredValue ? infoData.cliqueStoredValue : 0}}</span>
        </li>
      </ul>
      <div class="get-pwd" @click="getPwd">点击获取消费密码</div>
    </div>
    <div v-if="showRegTip" class="reg-tip">
      您尚未认证身份，请前
      <br>
      往会员中心小程序认证
    </div>
    <div v-if="showLoading" class="loading-mark">
      <div class="loading">
        <loading/>
      </div>
    </div>
    <succ v-if="showSucc" :code="pwdData"/>
  </div>
</template>

<script>
import Loading from './components/loading.vue';
import Succ from './components/succ.vue';
import { getMemberInfo } from '@/api/anzheng';
import { getQueryString } from '@/utils';

/**
 * 数据绑定，业务流程控制
 * */
export default {
  name: 'app',
  components: { Loading, Succ },
  data() {
    return {
      showLoading: false,
      showInfo: false,
      showRegTip: false,
      showSucc: false,
      memberId: '',
      enterpriseId: '',
      infoData: {
        // 会员姓名
        name: '',
        // 卡号
        cardNo: '',
        // 等级
        gradeName: '',
        // 生日
        birthday: '',
        // 服务门店
        storeName: '',
        // 积分
        accumulatePoints: 0,
        // 集团储值余额
        cliqueStoredValue: 0,
        // 品牌储值余额
        storedValue: 0,
      },
      pwdData: 0,
    }
  },
  methods: {
    // 获取用户信息
    getMemberInfo() {
      const params = {
        type: 0,
        enterpriseId: this.enterpriseId,
        memberId: this.memberId,
      }
      getMemberInfo(params).then((res) => {
        const { result } = res;
        this.infoData = Object.assign(this.infoData, result);
        this.changeView('showInfo');
      }).catch(() => {
        this.changeView('showRegTip');
      })
    },
    // 获取消费密码
    getPwd() {
      const params = {
        type: 1,
        enterpriseId: this.enterpriseId,
        memberId: this.memberId,
      }
      this.changeView('showLoading');
      getMemberInfo(params).then((res) => {
        const { result } = res;

        /* result不存在或者result=0，都为获取失败 */
        if (!result) {
          alert('获取失败！');
          this.changeView('showInfo');
          return;
        }

        this.pwdData = result;
        this.changeView('showSucc');
      }).catch(() => {
        this.changeView('showInfo');
      })
    },
    changeView(type) {
      this.showLoading = false;
      this.showInfo = false;
      this.showRegTip = false;
      this.showSucc = false;
      switch (type) {
        case 'showLoading':
          this.showLoading = true;
          break;
        case 'showInfo':
          this.showInfo = true;
          break;
        case 'showRegTip':
          this.showRegTip = true;
          break;
        case 'showSucc':
          this.showSucc = true;
          break;
        default:
          break;
      }
    },
  },
  created() {
    let wxaParam = getQueryString('wxaParam');
    wxaParam = JSON.parse(wxaParam);
    this.memberId = wxaParam.memberId;
    this.enterpriseId = wxaParam.enterpriseId;
    /**
     * 如果还没有认证，就显示认证的页面
     * 如果已经认证，就显示会员信息页面
     * */
    if (this.memberId) {
      this.getMemberInfo();
    } else {
      this.changeView('showRegTip');
    }
  },
};
</script>
<style scoped>
  * {
    box-sizing: border-box;
  }

  .main {
    width: 100vw;
    height: 100vh;
    text-align: left;
    background: #f7f8f9;
  }

  .info-title {
    padding: 25px 0;
    font-size: 18px;
    text-align: center;
    color: #333;
    font-weight: bold;
  }

  .info-list {
    margin: 0 auto;
    padding: 20px;
    width: 90%;
    font-size: 14px;
    line-height: 28px;
    color: #333;
    background: #f2f2f2;
    border-radius: 5px;
  }

  .get-pwd {
    margin: 25px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 44px;
    color: #fff;
    font-size: 16px;
    user-select: none;
    border-radius: 5px;
    background: #ff3232;
  }

  .get-pwd:active {
    color: #f1f1f1;
    background: #ff1212;
  }

  .reg-tip {
    padding-top: 200px;
    width: 100%;
    height: auto;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: #333;
  }

  .loading-mark {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .loading {
    position: absolute;
    top: 40%;
    left: 50%;
    z-index: 1;
    margin: 0 auto;
    width: 100px;
    height: 100px;
    transform: translate(-50%, -50%);
  }
</style>
