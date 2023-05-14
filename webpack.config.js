const path = require('path');
const AppendFilesPlugin = require('webpack-append-files-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default
const { exec } = require('node:child_process');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.bundle.js',
    library: 'app',
    libraryTarget: 'var',
    path: path.resolve(__dirname, 'dist'),
  },
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 1000,
  },
  plugins: [
    new AppendFilesPlugin({
      files: [
        'dist/app.bundle.js',
        'src/globals.js'
      ],
      filename: "app.js"
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/appsscript.json", to: "appsscript.json" },
      ],
    }),
    new WatchExternalFilesPlugin({
      files: [
        './src/appsscript.js',
        './src/globals.js',
      ]
    }),
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          exec('clasp push', (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
          });
        });
      }
    }
  ]

};