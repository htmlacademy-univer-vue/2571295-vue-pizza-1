<script setup>
import dough from '@/mocks/dough.json'
import doughSizes from '@/common/data/doughSizes'

const props = defineProps({
  selectedDough: String,
});

defineEmits(['update:dough']);

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
            :checked="selectedDough === doughSizes[item.id]"
            @change="$emit('update:dough', doughSizes[item.id])"
          />
          <b>{{ item.name }}</b>
          <span>{{ item.description }}</span>
        </label>
      </div>
    </div>
</div>
  </template>
