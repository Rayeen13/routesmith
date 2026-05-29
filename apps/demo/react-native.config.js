const path = require('path');

module.exports = {
  project: {
    android: {},
    ios: {},
  },

  watchFolders: [
    path.resolve(__dirname, '../../node_modules'),
  ],

  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, '../../node_modules'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
};