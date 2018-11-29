<template>
    <div>
        <!-- 首页的轮播图 -->
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in lunbo" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        //使用props来接收父组件传递过来的数据
        props:['lunbo']
    }
</script>

<style lang='scss' scoped>
    .mint-swipe {
        height: 200px;
        .mint-swipe-item{
            text-align: center;
        }
        img {
            // width: 100%;
            height: 100%;
        }
    }
</style>