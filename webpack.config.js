const path = require('path');
const webpack = require("webpack");

module.exports = {
  target: "webworker",
  entry: "./index.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'worker'),
    filename: "worker.js"
  },
  resolve: {
    fallback: { 
      // browser/worker polyfills required to replace Node libraries used by the jsC8 SDK
      "url": require.resolve("url"),
      "path": require.resolve("path-browserify"),
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http")
    }
  }
};
