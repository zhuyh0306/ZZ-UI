import ZzOption from '../select/src/option';

/* istanbul ignore next */
ZzOption.install = function (Vue) {
  Vue.component(ZzOption.name, ZzOption);
};

export default ZzOption;
