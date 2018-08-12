import Vue from 'vue';
Vue.prototype.$bus = new Vue(); //在 Vue 的 prototyp 下直接掛載 EventBus

// Message
// vm.$bus.$on('messsage:push', message, status);
// message(String) //訊息內容
// status(String) //Alert樣式(Bootstrap)