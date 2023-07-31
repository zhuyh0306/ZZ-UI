import ZzDialog from './src/component';

/* istanbul ignore next */
ZzDialog.install = function (Vue) {
  Vue.component(ZzDialog.name, ZzDialog);
};

export default ZzDialog;
