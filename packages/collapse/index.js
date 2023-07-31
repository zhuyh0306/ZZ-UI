import ZzCollapse from './src/collapse';

/* istanbul ignore next */
ZzCollapse.install = function (Vue) {
  Vue.component(ZzCollapse.name, ZzCollapse);
};

export default ZzCollapse;

