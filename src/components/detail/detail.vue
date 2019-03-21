<template lang="html">
    <div class="page">
        <!-- 顶部栏 -->
        <header-ctr>
           <h4 slot="headerctr">商品详情</h4>
        </header-ctr>
        <!-- 内容详情 -->
        <div class="main hasfixbar">
            <!-- 轮播图 -->
            <div class="imgbox">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide detail-imglist" v-for="item in productdata.imgdata">
                            <img :src="item" alt="" />
                        </div>
                    </div>
                    <div class="swiper-pagination">
                    </div>
                </div>
            </div>
            <!-- 商品信息 -->
            <div class="block detail-wrap">
                <div class="module-wrap padding-block">
                    <p class="ptitle">{{productdata.title}}</p>
                    <div class="price-block">
                        <p class="realprice c-fc1"><sub>￥</sub>{{productdata.price}}</p>
                    </div>
                    <div class="d-note flexbox">
                        <span class="postage flex-1 tl">快递：0.00</span>
                        <span class="sales flex-1 tc">月销量 349823件</span>
                        <span class="delivery flex-1 tr">广东深圳</span>
                    </div>
                </div>
            </div>
            <!-- 规格等block -->
            <div class="block-box mt10">
                <div class="block spec-block" v-on:click="isCoverShow = !isCoverShow">
                    <span class="txt">{{specText}}</span>
                    <span class="rgt blockmore"><i></i><i></i><i></i></span>
                </div>
            </div>

            <!-- 详情 -->
            <div class="message module-wrap mt10">
                <div class="txt">
                    {{productdata.text}}
                </div>
                <div class="txt">
                    {{productdata.note}}
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <div class="detail-footer footer">
            <div class="flexbox detail-buttons">
                <div class="flex-1">
                    <span class="shop-btn orange w50" v-on:click="addCart()">加入购物车</span>
                    <span class="shop-btn red w50" v-on:click="buyProduct()">立即购买</span>
                </div>
            </div>
        </div>

        <!-- 规格选择弹出 -->
        <!-- 遮罩层 -->
        <transition name="fade">
            <div class="shade" v-if="isCoverShow">
            </div>
        </transition>
        <transition name="slideUp">
            <div class="cover-wrap" v-if="isCoverShow">
                <span class="coverclose" v-on:click="isCoverShow = !isCoverShow">x</span>
                <div class="covertop">
                    <div class="pic">
                        <img src="//img.alicdn.com/bao/uploaded/i1/1917047079/TB2ExXzblY85uJjSZPcXXaGGpXa_!!1917047079.jpg_200x200Q50s50.jpg_.webp" alt="" />
                    </div>
                    <div class="info">
                        <p class="c-fc1 price">￥{{productdata.price}}</p>
                        <p class="sku">{{CheckSpecValue}}</p>
                    </div>
                </div>
                <div class="coverbody">
                    <div class="spec-inner" v-for="(spec,index) in productSpec">
                        <div class="label">
                            {{spec.value}}
                        </div>
                        <div class="txt">
                            <span class="spec" v-for="item in spec.data">
                              <input type="radio" :id="'product' + item.id" :name="item.type" :value="item.text" :data-price="item.price">
                              <label :for="'product' + item.id">{{item.text}}</label>
                            </span>
                        </div>
                    </div>
                    <div class="spec-inner">
                        <div class="label fl">
                            购买数量
                        </div>
                        <div class="txt fr">
                            <div class="number">
                                <span class="decrease" @click="decrease()">-</span>
                                <span class="txt">{{productNum}}</span>
                                <span class="increase" @click="increase(10)">+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import HeaderCtr from '../base/HeaderCtr.vue'
import Swiper from '../../../static/js/swiper.min.js'
export default {
  name: 'detail',
  data() {
    return {
        productid: this.$route.query.id,    // 商品id
        productdata: [],                    // 获取到的商品详情data
        specText: '请选择产品规格',          // 产品规格text
        CheckSpecValue: '请选择规格',        // 选中的规格的value
        productSpec: this.$store.state.productSpec,     // 产品规格
        productNum: 1,           // 商品数量
        isCoverShow: false,      // 是否弹出规格选择
    }
  },
  components: {
    HeaderCtr,
  },
  mounted() {
    this.getMessage();
    setTimeout(() => {
      const swiper = new Swiper('.swiper-container',{
        pagination: {
            el: '.swiper-pagination'
        },
        paginationClickable: true,
        autoplay: {
            stopOnLastSlide:true,
        },
        loop:true,
      });
    },300)
  },
  methods: {
    // 获取商品详情
    getMessage() {
      // let detailid = '/api/detail?id=' + this.productid ;
      // console.log(detailid);
      this.$http.get('/api/detail',[{id: this.productid}]).then(function(res) {
          console.log(res);
          console.log(this.productid);
          this.productdata = res.body.data;
      })
    },
    // 数量减少
    decrease() {
        if(this.productNum > 1){
            this.productNum--;
        }
    },
    // 数量增加
    increase(max) {
        if(this.productNum < max) {
          this.productNum++;
        }
    },

    // 加入购物车
    addCart() {

    },
    // 立即购买
    buyProduct() {

    },
  },
}
</script>

