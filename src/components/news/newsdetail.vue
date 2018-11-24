<template>
    <div >
        <h4>{{newslist[0].title}}</h4>
        <span v-html="newslist[0].content"></span>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                //模板中获取参数,不要this,在script中要this
                newslist:[]
            }
        },
        created(){
            this.getdetail();

        },
        methods:{
            getdetail(){
                this.$http.get("api/getnew/"+this.$route.params.id).then(function(res){
                    console.log(res.body);//vue扩展中才能看到
                    if(res.body.status == 0){
                        this.newslist = res.body.message;
                    }
                })
            }
        }

    }
</script>

<style scoped>

</style>