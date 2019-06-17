<template>
  <div>
    <div v-if="isMember">
      <h3 class="info-title">会员信息</h3>
      <ul class="info-list">
        <li>
          <span>姓名：</span>
          <span>张三</span>
        </li>
        <li>
          <span>会员卡号：</span>
          <span>JZ889411647787</span>
        </li>
        <li>
          <span>会员等级：</span>
          <span>普卡（玖姿）</span>
        </li>
        <li>
          <span>会员生日：</span>
          <span>2018-3-23</span>
        </li>
        <li>
          <span>专属服务门店：</span>
          <span>玖姿微信商城</span>
        </li>
        <li>
          <span>当前可用积分：</span>
          <span>100</span>
        </li>
        <li>
          <span>品牌储值余额：</span>
          <span>1000</span>
        </li>
        <li>
          <span>集团储值余额：</span>
          <span>2000</span>
        </li>
      </ul>
      <div class="get-pwd" @click="getPwd">点击获取消费密码</div>
    </div>
    <div v-else class="reg-tip">
      您尚未认证身份，请前
      <br>
      往会员中心小程序认证
    </div>
    <div v-if="showLoading" class="loading-mark">
      <div class="loading">
        <loading/>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from './loading.vue';

/**
 * 数据绑定，业务流程控制
 * */
export default {
  name: 'member-info',
  components: { Loading },
  data() {
    return {
      showLoading: false,
      isMember: false,
      infoData: {},
      pwdData: {},
    }
  },
  methods: {
    // 获取用户信息
    getMemberInfo() {
      /**
       * 如果还没有认证，就显示认证的页面
       * 如果已经认证，就显示会员信息页面
       * */
      console.log('getMemberInfo');
    },
    // 获取消费密码
    getPwd() {
      /**
       * 获取消费密码时，弹出loading
       * 获取之后跳转到获取成功的页面并关闭loading弹窗
       * */
      console.log('getPwd');
      this.$router.push('/succ');
    },
  },
  created() {
    this.getMemberInfo();
  },
  destroyed() {
    /**
     * 关闭loading弹窗
     * */
    this.showLoading = false;
  },
};
</script>

<style scoped>
  .info-title {
    padding: 50px 0;
    font-size: 18PX;
    text-align: center;
    color: #333;
    font-weight: bold;
  }
  .info-list {
    margin: 0 auto;
    padding: 40px;
    width: 90%;
    font-size: 14PX;
    line-height: 28PX;
    color: #333;
    background: #f2f2f2;
    border-radius: 10PX;
  }
  .get-pwd {
    margin: 50px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 88px;
    color: #fff;
    font-size: 16PX;
    user-select: none;
    border-radius: 10PX;
    background: #ff3232;
  }
  .get-pwd:active{
    color: #f1f1f1;
    background: #ff1212;
  }
  .reg-tip {
    padding-top: 200px;
    width: 100%;
    height: auto;
    font-size: 16PX;
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
    width: 200px;
    height: 200px;
    transform: translate(-50%, -50%);
  }
</style>
