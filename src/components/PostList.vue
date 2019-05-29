<template>
  <div>
    <div class="postList">
      <Pagination @changePage="handlePage"></Pagination>
      <ul>
        <li v-for="item in items">
          <div class="circle1"></div><div class="circle2"></div>
          <router-link :to="{name: 'User_info',params:{userId: item.user.userId}}">
            <img :src="'http://47.102.217.102:8080'+ item.user.headImgPath" class="avatar" :alt="item.user.nickname">
          </router-link>
          <div class="countWrapper">
            <span class="count_of_replies">{{item.replyCount}}</span><span class="count_of_slash">/</span><span class="count_of_visit">{{item.likeCount}}</span>
          </div>
          <span :class="{'put-good':item.good, 'put-top':(item.isUp===1), 'tab': (item.good!==true&&item.top!==true) }">{{item | tabFormatter}}</span>
          <router-link :to="{name:'Article',params:{articleId: item.postId,userId: item.user.userId}}">
            <span class="title">{{item.title}}</span>
          </router-link>
          <span class="tinyContent">{{item.tinyContentStr}}</span>
          <div  class="deletedPost">
             <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item style="padding: 10px">
                  <el-button type="danger" icon="el-icon-delete" @click="deletePost(item.postId)">删除</el-button>
                </el-dropdown-item>
                <el-dropdown-item style="padding: 10px">
                  <el-button type="warning" icon="el-icon-star-off" @click="onTop(item.postId)">置顶</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <span class="last_time">{{item.sendTime | formatDate}}</span>
        </li>
      </ul>
    </div>
    <AddTopic @updatePostData="handleUpdate" class="AddTopic"></AddTopic>
  </div>
</template>

<script>
  import Pagination from './Pagination'
  import AddTopic from './AddTopic'
  export default {
    name: "post-list",
    components:{
      Pagination,
      AddTopic
    },
    data(){
      return {
        items: [],
        page: 1,
        tab: 'all',
        person: {}
      }
    },
    methods:{
      getData(page,tab){
        if(tab>=1){
          this.getDataByZoomId(tab)
        }else{
          this.$http.get('http://47.102.217.102:8080/noteshare2/post/getPosts2',{params:{page,limit:20,tab}}).then((res)=>{
            this.items = res.data.data
            console.log(this.items)
          }).catch((err)=>{
            console.log(err)
          })
        }
      },
      getDataByZoomId(zoomId){
        this.$http.get(`http://47.102.217.102:8080/noteshare2/post/getPostsByZoomId/${zoomId}`).then((res)=>{
          this.items = res.data.data
          console.log(this.items)
        }).catch((err)=>{
          console.log(err)
        })
      },
      getCurData(page,zoomId){
        this.$http.get(`http://47.102.217.102:8080/noteshare2/post/getPostsByZoomId/${zoomId}/${page}`).then((res)=>{
          console.log('分页的效果')
          console.log(res)
          this.items = res.data.data
          console.log(this.items)
        }).catch((err)=>{
          console.log(err)
        })
      },
      handlePage(page,zoomId){
        console.log('当前点击了',page)
        this.getCurData(page,zoomId)
      },
      deletePost(postId){
        console.log('删除帖子')
        this.$http.get(`http://47.102.217.102:8080/noteshare2/post/deletePost2/${postId}`).then((res)=>{
          console.log(res)
          if(res.status === 200 && res.data.msg==='成功'){
            this.person = res.data.data
            this.getData()
          }
        }).catch((err)=>{
          console.log(err)
        })
      },
      onTop(postId){
        console.log('ggdesgdfs')
        this.$http.get(`http://47.102.217.102:8080/noteshare2/post/upPost2/${postId}`).then((res)=>{
          console.log(res)
          if(res.status === 200 && res.data.msg==='成功'){
            this.person = res.data.data
            this.getData()
          }
        }).catch((err)=>{
          console.log(err)
        })
      },
      handleUpdate(){
        console.log('111')
        this.getData()
      },
      getPersonData(){
        this.$http.get(`http://47.102.217.102:8080/noteshare2/user/getUserOnline`).then((res)=>{
          console.log(res)
          if(res.status === 200 && res.data.msg==='成功'){
            this.person = res.data.data
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    beforeMount(){
      this.tab = this.$route.params.tab || 'all'
      this.getData(this.page,this.tab)
    },
      watch: {
        '$route'(to,from){
          this.tab = this.$route.params.tab
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

  ul li span.tab{
    font-size: 12px;
    background-color: #859d87;
    color: white;
    padding: 2px 4px;
    border-radius: 4px;
  }
  ul li span.put-top, ul li span.put-good{
    background-color: #80bd01;
    color: white;
    font-size:12px;
    padding: 2px 4px;
    border-radius: 4px;
  }
  .tinyContent{
    font-size: 14px;
    color: #cccccc;
  }
  .deletedPost{
    position: absolute;
    font-size: 12px;
    color: blue;
    top: 33px;
    right: 74px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .AddTopic{
    margin-top: 50px;
  }
</style>
