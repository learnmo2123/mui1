//引入vue框架
import Vue from 'vue';
import Vuex from 'vuex'; //导入vuex组件  共享数据
Vue.use(Vuex); // 显示安装到vue身上去
//初始获取本地存储的购物车数据
var cartData = JSON.parse(localStorage.getItem('cartData') || '[]');
//vuex组件的store存储数据
var store = new Vuex.Store({
    //state是共享的数据
    state: {
        cartData: cartData  //从本地读取数据,id number ,price,selected
    },
    //修改共享数据.mutations方法
    mutations: {
        //添加数据到共享区
        add(state, data) {
            var flag = false; // 默认没有相同的商品
            //相同的商品的加数量
            state.cartData.forEach(function (item, index) {
                if (item.id == data.id) {
                    //商品加,转数字加
                    item.number = parseInt(data.number) + parseInt(item.number);
                    flag = true;  //找到了相同的商品,将标识改为true
                }
            });
            if (flag == false) {
                state.cartData.push(data); //添加商品
            }
            //需要同步到本地存储
            localStorage.setItem('cartData', JSON.stringify(state.cartData));
        },
        //修改商品选中状态
        changeSelected(state, obj) {
            state.cartData.forEach(function (item, index) {
                //找到相应的商品,修改对应的状态
                if (item.id == obj.id) {
                    item.selected = obj.selected;
                }
                //存储到本地 同步
                localStorage.setItem('cartData', JSON.stringify(state.cartData));
            });
        },
        //删除购物车中的商品
        del(state, id) {
            console.log('删除的id:' + id);
            state.cartData.forEach(function (item, index) {
                if (item.id == id) {
                    state.cartData.splice(index, 1);
                }
                //存储到本地 同步
                localStorage.setItem('cartData', JSON.stringify(state.cartData));
            })
        },
        //修改数量
        changeNumber(state, obj) {
            state.cartData.forEach(function (item, index) {
                if (item.id == obj.id) {
                    item.number = obj.number;
                }
            });
            //存储到本地 同步
            localStorage.setItem('cartData', JSON.stringify(state.cartData));
        }
    },
    getters: {
        //state中的数据一改变,这里的方法就会同步数据
        getTotalNumber(state) {
            var totalNumber = 0;
            state.cartData.forEach(function (item, index) {
                totalNumber += parseInt(item.number);
            })
            return totalNumber;
        },
        //获取购物车商品的字符串ids
        getGoodsIds(state) {
            var ids = [];

            state.cartData.forEach(function (item, index) {
                ids.push(item.id);
            });
            return ids.join(',');
        },
        //获取购物车商品id和对应数量的对象
        getGoodsNumber(state) {
            var obj = {};
            //json对象可以通过键获取值
            state.cartData.forEach(function (item, index) {
                obj[item.id] = item.number;
            });
            return obj;
        },
        //选中商品的状态
        getGoodsSelected(state) {
            var obj = {};
            state.cartData.forEach(function (item, index) {
                obj[item.id] = item.selected;
            })
            return obj;
        },
        //获取购物车选中商品的总数量和价格
        getSelectGoodsInfo(state) {
            var obj = {
                selectedNumber: 0,
                selectedPrice: 0,
            }
            state.cartData.forEach(function (item, index) {
                //判断是否选中
                if (item.selected == true) {
                    obj['selectedNumber'] += parseInt(item.number);
                    obj['selectedPrice'] += parseInt(item.price) * parseInt(item.number);
                }
            })
            return obj;
        }
    }
});


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
// import home from './components/tabbar/home.vue';
// import search from './components/tabbar/search.vue';
// import shopcar from './components/tabbar/shopcar.vue';
// import member from './components/tabbar/member.vue';
// import newslist from './components/news/newslist.vue';
// import newsdetail from './components/news/newsdetail.vue';
//
// //定义路由匹配
// var router = new VueRouter({
//     routes:[
//         {path:"/",redirect:'/home'},  //路由重定向
//         {path:"/home",component:home},
//         {path:"/member",component:member},
//         {path:"/shopcar",component:shopcar},
//         {path:"/search",component:search},
//         {path:"/home/newslist",component:newslist},
//         {path:"/home/newsdetail/:id",component:newsdetail}
//     ],
//     //修改路由匹配到的默认类, 修改为mui的类
//     'linkActiveClass':'mui-active'
// });
//引入路由模块，获取路由对象
import router from './router.js';
import moment from 'moment';
//定义全局过滤器
Vue.filter('dateFormat', function (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dateStr).format(pattern);
    //return 1111;
});
//引入mintui组件(css一般可以按需引入，而js一般是全局引入   )
import {Header, Button} from 'mint-ui';
import 'mint-ui/lib/style.css'

Vue.component(Header.name, Header);
//按需导入轮播图所需要的两个组件
import {Swipe, SwipeItem, Lazyload,Switch} from 'mint-ui';

Vue.component(Swipe.name, Swipe);
//按需加载懒加载的组件
Vue.component(SwipeItem.name, SwipeItem);  //注册组件
Vue.use(Lazyload);
//按钮组件

Vue.component(Button.name, Button);

Vue.component(Switch.name, Switch);
//按需引入vant的标签页组件
import {Tab, Tabs} from 'vant';
import 'vant/lib/index.css';

Vue.use(Tab).use(Tabs);

//引入mui的css样式
import './lib/mui/css/mui.min.css';
//引入mui扩展的字体文件
import './lib/mui/css/icons-extra.css';

//导入 app.vue根组件
import app from './app.vue'

//创建vm的实例
new Vue({
    el: "#app",
    //当函数的参数只有一个1个可以省略掉小括号，
    //当函数体内容只有一条语句，可以省略花括号，且一条语句不用加return,因为默认会return 返回
    // render: c => c(app),
    render: function (c) {
        return c(app);
    },
    // 把路由匹配对象挂在vm实例身上
    router: router,
    store
});