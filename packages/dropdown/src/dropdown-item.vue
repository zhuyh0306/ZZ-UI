<template>
  <li
    class="zz-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'zz-dropdown-menu__item--divided': divided
    }"
    @click="handleClick"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
  >
    <i :class="icon" v-if="icon"></i>
    <slot></slot>
  </li>
</template>
<script>
  import Emitter from '@yhui/zz-ui/src/mixins/emitter';

  export default {
    name: 'ZzDropdownItem',

    mixins: [Emitter],

    props: {
      command: {},
      disabled: Boolean,
      divided: Boolean,
      icon: String
    },

    methods: {
      handleClick(e) {
        this.dispatch('ZzDropdown', 'menu-item-click', [this.command, this]);
      }
    }
  };
</script>
