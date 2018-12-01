<template>
    <div class="shopcar-container">
        <!-- 购物车商品列表 -->
        <div class="mui-card" v-for="(item,index) in goodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- 给切换开关绑定change事件 -->
                    <!-- 当开关开着还是关着，都会把对应的值双向绑定到$store.getters.getGoodsSelected[item.id]身上 -->
                    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="changeSelected(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                    <img :src="item.thumb_path"/>
                    <div>
                        <h3 class="title">{{ item.title }}</h3>
                        <div class="info">
                            <span class="price">¥{{ item.sell_price }}</span>
                            <!--引用数字输入框子组件  -->
                            <!-- 把购物车商品的数量和商品的id传递给子组件 -->
                            <numbox :goods_number="$store.getters.getGoodsNumber[item.id]" :id="item.id"></numbox>
                            <a href="#" class="del" @click.prevent="delCartGoods(item.id,index)">删除</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="info">
                        <p>总计(不含运费)</p>
                        <p class="you">已勾选商品<span class="number">{{ $store.getters.getSelectGoodsInfo['selectedNumber'] }}</span>,总价<span class="price">¥{{ $store.getters.getSelectGoodsInfo['selectedPrice'] }}</span></p>
                    </div>
                    <mt-button type="danger">结算</mt-button>
                </div>
            </div>
        </div>

        <hr>

        <p>{{$store.getters.getGoodsNumber}}</p>
        <p>{{$store.getters.getGoodsSelected}}</p>
        <p>{{$store.getters.getSelectGoodsInfo}}</p>
    </div>

</template>

<script>
    import numbox from "../comment/cartnumbox.vue";

    export default {
        data(){
            return {
                // flag:true,
                goodsList:[]
            }
        },
        created(){
            //初始化购物车商品数据
            this.getGoodsList();
        },
        methods:{
            //获取购物车的商品
            getGoodsList(){
                //先获取到购物车商品的id,拼接成一个字符串88,91
                var ids = this.$store.getters.getGoodsIds;
                //如果购物车没有数据，则不发生ajax请求
                if(ids == ''){
                    return;
                }
                this.$http.get('api/getshopcarlist/'+ids).then(function(res){
                    if(res.body.status == 0){
                        this.goodsList = res.body.message;
                    }
                });
            },
            //购物车商品的switch开关切换事件
            changeSelected(id,selected){
                //调用mutations中的方法，修改商品的选中状态
                console.log(id,selected);
                this.$store.commit('changeSelected',{id:id,selected:selected});
            },
            //删除购物车的商品
            delCartGoods(id,index){
                //重新渲染数据，删除goodslist中商品
                this.goodsList.splice(index,1);
                //同步到本地存储
                this.$store.commit('del',id);
            }
        },
        components:{
            numbox
        }
    }
</script>

<style lang='scss' scoped>
    .shopcar-container {
        .mui-card-content-inner{
            display: flex;
            .title{
                font-size: 13px;
            }
            .info {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .price{
                    color:red;
                }

                .del{
                    margin-left: 3px;
                }
            }
            img{
                width: 60px;
                height: 60px;
                margin-right: 10px;
                margin-left: 10px;
            }
        }


        .jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;

            .info {
                display:flex;
                flex-direction: column;
                .you{
                    margin-left: 10px;
                }
                .number{
                    color:red;
                    font-weight: bold;
                }
                .price{
                    color:red;
                    font-weight: bold;
                }
            }
        }
    }
</style>