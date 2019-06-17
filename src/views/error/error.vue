<template>
  <div id="error" class="error-page">
    <div class="error-page-content">
      <div class="error-image">
        <div class="error-image-img">
          <img :src="require('../../../public/static/img/page_error_icon.png')">
        </div>
        <div class="error-text">
          <p class="error-text-top">咦...</p>
          <p class="error-text-bottom">程序猿GG心情不好，离家出走了！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../../public/static/css/error.css";

export default {
  name: "error",
  created() {
    document.getElementsByTagName('body')[0].style.height = `${window.innerHeight}px`;
  },
  mounted() {
    const error = document.getElementById("error");
    error.style.height = `${document.body.clientHeight}px`;
    error.style.width = `${document.body.clientWidth}px`;
  },
};
</script>
