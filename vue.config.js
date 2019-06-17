const path = require('path');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function getView(globPath,flag) {
  const files = glob.sync(globPath);

  const entries = {};
  let entry; let dirname; let basename; let pathname; let extname;

  files.forEach((item) => {
    entry = item;
    dirname = path.dirname(entry);//当前目录
    extname = path.extname(entry);//后缀
    basename = path.basename(entry, extname);//文件名
    pathname = path.join(dirname, basename);//文件路径
    if (extname === '.html') {
      entries[pathname] = `./${entry}`;
    } else if (extname === '.js') {
      entries[basename] = entry;
    }
  });

  return entries;
}

function HtmlPluginArr(pages = [], config) {
  // eslint-disable-next-line array-callback-return
  pages.map((pathname) => {
    const htmlname = pathname.split('src\\')[1];
    const temp = htmlname.split('\\');
    const sourcename = temp[temp.length - 1];
    const conf = {
      filename: `${htmlname}.html`,
      template: `${pathname}.html`,
      hash: true,
      chunks: ['chunk-vendors', 'chunk-common', sourcename],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
  });
}


module.exports = {
  lintOnSave: true,
  publicPath: process.env.NODE_ENV === 'production' ? '../../' : './',
  configureWebpack: (config) => {
    // base
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      // vuex: 'Vuex',
    }
    Object.assign(config.resolve.alias, {
      '@assets': path.resolve(__dirname, './src/assets'),
    })

    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      const entriesObj = getView('./src/pages/*/*.js');
      const pages = Object.keys(getView('./src/pages/*/*.html'));
      HtmlPluginArr(pages, config);
      config.entry = entriesObj; // 入口
    } else {
      // 为开发环境修改配置...
      config.devServer = {
        // 跨域
        proxy: {
          '/gameApi/': {
            target: 'http://www.gicdev.com',
            changeOrigin: true,
            pathRewrite: {
              '^/gameApi': '',
            },
          },
        },
      }
    }
  },
}
