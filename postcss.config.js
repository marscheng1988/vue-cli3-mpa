module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100, //基数可根据基础font-size调整
      propList: ['*'],
    },
  },
};
