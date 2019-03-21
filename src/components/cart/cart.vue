<template lang="html">
    <div class="" id="cart">
        <div class="page">
            <header-ctr>
              <h4 slot="headerctr">购物车</h4>
            </header-ctr>
            <div class="main cart-main">
                <div class="cart-wrap">
                    <div class="cart-block">
                        <div class="cart-list" v-for="(item,index) in cartdata">
                            <cart-list
                            v-bind:cart-message="item"
                            v-bind:index-num="index"
                            >
                            </cart-list>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cartFooterInfo">
                <div class="left">
                    <div class="c-check">
                        <input type="checkbox" ref="allCheckBtn" id="allcheck-cart" checked name="" value="" v-on:change="allCheckState" v-if="AllCheck" />
                        <input type="checkbox" ref="allCheckBtn" id="allcheck-cart" name="" value="" v-on:change="allCheckState" v-else>
                        <label for="allcheck-cart"></label>
                    </div>
                    已选<span class="c-fc1">{{totalCheckLength}}</span>件商品
                    <span class="fr">合计：<span class="c-fc1 totalprice"><sub>￥</sub>{{totalPrice}}</span></span>
                </div>
                <div class="right">
                    <span class="shop-btn red" v-on:click="onOrder()">结算</span>
                </div>
            </div>
            <footers></footers>
        </div>
    </div>
</template>

<script>
import HeaderCtr from '../base/HeaderCtr.vue'
import Footers from '../base/Footer.vue'
import CartList from './CartList.vue'
export default {
  name:'cart',
  components: {
    HeaderCtr,
    Footers,
    CartList
  },
  data() {
    return {
      // 是否是全选
      AllCheck: true,
      // ajax获取到的购物车列表
      cartdata: this.$store.state.CartList,
      // 总共选择了多少个商品
      totalCheckLength: 0,
      // 总价格
      totalPrice: 0,
      // 默认购物车列表总数
      counter: 0,
    }
  },
  mounted() {
    console.log(this.cartdata);
    var me = this;
    me.counter = me.totalCheckLength = me.cartdata.length;
    me.updataPirce();
  },
  methods: {
    // 全选状态
    allCheckState() {

    },
    // 更新总价格
    updataPirce() {
      var me = this;
      me.totalPrice = 0;
      let allCartList = this.$store.state.CartList;
      // 计算价格总数
      allCartList.forEach(function(value){
        console.log(value+"zxd");
        if(value.isCheck) {
          me.totalPrice += parseFloat(value.price) * parseFloat(value.num);
        }
      })
      // 价格小数点处理
      let price = me.totalPrice.toString().split('.');
      console.log(price);
      let integer = price[0];
      // 是否有小数点   取小数点后两位
      if(price.length == 2){
        let decimal = price[1];
        console.log(decimal);
        me.totalPrice = parseFloat(integer + '.' + decimal.slice(0,2))
        console.log(decimal.slice(0,2));
      }else{
        me.totalPrice = parseFloat(integer) + '.00'
      }
    }
  },
}
</script>

<style lang="css">
.cart-main {
    padding-bottom: 2.5rem;
}
.cartFooterInfo {
    border-top: 1px solid #ddd;
    position: fixed;
    bottom: 1.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
    width: 100%;
    left: 0;
    background: #48BCE9;
    background: #fff;
    /* color: #fff; */
    font-size: .35rem;
    padding: 0;
}
.cartFooterInfo .shop-btn {
    width: 3rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: .4rem;
}
.cartFooterInfo .left {
    display: inline-block;
    padding-left: 3%;
    width: 6.9rem;
}
.cartFooterInfo .right {
    float: right;
}
.totalprice {
    font-size: .45rem;
}
</style>
