<template>
    <div class="rank">
      <div>
        <h1>笔记排行榜</h1>
        <div>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
      <div>
        <h1>帖子排行榜</h1>
        <div>
          <ul>
            <li>

            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "go-rank",
      methods: {
        getData(page,tab){
            this.$http.get('http://47.102.217.102:8080/noteshare2/post/getPosts2',{params:{page,limit:20,tab}}).then((res)=>{
              this.items = res.data.data
              console.log(this.items)
            }).catch((err)=>{
              console.log(err)
            })
          }
        }
    }
</script>

<style scoped>

</style>
