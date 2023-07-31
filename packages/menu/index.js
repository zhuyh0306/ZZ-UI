import ZzMenu from './src/menu';

/* istanbul ignore next */
ZzMenu.install = function (Vue) {
  Vue.component(ZzMenu.name, ZzMenu);
};

export default ZzMenu;
