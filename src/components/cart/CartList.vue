<template lang="html">
    <div class="" id="CartList">
        <div class="ischeck">
            <div class="c-check">
                <input type="checkbox" name="" value="">
                <label for=""></label>
            </div>
        </div>
        <div class="pic">
            <router-link :to="{ name: '', params: {} }">
              <img :src="cartMessage.img" alt="">
            </router-link>
        </div>
        <div class="info">
            <div class="name">
                {{cartMessage.name}}
            </div>
            <div class="price c-fc1">
                <sub>￥</sub>{{cartMessage.price}}
            </div>
            <div class="spec">
                {{cartMessage.spec}}
            </div>
            <div class="spec-num">
                <span>数量：{{cartMessage.num}}</span>
                <div class="num-editor">
                    <div class="numetr">
                        <span class="reduce">-</span>
                        <input type="text" v-model="cartMessage.num" />
                        <span class="add">+</span>
                    </div>
                </div>
            </div>
            <div class="ctrl">
                <span class="editor-btn">{{editorBtnText}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name:'CartList',
  props: {
    cartMessage:Object,
  },
  data() {
    return {
      editorBtnText:'编辑'
    }
  },
}
</script>

<style lang="css">
.cart-list {
    width: 100%;
    background: #fff;
    position: relative;
    padding: 3% 0;
    padding-left: 0.8rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    margin-top: 5px;
}
.cart-list:first-child { margin-top: 0px; }
.cart-list:after {
    content: '';
    display: block;
    clear: both;
}
.cart-list .ischeck {
    width: 0.8rem;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    line-height: 3rem;
}
.cart-list .pic {
    float: left;
    width: 2.2rem;
    height: 2.2rem;
}
.cart-list .pic img {
    width: 100%;
    height: 100%;
}
.cart-list .info {
    display: inline-block;
    width: 7rem;
    padding: 0 10px;
    font-size: 12px;
    position: relative;
}
.cart-list .info .name {
    color: #000;
    font-size: .4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.cart-list .info .price {
    font-size: .5rem;
}
.cart-list .ctrl {
    display: inline-block;
    position: absolute;
    bottom: 0;
    right: 10px;
    font-size: .35rem;
    color: #48BCE9;
}
.spec-num {
    height: .5rem;
    line-height: .5rem;
}
.num-editor {
    line-height: 1;
}
.numetr {
    display: inline-block;
    vertical-align: top;
    line-height: 1;
    font-size: 0px;
}
.numetr span {
    display: inline-block;
    vertical-align: top;
    width: .5rem;
    height: .5rem;
    text-align: center;
    line-height: .5rem;
    font-size: .4rem;
    border: 1px solid #ddd;
}
.numetr .reduce {
    border-right: 0px;
}
.numetr .add {
    border-left: 0px;
}
.numetr input {
    display: inline-block;
    vertical-align: top;
    width: 1rem;
    height: .5rem;
    text-align: center;
    line-height: .5rem;
    font-size: .4rem;
    border: 1px solid #ddd;
}
</style>
