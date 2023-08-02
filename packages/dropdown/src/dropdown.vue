<script>
  import Clickoutside from '@yhui/zz-ui/src/utils/clickoutside';
  import Emitter from '@yhui/zz-ui/src/mixins/emitter';
  import Migrating from '@yhui/zz-ui/src/mixins/migrating';
  import ZzButton from '@yhui/zz-ui/packages/button';
  import ZzButtonGroup from '@yhui/zz-ui/packages/button-group';
  import { generateId } from '@yhui/zz-ui/src/utils/util';

  export default {
    name: 'ZzDropdown',

    componentName: 'ZzDropdown',

    mixins: [Emitter, Migrating],

    directives: { Clickoutside },

    components: {
      ZzButton,
      ZzButtonGroup
    },

    provide() {
      return {
        dropdown: this
      };
    },

    props: {
      trigger: {
        type: String,
        default: 'hover'
      },
      type: String,
      size: {
        type: String,
        default: ''
      },
      splitButton: Boolean,
      hideOnClick: {
        type: Boolean,
        default: true
      },
      placement: {
        type: String,
        default: 'bottom-end'
      },
      visibleArrow: {
        default: true
      },
      showTimeout: {
        type: Number,
        default: 250
      },
      hideTimeout: {
        type: Number,
        default: 150
      },
      tabindex: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        timeout: null,
        visible: false,
        triggerZzm: null,
        menuItems: null,
        menuItemsArray: null,
        dropdownZzm: null,
        focusing: false,
        listId: `dropdown-menu-${generateId()}`
      };
    },

    computed: {
      dropdownSize() {
        return this.size || (this.$ELEMENT || {}).size;
      }
    },

    mounted() {
      this.$on('menu-item-click', this.handleMenuItemClick);
    },

    watch: {
      visible(val) {
        this.broadcast('ZzDropdownMenu', 'visible', val);
        this.$emit('visible-change', val);
      },
      focusing(val) {
        const selfDefine = this.$el.querySelector('.zz-dropdown-selfdefine');
        if (selfDefine) { // 自定义
          if (val) {
            selfDefine.className += ' focusing';
          } else {
            selfDefine.className = selfDefine.className.replace('focusing', '');
          }
        }
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'menu-align': 'menu-align is renamed to placement.'
          }
        };
      },
      show() {
        if (this.disabled) return;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.visible = true;
        }, this.trigger === 'click' ? 0 : this.showTimeout);
      },
      hide() {
        if (this.disabled) return;
        this.removeTabindex();
        if (this.tabindex >= 0) {
          this.resetTabindex(this.triggerZzm);
        }
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.visible = false;
        }, this.trigger === 'click' ? 0 : this.hideTimeout);
      },
      handleClick() {
        if (this.disabled) return;
        if (this.visible) {
          this.hide();
        } else {
          this.show();
        }
      },
      handleTriggerKeyDown(ev) {
        const keyCode = ev.keyCode;
        if ([38, 40].indexOf(keyCode) > -1) { // up/down
          this.removeTabindex();
          this.resetTabindex(this.menuItems[0]);
          this.menuItems[0].focus();
          ev.preventDefault();
          ev.stopPropagation();
        } else if (keyCode === 13) { // space enter选中
          this.handleClick();
        } else if ([9, 27].indexOf(keyCode) > -1) { // tab || esc
          this.hide();
        }
      },
      handleItemKeyDown(ev) {
        const keyCode = ev.keyCode;
        const target = ev.target;
        const currentIndex = this.menuItemsArray.indexOf(target);
        const max = this.menuItemsArray.length - 1;
        let nextIndex;
        if ([38, 40].indexOf(keyCode) > -1) { // up/down
          if (keyCode === 38) { // up
            nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
          } else { // down
            nextIndex = currentIndex < max ? currentIndex + 1 : max;
          }
          this.removeTabindex();
          this.resetTabindex(this.menuItems[nextIndex]);
          this.menuItems[nextIndex].focus();
          ev.preventDefault();
          ev.stopPropagation();
        } else if (keyCode === 13) { // enter选中
          this.triggerZzmFocus();
          target.click();
          if (this.hideOnClick) { // click关闭
            this.visible = false;
          }
        } else if ([9, 27].indexOf(keyCode) > -1) { // tab // esc
          this.hide();
          this.triggerZzmFocus();
        }
      },
      resetTabindex(ele) { // 下次tab时组件聚焦元素
        this.removeTabindex();
        ele.setAttribute('tabindex', '0'); // 下次期望的聚焦元素
      },
      removeTabindex() {
        this.triggerZzm.setAttribute('tabindex', '-1');
        this.menuItemsArray.forEach((item) => {
          item.setAttribute('tabindex', '-1');
        });
      },
      initAria() {
        this.dropdownZzm.setAttribute('id', this.listId);
        this.triggerZzm.setAttribute('aria-haspopup', 'list');
        this.triggerZzm.setAttribute('aria-controls', this.listId);

        if (!this.splitButton) { // 自定义
          this.triggerZzm.setAttribute('role', 'button');
          this.triggerZzm.setAttribute('tabindex', this.tabindex);
          this.triggerZzm.setAttribute('class', (this.triggerZzm.getAttribute('class') || '') + ' zz-dropdown-selfdefine'); // 控制
        }
      },
      initEvent() {
        let { trigger, show, hide, handleClick, splitButton, handleTriggerKeyDown, handleItemKeyDown } = this;
        this.triggerZzm = splitButton
          ? this.$refs.trigger.$el
          : this.$slots.default[0].elm;

        let dropdownZzm = this.dropdownZzm;

        this.triggerZzm.addEventListener('keydown', handleTriggerKeyDown); // triggerZzm keydown
        dropdownZzm.addEventListener('keydown', handleItemKeyDown, true); // item keydown
        // 控制自定义元素的样式
        if (!splitButton) {
          this.triggerZzm.addEventListener('focus', () => {
            this.focusing = true;
          });
          this.triggerZzm.addEventListener('blur', () => {
            this.focusing = false;
          });
          this.triggerZzm.addEventListener('click', () => {
            this.focusing = false;
          });
        }
        if (trigger === 'hover') {
          this.triggerZzm.addEventListener('mouseenter', show);
          this.triggerZzm.addEventListener('mouseleave', hide);
          dropdownZzm.addEventListener('mouseenter', show);
          dropdownZzm.addEventListener('mouseleave', hide);
        } else if (trigger === 'click') {
          this.triggerZzm.addEventListener('click', handleClick);
        }
      },
      handleMenuItemClick(command, instance) {
        if (this.hideOnClick) {
          this.visible = false;
        }
        this.$emit('command', command, instance);
      },
      triggerZzmFocus() {
        this.triggerZzm.focus && this.triggerZzm.focus();
      },
      initDomOperation() {
        this.dropdownZzm = this.popperZzm;
        this.menuItems = this.dropdownZzm.querySelectorAll("[tabindex='-1']");
        this.menuItemsArray = [].slice.call(this.menuItems);

        this.initEvent();
        this.initAria();
      }
    },

    render(h) {
      let { hide, splitButton, type, dropdownSize, disabled } = this;

      const handleMainButtonClick = (event) => {
        this.$emit('click', event);
        hide();
      };

      let triggerZzm = null;
      if (splitButton) {
        triggerZzm = <zz-button-group>
          <zz-button type={type} size={dropdownSize} nativeOn-click={handleMainButtonClick} disabled={disabled}>
            {this.$slots.default}
          </zz-button>
          <zz-button ref="trigger" type={type} size={dropdownSize} class="zz-dropdown__caret-button" disabled={disabled}>
            <i class="zz-dropdown__icon zz-icon-arrow-down"></i>
          </zz-button>
        </zz-button-group>;
      } else {
        triggerZzm = this.$slots.default;
        const vnodeData = triggerZzm[0].data || {};
        let { attrs = {} } = vnodeData;
        if (disabled && !attrs.disabled) {
          attrs.disabled = true;
          vnodeData.attrs = attrs;
        }
      }
      const menuZzm = disabled ? null : this.$slots.dropdown;

      return (
        <div class="zz-dropdown" v-clickoutside={hide} aria-disabled={disabled}>
          {triggerZzm}
          {menuZzm}
        </div>
      );
    }
  };
</script>
