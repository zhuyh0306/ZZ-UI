import ZzBreadcrumb from './src/breadcrumb';

/* istanbul ignore next */
ZzBreadcrumb.install = function (Vue) {
  Vue.component(ZzBreadcrumb.name, ZzBreadcrumb);
};

export default ZzBreadcrumb;
