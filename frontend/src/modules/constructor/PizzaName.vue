<template>
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input type="text" name="pizza_name" placeholder="Введите название пиццы" v-model="pizzaName">
    </label>
  </template>
  
  <script setup>
//   import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    pizzaName: String
  });
  
  const emit = defineEmits(['update:pizzaName']);
  
  function updateName(event) {
    emit('update:pizzaName', event.target.value);
  }
  </script>

  