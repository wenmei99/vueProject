const HtmlWebpackPlugin = require('html-webpack-plugin');
// const VueLoaderPlugin= require('vue-template-compiler');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); 
// node.js里面自带操作路径得模块
const path = require('path');
// 引入webpack
const webpack=require('webpack');

module.exports = {
    // 先指定一个模式，这里有node  production development三个参数可选    
    // 具体查看http://webpack.html.cn/concepts/mode.html
    mode:'development',
    // webpack的打包入口,可有多个入口，数组形式表示
    entry:{
        main:path.resolve(__dirname,'../src/main.js')
    },
    devtool:'sourcemap',
    // webpack打包输出相关的配置，只能指定一个出口
    // 主要包含两点：
    // filename 用于输出文件的文件名
    // 目标输出path的绝对路径
    output:{
        // 打包生成的js文件，带有hash值来保证文件的唯一性
        filename:'js/[name].[hash:4].js',
        // 打包后文件的输出路径
        path:path.resolve(__dirname,'../dist'),
        // 生成chunk文件名
        chunkFilename:'js/[home].[hash:4].js',
        // 资源的应用路径
        publicPath:'/'

    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude:/node-modules/,
                use:{
                        loader:'babel-loader',
                    }
                
            },
            {
                test:/\.(scss|sass)$/,
                use:[
                    {
                        loader:'style-loader',
                    },
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'sass-loader',
                        options:{
                            implementation:require('dart-sass')
                        }
                    }
                ]
            },
            {
                test:/\.(jpe?g|png|gif)$/i,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            // 当文件大于5kb时走file-loader配置
                            limit:5120,
                            fallback:'file-loader',
                            // 这个参数要设置为fore，不然生成的图片的路径为[object Module]
                            esModule:false,
                            // 生成的路径和文件名
                            name:'image/[name].[hash:4].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            // 当文件大于5kb时走file-loader配置
                            limit:5120,
                            fallback:'file-loader',
                            // 这个参数要设置为fore，不然生成的图片的路径为[object Module]
                            esModule:false,
                            // 生成的路径和文件名
                            name:'media/[name].[hash:4].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            // 当文件大于5kb时走file-loader配置
                            limit:5120,
                            fallback:'file-loader',
                            // 这个参数要设置为fore，不然生成的图片的路径为[object Module]
                            esModule:false,
                            // 生成的路径和文件名
                            name:'font/[name].[hash:4].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.vue$/,
                use:[{
                    loader:'vue-loader',
                    options:{
                        compilerOptions:{
                            preserveWhitespace:false
                        }
                    }
                }]
            },
            {
                test:/\.(scss|sass)$/,
                use:[{
                    loader:'style-loader'
                },{
                    loader:'css-loader'
                },{
                    loader:'sass-loader',
                    options:{
                        implementation:require('dart-sass')
                    }


                },{
                    loader:'postcss-loader'
                }]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            // 指定模板
            template:path.resolve(__dirname,'../public/index.html'),
            // 输出文件
            filename:path.resolve(__dirname,'../dist/index.html')
        }),
        new VueLoaderPlugin(),

        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:JSON.stringify('development')
            }
        }),

        // new VueLoaderPlugin()

        new Extra
    ],
    resolve:{
        alias: {
            // 写了这句，我们可以这样写代码 import Vue from 'vue', 并且引入的是vue/dist/vue.runtime.esm.js这个版本，不然默认引入的是vue.js。这个在github的vue官方仓库dist目录下有解释。
            'vue$': 'vue/dist/vue.runtime.esm.js',
            // 写了这句，我们可以这样写代码 import api from '@/api/api.js'，省去到处找路径定位到src的麻烦
            '@': path.resolve(__dirname, '../src')
        },
        // 添加一个 resolve.extensions 属性，方便我们引入依赖或者文件的时候可以省略后缀
        // 我们在引入文件时可以这样写 import api from '@/api/api'。
        extensions: ['*', '.js', '.vue']
    },
    //  配置devserver
    devServer:{
        // 默认不设置这个就只能通过localhost:9000来访问，现在可以通过本机局域网ip来访问
        host:'0.0.0.0',
        hot:true,
        port:'9098',
        contentBase:'./dist'
    }
}

