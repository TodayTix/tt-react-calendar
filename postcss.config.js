module.exports = function(ctx) {
  const plugins = [
    // tomorrow's syntax, today! http://cssnext.io/
    require('postcss-cssnext')(ctx.plugin),
    require('postcss-nested')(ctx.plugin),
  ];

  if (process.env.POSTCSS_MIN === 'true') {
    plugins.push(require('cssnano')({
      autoprefixer: false,
    }));
  }

  return {
    plugins,
  };
}
