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
                            <cart-list v-bind:cart-message="item">
                            </cart-list>
                        </div>
                    </div>
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
      // ajax获取到的购物车列表
      cartdata: this.$store.state.CartList,
    }
  },
  mounted() {
    console.log(this.cartdata);
  },
}
</script>

<style lang="css">
.cart-main {
    padding-bottom: 2.5rem;
}
</style>
