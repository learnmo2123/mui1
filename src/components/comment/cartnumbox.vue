<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1' >
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <!-- 获取对应商品id的数量 -->
            <input class="mui-numbox-input" type="number" ref="number" :value="goods_number" @change="changeNumber"/>
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.js';
    export default {
        //在mounted生命周期中进行数字输入框的初始化操作
        mounted(){
            mui('.mui-numbox').numbox();
        },
        //接受父传过来的商品的数量和商品id
        props:['goods_number','id'],
        methods:{
            //修改购物车商品的数量
            changeNumber(){
                //获取数字输入框的数字,给input绑定一个ref属性，通过this.$refs.number.value
                var number = this.$refs.number.value;
                //商品的id
                console.log('数量：'+number,"id:"+this.id);
                //调用mutations中的方法，把数量同步到本地存储
                this.$store.commit('changeNumber',{id:this.id,number:number});
            }
        }
    }
</script>

<style scoped>

</style>