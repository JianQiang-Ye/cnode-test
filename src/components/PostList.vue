<template>
  <div>
    <div class="postList">
      <ul>
        <li v-for="item in items">
          <div class="circle1"></div><div class="circle2"></div>
          <router-link :to="{name: 'User_info',params:{name: item.author.loginname}}">
            <img :src="item.author.avatar_url" class="avatar" :alt="item.author.loginname">
          </router-link>
          <div class="countWrapper">
            <span class="count_of_replies">{{item.reply_count}}</span><span class="count_of_slash">/</span><span class="count_of_visit">{{item.visit_count}}</span>
          </div>
          <span :class="{'put-good':item.good, 'put-top':item.top, 'tab': (item.good!==true&&item.top!==true) }">{{item | tabFormatter}}</span>
          <router-link :to="{name:'Article',params:{articleId: item.id,name: item.author.loginname}}">
            <span class="title">{{item.title}}</span>
          </router-link>
          <span class="last_time">{{item.last_reply_at | formatDate}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "post-list",
    data(){
      return {
        items: [],
        page: 1,
        tab: 'all'
      }
    },
    methods:{
      getData(page,tab){
        console.log(page,tab)
        this.$http.get('https://cnodejs.org/api/v1/topics',{params:{page,limit:20,tab}}).then((res)=>{
          this.items = res.data.data
        }).catch((err)=>{
          console.log(err)
        })
      },
      handlePage(page){
        this.page = page
        this.getData(this.page,this.tab)
      }
    },
    beforeMount(){
      this.getData(this.page,this.tab)
    },
      watch: {
        '$route'(to,from){
          this.tab = this.$route.params.tab
          console.log(this.$route.params.tab)
          this.getData(this.page,this.tab)
        }
      }
  }
</script>

<style scoped>
  a{
    color: #666;
    text-decoration: none;
  }
  div.postList{
    background-color: #ffffff;
  }
  img.avatar{
    width: 50px;
    height: 50px;
    vertical-align: middle;
    font-size: 12px;
    color: #666;
  }
  ul>li{
    border-top:1px solid #eee;
    font-size: 16px;
    color: #333;
    padding: 20px 10px 20px 40px;
    position: relative;
    background-color: white;
  }
  ul>li:hover{
    box-shadow: 0px 6px 19px 0px rgba(204,204,204,1);
    transform: scale(1.02);
    transition: all 0.2s;
    z-index: 1;
  }
  ul>li:hover a{
    color: #80bd01;
  }
  ul li span.last_time{
    font-size: 11px;
    color: #778087;
    position:absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
  ul li span.title{
    vertical-align: middle;
  }
  ul li .countWrapper{
    display: inline-block;
    width: 70px;
    text-align: center;
  }
  ul li div.circle1{
    height: 15px;
    width:15px;
    background-color: #e6ddd8;
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 20%;
  }
  ul li div.circle2{
    height: 15px;
    width:15px;
    background-color: #e6ddd8;
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 60%;
  }
  span.count_of_replies{
    color: #9e78c0;
    font-size: 14px;
  }
  span.count_of_visit{
    color: #b4b4b4;
    font-size: 10px;
  }
  span.count_of_slash{
    font-size: 10px;
    margin: 0 2px;
  }
  ul li span.put-top, ul li span.put-good{
    background-color: #80bd01;
    color: white;
    font-size:12px;
    padding: 2px 4px;
    border-radius: 4px;
  }
  ul li span.tab{
    font-size: 12px;
    background-color: #859d87;
    color: white;
    padding: 2px 4px;
    border-radius: 4px;
  }
</style>
