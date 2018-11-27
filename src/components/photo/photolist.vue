<template>
    <van-tabs v-model="active" @click="getCatImages">
        <van-tab  v-for="item in cats" :key="item.id" :title="item.title">
            <div class="photolist">
                <!-- 通过tag属性设置li,会把默认的a标签渲染成li -->
                <router-link class="item" tag="li" :to="'/home/photodetail/'+item.id"  v-for="item in images" :key="item.id" >
                    <img v-lazy="item.img_url">
                    <!-- <img :src="item.img_url" alt=""> -->
                    <div class="info">
                        <div class="info-title">{{ item.title }}</div>
                        <div class="info-body">{{ item.zhaiyao }}</div>
                    </div>
                </router-link >
            </div>

        </van-tab>
    </van-tabs>
</template>

<script>
    export default {
        data() {
            return {
                cats: [],  //存储标签页分类的名称
                active: 0,  //默认选中的标签页
                images: []
            }
        },
        created() {
            //初始化标签页的数据
            this.getImgCat();
            //初始化标签页为  全部的图片数据
            this.getCatImages(0, '全部');
        },
        methods: {
            getImgCat() {
                //发送ajax请求获取图片标签的分类名称
                this.$http.get('api/getimgcategory').then(function (res) {
                    if (res.body.status == 0) {
                        this.cats = res.body.message;
                        //需要设置默认第一个全部的标签页，id为0；
                        this.cats.unshift({id: 0, title: '全部'});
                    }
                });
            },
            //标签页的单击事件
            getCatImages(index, title) {
                //需要获取对应的分类的id，通过下标index进行获取,
                //由于cats默认是一个空数组，所以是没有数据，通过index下标，获取不到对应的id值
                console.log(this.cats.length); // 0
                var id = this.cats.length == 0 ? 0 : this.cats[index].id;
                //发送ajax请求，获取对应的分类下面的图片列表数据
                this.$http.get('api/getcatimages/' + id).then(function (res) {
                    if (res.body.status == 0) {
                        //赋值给当前data属性的images，用户遍历
                        this.images = res.body.message;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .photolist{
        padding:5px 10px;
        li{
            background-color: #ccc;
            list-style: none;
            margin-bottom:10px;
            box-shadow: 0px 0px 20px #aaa;
            // 给父元素加一个relative，方便后面控制子元素所在的父元素位置
            position: relative;
            img{
                width: 100%;
                height: 280px;
            }

            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info{
                position: absolute;
                bottom:0px;  //让当前元素在父元素的最下面
                color:white;
                // background-color: #000;
                //设置背景色透明度(0.5)
                background-color: rgba(0,0,0,0.5);

                .info-title{
                    font-size:15px;
                }
                .info-body{
                    font-size:12px;
                }
            }
        }
    }
</style>