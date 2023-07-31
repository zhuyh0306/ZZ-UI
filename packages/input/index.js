import ZzInput from './src/input';

/* istanbul ignore next */
ZzInput.install = function (Vue) {
  Vue.component(ZzInput.name, ZzInput);
};

export default ZzInput;
