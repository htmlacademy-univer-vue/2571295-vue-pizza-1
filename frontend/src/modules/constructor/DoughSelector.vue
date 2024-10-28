<script setup>
import dough from '@/mocks/dough.json';
import doughSizes from '@/common/data/doughSizes';

const props = defineProps({
  selectedDough: String,
});
const emit = defineEmits(['update:dough']);

// Функция для вызова события с определенным значением
function handleClick(doughType) {
  console.log(doughType)
  emit('update:dough', doughType);
}
</script>

<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="item in dough"
          :key="item.id"
          class="dough__input"
          :class="`dough__input--${doughSizes[item.id]}`"
        >
          <input
            type="radio"
            name="dough"
            :value="`${doughSizes[item.id]}`"
            class="visually-hidden"
            :checked="selectedDough ? selectedDough === doughSizes[item.id] : doughSizes[1]"
            @change="handleClick(doughSizes[item.id])"
          />
          <b>{{ item.name }}</b>
          <span>{{ item.description }}</span>
          </label>
     
        {{ doughSizes[0] }}
      </div>
    </div>
  </div>
</template>
