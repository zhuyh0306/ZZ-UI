<template>
  <header class="zz-header" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: 'ZzHeader',

    componentName: 'ZzHeader',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
