import ZzSubmenu from '../menu/src/submenu';

/* istanbul ignore next */
ZzSubmenu.install = function (Vue) {
  Vue.component(ZzSubmenu.name, ZzSubmenu);
};

export default ZzSubmenu;
