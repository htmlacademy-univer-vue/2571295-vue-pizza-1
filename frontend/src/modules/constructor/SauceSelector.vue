<script setup>
import sauces from '@/mocks/sauces.json'
import saucesName from '@/common/data/sauces'
  
const props = defineProps({
  selectedSauce: String,
});

defineEmits(['update:sauce']);
</script>

<template>
    <div class="ingredients__sauce">
      <p>Основной соус:</p>
      <label
        v-for="item in sauces"
        :key="item.id"
        class="radio ingredients__input"
      >
        <input
          type="radio"
          name="sauce"
          :value="`${saucesName[item.id]}`"
          :checked="selectedSauce === saucesName[item.id]"
          @change="$emit('update:sauce', saucesName[item.id])"
        />
        <span>{{ item.name }}</span>
      </label>
    </div>
  </template>
  


  