//引入vue-router路由
import VueRouter from 'vue-router';
//引入路由匹配对应的组件
import home from './components/tabbar/home.vue';
import search from './components/tabbar/search.vue';
import shopcar from './components/tabbar/shopcar.vue';
import member from './components/tabbar/member.vue';
import newslist from './components/news/newslist.vue';
import newsdetail from './components/news/newsdetail.vue';
import photolist from  './components/photo/photolist.vue';
import photodetail from  './components/photo/photodetail.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsdetail from './components/goods/goodsdetail.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
//定义路由匹配
var router = new VueRouter({
    routes:[
        {path:"/",redirect:'/home'},  //路由重定向
        {path:"/home",component:home},
        {path:"/member",component:member},
        {path:"/shopcar",component:shopcar},
        {path:"/search",component:search},
        {path:"/home/newslist",component:newslist},
        {path:"/home/newsdetail/:id",component:newsdetail},
        {path:"/home/photolist",component:photolist},
        {path:"/home/photodetail/:id",component:photodetail},
        {path:"/home/goodslist",component:goodslist},
        {path:"/home/goodsdetail/:id",component:goodsdetail},
        {path:'/home/goodsdesc/:id',component:goodsdesc}
    ],
    //修改路由匹配到的默认类, 修改为mui的类
    'linkActiveClass':'mui-active'
});

//暴露给外面
export default router;