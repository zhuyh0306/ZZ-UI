import ZzDropdownMenu from '../dropdown/src/dropdown-menu';

/* istanbul ignore next */
ZzDropdownMenu.install = function (Vue) {
  Vue.component(ZzDropdownMenu.name, ZzDropdownMenu);
};

export default ZzDropdownMenu;
