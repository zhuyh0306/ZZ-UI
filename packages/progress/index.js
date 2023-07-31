import ZzProgress from './src/progress';

/* istanbul ignore next */
ZzProgress.install = function (Vue) {
  Vue.component(ZzProgress.name, ZzProgress);
};

export default ZzProgress;
