<template>
    <div class="detail-container">
        <h4 class="title">{{newsInfo.title}}</h4>
        <div class="subtitle">
            <span>发布时间:{{newsInfo.add_time | dateFormat }}</span>
            <span class="click">点击次数 {{newsInfo.click}} 次</span>
        </div>
        <div class="content" v-html="newsInfo.content"></div>
        <div class="comment">
            <h4>发表评论</h4>
            <textarea placeholder="请输入评论的内容" v-model="content"></textarea>
            <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        </div>
        <!--评论内容-->
        <div class="list-item" v-for="(item,index) in comments" :key="index">
            <div class="user">第{{ index+1 }}楼用户： {{ item.user_name }} <br>发表时间： {{ item.add_time | dateFormat }}</div>
            <div class="content">
                {{item.content}}
            </div>
        </div>
        <!-- 加载更多 -->
        <div class="load">
            <mt-button type="danger" plain size="large" @click="loadmore">加载更多</mt-button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return{
                //模板中获取参数,不要this,在script中要this
                //newslist:[]  newsInfo[0].title  会报属性不识别的错误,下标加载message上
                newsInfo:{},
                content:'',
                pageindex:1,
                comments:[]

            }
        },
        created(){
            this.getdetail();
            this.getComments();
            this.loadmore();
        },
        methods:{
            getdetail(){
                this.$http.get("api/getnew/"+this.$route.params.id).then(function(res){
                    console.log(res.body);//vue扩展中才能看到
                    if(res.body.status == 0){
                        this.newsInfo = res.body.message[0];
                    }
                })
            },
            getComments(){
                this.$http.get("api/getcomments/"+this.$route.params.id+'?pageindex='+this.pageindex).then(function(res){
                    if(res.body.status == 0){
                        this.comments = res.body.message;
                    }
                })
            },
            postComment(){
                if(this.content.trim() == ''){
                    Toast('评论不能为空');
                    return ;
                }
                this.$http.post("api/postcomment/"+this.$route.params.id,{content:this.content},{emulateJSON:true}).then(function(res){
                    if(res.body.status == 0){
                        Toast('评论成功');
                        this.content = '';
                        this.getComments(); //重新加载最新的评论信息
                    }
                })
            },
            loadmore(){
                this.pageindex = this.pageindex+1;
                this.$http.get("api/getcomments/"+this.$route.params.id+'?pageindex='+this.pageindex).then(function(res){
                    if(res.body.status == 0){
                        this.comments = res.body.message;
                        if(this.comments.length == 0){
                            Toast('我还是有底线的....');
                        }
                    }
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    .detail-container{
        padding:0 10px;
        .title{
            color:red;
            text-align:center;
            font-size:15px;
            padding:8px 0;
        }
        .subtitle{
            color:blue;
            font-size:12px;

        }
        .click{
            float:right;
        }
        .comment {
            height:218px;
            .title {
                font-size: 18px;
            }
            textarea {
                height: 130px;
                border:1px solid deepskyblue;
            }
            button {
                margin-top:-10px;
            }
        }
        .list-item{
            .user{
                background-color: #ccc;
                font-size:14px;
                padding:3px 8px;
                color:deepskyblue;
                font-weight: bold;
            }
            .content{
                margin:8px;
            }

        }
        .load{
            height:100px;
        }

    }
</style>