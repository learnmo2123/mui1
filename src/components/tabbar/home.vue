<template>
    <div class="home-container">
        <!-- 首页的轮播图 -->
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in lunbo" :key="item.id">
                <img :src="item" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 首页的九宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                 <img src="../../images/menu1.png" alt="">
                 <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div>
            </a></li>

        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                lunbo: []
            }
        },
        created() {
            //此生命周期函数，会在当前组件实例等待data和methods属性准备好之后才会执行此函数
            //此函数有点类似jquery的页面加载完毕后执行$(function(){  })
            this.getLunbo();
            //不可以在beforeCreated中去调用getLunbo，因为次函数中methods没有准备好
        },
        methods: {
            getLunbo() {
                // console.log('ajax请求');
                // this.$http.get('http://127.0.0.1:3000/api/getlunbo').then(function (res) {
                //     if (res.body.status == 0) {
                //         this.lunbo = res.body.message;
                //     }
                // });
                this.lunbo = [
                    '../../images/1.jpg',
                    '../../images/2.jpg',
                    '../../images/3.jpg',
                    '../../images/4.jpg'
                ];
            }
        }
    }
</script>

<style lang='scss' scoped>
    .home-container {
        .mint-swipe {
            height: 200px;

            img {
                width: 100%;
                height: 100%;
            }
        }
        /*九宫格样式*/
        .mui-grid-9{
            background-color: #fff;
            .mui-table-view-cell{
                border:none;
                .mui-media-body{
                    font-size:13px;
                }
                img{
                    width:50%;
                }
            }
        }
    }
</style>