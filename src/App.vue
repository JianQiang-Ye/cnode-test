<template>
  <div id="app">
    <HeaderList></HeaderList>
    <div class="main">
      <router-view name="main"></router-view>
      <router-view name="slidebar"></router-view>
      <router-view name="add"></router-view>
    </div>
  </div>
</template>

<script>
  import HeaderList from './components/HeaderList'
  import Create from './components/CreateNote'
export default {
  name: 'App',
  components:{
    HeaderList,
    Create
  }
}
</script>

<style>
  body{
    background-color: #f5f2f0;
  }
.main{
  padding: 50px 193px;
  background-color: #f5f2f0;
  position: relative;
}
*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
ul li{
    list-style: none;
}
</style>
