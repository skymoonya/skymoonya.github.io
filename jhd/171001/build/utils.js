var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const pxtorem = require('./px2rem')

exports.getPostcssPlugin = function () {
  return [
    pxtorem({ remUnit: 75 }),
    require('autoprefixer')({ browsers: ["android 4", "iOS 8"] })
  ]
}

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loaders, loaderOptions) {
    var newLoaders = [].concat(cssLoader)
    if (typeof loaders === 'string') {
      newLoaders.push({
        loader: loaders + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    } else if (Array.isArray(loaders)) {
      newLoaders = newLoaders.concat(loaders)
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: newLoaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(newLoaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders([
      {
        loader: 'sass-loader',
        options: {
          sourceMap: options.sourceMap,
        }
      },

    ].concat(options.isVue ? [] : [
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: options.sourceMap,
          plugins: exports.getPostcssPlugin()
        }
      }
    ])),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
