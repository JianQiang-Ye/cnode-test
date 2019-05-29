<template>
  <div class="pagination">
    <span @click="getNum(1)">首页</span>
    <span @click="getNum(page-1)">上一页</span>
    <span v-for="item in lists" @click="getNum(item)" :class="{'active': item===page}">{{item}}</span>
    <span @click="getNum(page+1)">下一页</span>
  </div>
</template>

<script>
    export default {
        name: "pagination",
      data(){
          return {
            lists: [1,2,3],
            page: 1,
            zoomId: 1
          }
      },
      methods: {
          // change(page){
          //   if(typeof page === 'number' && page > 0){
          //     console.log(page)
          //     if(page>=5){
          //       this.lists = ['...',page-2,page-1,page,page+1,page+2,'...']
          //     }else {
          //       this.lists = [1,2,3]
          //     }
          //     this.getNum(page)
          //   }
          // },
        getNum(page){
          if(page<=0){return}
          this.$http.get(`http://47.102.217.102:8080/noteshare2/post/getPostPageInfo `).then((res)=>{
            console.log('当前帖子',res)
            if(res.status === 200 && res.data.msg==='成功'){
              this.lists = res.data.data.nums
              this.zoomId = res.data.data.zoomId
              let totalpage = res.data.data.totalPage
              if(page<=totalpage){
                this.page = page
                this.$emit('changePage',this.page,this.zoomId)
              }
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
      }
    }
</script>

<style scoped>
  .pagination{
    background-color: #f5f2f0;
    text-align: center;
    padding: 50px 0;
  }
 .pagination span{
   border: 1px solid #445b55;
   display: inline-block;
   padding: 10px;
   margin-right: 10px;
   border-radius: 5px;
   cursor: pointer;
   font-size: 12px;
 }
  .pagination span:hover{
    background-color: #445b55;
    color: #fff;
  }
  .pagination span.active{
    background-color: #445b55;
    color: #fff;
  }
</style>
