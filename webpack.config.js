
var path = require('path');
var VueLoaderPlugin = require("vue-loader/lib/plugin.js");
module.exports = {
  mode: "development",
    //打包的入口
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      //配置样式的loader器
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      //配置test匹配图片路径的loader器
      {
        test: /\.(png|jpeg|jpg|gif|bmp)/,
        use: [{
          loader:'url-loader',
          options:{
            // 不指定limit默认会进行base64编码
            //limit  小于limit指定的字节，图片会进行base64编码，否则把文件的名称用一串随机的字符串进行重命名
            limit:10000, 
            //name
            name:'[hash:8]-[name].[ext]'
          }
        }]
      },
      {
        //配置加载字体文件的loader器
        test:/\.(ttf|ttf2|woff|woff2|svg|eot)$/,
        use:['url-loader']
      },
      {
        //匹配js的结尾的文件，交给babel-loader来处理（专门处理高级es6语法）
        test:/\.js$/,
        use:['babel-loader'],
        exclude:/node_modules/   //此目录中的js文件不进行loader转化
      },
      {
        test:/\.vue$/,
        use:['vue-loader']
      },
      {
        test:/\.scss$/,   // 匹配以scss结尾的文件
        use:['style-loader','css-loader','sass-loader']
      }
    ]
  },
  resolve:{
    //修正导入vue路径时候的问题
    alias:{
      "vue$":"vue/dist/vue.js"
    }
  },
  plugins:[
    new VueLoaderPlugin()  //实例vue-loader的实例对象，为了加载.vue组件
  ]

}