<script>

export default {
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean
  },

  inject: ['elForm', 'elFormItem'],

  render() {
    const slots = this.$slots.default;
    if (!slots) return null;
    if (this.isAutoWidth) {
      const autoLabelWidth = this.elForm.autoLabelWidth;
      const style = {};
      if (autoLabelWidth && autoLabelWidth !== 'auto') {
        const marginLeft = parseInt(autoLabelWidth, 10) - this.computedWidth;
        if (marginLeft) {
          style.marginLeft = marginLeft + 'px';
        }
      }
      return (<div class="zz-form-item__labzz-wrap" style={style}>
        { slots }
      </div>);
    } else {
      return slots[0];
    }
  },

  methods: {
    getLabelWidth() {
      if (this.$el && this.$el.firstZzementChild) {
        const computedWidth = window.getComputedStyle(this.$el.firstZzementChild).width;
        return Math.ceil(parseFloat(computedWidth));
      } else {
        return 0;
      }
    },
    updateLabelWidth(action = 'update') {
      if (this.$slots.default && this.isAutoWidth && this.$el.firstZzementChild) {
        if (action === 'update') {
          this.computedWidth = this.getLabelWidth();
        } else if (action === 'remove') {
          this.elForm.deregisterLabelWidth(this.computedWidth);
        }
      }
    }
  },

  watch: {
    computedWidth(val, oldVal) {
      if (this.updateAll) {
        this.elForm.registerLabelWidth(val, oldVal);
        this.elFormItem.updateComputedLabelWidth(val);
      }
    }
  },

  data() {
    return {
      computedWidth: 0
    };
  },

  mounted() {
    this.updateLabelWidth('update');
  },

  updated() {
    this.updateLabelWidth('update');
  },

  beforeDestroy() {
    this.updateLabelWidth('remove');
  }
};
</script>
