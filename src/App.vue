<template>
  <div id="app">
    <HeaderList></HeaderList>
    <div class="main">
      <router-view name="main"></router-view>
      <Add></Add>
    </div>
  </div>
</template>

<script>
  import HeaderList from './components/HeaderList'
  import Add from './components/AddTopic'
export default {
  name: 'App',
  components:{
    HeaderList,
    Add
  }
}
</script>

<style>
.main{
  padding: 50px 193px;
  background-color: #f5f2f0;
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
