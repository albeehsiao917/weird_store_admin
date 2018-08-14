<template>
	<div>
		<!-- loading -->
		<loading :active.sync="isLoading"></loading>

		<!-- card -->
		<div class="row mt-4">
			<div class="col-md-4 mb-4" v-for='(item, key) in products' :key='item.id'>
			  <div class="card border-0 shadow-sm">
			    <div style="height: 150px; background-size: cover; background-position: center"
			    	:style='{"backgroundImage": `url(${item.imageUrl})`}'>
			    </div>
			    <div class="card-body">
			      <span class="badge badge-secondary float-right ml-2">分類</span>
			      <h5 class="card-title">
			        <a href="#" class="text-dark">{{ item.title}}</a>
			      </h5>
			      <p class="card-text">{{ item.content}}</p>
			      <div class="d-flex justify-content-between align-items-baseline">
			        <div class="h5" v-if="!item.price"> {{ item.origin_price | currencyFilter }} 元</div>
			        <del class="h6" v-if="item.price">原價 {{ item.origin_price | currencyFilter }} 元</del>
			        <div class="h5" v-if="item.price">現在只要 {{ item.price | currencyFilter }} 元</div>
			      </div>
			    </div>
			    <div class="card-footer d-flex">
			      <button type="button" class="btn btn-outline-secondary btn-sm" 
			      	@click='getProduct(item.id)'>
			        <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
			        查看更多
			      </button>
			      <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
			      	@click="addToCart(item.id)">
			        <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
			        加到購物車
			      </button>
			    </div>
			  </div>
			</div>
		</div>

		<!-- modal -->
		<div class="modal fade" id="productModal" tabindex="-1" role="dialog"
		  aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLabel"> {{ product.title }}</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		      	<img :src="product.imageUrl" class="img-fluid" alt="">
		      	<blockquote class="blockquote mt-3">
		      		<p class="mb-0">{{ product.content }}</p>
		      		<footer class="blockquote-footer text-right">{{ product.description }}</footer>
		      	</blockquote>
		      	<div class="d-flex justify-content-between align-items-baseline">
			        <div class="h5" v-if="!product.price"> {{ product.origin_price | currencyFilter }} 元</div>
			        <del class="h6" v-if="product.price">原價 {{ product.origin_price | currencyFilter }} 元</del>
			        <div class="h5" v-if="product.price">現在只要 {{ product.price | currencyFilter }} 元</div>
		      	</div>
		      	<select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
		      </div>
		      <div class="modal-footer">
		      	<div class="text-muted text-nowrap mr-3">
		      		小計 <strong>{{ product.num * product.price }}</strong>元
		      	</div>
		      	<button type="button" class="btn btn-primary" 
		      		@click="addToCart(product.id, product.num)">
		      		<i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
		      		加到購物車
		      	</button>
		      </div>
		    </div>
		  </div>
		</div>
		
		<!-- cart table -->
		<div class="my-5 row justify-content-center">
      <div class="col-md-6">
        <table class="table">
					<thead>
						<tr>
							<th></th>
							<th>品名</th>
							<th>數量</th>
							<th>單價</th>
						</tr>	
					</thead>
					<tbody>
						<tr v-for="(item, key) in cart.carts" :key='item.id' v-if="cart.carts">
							<td class="align-middle">
		            <button type="button" class="btn btn-outline-danger btn-sm" 
		            	@click='delCart(item.id)'>
		              <i class="far fa-trash-alt"></i>
		            </button>
		          </td>
							<td class="align-middle">
								{{ item.product.title }}
								<div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
							</td>
							<td class="align-middle">{{ item.qty }} {{ item.product.unit }}</td>
							<td class='text-right align-middle'>{{ item.final_total | currencyFilter }}</td>
						</tr>
					</tbody>
					<tfoot>
		        <tr>
		          <td colspan="3" class="text-right">總計</td>
		          <td class="text-right">{{ cart.total | currencyFilter }}</td>
		        </tr>
		        <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
		      </tfoot>
				</table>

				<div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>
			</div>
		</div>

		<div class="my-5 row justify-content-center">
			<form class="col-md-6" @submit.prevent='createOrder'>

				<div class="form-group">
	        <label for="email">信箱</label>
	        <input type="text" class="form-control" id="email" name="信箱" 
	        	placeholder="輸入信箱" v-model="form.user.email"
	        	v-validate="'required|email|max:50'" 
	        	:class="{'is-invalid': errors.has('信箱')}"></input>
	        <span class='text-danger' v-if="errors.has('信箱')">{{ errors.first('信箱') }}</span>
	      </div>

	      <div class="form-group">
	        <label for="name">收件人姓名</label>
	        <input type="text" class="form-control" id="name" name="收件人姓名"
	        	placeholder="輸入收件人姓名" v-model="form.user.name"
	        	v-validate="'required|max:20'"
	        	:class="{'is-invalid': errors.has('收件人姓名')}"></input>
	        <span class='text-danger' v-if="errors.has('收件人姓名')">
	        	{{ errors.first('收件人姓名') }}</span>
	      </div>

				<div class="form-group">
	        <label for="tel">收件人電話</label>
	        <input type="text" class="form-control" id="phone" name='收件人電話'
	        	placeholder="輸入收件人電話" v-model="form.user.tel"
	        	v-validate="'required|numeric|max:50'"
	        	:class="{'is-invalid': errors.has('收件人電話')}"></input>
	        <span class='text-danger' v-if="errors.has('收件人電話')">
	        	{{ errors.first('收件人電話') }}</span>
	      </div>

	      <div class="form-group">
	        <label for="address">收件人地址</label>
	        <input type="address" class="form-control" id="address" name="收件人地址"
	        	placeholder="輸入收件人地址" v-model="form.user.address"
	        	v-validate="'required|max:100'"
	        	:class="{'is-invalid': errors.has('收件人地址')}"></input>
	        <span class='text-danger' v-if="errors.has('收件人地址')">
	        	{{ errors.first('收件人地址') }}</span>
	      </div>

	      <div class="form-group">
	        <label for="message">留言</label>
	        <textarea class="form-control" cols="30" rows="10" id="message" name="留言"
	        	v-model="form.message" v-validate="'max:300'"
	        	:class="{'is-invalid': errors.has('留言')}"></textarea>
	        <span class='text-danger' v-if="errors.has('留言')">
	        	{{ errors.first('留言') }}</span>
	      </div>

	      <div class="text-right">
		      <button class="btn btn-outline-danger">送出訂單</button>
	      </div>

	    </form>
		</div>

	</div>
