<template>
  <footer class="zz-footer" :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script>
  export default {
    name: 'ZzFooter',

    componentName: 'ZzFooter',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
