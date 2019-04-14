<template>
  <div id="app">
    <div>
      <input type="text" placeholder="标题">
    </div>
    <vue-editor v-model="content"></vue-editor>
    {{content}}
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {

    components: {
      VueEditor
    },

    data() {
      return {
        content: '<h1>说点什么吧</h1>'
      }
    }
  }
</script>

<style scoped lang="scss">
  #app {
    margin-top: 50px;
  }
  #app > div{
    margin-bottom: 20px;
    span{
      color: black;
    }
    input{
      width: 1133px;
      height: 50px;
      background-color: transparent;
      border: 0;
      outline:none;
      font-size: 34px;
      font-weight: bold;
    }
  }
  #app div input{
    border-bottom: 1px solid #666;
  }

</style>
