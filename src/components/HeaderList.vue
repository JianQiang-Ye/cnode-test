<template>
    <div class="nav">
      <div class="wrapper">
        <ul class="clearfix">
          <router-link :to="{name:'PostList',params: {tab: 1}}"><li>全部</li></router-link>
          <router-link :to="{name:'PostList',params: {tab: 2}}"><li>公告</li></router-link>
          <router-link :to="{name:'PostList',params: {tab: 3}}"><li>精品</li></router-link>
          <router-link :to="{name:'PostList',params: {tab: 4}}"><li>吐槽</li></router-link>
          <router-link :to="{name:'PostList',params: {tab: 5}}"><li>交流</li></router-link>
          <router-link :to="{name:'NoteLists'}"><li>笔记分享</li></router-link>
          <router-link :to="{name:'PostList1'}"><li><img src="../assets/cnodejs_light.svg" alt=""></li></router-link>
          <li v-if="!ifLogin"><el-button type="text" @click="dialogLoginVisible = true" style="color: #e6ddd8; font-size: 14px">登录</el-button></li>
          <li v-else>{{this.loginForm.username}}</li>
          <el-dialog title="登录" :visible.sync="dialogLoginVisible">
            <el-form :model="loginForm">
              <el-form-item label="用户名" >
                <el-input  v-model="loginForm.username" @blur="verifyLoginUsername"></el-input><span style="color: red;">{{loginForm.usernameMsg}}</span>
              </el-form-item>
              <el-form-item label="密码" >
                <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="loginSubmit">确 定</el-button>
            </div>
          </el-dialog>
          <li v-if="!ifLogin"><el-button type="text" @click="dialogFormVisible = true" style="color: #e6ddd8; font-size: 14px">注册</el-button></li>
          <li @click="cancel" v-else>注销</li>
          <el-dialog title="注册" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="用户名" >
                <el-input  v-model="form.username" @blur="verifyUsername"></el-input><span style="color: red;">{{form.usernameMsg}}</span>
              </el-form-item>
              <el-form-item label="密码" >
                <el-input type="password" v-model="form.password1" autocomplete="off"></el-input><span>密码长度必须6~10位的英文或数字</span>
              </el-form-item>
              <el-form-item label="确认密码" >
                <el-input type="password" v-model="form.password2" autocomplete="off" @blur="verifyPassword"></el-input><span style="color: red;">{{form.passwordMsg}}</span>
              </el-form-item>
              <el-form-item label="验证码" >
                <el-input v-model="form.verifyCode" autocomplete="off" @blur="verifycode" @focus="getImg" style="width:100px;vertical-align: top" ></el-input>
                <div class="vCode">
                  <img :src="form.verImg" alt="">
                </div>
                <p style="color: red;vertical-align: top">{{form.vCodeMsg}}</p>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="registerSubmit">确 定</el-button>
            </div>
          </el-dialog>
          <li>
            <svg class="icon" aria-hidden="true" fill="red">
              <use xlink:href="#icon-chaxun"></use>z
            </svg>
            <input type="search" style="width: 100px">
          </li>
        </ul>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="irregularLineSVG">
        <defs>
          <pattern id="irregularLine" x="0" y="0" width="100%" height="100%">
            <polygon points="1380,0 1000,20 845,12 630,19 467,12 288,8 105,17 0,5 0,0" fill="#445b55"></polygon>
          </pattern>
          <filter id="irregularLine-shadow">
            <feDropShadow dx="2" dy="2" stdDeviation="3"></feDropShadow>
          </filter>
        </defs>
        <rect
          width="100%"
          height="2rem"
          fill="url(#irregularLine)"
          style="filter:url(#irregularLine-shadow)"
        ></rect>
    </svg>
    </div>
</template>

