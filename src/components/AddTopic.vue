<template>
  <div id="app">
    <div>
      <input type="text" placeholder="标题" v-model="title">
    </div>
    <vue-editor v-model="content"></vue-editor>
    {{content}}
    <button @click="submitPost">提交</button>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  import qs from 'qs'

  export default {
    components: {
      VueEditor
    },
    data() {
      return {
        title: '标题',
        content: '<h1>说点什么吧</h1>'
      }
    },
    methods: {
      submitPost(){
        // 发表帖子的接口
        this.$http.post('http://47.102.217.102:8080/noteshare2/post/sendPost2',qs.stringify({
          title: this.title,
          content: this.content,
          zoomId: 1
        }),{withCredentials: true}).then(res=>{
          console.log('发表帖子的响应体')
          console.log(res)
          this.$emit('updatePostData')
        }).catch((res)=>{
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #app {

    background-color: #f5f2f0;
  }
  #app > div{
    margin-bottom: 20px;
    span{
      color: black;
    }
    input{
      width: 1133px;
      height: 50px;
      background-color: #f5f2f0;
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
