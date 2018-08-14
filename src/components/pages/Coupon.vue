<template>
	<div>
		<loading :active.sync="isLoading"></loading> 

		<!-- table -->
		<div class="text-right mt-4">
			<button class="btn btn-outline-primary btn-lg" @click='openModal(true)'>
				建立新優惠券</button>
		</div>
		<table class="table mt-4">
			<thead>
				<tr>
					<th>名稱</th>
					<th>優惠碼</th>
					<th>折扣百分比</th>
					<th>到期日</th>
					<th>是否啟用</th>
					<th>編輯</th>
				</tr>	
			</thead>
			<tbody>
				<tr v-for="(item, key) in coupons" :key='item.id'>
					<td>{{ item.title }}</td>
					<td>{{ item.code }}</td>
					<td>{{ item.percent }}</td>
					<td>{{ item.due_date | dateFilter }}</td>
					<td>
						<span v-if="item.is_enabled === 1" class='text-success'>啟用</span>
						<span v-else>未啟用</span>
					</td>
					<td>
						<button class="btn btn-outline-primary btn-sm" 
							@click='openModal(false, item)'>編輯</button>
						<button class="btn btn-outline-danger btn-sm" 
							@click='delModal(item)'>刪除</button>
					</td>
				</tr>
			</tbody>
		</table>

		<!-- pagination -->
		<Pagination :pages="pagination" @emitPages="getCoupon"></Pagination>
		<!-- :pages="{ 頁碼資訊 }" -->
		<!-- @emitPages="更新頁面事件" -->
		
		<!-- Modal -->
		<div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
                v-model="due_date">
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input type="number" class="form-control" id="price"
                v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled" id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"
              @click="updateCoupon">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
		  aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content border-0">
		      <div class="modal-header bg-danger text-white">
		        <h5 class="modal-title" id="exampleModalLabel">
		          <span>刪除優惠券</span>
		        </h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券？ (刪除後將無法恢復)。
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
		        <button type="button" class="btn btn-danger" @click='delCoupon'>
		        	確認刪除</button>
		      </div>	
		    </div>
		  </div>
		</div>
	</div>	
</template>

<script>
	import $ from 'jquery';
	import Pagination from '../Pagination';

	export default {
		data() {
			return {
				coupons: [],
				tempCoupon: {},
				isNew: false,
				isLoading: false,
				pagination: {},
				due_date: new Date()
			}
		},
		methods: {
			getCoupon(page = 1) {
 				const api = `https://vue-course-api.hexschool.io/api/albeehsiao/admin/coupons`;
		    const vm = this;
		    vm.isLoading = true;
		    this.$http.get(api).then((response) => {
		      console.log(response.data);
		      vm.isLoading = false;
		      vm.coupons = response.data.coupons;
		      vm.pagination = response.data.pagination;
		    })
			},
			openModal(isNew, item) {
				if(isNew) {
					this.tempCoupon = {};
					this.isNew = true;
				}else {
					this.tempCoupon = Object.assign({},item);
					this.isNew = false;
					const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
        	this.due_date = dateAndTime[0];
				};
				$('#couponModal').modal('show');
			},
			delModal(item) {
				this.tempCoupon = {};
				this.tempCoupon = Object.assign({},item);
				$('#delCouponModal').modal('show');
			},
			updateCoupon() {
				console.log('updateCoupon');
				let api = `https://vue-course-api.hexschool.io/api/albeehsiao/admin/coupon`;
		    let httpMethod = 'post';
		    const vm = this;
		    if(!vm.isNew) {
		    	api = `https://vue-course-api.hexschool.io/api/albeehsiao/admin/coupon/${vm.tempCoupon.id}`;
		    	httpMethod = 'put';
		    };
		    if(vm.tempCoupon.due_date == null) {
		    	this.$bus.$emit('messsage:push', '請輸入到期日', 'danger');
		    }else {
		    	this.$http[httpMethod](api, { data: vm.tempCoupon}).then((response) => {
			      console.log(response.data);
			      if(response.data.success) {
			      	$('#couponModal').modal('hide');
			      	vm.getCoupon();
			      }else {
			      	$('#couponModal').modal('hide');
			      	vm.getCoupon();
			      	console.log('優惠券新增失敗');
			      };
			    })
		    }
		    
			},
			delCoupon() {
				const vm = this;
				const api = `https://vue-course-api.hexschool.io/api/albeehsiao/admin/coupon/${vm.tempCoupon.id}`;
	      this.$http.delete(api).then((response) => {
	        console.log(response.data);
	        if(response.data.success){
	          $('#delCouponModal').modal('hide');
	          vm.getCoupon();
	          console.log('刪除成功');
	          vm.tempCoupon = {};
	        };
      	});
			}
		},
		created() {
			this.getCoupon();
		},
		watch: {
	    due_date() {
	      const vm = this;
	      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
	      vm.tempCoupon.due_date = timestamp;
	    }
	  },
	  components: {
	    Pagination
	  }
	}
</script>