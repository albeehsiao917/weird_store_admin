<template>
  <div>
    <NavBar></NavBar>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <SideBar></SideBar>
        <main role='main' class='col-md-9 ml-sm-auto col-lg-10 px-4'>
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  /* 載入元件 */
  import SideBar from './SideBar';
  import NavBar from './NavBar';
  import Alert from './Alert';

  export default {
    components: {
      SideBar,
      NavBar,
      Alert
    }
  }
</script>