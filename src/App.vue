<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  // components: {
  //   HelloWorld
  // },
  // created() {
  //   const api = `https://vue-course-api.hexschool.io/api/albeehsiao/products`;
  //   // const api = `${process.env.apiPath}/api/${process.env.customPath}/products`;
  //   // console.log(process.env.apiPath, process.env.customPath);
  //   this.$http.get(api).then((response) => {
  //     console.log(response.data);
  //   })
  // }
}
</script>

<style lang="scss">
  @import './assets/all';
</style>
