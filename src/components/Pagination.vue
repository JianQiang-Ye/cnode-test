<template>
  <div class="pagination">
    <span @click="change(1)">首页</span>
    <span @click="change(page-1)">上一页</span>
    <span v-for="item in lists" @click="change(item)" :class="{'active': item===page}">{{item}}</span>
    <span @click="change(page+1)">下一页</span>
  </div>
</template>

<script>
    export default {
        name: "pagination",
      data(){
          return {
            lists: [1,2,3,4,5,'...'],
            page: 1
          }
      },
      methods: {
          change(page){
            if(typeof page === 'number' && page > 0){
              console.log(page)
              this.page = page
              if(page>=5){
                this.lists = ['...',page-2,page-1,page,page+1,page+2,'...']
              }else {
                this.lists = [1,2,3,4,5,'...']
              }
              this.$emit('changePage',this.page)
            }
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
