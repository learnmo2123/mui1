<template>
    <div class="newslist-container">
        <!--新闻列表-->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsdetail/'+item.id">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body">
                    <h2>{{ item.title }}</h2>
                    <p class="mui-ellipsis">
                        <span>发布时间:{{ item.add_time }}</span>
                        <span class="click">点击{{ item.click}}次</span>
                    </p>
                </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                newslist:[]
            }
        },
        created(){
            this.getNewsList();
        },
        methods:{
            getNewsList(){
                this.$http.get("api/getnewslist").then(function(res){
                  console.log(res.body);//vue扩展中才能看到
                  if(res.body.status == 0){
                      this.newslist = res.body.message;
                  }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .newslist-container{
        .mui-table-view h2{
            font-size:13px;
        }
        .mui-ellipsis{
            color:blue;
            font-size:12px;
            .click{
                float:right;
            }
        }
    }
</style>