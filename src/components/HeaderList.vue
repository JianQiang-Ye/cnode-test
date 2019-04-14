<template>
    <div class="nav">
      <div class="wrapper">
        <ul class="clearfix">
          <router-link :to="{name:'PostList',params: {tab: 'all'}}"><li>全部<div class="underline"></div></li></router-link>
          <router-link :to="{name:'PostList',params: {tab: 'good'}}"><li>精华<div class="underline"></div></li></router-link>
          <router-link :to="{name:'PostList',params: {tab: 'share'}}"><li>分享<div class="underline"></div></li></router-link>
          <router-link :to="{name:'PostList1'}"><li><img src="../assets/cnodejs_light.svg" alt=""></li></router-link>
          <router-link :to="{name:'PostList',params: {tab: 'ask'}}"><li>问答<div class="underline"></div></li></router-link>
          <router-link :to="{name:'PostList',params: {tab: 'job'}}"><li>招聘<div class="underline"></div></li></router-link>
        </ul>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg">
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
    export default {
      name: "header-list",
      data(){
        return {
          headerLists: ['全部','精华','分享','问答','招聘']
        }
      }
    }
</script>

<style scoped>
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
  svg {
    width: 100%;
    height: 2rem;
    position: absolute;
    top:78px;
  }
  pattern {
    width: 100%;
    height: 100%;
  }
</style>
