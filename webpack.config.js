const path = require('path');
const AppendFilesPlugin = require('webpack-append-files-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default
const { exec } = require('node:child_process');

module.exports = {
  entry: {
    backend: './src/backend/index.js',
    frontend: './src/frontend/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    library: '[name]App',
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
        'dist/backend.bundle.js',
        'src/backend/globals.js'
      ],
      filename: "app.js"
    }),
    new AppendFilesPlugin({
      files: [
        'src/frontend/index_body.html',
        'dist/frontend.bundle.js',
        'src/frontend/index_footer.html'
      ],
      filename: "index.html"
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/appsscript.json", to: "appsscript.json" },
      ],
    }),
    new WatchExternalFilesPlugin({
      files: [
        './src/**/*.js',
        './src/**/*.html',
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