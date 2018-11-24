
//引入vue框架
import Vue from 'vue';
//引入vue-resource模块，用来发送ajax请求
import vueResource from 'vue-resource';
//安装到vue的身上去
Vue.use(vueResource);
//引入vue-router路由
import VueRouter from 'vue-router';
//安装到vue身上去
Vue.use(VueRouter);

//全局设置ajax请求的根域名
Vue.http.options.root = "http://127.0.0.1:3000/";
//引入路由匹配对应的组件
import home from './components/tabbar/home.vue';
import search from './components/tabbar/search.vue';
import shopcar from './components/tabbar/shopcar.vue';
import member from './components/tabbar/member.vue';
import newslist from './components/news/newslist.vue';
import newsdetail from './components/news/newsdetail.vue';

//定义路由匹配
var router = new VueRouter({
    routes:[
        {path:"/",redirect:'/home'},  //路由重定向
        {path:"/home",component:home},
        {path:"/member",component:member},
        {path:"/shopcar",component:shopcar},
        {path:"/search",component:search},
        {path:"/home/newslist",component:newslist},
        {path:"/home/newsdetail/:id",component:newsdetail}
    ],
    //修改路由匹配到的默认类, 修改为mui的类
    'linkActiveClass':'mui-active'
});


//引入mintui组件(css一般可以按需引入，而js一般是全局引入 )
import { Header } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header);
//按需导入轮播图所需要的两个组件
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//引入mui的css样式
import './lib/mui/css/mui.min.css';
//引入mui扩展的字体文件
import './lib/mui/css/icons-extra.css';

//导入app.vue根组件
import app from './app.vue'

//创建vm的实例
new Vue({
    el:"#app",
    //当函数的参数只有一个1个可以省略掉小括号，
    //当函数体内容只有一条语句，可以省略花括号，且一条语句不用加return,因为默认会return 返回
    // render: c => c(app),
    render:function(c){
        return c(app);
    },
    // 把路由匹配对象挂在vm实例身上
    router:router
});