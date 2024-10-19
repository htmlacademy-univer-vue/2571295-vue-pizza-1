<script setup>
import sauces from '@/mocks/sauces.json'
import saucesName from '@/common/data/sauces'
  
const props = defineProps({
  selectedSauce: String,
});

const emit = defineEmits(['update:sauce']);

// Функция для вызова события с определенным значением
function handleClick(sauce) {
  console.log(sauce);
  emit('update:sauce', sauce);
}
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
          :checked="selectedSauce === saucesName[item.id] || (!selectedSauce && item.id === sauces[0].id)"
          @change="handleClick(saucesName[item.id])"
        />
        <span>{{ item.name }}</span>
      </label>
    </div>
  </template>
  

  <!-- :checked="saucesName[0] || selectedSauce === saucesName[item.id] " -->
  