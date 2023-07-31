import ZzTag from './src/tag';

/* istanbul ignore next */
ZzTag.install = function (Vue) {
  Vue.component(ZzTag.name, ZzTag);
};

export default ZzTag;
