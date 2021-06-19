module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'commonJs':'@/common',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
