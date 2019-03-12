const path = require('path');
const glob = require('glob');
const fs = require('fs');

const PAGES_PATH = path.resolve(__dirname, './src/pages');
// 配置pages多页面获取当前文件夹下的html和js

const pages = {};
glob.sync(`${PAGES_PATH}/*/main.js`).forEach((filepath) => {
  const pageName = path.basename(path.dirname(filepath));

  let templatePath = `${path.dirname(filepath)}/index.html`;
  if (!fs.existsSync(templatePath)) {
    // 入口如果不配置直接使用
    templatePath = 'public/index.html';
  }
  pages[pageName] = {
    entry: filepath,
    template: templatePath,
    filename: `${pageName}.html`,
    chunks: ['chunk-vendors', 'chunk-common', pageName],
  };
});

console.log(process.env);
// 配置end
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false, // 禁用eslint
  productionSourceMap: false,
  pages,
  devServer: {
    port: 8008,
    hotOnly: false,
  },
  publicPath: './',
    chainWebpack: (config) => {
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap((options) => {
          // 修改它的选项...
          Object.assign(options, {
            limit: 100,
          });
          return options;
        });
      Object.keys(pages).forEach((entryName) => {
        config.plugins.delete(`prefetch-${entryName}`);
      });
      if (process.env.NODE_ENV === 'production') {
        config.plugin('extract-css').tap(() => [{
          path: path.join(__dirname, './dist'),
          filename: 'css/[name].[contenthash:8].css',
        }]);
      }
    },
    configureWebpack: (config) => {
      if (process.env.NODE_ENV === 'production') {
        config.output = {
          path: path.join(__dirname, './dist'),
          filename: 'js/[name].[contenthash:8].js',
        };
      }
    },
  configureWebpack: (config) => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.css', '.ts'],
      alias: {
        vue: 'vue/dist/vue',
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        src: resolve('../src'),
        assets: resolve('../src/assets'),
        components: resolve('../src/components'),
      },
    };
    config.externals = {
      vue: 'Vue',
    };
  },
};
