<script setup>
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";
import { shallowRef, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const layout = shallowRef(null);

watch(
  () => route.meta,
  async (meta) => {
    try {
      if (meta.layout) {
        const component = await import(/* @vite-ignore */`./${meta.layout}.vue`);
        // const component = await import(`./${meta.layout}.vue`);
        layout.value = component?.default || AppLayoutDefault;
      } else {
        layout.value = AppLayoutDefault;
      }
    } catch (e) {
      console.error(
        `Динамический шаблон не найден`,
        e
      );
      layout.value = AppLayoutDefault;
    }
  }
);
</script>
<template>
  <component :is="layout">
    <slot></slot>
  </component>
</template>
<style lang="scss" scoped>
.app_layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>