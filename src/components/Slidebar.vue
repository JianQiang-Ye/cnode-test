<template>
    <div class="slidebar">
      <div class="author panel">
        <div class="header">作者</div>
        <div class="author_content content">
          <router-link :to="{name: 'User_info',params:{userId: user.userId}}">
            <img :src="'http://47.102.217.102:8080'+ user.headImgPath" alt="" class="headImgPath">
          </router-link>
          <router-link :to="{name: 'User_info',params:{userId: user.userId}}">
            <span>{{user.nickname}}</span>
          </router-link>
          <p>性别： <span v-if="user.gender === 0 ">男</span><span v-else>女</span></p>
          <p>github: <a :href="'https://github.com/' + user.githubUsername" target="_blank">{{user.githubUsername}}</a></p>
        </div>
      </div>
      <div class="panel">
        <div class="header">他点赞的帖子</div>
          <div class="panelInner content" v-for="item in likePosts">
            <router-link :to="{
                name: 'Article',
                params: {
                  articleId: item.postId
                }
              }">
              {{item.title}}
            </router-link>
            <span class="time">{{item.sendTime | formatDate}}</span>
          </div>
      </div>
      <div class="panel">
        <div class="header">最近的访客</div>
        <div class="panelInner recentVisitors" v-for="item in user.recentVisitors">
          <router-link :to="{name: 'User_info',params:{userId: item.userId}}">
            <img :src="'http://47.102.217.102:8080'+ item.headImgPath" :alt="item.nickname" class="headImgPath">
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "slidebar",
      data(){
        return {
          user:{},
          likePosts:[]
        }
      },
      computed:{
        recent_topics(){
          if(this.user.recent_topics){
            return this.user.recent_topics.slice(0,5)
          }
        },
        reply_topics(){
          if(this.user.recent_replies){
            return this.user.recent_replies.slice(0,5)
          }
        }
      },
      methods: {
        getData(){
          this.$http.get(`http://47.102.217.102:8080/noteshare2/user/getUserDetail/${this.$route.params.userId}`).then((res)=>{
            if(res.status === 200 && res.data.msg === '成功'){
              this.user = res.data.data
              this.getLikePost(this.user.likePost)
            }
          }).catch((err)=>{
            console.log(err)
          })
        },
        getLikePost(postId){
          if(postId){
            postId.forEach((value,key)=>{
              this.$http.get(`http://47.102.217.102:8080/noteshare2/post/postDetail2/${value}`).then((res)=>{
                if(res.data.msg === '成功'){
                  this.likePosts.push(res.data.data)
                }
              }).catch((err)=>{
                console.log(err)
              })
            })
          }
        }
      },
      beforeMount(){
        this.getData()
      },
      watch: {
        '$route'(to,from){
          window.location.reload()
        }
      }
    }
</script>

<style scoped>
  a{
    color: #666;
  }
  div.slidebar{
    float: right;
  }
  .slidebar .panel{
    width: 290px;
    border-radius: 2px;
    margin-bottom: 10px;
  }
  .slidebar .panel .header{
    background-color: #f6f6f6;
    padding: 10px;
    font-size: 13px;
  }
  .slidebar .panel .content{
    background-color: white;
    padding: 10px;
  }
  .slidebar .panel .time{
    float: right;
  }
  .slidebar .panel img.headImgPath{
    height: 50px;
    width: 50px;
    border-radius: 4px;
    vertical-align: middle;
  }
  .slidebar .panel .author_content>span{
    vertical-align: middle;
    color: #666;
    margin-left: 5px;
  }
  .slidebar .panel .author_content p{
    font-size: 14px;
    margin-top: 10px;
  }
  .slidebar .panel .panelInner{
    border-top: 1px solid #eee;
    font-size: 12px;
    color: #778087;
  }
  .slidebar .panel .recentVisitors{
    display: inline-block;
    margin: 10px;
  }
</style>