</template>

<script>
	import $ from 'jquery';
	export default {
		data() {
			return {
				products: [],
				product: {},
				isLoading: false,
				status: {
					loadingItem: '' //存放產品id，判斷目前畫面上是哪個元素正在loading
				},
				cart: {},
				coupon_code: '',
				form: {
					user: {
						name: '',
						email: '',
		        tel: '',
		        address: ''
					},
					message: "這是留言"
				}
			}
		},
		methods: {
			getProducts() { //取得所有商品
 				const api = `https://vue-course-api.hexschool.io/api/albeehsiao/products/all`;
		    const vm = this;
		    vm.isLoading = true;
		    this.$http.get(api).then((response) => {
		      console.log(response.data);
		      vm.isLoading = false;
		      vm.products = response.data.products;
		    })
			},
			getProduct(id) { //取的單一商品
				const api = `https://vue-course-api.hexschool.io/api/albeehsiao/product/${id}`;
		    const vm = this;
		    vm.status.loadingItem = id;
		    this.$http.get(api).then((response) => {
		      console.log(response.data);
		      vm.product = response.data.product;
		      $('#productModal').modal('show');
		      vm.status.loadingItem = '';
		    });
			},
			addToCart(id, qty = 1) {
				const api = `https://vue-course-api.hexschool.io/api/albeehsiao/cart`;
		    const vm = this;
		    let cart = {
		    	product_id: id,
		    	qty
		    }
		    vm.status.loadingItem = id;
		    this.$http.post(api, {data: cart}).then((response) => {
		      console.log(response.data);
		      $('#productModal').modal('hide');
		      vm.status.loadingItem = '';
		      vm.getCart();
		    });
			},
			getCart() {
				const api = `https://vue-course-api.hexschool.io/api/albeehsiao/cart`;
		    const vm = this;
		    vm.isLoading = true;
		    this.$http.get(api).then((response) => {
		      console.log(response.data);
		      vm.cart = response.data.data;
		      vm.isLoading = false;
		    });
			},
			delCart(id) {
				const api = `https://vue-course-api.hexschool.io/api/albeehsiao/cart/${id}`;
		    const vm = this;
		    vm.isLoading = true;
		    this.$http.delete(api).then((response) => {
		      console.log(response.data);
		      vm.isLoading = false;
		      vm.getCart();
		    });
			},
			addCouponCode() {
				const api = `https://vue-course-api.hexschool.io/api/albeehsiao/coupon`;
		    const vm = this;
		    const coupon = {
		    	code: vm.coupon_code
		    }
		    vm.isLoading = true;
		    this.$http.post(api, {data: coupon}).then((response) => {
		      console.log(response.data);
		      if(response.data.success) {
		      	vm.isLoading = false;
		      	vm.getCart();
		      }else {
		      	vm.isLoading = false;
		      	this.$bus.$emit('messsage:push', response.data.message, 'danger');
		      };
		    });
			},
			createOrder() {
				const api = `https://vue-course-api.hexschool.io/api/albeehsiao/order`;
		    const vm = this;
		    const order = vm.form;
		    // vm.isLoading = true;
	      this.$validator.validate().then((result) => {
	        if(result) {
	          this.$http.post(api, {data: order}).then((response) => {		      
				      if(response.data.success) {
				      	vm.isLoading = false;
				      	console.log("訂單已完成", response);
				      	if(response.data.success) {
				      		vm.$router.push(`/customercheckout/${response.data.orderId}`);
				      	}
				      }else {
				      	vm.isLoading = false;
				      	this.$bus.$emit('messsage:push', response.data.message, 'danger');
				      };
				    });
	        }else {
	        	console.log('欄位不完整');
	        };
	      });
			}
		},
		created() {
			this.getProducts();
			this.getCart();
		}
	}
</script>