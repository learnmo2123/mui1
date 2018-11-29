<template>
    <div class="desccontainer">
        <h2 class="title">{{ goodsInfo.title }}</h2>
        <hr>
        <div class="content" v-html="goodsInfo.content">
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                id:this.$route.params.id,
                goodsInfo:{}
            }
        },
        created(){
            //获取图文详情的数据
            this.getGoodsDesc();
        },
        methods:{
            getGoodsDesc(){
                this.$http.get('api/getgoodsdesc/'+this.id).then(function(res){
                    if(res.body.status == 0){
                        this.goodsInfo = res.body.message[0];
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    .desccontainer{
        padding:5px;

        .title{
            font-size:15px;
            color:blue;
            text-align: center;
        }

        /deep/ img{
            width: 100%;
            height: 100%;
        }
    }
</style>