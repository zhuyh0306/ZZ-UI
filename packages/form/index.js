import ZzForm from './src/form';

/* istanbul ignore next */
ZzForm.install = function (Vue) {
  Vue.component(ZzForm.name, ZzForm);
};

export default ZzForm;
