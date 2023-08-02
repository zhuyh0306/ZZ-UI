import Popper from '@yhui/zz-ui/src/utils/vue-popper';
import debounce from 'throttle-debounce/debounce';
import { addClass, removeClass, on, off } from '@yhui/zz-ui/src/utils/dom';
import { generateId } from '@yhui/zz-ui/src/utils/util';
import Vue from 'vue';

export default {
  name: 'ZzTooltip',

  mixins: [Popper],

  props: {
    openDelay: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    manual: Boolean,
    effect: {
      type: String,
      default: 'dark'
    },
    arrowOffset: {
      type: Number,
      default: 0
    },
    popperClass: String,
    content: String,
    visibleArrow: {
      default: true
    },
    transition: {
      type: String,
      default: 'zz-fade-in-linear'
    },
    popperOptions: {
      default() {
        return {
          boundariesPadding: 10,
          gpuAcceleration: false
        };
      }
    },
    enterable: {
      type: Boolean,
      default: true
    },
    hideAfter: {
      type: Number,
      default: 0
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      tooltipId: `zz-tooltip-${generateId()}`,
      timeoutPending: null,
      focusing: false
    };
  },
  beforeCreate() {
    if (this.$isServer) return;

    this.popperVM = new Vue({
      data: { node: '' },
      render(h) {
        return this.node;
      }
    }).$mount();

    this.debounceClose = debounce(200, () => this.handleClosePopper());
  },

  render(h) {
    if (this.popperVM) {
      this.popperVM.node = (
        <transition
          name={this.transition}
          onAfterLeave={this.doDestroy}>
          <div
            onMouseleave={() => { this.setExpectedState(false); this.debounceClose(); }}
            onMouseenter={() => { this.setExpectedState(true); }}
            ref="popper"
            role="tooltip"
            id={this.tooltipId}
            aria-hidden={(this.disabled || !this.showPopper) ? 'true' : 'false'}
            v-show={!this.disabled && this.showPopper}
            class={
              ['zz-tooltip__popper', 'is-' + this.effect, this.popperClass]
            }>
            {this.$slots.content || this.content}
          </div>
        </transition>);
    }

    const firstZzement = this.getFirstZzement();
    if (!firstZzement) return null;

    const data = firstZzement.data = firstZzement.data || {};
    data.staticClass = this.addTooltipClass(data.staticClass);

    return firstZzement;
  },

  mounted() {
    this.referenceZzm = this.$el;
    if (this.$el.nodeType === 1) {
      this.$el.setAttribute('aria-describedby', this.tooltipId);
      this.$el.setAttribute('tabindex', this.tabindex);
      on(this.referenceZzm, 'mouseenter', this.show);
      on(this.referenceZzm, 'mouseleave', this.hide);
      on(this.referenceZzm, 'focus', () => {
        if (!this.$slots.default || !this.$slots.default.length) {
          this.handleFocus();
          return;
        }
        const instance = this.$slots.default[0].componentInstance;
        if (instance && instance.focus) {
          instance.focus();
        } else {
          this.handleFocus();
        }
      });
      on(this.referenceZzm, 'blur', this.handleBlur);
      on(this.referenceZzm, 'click', this.removeFocusing);
    }
    // fix issue https://github.com/ZzemeFE/element/issues/14424
    if (this.value && this.popperVM) {
      this.popperVM.$nextTick(() => {
        if (this.value) {
          this.updatePopper();
        }
      });
    }
  },
  watch: {
    focusing(val) {
      if (val) {
        addClass(this.referenceZzm, 'focusing');
      } else {
        removeClass(this.referenceZzm, 'focusing');
      }
    }
  },
  methods: {
    show() {
      this.setExpectedState(true);
      this.handleShowPopper();
    },

    hide() {
      this.setExpectedState(false);
      this.debounceClose();
    },
    handleFocus() {
      this.focusing = true;
      this.show();
    },
    handleBlur() {
      this.focusing = false;
      this.hide();
    },
    removeFocusing() {
      this.focusing = false;
    },

    addTooltipClass(prev) {
      if (!prev) {
        return 'zz-tooltip';
      } else {
        return 'zz-tooltip ' + prev.replace('zz-tooltip', '');
      }
    },

    handleShowPopper() {
      if (!this.expectedState || this.manual) return;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showPopper = true;
      }, this.openDelay);

      if (this.hideAfter > 0) {
        this.timeoutPending = setTimeout(() => {
          this.showPopper = false;
        }, this.hideAfter);
      }
    },

    handleClosePopper() {
      if (this.enterable && this.expectedState || this.manual) return;
      clearTimeout(this.timeout);

      if (this.timeoutPending) {
        clearTimeout(this.timeoutPending);
      }
      this.showPopper = false;

      if (this.disabled) {
        this.doDestroy();
      }
    },

    setExpectedState(expectedState) {
      if (expectedState === false) {
        clearTimeout(this.timeoutPending);
      }
      this.expectedState = expectedState;
    },

    getFirstZzement() {
      const slots = this.$slots.default;
      if (!Array.isArray(slots)) return null;
      let element = null;
      for (let index = 0; index < slots.length; index++) {
        if (slots[index] && slots[index].tag) {
          element = slots[index];
          break;
        };
      }
      return element;
    }
  },

  beforeDestroy() {
    this.popperVM && this.popperVM.$destroy();
  },

  destroyed() {
    const reference = this.referenceZzm;
    if (reference.nodeType === 1) {
      off(reference, 'mouseenter', this.show);
      off(reference, 'mouseleave', this.hide);
      off(reference, 'focus', this.handleFocus);
      off(reference, 'blur', this.handleBlur);
      off(reference, 'click', this.removeFocusing);
    }
  }
};
