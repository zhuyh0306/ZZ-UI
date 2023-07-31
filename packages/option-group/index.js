import ZzOptionGroup from '../select/src/option-group';

/* istanbul ignore next */
ZzOptionGroup.install = function (Vue) {
  Vue.component(ZzOptionGroup.name, ZzOptionGroup);
};

export default ZzOptionGroup;
