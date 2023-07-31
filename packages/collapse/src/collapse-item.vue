<template>
  <div class="zz-collapse-item"
    :class="{'is-active': isActive, 'is-disabled': disabled }">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`zz-collapse-content-${id}`"
      :aria-describedby ="`zz-collapse-content-${id}`"
    >
      <div
        class="zz-collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`zz-collapse-head-${id}`"
        :tabindex="disabled ? undefined : 0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <slot name="title">{{title}}</slot>
        <i
          class="zz-collapse-item__arrow zz-icon-arrow-right"
          :class="{'is-active': isActive}">
        </i>
      </div>
    </div>
    <zz-collapse-transition>
      <div
        class="zz-collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`zz-collapse-head-${id}`"
        :id="`zz-collapse-content-${id}`"
      >
        <div class="zz-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </zz-collapse-transition>
  </div>
</template>
<script>
  import ZzCollapseTransition from 'element-ui/src/transitions/collapse-transition';
  import Emitter from 'element-ui/src/mixins/emitter';
  import { generateId } from 'element-ui/src/utils/util';

  export default {
    name: 'ZzCollapseItem',

    componentName: 'ZzCollapseItem',

    mixins: [Emitter],

    components: { ZzCollapseTransition },

    data() {
      return {
        contentWrapStyle: {
          height: 'auto',
          display: 'block'
        },
        contentHeight: 0,
        focusing: false,
        isClick: false,
        id: generateId()
      };
    },

    inject: ['collapse'],

    props: {
      title: String,
      name: {
        type: [String, Number],
        default() {
          return this._uid;
        }
      },
      disabled: Boolean
    },

    computed: {
      isActive() {
        return this.collapse.activeNames.indexOf(this.name) > -1;
      }
    },

    methods: {
      handleFocus() {
        setTimeout(() => {
          if (!this.isClick) {
            this.focusing = true;
          } else {
            this.isClick = false;
          }
        }, 50);
      },
      handleHeaderClick() {
        if (this.disabled) return;
        this.dispatch('ZzCollapse', 'item-click', this);
        this.focusing = false;
        this.isClick = true;
      },
      handleEnterClick() {
        this.dispatch('ZzCollapse', 'item-click', this);
      }
    }
  };
</script>
