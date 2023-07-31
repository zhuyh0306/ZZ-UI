import ZzMenuItem from '../menu/src/menu-item';

/* istanbul ignore next */
ZzMenuItem.install = function (Vue) {
  Vue.component(ZzMenuItem.name, ZzMenuItem);
};

export default ZzMenuItem;
