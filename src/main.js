//npm套件
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

//自定義套件
import Vue from 'vue';
import App from './App.vue';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Loading);

//啟用元件
Vue.component('Loading',Loading);
Vue.filter('currencyFilter',currencyFilter);
Vue.filter('dateFilter',dateFilter);

new Vue({
	router,
  	render: h => h(App)
}).$mount('#app');

router.beforeEach((to, from, next) => {
  // ...
  if (to.meta.requiresAuth){
  	const api = `https://vue-course-api.hexschool.io/api/user/check`;
	//${process.env.apiPath}
	axios.post(api).then((response) => { //因為這不是在Vue的元件下，所以無法使用this.$http，因此改為axios.post
		console.log(response.data);
		if(response.data.success){
			next(); //持續登入，到下一頁
		}else {
			next({
				path: '/login'
			}); //用戶已登出，回到登入頁面
		};
	});
  }else {
  	next();
  }
});