<style lang="css">
@import '../../../static/css/swiper.min.css';
.block-box {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}
.block-box .block {
    background: #fff;
    padding: 3% 3%;
    position: relative;
    font-size: .4rem;
}
.spec-block .txt {
    display: block;
    width: 8rem;
    line-height: 1.4;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.block .rgt {
    float: right;
    position: absolute;
    right: 3%;
    top: 0;
    height: 100%;
}
.blockmore i {
    display: inline-block;
    vertical-align: bottom;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #999;
    margin-left: 3px;
}

.detail-imglist img {
    width: 100%;
}
.ptitle {
    font-size: .44rem;
    color: #000;
    padding: 3% 0;
}
.realprice {
    font-size: .5rem;
}
.realprice sub {
    font-size: .3rem;
    bottom: -.1em;
}
.d-note {
    color: #999;
    font-size: 12px;
    line-height: 30px;
}
.message .txt {
    padding: 3%;
    font-size: .37rem;
    line-height: .6rem;
}

.footer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 9999997;
    height: 1.2rem;
    border-top: 1px solid #ddd;
    background: #fff;
}
.shop-btn {
    float: left;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: .4rem;
}
.shop-btn.w50 { width: 50%; }
.cover-wrap {
    z-index: 999999;
    background: #fff;
    width: 100%;
    height: 10rem;
    position: fixed;
    bottom: 1.2rem;
    left: 0;
}
.coverclose {
    position: absolute;
    width: .5rem;
    height: .5rem;
    display: inline-block;
    right: 1%;
    top: 2%;
    text-align: center;
    z-index: 9;
}
.covertop {
    position: relative;
    padding-left: 3.6rem;
    padding-top: 3%;
    padding-right: 3%;
    height: 2.3rem;
    border-bottom: 1px solid #ddd;
}
.covertop .price {
    padding-right: .5rem;
    font-size: .5rem;
}
.covertop .sku {
    font-size: .35rem;
}
.covertop .pic {
    width: 3rem;
    height: 3rem;
    background: #fff;
    border: 1px solid #ddd;
    padding: 3px;
    border-radius: 3px;
    position: absolute;
    top: -1rem;
    left: 3%;
}
.covertop .pic img {
    width: 100%;
    height: 100%;
}
.coverbody {
    height: 7.7rem;
    overflow-y: auto;
    padding: 0 3%;
}

/* 规格列表 */
.spec-inner {
    padding: 10px 0;
    padding-top: 20px;
    border-top: 1px solid #eee;
}
.spec-inner:first-child { border-top: 0px; }
.spec-inner:after {
    content: '';
    display: block;
    clear: both;
}
.spec-inner .label {
    width: 2rem;
    font-size: .4rem;
    color: #000;
}
.spec-inner .txt {
    /* padding-bottom: 10px; */
}
.spec-inner .spec {
    display: inline-block;
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: .35rem;
    color: #333;
    text-align: center;
    position: relative;
    margin-left: 10px;
    margin-top: 10px;
}
.spec-inner .txt .spec:first-child { margin-left: 0px; }
.spec-inner .spec label {
    display: inline-block;
    padding: 0 10px;
    width: 100%;
    height: 100%;
    background: #eee;
    border-radius: .2rem;
}
.spec-inner .spec input:checked+label {
    background: #ff0036;
    color: #fff;
}
.spec-inner .spec input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
}
.spec-inner .number {
    display: inline-block;
}
.spec-inner .number .txt {
    display: inline-block;
    width: 40px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    vertical-align: top;
    background: #eee;
    border: 0px;
}
.spec-inner .number .decrease {
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    font-weight: bold;
    background: #eee;
}
.spec-inner .number .increase {
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    font-weight: bold;
    background: #eee;
}
</style>
