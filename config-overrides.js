module.exports = {
  webpack: function override(config, env) {
    config.module.rules.push({
      test: /\.html$/,
      exclude: /node_modules/,
      use: { loader: 'html-loader' },
    });
    return config;
  }
}