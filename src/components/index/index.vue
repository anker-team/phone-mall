<template lang="html">
    <div class="page" id="Index">
        <Headers textname="首页" />
        <div class="main hasUpDown">
          <div class="wrap pb10">
              <!-- 轮播图 -->
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  <div class="swiper-slide swiper-list" v-for="item in bannerlist">
                    <img :src="item.img" alt="" />
                  </div>
                </div>
                <div class="swiper-pagination"></div>
              </div>
          </div>
        </div>
        <Footers />
    </div>
</template>

<script>
import Headers from '../base/Header.vue';
import Footers from '../base/Footer.vue';
import Swiper from '../../../static/js/swiper.min.js'
export default {
  name:'index',
  data() {
    return {
      bannerlist: []
    }
  },
  components:{
    Headers,
    Footers
  },
  mounted() {
    this.getBannerList();
    // 自动轮播
    setTimeout(() => {
      const swiper = new Swiper('.swiper-container',{
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
        },
        paginationClickable: true,
        autoplay: {
            stopOnLastSlide:true,
        },

      });
    },300)
  },
  methods: {
    // 获取轮播图列表
    getBannerList() {
      const that = this;
      this.$http.get('/api/bannerdata').then(function(res){
        console.log(res);
        console.log(res.body.data);
        this.bannerlist = res.body.data;
      })
    },
  }
}
</script>

<style lang="css">
@import '../../../static/css/swiper.min.css';
.swiper-container {
    background: #ddd;
}
.swiper-list img {
    width: 100%;
}
</style>
