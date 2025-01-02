<template>
  <div class="default-layout">
    <AppHeader />
    <slot></slot>
  </div>
</template>

<script setup>
import AppHeader from '@/layouts/AppHeader.vue';

</script>

<style lang="scss" scoped>
.default-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>