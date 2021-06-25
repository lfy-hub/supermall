module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      viewportWidth:375,//视窗宽度
      viewportHeight:667,//视窗高度
      unitPrecision:5,//转换后小数位数
      viewportUnit:'vw',//转换后视窗单位
      selectorBlackList:['ignore'],//不需要转换的类
      minPixlValue:1,//最小转换单位
      mediaQuery:false,//允许在媒体查询中转换`px`
      exclude:[/TabBar/]//不需要转换的文件
    }
  }
}
