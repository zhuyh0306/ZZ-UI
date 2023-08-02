<template>
  <zz-popover
    v-bind="$attrs"
    v-model="visible"
    trigger="click"
  >
  <div class="zz-popconfirm">
    <p class="zz-popconfirm__main">
    <i
      v-if="!hideIcon"
      :class="icon"
      class="zz-popconfirm__icon"
      :style="{color: iconColor}"
    ></i>
      {{title}}
    </p>
    <div class="zz-popconfirm__action">
      <zz-button 
        size="mini" 
        :type="cancelButtonType" 
        @click="cancel"
      >
        {{ displayCancelButtonText }}
      </zz-button>
      <zz-button 
        size="mini" 
        :type="confirmButtonType" 
        @click="confirm"
      >
        {{ displayConfirmButtonText }}
      </zz-button>
    </div>
  </div>
  <slot name="reference" slot="reference"></slot>
</zz-popover>
</template>

<script>
import ZzPopover from '@yhui/zz-ui/packages/popover';
import ZzButton from '@yhui/zz-ui/packages/button';
import {t} from '@yhui/zz-ui/src/locale';

export default {
  name: 'ZzPopconfirm',
  props: {
    title: {
      type: String
    },
    confirmButtonText: {
      type: String
    },
    cancelButtonText: {
      type: String
    },
    confirmButtonType: {
      type: String,
      default: 'primary'
    },
    cancelButtonType: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String,
      default: 'zz-icon-question'
    },
    iconColor: {
      type: String,
      default: '#f90'
    },
    hideIcon: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ZzPopover,
    ZzButton
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    displayConfirmButtonText() {
      return this.confirmButtonText || t('el.popconfirm.confirmButtonText');
    },
    displayCancelButtonText() {
      return this.cancelButtonText || t('el.popconfirm.cancelButtonText');
    }
  },
  methods: {
    confirm() {
      this.visible = false;
      this.$emit('confirm');
    },
    cancel() {
      this.visible = false;
      this.$emit('cancel');
    }
  }
};
</script>
