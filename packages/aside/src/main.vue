<template>
  <aside class="zz-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
  export default {
    name: 'ZzAside',

    componentName: 'ZzAside',

    props: {
      width: {
        type: String,
        default: '300px'
      }
    }
  };
</script>
