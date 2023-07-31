import ZzButton from './src/button';

/* istanbul ignore next */
ZzButton.install = function (Vue) {
  Vue.component(ZzButton.name, ZzButton);
};

export default ZzButton;
