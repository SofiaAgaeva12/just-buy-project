<script setup lang="ts">
import DefaultLayout from '@/components/DefaultLayout.vue'</script>

<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>


<style lang="scss">
@import 'primevue/resources/themes/mdc-light-indigo/theme.css';

.dark {
  @import 'assets/css/_theme.scss';
  body {
    background: #121212;
  }
  .product-grid-item {
    border: 1px solid hsla(0,0%,100%,.12) !important;
  }
  .parallax-text {
    color: var(--gray-50);
  }
}

.p-toast-top-right {
  right: 20px!important;
}

</style>