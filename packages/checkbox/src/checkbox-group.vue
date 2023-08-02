<script>
  import Emitter from '@yhui/zz-ui/src/mixins/emitter';

  export default {
    name: 'ZzCheckboxGroup',

    componentName: 'ZzCheckboxGroup',

    mixins: [Emitter],

    inject: {
      elFormItem: {
        default: ''
      }
    },

    props: {
      value: {},
      disabled: Boolean,
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      checkboxGroupSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      }
    },

    watch: {
      value(value) {
        this.dispatch('ZzFormItem', 'el.form.change', [value]);
      }
    }
  };
</script>

<template>
  <div class="zz-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
