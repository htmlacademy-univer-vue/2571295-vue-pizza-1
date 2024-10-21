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
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
// ingerdients
.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
  