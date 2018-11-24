测试:

路由参数:1) 路由配置传参方式
在配置路由时 例如 "/firewall/authorize/:uid/:uname/:token"
页面url为 http://XXX.com/firewall/authorize/23/zhangman/232454

js 接收方式 this.$route.params.uid,
2) ?传参方式
例 http://XXX.com/firewall/authorize?uid=12&uname=zhangman&token=23243
js 接收方式 this.$route.query.uid

参数的写法和绑定

```js
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
```

