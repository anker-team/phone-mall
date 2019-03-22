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
                            ref = "cartlist"
                            v-on:increment="checkTotal"
                            >
                            <!-- v-on:increment="checkTotal" 子组件向父组件传递数据用触发事件   父组件向子组件传递数据用属性-->
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
            <!--调用弹框组件  -->
            <layer ref="layer"></layer>
        </div>
    </div>
</template>

<script>
import HeaderCtr from '../base/HeaderCtr.vue'
import Footers from '../base/Footer.vue'
import CartList from './CartList.vue'
import Layer from '../base/Layer.vue'
export default {
  name:'cart',
  components: {
    HeaderCtr,
    Footers,
    CartList,
    Layer
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
    checkTotal(tem) {
      console.log(tem);
      if(tem == '0'){
        // 不选中一个商品
        this.totalCheckLength--;
      }else if(tem == '1'){
        // 选中一个商品
        this.totalCheckLength++;
      }
      // 判断是否全部选中
      if(this.counter == this.totalCheckLength){
          this.AllCheck = true;
      } else {
          this.AllCheck = false;
      }
      // 重新赋值给cartdata，解决bug
      this.cartdata = this.$store.state.CartList;
      // 更新下价格
      this.updataPirce();
    },
    // 全选状态
    allCheckState() {
        var cl = this.$refs.cartlist;
        console.log(this.AllCheck);
        if(this.AllCheck) {
          this.AllCheck = false;
          this.totalCheckLength = 0;
          for(var i = 0,len = cl.length;i < len;i++){
              // 通过$refs调用子组件方法cancelAllCheck()
              cl[i].cancelAllCheck();
          }
          // 把购物车列表的isCheck属性设置为false，表示没有选择该商品
          this.$store.state.CartList.forEach(function(value){
              console.log(value);
              value.isCheck = false;
          })
          // 更新价格
          this.updataPirce();
        }else {
          this.AllCheck = true;
          this.totalCheckLength = this.counter;
          for(var i = 0,len = cl.length;i < len;i++){
            // 通过$refs调用子组件方法inAllCheck()
            cl[i].inAllCheck();
          }
          // 把购物车列表的isCheck属性设置为true，表示选择该商品
          this.$store.state.CartList.forEach(function(value){
            value.isCheck = true;
          })

          // 更新价格
          this.updataPirce();
        }
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
    },
    // 提交订单
    onOrder() {
      let me = this;
      let new_arr = [];
      this.$refs.layer.openLayer({
        html:'成功提交订单',
        time:500,
        callback:function(){
          me.$store.state.CartList.forEach(function(value){
              // 把选中的商品赋值给checkedProduct这个状态
              if(value.isCheck){
                new_arr.push(value)
              }
          })
          // me.updataCheckProduct(new_arr);
          me.$router.push({
            path: '/order'
          })
        }
      });
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
