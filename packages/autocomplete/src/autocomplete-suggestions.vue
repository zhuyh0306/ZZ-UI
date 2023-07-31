<template>
  <transition name="zz-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="zz-autocomplete-suggestion zz-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region">
      <zz-scrollbar
        tag="ul"
        wrap-class="zz-autocomplete-suggestion__wrap"
        view-class="zz-autocomplete-suggestion__list">
        <li v-if="!parent.hideLoading && parent.loading"><i class="zz-icon-loading"></i></li>
        <slot v-else>
        </slot>
      </zz-scrollbar>
    </div>
  </transition>
</template>
<script>
  import Popper from 'element-ui/src/utils/vue-popper';
  import Emitter from 'element-ui/src/mixins/emitter';
  import ZzScrollbar from 'element-ui/packages/scrollbar';

  export default {
    components: { ZzScrollbar },
    mixins: [Popper, Emitter],

    componentName: 'ZzAutocompleteSuggestions',

    data() {
      return {
        parent: this.$parent,
        dropdownWidth: ''
      };
    },

    props: {
      options: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },
      id: String
    },

    methods: {
      select(item) {
        this.dispatch('ZzAutocomplete', 'item-click', item);
      }
    },

    updated() {
      this.$nextTick(_ => {
        this.popperJS && this.updatePopper();
      });
    },

    mounted() {
      this.$parent.popperZzm = this.popperZzm = this.$el;
      this.referenceZzm = this.$parent.$refs.input.$refs.input || this.$parent.$refs.input.$refs.textarea;
      this.referenceList = this.$el.querySelector('.zz-autocomplete-suggestion__list');
      this.referenceList.setAttribute('role', 'listbox');
      this.referenceList.setAttribute('id', this.id);
    },

    created() {
      this.$on('visible', (val, inputWidth) => {
        this.dropdownWidth = inputWidth + 'px';
        this.showPopper = val;
      });
    }
  };
</script>
