import ZzAutocomplete from './src/autocomplete';

/* istanbul ignore next */
ZzAutocomplete.install = function (Vue) {
  Vue.component(ZzAutocomplete.name, ZzAutocomplete);
};

export default ZzAutocomplete;
