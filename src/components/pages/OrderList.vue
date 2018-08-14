<template>
	<div>
		<loading :active.sync="isLoading"></loading> 

		<!-- table -->
		<table class="table mt-4">
			<thead>
				<tr>
					<th width="150">購買時間</th>
					<th class="click">Email</th>
					<th class="click">購買款項</th>
					<th width="150">應付金額</th>
					<th width="150">是否啟用</th>
				</tr>	
			</thead>
			<tbody>
				<tr v-for="(item, key) in orders" :key='item.id' v-if="orders.length"
          :class="{'text-secondary': !item.is_paid}">
					<td>{{ item.create_at| dateFilter }}</td>
					<td>{{ item.user.email }}</td>
					<td> 
						<ul class="list-unstyled">
							<li v-for="(product, i) in item.products" :key="i">
								{{ product.product.title }} 
								數量：{{ product.qty }} {{ product.product.unit }}
							</li>
						</ul>
					</td>
					<td class='text-right'>{{ item.total | currencyFilter }}</td>
					<td>
						<span v-if="item.is_paid" class='text-success'>已付款</span>
						<span v-else class="text-muted">尚未付款</span>
					</td>
				</tr>
			</tbody>
		</table>

		<!-- pagination -->
		<Pagination :pages="pagination" @emitPages="getOrders"></Pagination>
		<!-- :pages="{ 頁碼資訊 }" -->
		<!-- @emitPages="更新頁面事件" -->
		
	</div>	
</template>

<script>
	import $ from 'jquery';
	import Pagination from '../Pagination';

	export default {
		data() {
			return {
				orders: [],
				isLoading: false,
				pagination: {}
			}
		},
		methods: {
			getOrders(page = 1) {
 				const api = `https://vue-course-api.hexschool.io/api/albeehsiao/admin/orders?page=${page}`;
		    const vm = this;
		    vm.isLoading = true;
		    this.$http.get(api).then((response) => {
		      console.log(response.data);
		      vm.isLoading = false;
		      vm.orders = response.data.orders;
		      vm.pagination = response.data.pagination;
		    })
			}
		},
		created() {
			this.getOrders();
		},
		components: {
	    Pagination
	  }
	}
</script>

<style>
	.icon {
	  display: inline-block;
	}
	.icon.inverse {
	  transform: rotate(180deg)
	}
</style>