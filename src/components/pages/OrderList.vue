<template>
	<div>
		<loading :active.sync="isLoading"></loading> 

		<!-- table -->
		<table class="table mt-4">
			<thead>
				<tr>
					<th width="150">購買時間</th>
					<th>Email</th>
					<th>購買款項</th>
					<th width="150">應付金額</th>
					<th width="150">是否啟用</th>
				</tr>	
			</thead>
			<tbody>
				<tr v-for="(item, key) in orders" :key='item.id'>
					<td>timeConversion(item.create_at)</td>
					<td>{{ item.user.email }}</td>
					<td v-for="(product, key) in orders.products" :key='product.id'>
						{{ product.product_id }} x {{product.qty}} <br>
					</td>
					<td class='text-right'>{{ item.total | currencyFilter }}</td>
					<td>
						<span v-if="item.is_paid" class='text-success'>已付款</span>
						<span v-else>尚未付款</span>
					</td>
				</tr>
			</tbody>
		</table>

		<!-- pagination -->
		<Pagination :pages="pagination" @emitPages="getOrders"></Pagination>
		
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
			},
			timeConversion(create_at) {
				let year = dates.getFullYear();
				let month = dates.getMonth() + 1;
				let date = dates.getDate();
				return `${year}/${month}/${date}`
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