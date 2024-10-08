<script setup>
import AppHeader from '../layouts/AppHeader.vue';
</script>
<template>
    <div class="app_layout">
       <AppHeader />
        <slot></slot>
    </div>
</template>
<style lang="scss" scoped>
.app_layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>