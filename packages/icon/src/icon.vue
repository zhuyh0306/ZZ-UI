<template>
  <i :class="'zz-icon-' + name"></i>
</template>

<script>
  export default {
    name: 'ZzIcon',

    props: {
      name: String
    }
  };
</script>
