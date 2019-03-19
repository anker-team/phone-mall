<template>
  <div id="app" class="app">
    <div class="normal" v-if="ismobile">
        <router-view/>
    </div>
    <div class="isMobile" v-if="!ismobile">
        <img src="./assets/images/logo.png" alt="" />
        <p>VUE.JS</p>
        <p class="mt40">请在移动端打开，并刷新页面</p>
    </div>
  </div>
</template>

<script>
import '../src/assets/js/rem.js'
export default {
  name: 'App',
  data() {
    return {
      ismobile:false
    }
  },
  mounted() {
    // 判断设备及浏览器版本
    let userAgent = window.navigator.userAgent.toLowerCase();
    if(userAgent.indexOf("android") > -1) {
        this.ismobile = true;
        return ;
    }
    if(userAgent.indexOf("iphone") > -1) {
        this.ismobile = true;
        return ;
    }
    if(userAgent.indexOf("ipad") > -1) {
        this.ismobile = true;
        return ;
    }
    if(userAgent.indexOf("windows phone") > -1) {
        this.ismobile = true;
        return ;
    }
  }
}
</script>

<style>
@import '../src/assets/css/style.css';
@import '../src/assets/css/flex.css';

html, body { width: 100%; height: 100%;max-width: 640px;margin: auto;}
body {
    background: #f1f1f1;
}
#app {
    width: 100%;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: .35rem;
    margin: auto;
}
.main {
    padding-top: 1.2rem;
}
.hasUpDown {
    padding: 1.2rem 0;
}
.hasfixtop {
    /* padding: 1.2rem 0; */
    padding-top: 1.2rem;
}
.hasfixbar {
    padding-bottom: 1.3rem;
}
.isMobile {
    text-align: center;
    padding-top: 20%;
}
</style>
