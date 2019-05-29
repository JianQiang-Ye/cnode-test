<template>
  <div class="content">
    <div class="panel">
      <div class="header">
        最近发表的笔记
      </div>
      <ul>
        <li v-for="item in user.noteVos">
          <router-link :to="{name: 'User_info',params:{userId: item.user.userId}}">
            <img :src="'http://47.102.217.102:8080'+ item.user.headImgPath" class="avatar" :alt="item.user.nickname">
          </router-link>
          <router-link :to="{name: 'Article',params:{articleId:item.postId}}">
            <span class="title">{{item.title}}</span>
          </router-link>
          <span class="last_reply">{{item.sendTime | formatDate}}</span>
        </li>
      </ul>
    </div>
    <div class="panel .recentCreateTopics">
      <div class="header">
        最近创建的帖子
      </div>
        <ul>
          <li v-for="item in user.postVoMains">
            <router-link :to="{name: 'User_info',params:{userId: item.user.userId}}">
              <img :src="'http://47.102.217.102:8080'+ item.user.headImgPath" class="avatar" :alt="item.user.nickname">
            </router-link>
            <router-link :to="{name: 'Article',params:{articleId:item.postId}}">
              <span class="title">{{item.title}}</span>
            </router-link>
            <span class="last_reply">{{item.sendTime | formatDate}}</span>
          </li>
        </ul>
    </div>
    <div class="panel">
      <div class="header">
        最近回复的帖子
      </div>
      <ul>
        <li v-for="item in user.recentPosts">
          <router-link :to="{name: 'User_info',params:{userId: item.user.userId}}">
            <img :src="'http://47.102.217.102:8080'+ item.user.headImgPath" class="avatar" :alt="item.user.nickname">
          </router-link>
          <router-link :to="{name: 'Article',params:{articleId:item.postId}}">
            <span class="title">{{item.title}}</span>
          </router-link>
          <span class="last_reply">{{item.sendTime | formatDate}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      name: "user-info",
      data(){
        return {
          user: {}
        }
      },
      methods: {
        getData(){
          // 请求个人信息
          this.$http.get(`http://47.102.217.102:8080/noteshare2/user/getUserDetail/${this.$route.params.userId}`).then((res)=>{
            console.log(res)
            console.log('hhh')
            console.log(res.data)
            var object = JSON.parse(res.data.data)
            console.log(object)
            if(res.status === 200 && res.data.msg === '成功'){
              this.user = res.data.data
              console.log(res)
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
      },
      computed:{
        getRecentTopicsInFive(){
          if(this.recent_topics){
            return this.recent_topics.slice(0,5)
          }
        }
      },
      beforeMount(){
        this.getData()
      },
      watch: {
        '$route' (to, from) { //监听路由是否变化
          if(this.$route.params.name){//判断id是否有值
            console.log(this.$route.params.name)
            this.getData()
          }
        }
      }
    }
</script>

<style scoped>
  div.content{
    width: 1000px;
    display: inline-block;
  }
  div.content .panel {
    margin-bottom: 12px;
  }
  div.header{
    background-color: #f6f6f6;
    font-size: 14px;
    color: #444;
    padding: 10px;
    border-radius: 2px;
  }
  .panel div.userinfo{
    border-top: 1px solid #eee;
    background-color: #fff;
    padding: 10px;
  }
  .panel div.userinfo>img{
    display: inline-block;
    height: 50px;
    width: 50px;
    vertical-align: top;
    border-radius: 5px;
  }
  .panel div.userinfo>span{
    vertical-align: top;
    color: #666;
    font-size: 14px;
    margin-left: 5px;
  }
  .panel div.userinfo {
    font-size: 14px;
  }
  .panel div.userinfo>div{
    margin-top: 10px;
  }
  .panel div.userinfo>div.createTime{
    color: #ccc;
  }
  .panel div.userinfo>div.dark{
    color: #666;
  }
  ul li {
    border-top: 1px solid #eee;
    background-color: #fff;
    padding: 10px;
    position: relative;
  }
  ul li img.avatar{
    width: 30px;
    height: 30px;
    vertical-align: middle;
    font-size:12px;
    color:#666;
  }
  ul li span.title{
    color: #0088cc
  }
  ul li span.title:hover{
    color: grey;
    text-decoration: underline;
  }
  ul li span.last_reply{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #666;
  }
</style>
