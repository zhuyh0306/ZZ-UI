<template>
  <div class="zz-page-header">
    <div class="zz-page-header__left" @click="$emit('back')">
      <i class="zz-icon-back"></i>
      <div class="zz-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="zz-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import { t } from '@yhui/zz-ui/src/locale';
export default {
  name: 'ZzPageHeader',

  props: {
    title: {
      type: String,
      default() {
        return t('el.pageHeader.title');
      }
    },
    content: String
  }
};
</script>
