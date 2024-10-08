<script setup>
import ingredients from '@/mocks/ingredients.json';
import ingredientsName from '@/common/data/ingredients';

const props = defineProps({
  ingredientCounts: Object,
});

const emit = defineEmits(['update:ingredientCount']);

function updateIngredientCount(id, increment) {
  emit('update:ingredientCount', { id, count: increment });
}


</script>

<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <span class="filling" :class="`filling--${ingredientsName[ingredient.id]}`">
          {{ ingredient.name }}

        </span>
        <div class="counter counter--orange ingredients__counter">
          <button
            type="button"
            class="counter__button counter__button--minus"
            :disabled="ingredientCounts[ingredient.id] === 0"
            @click="updateIngredientCount(ingredient.id, -1)"
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input
            type="text"
            name="counter"
            class="counter__input"
            :value="ingredientCounts[ingredient.id]"
            readonly
          />
          <button
            type="button"
            class="counter__button counter__button--plus"
            @click="updateIngredientCount(ingredient.id, 1)"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

  


  