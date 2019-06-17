<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/dzp">大转盘</router-link> |
      <router-link to="/ggk">刮刮卡</router-link> |
      <router-link to="/ptyx">拼图游戏</router-link> |
      <router-link to="/znm">找你马</router-link> |
      <router-link to="/klfl">口令福利</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
// #nav {
//   padding: 30px;
//   a {
//     font-size: 14px;
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
