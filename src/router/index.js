import Vue from 'vue'
import VueRouter from 'vue-router'

// import home from '@/components/HelloWorld'
import dashboard from '@/components/Dashboard'
import login from '@/components/pages/Login'
import products from '@/components/pages/Products'
import orderlist from '@/components/pages/OrderList'
import coupon from '@/components/pages/Coupon'
import customerorder from '@/components/pages/CustomerOrder'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '*', //如果路由不是下面所設定的，重新導向到登入頁面
      redirect: '/login'
    },
    // {
    //   name: 'home',
    //   path: '/',
    //   component: home,
    //   meta: { requiresAuth: true }
    // },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      // meta: { requiresAuth: true } //剪下貼到children裡
      children: [
        {
          path: 'products',
          name: 'products',
          component: products,
          meta: { requiresAuth: true } //以確保進入這頁時會被驗證
        },
        {
          path: 'orderlist',
          name: 'orderlist',
          component: orderlist,
          meta: { requiresAuth: true }
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: coupon,
          meta: { requiresAuth: true }
        },
        {
          path: 'customerorder',
          name: 'customerorder',
          component: customerorder
        }
      ]
    }
  ]
})