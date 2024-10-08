<script setup>
const props = defineProps({
  totalPrice: Number,
});
</script>

<template>
    <div class="content__result">
      <p>Итого: {{ totalPrice }} ₽</p>
      <button type="button" class="button" :disabled="totalPrice === 0">Готовьте!</button>
    </div>
  </template>
  

