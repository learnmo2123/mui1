<template>
    <div>
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
                content:'',
                pageindex:1,
                comments:[]
            }
        },
        //接首父传过来的数据
        props:['id'],
        created(){
            this.getComments();
            this.loadmore();
        },
        methods:{
            getComments(){
                this.$http.get("api/getcomments/"+this.id+'?pageindex='+this.pageindex).then(function(res){
                    console.log(this.id);
                    if(res.body.status == 0){
                        if (res.body.message.length == 0) {
                            Toast('没有更多');
                        }
                        //this.comments = res.body.message;
                        this.comments = this.comments.concat(res.body.message);
                    }
                })
            },
            postComment(){
                if(this.content.trim() == ''){
                    Toast('评论不能为空');
                    return ;
                }
                this.$http.post("api/postcomment/"+this.id,{content:this.content},{emulateJSON:true}).then(function(res){
                    if(res.body.status == 0){
                        Toast('评论成功');
                        this.content = '';
                        this.comments = []; //清空数据
                        this.getComments(); //重新加载最新的评论信息
                    }
                })
            },
            loadmore(){
                this.pageindex++;
                // this.$http.get("api/getcomments/"+this.$route.params.id+'?pageindex='+this.pageindex).then(function(res){
                //     console.log(this.pageindex);
                //     if(res.body.status == 0){
                //         this.comments = res.body.message;
                //         if(this.comments.length == 0){
                //             Toast('我还是有底线的....');
                //         }
                //     }
                // })
                this.getComments();
            }
        }

    }
</script>

<style lang="scss" scoped>
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
</style>