module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.resolve.extensions.push('.jsx');
        return webpackConfig;
      },
    },
  };
  