module.exports = {
  presets:[
    // 使用的规则
    ["@babel/preset-env",{
      // 这有false,entry,usage 三个可选参数，usage可以按需引入polyfill
      "useBuiltIns":"usage",
       // 指定corejs版本
       "corejs":2
    }]
  ]
}