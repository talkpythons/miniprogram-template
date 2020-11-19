const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')
const babel = require('@babel/core')

module.exports = {
  mode:'development',
  watch:true,
  entry:'./src/miniprogram/app.js',
  output:{
    path:path.resolve(__dirname,'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {from:'**/*.wxml',to:'./',context:'./src'},
        {from:'**/*.json',to:'./',context:'./src'},
        //{from:'**/*.jpg',to:'./',context:'./src'},
        {from:'**/*.png',to:'./',context:'./src'},
        {from:'**/*.wxss',to:'./',context:'./src'},
        {
          from: "**/*.js",
          to:'./',
          context:'./src',
          transform(content,path){
            const newCode = babel.transformSync(content,{babelrc:true,"presets":["@babel/env"]}).code;
            return Promise.resolve(newCode.toString());
          },
        },
      ],
    }),
  ],
}
