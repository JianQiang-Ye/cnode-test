<template>
  <div class="content" >
    <div v-if="isLoading">

    </div>
      <div v-else>
        <div class="topic_header" >
          <div class="topic_full_title">
            <span :class="{'put-good':article.good, 'put-top':(article.isUp === 1), 'tab': (article.good!==true&&article.top!==true) }">{{article | tabFormatter}}</span>
            <span class="article_title">{{article.title}}</span>
          </div>
          <div class="changes">
            <span> 发布于 {{article.sendTime | formatDate}}</span>
            <router-link :to="{name: 'User_info',params:{userId: article.user.userId}}">
              <span> 作者 {{article.user.nickname}}</span>
            </router-link>
            <span> {{article.likeCount}}人点赞</span>
            <!--<span> 最后一次回复是 {{article['last_reply_at'] | formatDate}}</span>-->
            <span> 来自 {{ articleTab }}</span>
          </div>
        </div>
        <div v-html="article.contentStr" class="topic_content" id="content"></div>
        <div class="reply">
          <div class="header">
            <span>{{article.replyCount}} 回复</span>
            <el-button type="text" @click="dialogFormVisible = true" class="commentButton">评论</el-button>
          </div>
          <ul>
            <li v-for="(reply,index) in replies" class="reply">
              <div class="user_info">
                <router-link :to="{name: 'User_info',params:{userId: reply.user.userId}}">
                  <img :src="'http://47.102.217.102:8080'+ reply.user.headImgPath" alt="" :title="reply.user.nickname">
                </router-link>
                <router-link :to="{name: 'User_info',params:{userId: reply.user.userId}}">
                  <span>{{reply.user.nickname}}</span>
                </router-link>
                <span>{{index + 1}} 楼</span>
                <span>{{reply.sendTime | formatDate}}</span>
                <span v-if="reply.user.username === article.user.username" class="host">楼主</span>
                <!--<div class="ups" v-if="reply.ups.length!==0"> {{reply.ups.length}} 👍</div>-->
                <!--评论点赞-->
              </div>
              <div class="reply_content">
                <div v-html="reply.content" id="content">
                </div>
                <div class="comment" v-for="comment in reply.commentVos">
                  <router-link :to="{name: 'User_info',params:{userId: reply.user.userId}}">
                  <img :src="'http://47.102.217.102:8080'+ comment.user.headImgPath" alt="" :title="reply.user.nickname">
                  <span>{{reply.user.nickname}}</span>
                  </router-link>
                  <span>：</span>
                  {{comment.content}}
                  <span class="time">{{comment.sendTime | formatDate}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="sendComment">

          <el-dialog title="短评" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item  >
                <div style="margin: 20px 0;"></div>
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.content"
                  maxlength="30"
                  show-word-limit
                >
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="ontop"></div>
      </div>
  </div>
</template>

<script>
  import qs from 'qs'
    export default {
      name: "article",
      data(){
        return {
          article: {},
          articleId: '',
          isLoading: false,
          replies: [],
          dialogFormVisible: false,
          form: {
            content: '',
            fileImg: ''
          },
          formLabelWidth: '120px'
        }
      },
      methods:{
        getData(){
          this.articleId = this.$route.params.articleId
          this.$http.get(`http://47.102.217.102:8080/noteshare2/post/postDetail2/${this.articleId}`,{mdrender:true}).then((res)=>{
            if(res.data.msg === '成功'){
              this.isLoading = false
              this.article = res.data.data
              this.replies = res.data.data.replyVos
              console.log("this.article")
              console.log(this.article)
            }

          }).catch((err)=>{
            console.log(err)
          })
        },
        handleSubmit(){
          this.dialogFormVisible = false
          if(this.form.content === '') return
          this.form.postId = this.$route.params.articleId
          this.$http.post('http://47.102.217.102:8080/noteshare2/reply/sendReply2',qs.stringify(this.form)).then(res=>{
            console.log(res)
            this.getData()
          }).catch(res=>{
            console.log(res)
            this.getData()
          })
        }
      },
      computed:{
        articleTab(){
          switch(this.article.tab)
          {
            case 'share':
              return '分享'
              break;
            case 'ask':
              return '问答'
              break;
            case 'job':
                return '招聘'
              break;
            default:
              return '其他'
          }
        }
      },
      beforeMount(){
        this.isLoading = true
        this.getData()
      },
      watch: {
        '$route'(to,from){
          this.getData()
        }
      }
    }
</script>

<style scoped>
  @import url('../assets/markdown-github.css');
  div.content{
    width: 1000px;
    display: inline-block;
  }
  div.content .topic_header{
    padding: 10px;
    background-color: white;
    border-radius: 2px;
  }
  div.topic_full_title span.put-top, ul li span.put-good{
    background-color: #80bd01;
    color: white;
    font-size:12px;
    padding: 2px 4px;
    border-radius: 4px;
  }
  div.topic_full_title span.tab{
    font-size: 12px;
    background-color: #e5e5e5;
    color: #999999;
    padding: 2px 4px;
    border-radius: 4px;
  }
  div.topic_full_title span.article_title{
    font-size: 22px;
    font-weight: 700;
    color: #333
  }
  div.topic_header div.changes span::before{
    content: "•";
  }
  div.topic_header div.changes span{
    font-size: 12px;
    color: #838383;
  }
  .markdown-text img {
    width: 92% !important;
  }
  .topic_content{
    padding: 10px 15px;
    border-top: 1px solid #ccc;
    background-color: white;
    border-radius: 2px;
  }
  div.header{
    background-color: #fff;
    margin-top: 12px;
    font-size: 14px;
    padding: 10px;
    border-radius: 2px;
  }
  ul>li.reply{
    padding: 10px;
    position: relative;
  }
  ul>li.reply{
    border-top: 1px solid #eee;
    background-color: #fff;
  }
  ul>li>div.user_info{
    height: 20px;
    position: relative;
  }
  ul>li>div.user_info img{
    height: 30px;
    width: 30px;
    vertical-align: top;
  }
  ul>li>div.user_info span{
    vertical-align: top;
    font-size: 12px;
    font-weight: bold;
    color: #666;
    margin-left: 5px;
  }
  ul>li>div.user_info>div.ups{
    position: absolute;
    right: 0;
    top: 0;
    color: #666;
    font-size: 12px;
  }
  ul>li>div.reply_content{
    padding-left: 50px;
  }
  ul>li .user_info span.host{
    background-color: #6ba44e;
    color: white;
    padding: 2px;
    border-radius: 2px;
    font-weight: normal;
  }
  .reply_content .comment{
    color: #222;
    font-size: 14px;
    padding: 5px;
    background-color: #fafafa;
    border-bottom: 2px solid white;
  }
  .reply_content .comment .time{
    font-size: 12px;
    color: #99a2aa;
  }
  .reply_content .comment img{
    height: 20px;
    width: 20px;
    vertical-align: middle;
  }
  .reply_content .comment span{
    vertical-align: middle;
  }

  .commentButton{
    float: right;
    background-color: #6ba44e;
    color: #ffffff;
    font-size: 16px;
    padding: 5px;
  }
</style>
