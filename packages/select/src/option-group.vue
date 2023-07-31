<template>
  <ul class="zz-select-group__wrap" v-show="visible">
    <li class="zz-select-group__title">{{ label }}</li>
    <li>
      <ul class="zz-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
  import Emitter from 'element-ui/src/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'ZzOptionGroup',

    componentName: 'ZzOptionGroup',

    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      };
    },

    watch: {
      disabled(val) {
        this.broadcast('ZzOption', 'handleGroupDisabled', val);
      }
    },

    methods: {
      queryChange() {
        this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true);
      }
    },

    created() {
      this.$on('queryChange', this.queryChange);
    },

    mounted() {
      if (this.disabled) {
        this.broadcast('ZzOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>
