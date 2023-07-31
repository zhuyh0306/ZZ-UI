import ZzTabs from './src/tabs';

/* istanbul ignore next */
ZzTabs.install = function (Vue) {
  Vue.component(ZzTabs.name, ZzTabs);
};

export default ZzTabs;
