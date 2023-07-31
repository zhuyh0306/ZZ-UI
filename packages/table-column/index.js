import ZzTableColumn from '../table/src/table-column';

/* istanbul ignore next */
ZzTableColumn.install = function (Vue) {
  Vue.component(ZzTableColumn.name, ZzTableColumn);
};

export default ZzTableColumn;
