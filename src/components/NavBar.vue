<template>
	<div>
		<nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
			<a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Weird Store</a>
			<ul class="navbar-nav px-3">
				<li class="nav-item text-nowrap">
					<a class="nav-link" href="#" @click.prevent='signout'>登出</a>
				</li>
			</ul>
	    </nav>
	</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    signout() {
      const api = `https://vue-course-api.hexschool.io/logout`;
      //${process.env.apiPath}
      const vm = this;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if(response.data.success){
          vm.$router.push('/login'); //登出成功，回到登入頁面
        };
      });
    }
  }
}
</script>