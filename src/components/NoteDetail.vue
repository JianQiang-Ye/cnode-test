<template>
    <div class="noteDetail">
      <h1>{{note.title}}</h1>
      <div class="clearfix wrapper">
        <div class="cover">
          <img :src="'http://47.102.217.102:8080'+ note.cover" alt="" v-if="note.cover">
          <img src="../assets/s32278312.jpg" v-else>
        </div>
        <div class="detail" v-for="">
          <span>发布者：{{note.user.nickname}}</span><br>
          <span class="heading">类型：{{note.field}}</span><br>
          <span>标签：{{note.styleStr}}</span><br>
          <span>发表日期：{{note.sendTime | formatDate}}</span><br>
        </div>
        <div class="scoreImgWrapper">
          <div class="scoreCalue">{{note.scoreCalu}}</div>
          <div v-for="scoreImg in note.scoreList" class="scoreImg">
            <img :src="'http://47.102.217.102:8080'+ scoreImg" :alt="note.scoreCalu">
          </div>
          <p style="padding: 10px">{{note.discussCount}}人评价</p>
        </div>
      </div>
      <div class="summary">
        <h3>简介</h3>
        <p>{{note.summary}}</p>
      </div>
      <div class="content">
        <h3>内容</h3>
        <p v-html="note.contentStr"></p>
      </div>
      <div class="discussVos" >
        <h3>讨论区{{note.discussCount}}</h3>
        <div v-for="item in note.discussVos" class="discuss">
          <router-link :to="{name: 'User_info',params:{userId: item.user.userId}}">
            <img :src="'http://47.102.217.102:8080'+ item.user.headImgPath" class="avatar">
            <span class="nickname">{{item.user.nickname}}</span>
          </router-link>
          <div class="dScoreImgWrapper">
            <div class="dScoreCalue">{{item.score}}</div>
            <div v-for="scoreImg in item.scoreList" class="dSoreImg">
              <img :src="'http://47.102.217.102:8080'+ scoreImg" :alt="item.score">
            </div>
            <span class="time">{{item.sendTime | formatDate}}</span>
          </div>
          <p>{{item.content}}</p>
        </div>
      </div>
      <div>
        <el-button type="text" @click="dialogFormVisible = true" class="comment">我要发表短评</el-button>

        <el-dialog title="短评" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="评分" :label-width="formLabelWidth">
              <el-rate
                v-model="form.scoreStr"
                show-text>
              </el-rate>
            </el-form-item>
            <el-form-item label="短评内容" :label-width="formLabelWidth">
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
    </div>
</template>

<script>
  import qs from 'qs'
    export default {
      name: "note-detail",
      data(){
        return {
          note: {},
          dialogFormVisible: false,
          form: {
            scoreStr: null,
            content: ''
          },
          formLabelWidth: '120px'
        }
      },
      methods: {
        getData(){
          this.$http.get(`http://47.102.217.102:8080/noteshare2/note/noteDetail2/${this.$route.params.noteId}`).then((res)=>{
            console.log(res)
            if(res.status === 200 && res.data.msg === '成功'){
              this.note = res.data.data
              console.log(this.note)
            }
          }).catch((res)=>{
            console.log(res)
          })
        },
        handleSubmit(){
          this.dialogFormVisible = false
          this.form.noteId = this.$route.params.noteId
          this.$http.post('http://47.102.217.102:8080/noteshare2/discuss/sendDiscuss2',qs.stringify(this.form)).then(res=>{
            if(res.status === 200 && res.data.msg === '成功'){
              this.getData()
            }
            console.log(res)
          }).catch(res=>{
            console.log(res)
          })
        }
      },
      beforeMount(){
        this.getData()
      }
    }
</script>

<style scoped>
  .noteDetail h1{
    padding-bottom: 15px;
  }
  .noteDetail .wrapper{
    height: 220px;
    position: relative;
  }
  .noteDetail .cover{
    width: 135px;
    height: 200px;
    float: left;
  }
  .noteDetail .cover img{
    width: 135px;
    height: 200px;
  }
  .noteDetail .detail{
    float: left;
    height: 200px;
    font-size: 14px;
    color: #111;
    margin-left: 15px;
  }
  .noteDetail .summary{

  }
  .noteDetail .clearfix{
    display: block;
    clear: both;
    content: '';
  }
  .summary p{
    padding: 10px;
  }
  .content p{
    padding: 10px;
  }
  .discuss{
    padding: 10px;
  }
  .noteDetail h3{
    font-size: 24px;
    color: #007722;
  }
  .noteDetail .scoreImgWrapper{
    display: inline-block;
    position: absolute;
    top: -50px;
    right: 300px;
  }
  .noteDetail .scoreImgWrapper .scoreImg{
    float: left;
  }
  .noteDetail .scoreCalue{
    font-weight: bold;
    font-size: 32px;
    color: #666;
    padding: 10px;
  }
  .nickname{
    font-size: 24px;
  }
  .dScoreImgWrapper{
    display: inline-block;
    padding: 0 10px;
    font-size: 12px;
    color: #666;
  }
  .dScoreImgWrapper .dScoreCalue{
    float: left;
    padding: 0 5px;
  }
  .dSoreImg{
    float: left;
  }
  .dSoreImg img{
    height: 16px;
    width: 16px;
  }
  .discuss .time{
    font-size: 12px;
    color: #666;
    margin-left: 10px;
  }
  .discussVos .discuss>p{
    padding: 16px;
  }
  .discussVos .discuss .avatar{
    height: 32px;
    width: 32px;
  }
  .discussVos .discuss .nickname{
    color: #0086B3;
    font-size: 20px;
  }
  .noteDetail .comment{
    font-size: 24px;
  }
</style>
