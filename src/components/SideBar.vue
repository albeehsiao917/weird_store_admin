<template>
	<div>
		<nav class="col-md-2 d-none d-md-block bg-light sidebar">
			<div class="sidebar-sticky">
				<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
					<span>管理員</span>
					<a class="d-flex align-items-center text-muted" href="#">
						<span data-feather="plus-circle"></span>
					</a>
				</h6>
				<ul class="nav flex-column">
					<li class="nav-item">
						<router-link class="nav-link" to="/dashboard/products">
							<i class="fas fa-box-open"></i>
							產品列表
						</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/dashboard/orderlist">
							<i class="fas fa-id-card"></i>
							訂單列表
						</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/dashboard/coupon">
							<i class="fas fa-ticket-alt"></i>
							優惠券
						</router-link>
					</li>
				</ul>

				<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
					<span>模擬功能</span>
					<a class="d-flex align-items-center text-muted" href="#">
						<span data-feather="plus-circle"></span>
					</a>
				</h6>
				<ul class="nav flex-column mb-2">
					<router-link class="nav-link" to="/dashboard/customerorder">
						<i class="fas fa-shopping-cart"></i>
						模擬訂單
					</router-link>
				</ul>
			</div>
		</nav>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
		}
	}
</script>