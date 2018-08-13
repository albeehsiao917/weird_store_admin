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
		<nav aria-label="Page navigation example">
		  <ul class="pagination">
		    <li class="page-item" :class='{"disabled": !pagination.has_pre}'>
		      <a class="page-link" href="#" aria-label="Previous" 
		      	@click.prevent='getOrders(pagination.current_page - 1)'>
		        <span aria-hidden="true">&laquo;</span>
		        <span class="sr-only">Previous</span>
		      </a>
		    </li>

		    <li class="page-item" v-for='page in pagination.total_pages' :key='page'
		    	:class='{"active": pagination.current_page === page}'>
		    	<a class="page-link" href="#" @click.prevent='getOrders(page)'>{{ page }}</a>
		    </li>

		    <li class="page-item" :class='{"disabled": !pagination.has_next}'>
		      <a class="page-link" href="#" aria-label="Next"
		      	@click.prevent='getOrders(pagination.current_page + 1)'>
		        <span aria-hidden="true">&raquo;</span>
		        <span class="sr-only">Next</span>
		      </a>
		    </li>
		  </ul>
		</nav>

	</div>	
</template>

<script>
	import $ from 'jquery'; 
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
		}
		// computed: {
	 //    sortData: function(){
	 //      let vm = this;
	 //        if(vm.isReverse){
	 //          return vm.data.sort(function(a,b){
	 //            return a[vm.sortBy] - b[vm.sortBy];
	 //          });
	 //        }else{
	 //          return vm.data.sort(function(a,b){
	 //            return b[vm.sortBy] - a[vm.sortBy];
	 //          });
	 //        };
	 //    }
	 //  }
	}
</script>