<template>
    <div class="noteLists">
      <h1>
        <el-button type="text" @click="dialogFormVisible = true" class="sendNote">我要创建笔记</el-button>
      </h1>
      <div class="wrapper">
        <div class="note" v-for="item in noteLists">
          <div class="cover">
            <img :src="'http://47.102.217.102:8080'+ item.cover" class="coverImg" alt="">
          </div>
          <div class="detail">
            <div class="detail-wrapper">
              <router-link :to="{name: 'NoteDetail',params: {noteId: item.noteId}}">
                <h3 class="title" style="color: #445b55">{{item.title}}</h3>
              </router-link>
              <div class="scoreImgWrapper">
                <b>{{item.scoreCalu}}</b>
                <div v-for="scoreImg in item.scoreList" class="scoreImg">
                  <img :src="'http://47.102.217.102:8080'+ scoreImg" :alt="item.scoreCalu">
                </div>
                <span class="discussCount">{{item.discussCount}}人评论</span>
              </div>
              <div class="time">{{item.sendTime | formatDate}}</div>
              <span class="field">分类：{{item.field}}</span>
              <p class="summary">简介：{{item.summary}}</p>
            </div>
          </div>
        </div>
      </div>

      <el-dialog title="创建笔记" :visible.sync="dialogFormVisible">
        <el-upload
          class="avatar-uploader"
          action="http://47.102.217.102:8080/noteshare2/note/uploadCover2"
          name="noteCover"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <fm-generate-form :data="jsonData" :remote="remoteFuncs" :value="editData" ref="generateForm">

        </fm-generate-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import qs from 'qs'
    export default {
      name: "note-lists",
      data(){
        return {
          noteLists:[],
          dialogFormVisible: false,
          formLabelWidth: '120px',
          jsonData: {
            "list": [{
              "type": "input",
              "name": "笔记名",
              "icon": "icon-input",
              "options": {
                "width": "30%",
                "defaultValue": "",
                "required": false,
                "dataType": "string",
                "pattern": "",
                "placeholder": "",
                "customClass": "",
                "remoteFunc": "func_1558975121042",
                "remoteOptions": []
              },
              "key": "1558975165704",
              "model": "title",
              "rules": [{"type": "string", "message": "笔记名格式不正确"}]
            }, {
              "type": "textarea",
              "name": "笔记摘要",
              "icon": "icon-diy-com-textarea",
              "options": {
                "width": "30%",
                "defaultValue": "",
                "required": false,
                "disabled": false,
                "pattern": "",
                "placeholder": "",
                "customClass": "",
                "remoteFunc": "func_1558975222119",
                "remoteOptions": []
              },
              "key": "1558975222119",
              "model": "summary",
              "rules": []
            }, {
              "type": "select",
              "name": "笔记领域",
              "icon": "icon-select",
              "options": {
                "defaultValue": "",
                "multiple": false,
                "disabled": false,
                "clearable": false,
                "placeholder": "",
                "required": false,
                "showLabel": false,
                "width": "",
                "options": [{"value": "历史"}, {"value": "地理"}, {"value": "下拉框3"}],
                "remote": false,
                "filterable": false,
                "remoteOptions": [],
                "props": {"value": "value", "label": "label"},
                "remoteFunc": "func_1558975281677",
                "customClass": ""
              },
              "key": "1558975358302",
              "model": "field",
              "rules": []
            }, {
              "type": "select",
              "name": "笔记类型",
              "icon": "icon-select",
              "options": {
                "defaultValue": "",
                "multiple": false,
                "disabled": false,
                "clearable": false,
                "placeholder": "",
                "required": false,
                "showLabel": true,
                "width": "",
                "options": [{"value": 0,"label":"读书笔记"}, {"value": 1,"label":"学习笔记"}],
                "remote": false,
                "filterable": false,
                "remoteOptions": [],
                "props": {"value": "value", "label": "label"},
                "remoteFunc": "func_1558975281677",
                "customClass": ""
              },
              "key": "1558975281677",
              "model": "style",
              "rules": []},
            // }, {
            //   "type": "imgupload",
            //   "name": "笔记封面",
            //   "icon": "icon-tupian",
            //   "options": {
            //     "defaultValue": [],
            //     "size": {"width": 100, "height": 100},
            //     "width": "",
            //     "tokenFunc": "funcGetToken",
            //     "token": "",
            //     "domain": "http://pfp81ptt6.bkt.clouddn.com/",
            //     "disabled": false,
            //     "length": 8,
            //     "multiple": false,
            //     "isQiniu": false,
            //     "isDelete": false,
            //     "min": 0,
            //     "isEdit": false,
            //     "action": "http://47.102.217.102:8080/noteshare2/note/uploadCover2",
            //     "customClass": "",
            //     "remoteFunc": "func_1558975381460",
            //     "remoteOptions": []
            //   },
            //   "key": "1558975381460",
            //   "model": "cover",
            //   "rules": []
            // },
              {
              "type": "editor",
              "name": "笔记正文",
              "icon": "icon-fuwenbenkuang",
              "options": {
                "defaultValue": "",
                "width": "80%",
                "customClass": "",
                "remoteFunc": "func_1558975450630",
                "remoteOptions": []
              },
              "key": "1558975450630",
              "model": "content",
              "rules": []
            }], "config": {"labelWidth": 100, "labelPosition": "right", "size": "small", "customClass": ""}
          },
          editData: {},
          remoteFuncs: {

            funcGetToken(resolve) {
              // 笔记封面 imgupload_1558975381460
              // 获取到token数据后执行回调函数
              // resolve(token)
            },
          },
          imageUrl: ''
        }
      },
      methods: {
        getData(){
          this.$http.get('http://47.102.217.102:8080/noteshare2/note/getNotes').then((res)=>{
            this.noteLists = res.data.data
            console.log('this.noteLists')
            console.log(this.noteLists)
          }).catch((err)=>{
            console.log(err)
          })
        },
        handleSubmit() {
          this.dialogFormVisible = false
          this.$refs.generateForm.getData().then(data => {
            console.log(data)
            // 数据校验成功
            // data 为获取的表单数据
            if(this.imageUrl !== ''){
              var imageUrl = this.imageUrl.replace('http://47.102.217.102:8080','')
              console.log(imageUrl)
              data.cover = imageUrl
            }
            this.sendNote(data)
          }).catch(e => {
            console.log(e)
            // 数据校验失败
          })
        },
        sendNote(data){
          this.$http.post('http://47.102.217.102:8080/noteshare2/note/sendNote2',qs.stringify(data)).then((res)=>{
            console.log(res)
            if(res.status === 200 && res.data.msg === '成功'){
              this.getData()
            }
          }).catch(res=>{
            console.log(res)
          })
        },
        handleAvatarSuccess(res, file) {
          console.log(res)
          if(res.msg === '成功'){
            this.imageUrl = 'http://47.102.217.102:8080' + res.data
            console.log('hhh')
            console.log(this.imageUrl)
          }
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      },
      beforeMount(){
        this.getData()
      }
    }
</script>

<style scoped>
  .noteLists{
    max-width: 1062px;
  }
  .noteLists .wrapper{
    display: inline-block;
  }
  .noteLists .wrapper .note{
    width: 500px;
    float: left;
    height: 160px;
    padding: 5px;
    margin: 35px 0px;

  }
  .noteLists .wrapper .note:nth-child(even){
    width: 500px;
    float: right;
  }
  .noteLists .wrapper .note .cover{
    height: 120px;
    width: 100px;
    float: left;
  }
  .noteLists .wrapper .note .cover img{
    height: 120px;
    width: 100px;
  }
  .noteLists .wrapper .note .detail{
    float: left;
    width: 350px;
    padding: 0 0 0 15px;
    font-size: 14px;
    color: #666;
    position: relative;
  }
  .noteLists .wrapper .note .detail p{
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .noteLists .wrapper .note .detail h3{
    margin-bottom: 15px;
  }
  .noteLists .wrapper .note .detail b{
    vertical-align: top;
  }
  .noteLists .wrapper .note .detail .scoreImgWrapper .scoreImg{
    display: inline-block;
  }
  .noteLists .wrapper .note .detail .scoreImgWrapper .scoreImg img{
    height: 20px;
    width: 20px;
    vertical-align: center;
  }
  .noteLists .time{
    position: absolute;
    top: 0;
    right: 0;
  }
  .noteLists .discussCount{
    font-size: 12px;
    color: #666;
    vertical-align: top;
  }

  /*上传照片*/
  .avatar-uploader .el-upload {
    border: 1px dashed red;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: 15px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid #409EFF;
    margin: 15px 0 15px 100px;
  }
  .avatar {
    width: 178px;
    height: 220px;
    display: block;
    margin: 15px 0 15px 100px;
  }
  .detail-wrapper .field{
    padding: 10px;
  }
  .detail-wrapper .summary{
    padding: 15px;
  }
  .sendNote{
    font-size: 26px;
    font-weight: bold;
    color: #80bd01;
  }
  .sendNote:hover{
    color: #409eff;
  }
</style>
