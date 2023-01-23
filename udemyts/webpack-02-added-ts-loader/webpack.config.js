//--Note: Webpack uses Node.js ---//
//-- Webpack helps us to bundle our different files into one bundle --//

const path = require('path');

module.exports = {
  mode: "development", 
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "dist"
  },
  devtool: 'inline-source-map',//-- this helps with errors and debugging --//
  //--module is just telling Webpack how to deal with the files --//
  module: {
    rules: [
      {
        test: /\.ts$/,//--> this is telling Webpack to check for files that end with .ts ---//
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  //--Here it will look for .ts and .js when you import stuff ---//
  resolve: {
    extensions: ['.ts', '.js']
  }
};