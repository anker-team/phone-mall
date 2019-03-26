import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index/index.vue'
import List from '@/components/list/list.vue'
import Cart from '@/components/cart/cart.vue'
import Detail from '@/components/detail/detail.vue'
import Order from '../components/order/order.vue';
import Address from '../components/base/Address.vue'


import User from '@/components/user/user.vue'
import UserIndex from '@/components/user/userindex.vue'
import UserAddress from '@/components/user/useraddress.vue'
import UserOrder from '@/components/user/userorder.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
        path: '/list',
        name: 'List',
        component: List
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail
    },
    {
        path: '/order',
        name: 'Order',
        component:  Order
    },
    {
        path: '/address',
        name: 'Address',
        component: Address
    },
    {
        path: '/user',
        component:User,
        children: [
          {
            path: 'index',
            component: UserIndex
          },
          {
            path:'useraddress',
            component:UserAddress
          },
          {
            path:'order',
            component:UserOrder
          }
        ]
    }
  ]
})
