<script setup>
import sizes from '@/mocks/sizes.json'
import sizesNumber from '@/common/data/sizes'

const props = defineProps({
  selectedSize: String,
});

const emit = defineEmits(['update:size']);

// Функция для вызова события с определенным значением
function handleClick(size) {
  console.log(size);
  emit('update:size', size);
}
</script>

<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <label
          v-for="item in sizes"
          :key="item.id"
          :class="`diameter__input diameter__input--${sizesNumber[item.id]}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="sizesNumber[item.id]"
            class="visually-hidden"
            :checked="!selectedSize && item.id === sizes[0].id || selectedSize === sizesNumber[item.id]"
            @change="handleClick(sizesNumber[item.id])"
          />
          <span>{{ item.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>


  
 
  