<script>
  import qs from 'qs'
    export default {
      name: "header-list",
      data(){
        return {
          headerLists: ['全部','精华','分享','问答','招聘'],
          dialogFormVisible: false,
          dialogLoginVisible: false,
          form: {
            username: '',
            password: '',
            password1: '',
            password2: '',
            verifyCode: '',
            usernameMsg: '用户名必须是由英文、数字、下划线组成',
            passwordMsg: '两次密码必须一致',
            usernameIf: false,
            passwordIf: false,
            vcIf: false,
            verImg: '',
            vCode: '',
            vCodeMsg: '',
            vCodeIf: false
          },
          loginForm: {
            username: '',
            password: '',
            usernameMsg: '',
            usernameIf: false
          },
          ifLogin: false
        }
      },
      methods: {
        cancel(){
          this.$http.get('http://47.102.217.102:8080/noteshare2/user/logout',{withCredentials: true}).then((res)=>{
            console.log(res)
          }).catch((res)=>{
            console.log(res)
          })
        },
        verifyUsername(){
          // 验证用户名
          this.$http.post('http://47.102.217.102:8080/noteshare2/user/validateUsername2',qs.stringify({
            'username': this.form.username
          })).then((res)=>{
            console.log(res)
            if(res.status === 200 && res.data.state === 0){
              this.form.usernameMsg = '用户已存在'
              this.form.usernameIf = false
              console.log('用户名已存在')
            }else{
              this.form.usernameMsg = ''
              this.form.usernameIf = true
              console.log('用户名不存在')
            }
          }).catch((res)=>{
            console.log(res)
          })
        },
        verifyLoginUsername(){
          this.$http.post('http://47.102.217.102:8080/noteshare2/user/validateUsername2',qs.stringify({
            'username': this.loginForm.username
          })).then(res=>{
            if(res.status === 200 && res.data.state === 0){
              this.loginForm.usernameMsg = ''
              this.usernameIf = true
              console.log('用户名已存在')
            }else{
              this.loginForm.usernameMsg = '用户名不存在'
              this.usernameIf = false
              console.log('用户名不存在')
            }
          })
        },
        verifyPassword(){
          // 校验用户输入的两次密码是否一致
          if(this.form.password1 === this.form.password2){
            this.form.passwordMsg = ''
            this.form.passwordIf = true
          }else{
            this.form.passwordMsg = '密码不一致'
            this.form.passwordIf = false
          }
        },
        getImg(){
          // 用于获取验证码的图片
          this.$http.get('http://47.102.217.102:8080/noteshare2/user/getVerifyCode').then(res=>{
            this.form.verImg = 'http://47.102.217.102:8080'+ res.data.data.verifyCodePath
            this.form.vCode = res.data.data.verifyCode // 正确的验证码
            console.log(res)
          }).catch(res=>{
            console.log(res)
          })
        },
        verifycode(){
          // 匹配用户的验证码和正确的验证码
          if(this.form.verifyCode === this.form.vCode && this.form.verifyCode !== ''){
            this.form.vCodeMsg = ''
            console.log('验证码正确')
            this.form.vCodeIf = true
          }else{
            this.form.vCodeMsg = '验证码错误'
            this.form.vCodeIf = false
          }
        },
        registerSubmit(){
          // 向注册接口提交数据
          this.dialogFormVisible = false
          if(this.form.usernameIf === true && this.form.passwordIf === true && this.form.vCodeIf === true){
            this.$http.post('http://47.102.217.102:8080/noteshare2/user/register',qs.stringify({
              verifyCode: this.form.vCode, // 正确的验证码
              verifyCodeUser: this.form.vCode, // 用户的验证码
              username: this.form.username,
              password: this.form.password1,
              passwordConfirm: this.form.password2 // 第二次输入的密码
            })).then(res=>{
              if(res.status === 200){
                alert('注册成功')
              }
              console.log(res)
            }).catch(res=>{
              console.log(res)
            })
          }
        },
        loginSubmit(){
          this.dialogLoginVisible = false
          if(this.usernameIf === true && this.loginForm.username !== '' && this.loginForm.password !== ''){
            let username = this.loginForm.username
            let password = this.loginForm.password
            var date  = new Date()
            this.$http.post('http://47.102.217.102:8080/noteshare2/user/validatePassword2',qs.stringify({
              username,
              password,
              date
            })).then((res)=>{
              console.log(res)
              if(res.status === 200 && res.data.msg === '成功' && res.data.data === '验证正确！'){
                this.loginFormSubmit(username,password)
                console.log(res.data.data)
              }else if(res.status === 200 && res.data.data === '当前用户已登陆!'){
                alert('当前用户已登陆!')
              }else {
                alert('登录失败')
              }
            }).catch((res)=>{
              console.log(res)
            })
          }
        },
        loginFormSubmit(username,password){
          this.$http.post('http://47.102.217.102:8080/noteshare2/user/login2',qs.stringify({
            username,
            password
          }),{withCredentials: true}).then((res)=>{
            if(res.data.msg==='成功' && res.status === 200){
              console.log(res)
              console.log('登陆成功')
              this.ifLogin = true
            }else{
              console.log('登录失败')
              this.ifLogin = false
            }
          }).catch((res)=>{
            console.log(res)
          })
        }
      }
    }
</script>

<style scoped>
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .nav{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #445b55;
  }
  .nav .wrapper{
    display: inline-block;
    vertical-align: top;
  }
  .nav ul{

  }
  .nav ul li{
    display: inline-block;
    color: #e6ddd8;
    margin: 0px 12px;
    vertical-align: middle;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }
  .underline{
    width: 35px;
  }
  .nav ul li:hover{
    color: white;
  }
  .nav ul li:hover .underline{
    height: 2px;
    background-color: white;
  }
  .nav ul li img{
    width: 120px;
    height: 78px;
    vertical-align: middle;
  }
  svg.irregularLineSVG{
    width: 100%;
    height: 2rem;
    position: absolute;
    top:78px;
  }
  pattern {
    width: 100%;
    height: 100%;
  }
  svg.icon{
    transform: scale(1.3);
    fill: red;
  }
  ul li input{

  }
  .vCode,.vCode img{
    display: inline-block;
    height: 50px;
    width: 100px;
  }
</style>
