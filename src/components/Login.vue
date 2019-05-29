<template>
    <div class="login">
      <div class="form-wrapper">
        <h1>登录</h1>
        <form action="" method="post" @submit.prevent="loginSubmit" id="loginForm">
          <div class="row">
            <label>用户名</label>
            <input type="text" name="username" @blur="validateUsername">
            <label class="validate">{{usernameMsg}}</label>
          </div>
          <div class="row">
            <label>密码</label>
            <input type="password" name="password" @blur="validatePassword">
            <label class="validate">{{passwordMsg}}</label>
          </div>
          <div class="row login-button" >
            <input type="submit" value="登录" >
          </div>
        </form>
      </div>
    </div>
</template>

<script>
  import qs from 'qs'
  import $ from 'jquery'
    export default {
      name: "login",
      data(){
        return {
          usernameMsg: '',
          passwordMsg: ''
        }
      },
      methods: {
        loginSubmit(){
          var date  = new Date()
          var username = document.querySelector('[name="username"]').value
          var password = document.querySelector('[name="password"]').value

          if(username && password){
            //  验证密码
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
        validateUsername(){
          var username = document.querySelector('[name="username"]').value
          if(!username){
            this.usernameMsg = '账户不能为空'
          }else{
            // 验证用户名
            this.$http.post('http://47.102.217.102:8080/noteshare2/user/validateUsername2',qs.stringify({
              'username': username
            })).then((res)=>{
              if(res.status === 200 && res.data.msg === '成功'){
                this.usernameMsg = ''
              }else {
                this.usernameMsg = '用户名不存在'
              }
            }).catch((res)=>{
              console.log(res)
            })
          }
        },
        validatePassword(){
          var password = document.querySelector('[name="password"]').value
          if(!password){
            this.passwordMsg = '密码不能为空'
          }
        },
        loginFormSubmit(username,password){
          this.$http.post('http://47.102.217.102:8080/noteshare2/user/login2',qs.stringify({
            username,
            password
          }),{withCredentials: true}).then((res)=>{
            console.log(res)
          }).catch((res)=>{
            console.log(res)
          })
        }
      }
    }
</script>

<style scoped>
  .login{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .login .form-wrapper{
    border: 1px solid #aaa;
    padding: 20px;
  }
  .login .form-wrapper .row{
    padding: 10px 0;
  }
  .login .row label{
    display: inline-block;
    min-width: 4em;
  }
  .login .login-button {
    text-align: center;
  }
  .login .form-wrapper form label.validate{
    font-size: 12px;
    color: red;
    width: 6em;
  }
</style>
