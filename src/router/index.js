// 路由配置文件
import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import Slidebar from '../components/Slidebar'
import NoteLists from '../components/NoteLists'
import Login from '../components/Login'
import NoteDetail from '../components/NoteDetail'
import Add from '../components/AddTopic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'PostList',
      path: '/noteshare2/:tab',
      components: {
        main: PostList
      }
    },
    {
      name: 'PostList1',
      path: '/noteshare2/',
      components:{
        main: PostList,
        add: Add
      },
      meta:{
        isLogin: true
      }
    },
    {
      name: 'Article',
      path: '/noteshare2/post/postDeatail2/:articleId&userId=:userId',
      components: {
        main: Article,
        slidebar: Slidebar
      }
    },
    {
      name: 'User_info',
      path: '/noteshare2/user/getUserDetail/:userId',
      components: {
        main: UserInfo,
        slidebar: Slidebar
      }
    },
    {
      name: 'NoteLists',
      path: '/noteshare2/note/getNotes',
      components: {
        main: NoteLists
      }
    },
    {
      name: 'Login',
      path: '/noteshare2/login',
      components: {
        main: Login
      }
    },
    {
      name: 'NoteDetail',
      path: '/noteshare2/note/noteDetail2/:noteId',
      components: {
        main: NoteDetail
      }
    }
  ]
})
