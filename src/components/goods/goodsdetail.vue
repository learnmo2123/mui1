<template>
    <div class="goodsdetailcontainer">
        <!-- 卡片card：商品轮播图 -->
        <div class="mui-card">
            <!-- <div class="mui-card-header">页眉</div> -->
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- 引用轮播图子组件 -->
                    <swipe :lunbo="lunbo"></swipe>
                </div>
            </div>
        </div>
        <!-- 卡片card:商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">
                {{ goodsinfo.title}}
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>
                        <span class="market">市场价：¥ {{ goodsinfo.market_price}}</span>
                        <span class="now">本店价：¥ {{ goodsinfo.sell_price}}</span>
                    </p>
                    <div>
                        <span class="number">购买数量： </span>
                        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='200'>
                            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                            <input id="test" class="mui-input-numbox" type="number" value="1"/>
                            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card-footer">
            <mt-button type="primary" class="mai">立即购买</mt-button>
            <mt-button type="danger" @click='addGoodsToCar'>加入购物车</mt-button>
        </div>
        <!-- 卡片card:商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>
                        商品货号：{{ goodsinfo.goods_no }}
                    </p>
                    <p>
                        库存情况：{{ goodsinfo.stock_quantity }}件
                    </p>
                    <p>
                        上架时间：{{ goodsinfo.add_time | dateFormat }}
                    </p>
                </div>
            </div>
            <div class="mui-card-footer btn">
                <mt-button plain type="primary" size="large" class="text" @click="getGoodsDesc">图文介绍</mt-button>
            </div>
            <!--商品评论组件-->
            <div>
                <comment :id="this.$route.params.id"></comment>
            </div>
        </div>


    </div>


</template>

<script>
    import swipe from "../comment/swip.vue";
    import mui from "../../lib/mui/js/mui.js";  //严格模式  error  caller
    //mui  npm install babel-plugin-transform-remove-strict-mode
    import comment from "../comment/comment.vue";  //引入评论的组件
    export default {

        data() {
            return {
                lunbo: [],
                id: this.$route.params.id,  // 传递过来的路由中获取参数
                goodsinfo: {},
            }
        },
        components: {
            swipe, comment
        },
        created() {
            this.getGoodsLunbo();
            this.getGoodsDetail();
        },
        mounted() {
            //执行这里，说明虚拟dom已经挂载到真实dom中，这时候，可以用js去操作页面中的dom元素
            //初始化我们的number-box组件
            mui('.mui-numbox').numbox();  //修复购物数量的加减操作
        },
        methods: {
            getGoodsLunbo() {
                this.$http.get('api/getthumbimages/' + this.id).then(function (res) {
                    if (res.body.message.length == 0) {
                        //设置默认图片,追加一个对象
                        res.body.message.push({
                            img: "http://phvbk3pna.bkt.clouddn.com/huawei.png",
                            url: "http://phvbk3pna.bkt.clouddn.com/huawei.png",
                        });
                    } else {
                        //有图片
                        //由于轮播图子组件swipe中每个对象需要img和url属性，所以，需要构造这两个数据
                        res.body.message.forEach(ele => {
                            ele.img = ele.src;
                            ele.url = ele.src;
                        });
                    }
                    //赋值给当前data的lunbo属性
                    this.lunbo = res.body.message;
                })
            },
            getGoodsDetail() {
                this.$http.get('api/getgoodsinfo/' + this.id).then(function (res) {
                    console.log(res.body);
                    if (res.body.status == 0) {
                        this.goodsinfo = res.body.message[0];
                    }
                })
            },
            getGoodsDesc() {
                this.$router.push('/home/goodsdesc/' + this.id);
            },
            addGoodsToCar() {
                var data = {
                    id: this.id, //商品id
                    number: this.$refs.number.value,  //商品数量
                    price:this.goodsinfo.sell_price,
                    selected:true, //默认加入购物车是处于选中
                };
                //把数据存储到vuex数据共享中state.cartData中
                this.$store.commit('add',data);

            }
        }
    }
</script>

<style lang="scss" scoped>
    .goodsdetailcontainer {
        p {
            font-size: 16px;
        }
        .number {
            color: #888;
        }
        .market {
            text-decoration: line-through;
        }
        .now {
            color: red;
            font-weight: bold;
            margin-left: 5px;
        }

        .mui-card-footer {
            display: flex;
            justify-content: flex-start;
            .mai {
                margin-right: 5px;
            }

        }

        .btn {
            display: flex;
            flex-direction: column;
        }

        .text {
            margin-bottom: 5px;
        }
    }
</style>