// const { defineConfig } = require('@vue/cli-service');
// module.exports = defineConfig({
//   lintOnSave: false,
//   transpileDependencies: true,
//   chainWebpack: config => {
//     const svgRule = config.module.rule('svg');

//     svgRule.uses.clear();

//     svgRule
//       .use('babel-loader')
//       .loader('babel-loader')
//       .end()
//       .use('vue-svg-loader')
//       .loader('vue-svg-loader')
//       .options({
//         svgo: {
//           plugins: [{ prefixIds: true }]
//         }
//       });
//   }
// });

// const webpack = require('webpack');
module.exports = {
  publicPath: '/',
  lintOnSave: false,
  chainWebpack: config => {
    config.module.rules.delete('svg');
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader'
        }
      ]
    }
  }
};
