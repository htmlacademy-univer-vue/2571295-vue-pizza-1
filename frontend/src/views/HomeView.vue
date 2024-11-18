<script setup>
import { reactive, ref, computed } from "vue";
import ingredients from "@/mocks/ingredients.json";
import DoughSelector from "@/modules/constructor/DoughSelector.vue";
import SizeSelector from "@/modules/constructor/SizeSelector.vue";
import SauceSelector from "@/modules/constructor/SauceSelector.vue";
import ingredientsName from "@/common/data/ingredients.js";
import IngredientSelector from "@/modules/constructor/IngredientSelector.vue";
import PizzaName from "@/modules/constructor/PizzaName.vue";
import PizzaSummary from "@/modules/constructor/PizzaSummary.vue";
import sizesNumber from "@/common/data/sizes";
import sizes from "@/mocks/sizes.json";
import sauces from "@/mocks/sauces.json";
import saucesName from "@/common/data/sauces.js";
import AppDrop from "@/common/components/AppDrop.vue"; // Import AppDrop

const TWO_INGREDIENTS = 2;
const THREE_INGREDIENTS = 3;
const doughSizeMapper = {
  light: "small",
  large: "big",
};

const selectedDough = ref("large");
const selectedSize = ref(sizesNumber[sizes[0].id]); // Значение по умолчанию
const selectedSauce = ref(saucesName[sauces[0].id]); // Значение по умолчанию - первый соус
const pizzaName = ref("");
const ingredientCounts = reactive({
  1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0,
});

function updateSize(size) {
  selectedSize.value = size; // Обновляем значение, когда событие приходит из дочернего компонента
}
function updateDough(dough) {
  selectedDough.value = dough;
}
function updateSauce(sauce) {
  selectedSauce.value = sauce;
}
function updateIngredientCount({ id, count }) {
  ingredientCounts[id] += count;
  if (ingredientCounts[id] < 0) {
    ingredientCounts[id] = 0;
  }
}
// data input
console.log(selectedDough.value);
console.log(selectedSauce.value);
console.log(selectedSize.value);

let normalizeSize = ref();
const totalPrice = computed(() => {
  if (selectedSize.value == 'small') {
    normalizeSize.value = 1;
    console.log(normalizeSize.value)
  } else if (selectedSize.value == 'normal') {
    normalizeSize.value = 2;
  } else normalizeSize.value = 3;

  // Рассчитываем стоимость ингредиентов
  let ingredientsPrice = Object.entries(ingredientCounts).reduce(
    (sum, [id, count]) => {
      const ingredient = ingredients.find((item) => item.id == id);
      return sum + count * (ingredient ? ingredient.price : 0);
    },
    0
  );
  return normalizeSize.value * (300 + 50 + ingredientsPrice);
});
// Handle the drop event for adding ingredients to the pizza
// Handle the drop event
function onIngredientDrop(transferData) {
  const { id } = transferData;
  if (ingredientCounts[id] !== undefined) {
    ingredientCounts[id] += 1; // Increment the count when an ingredient is dropped
  }
}
</script>
<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <DoughSelector v-model:dough="selectedDough" />
        <!-- Используем компонент SizeSelector и связываем пропс и событие -->
        <SizeSelector :selectedSize="selectedSize" @update:size="updateSize" />
        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

            <div class="sheet__content ingredients">
              <SauceSelector :selectedSauce="selectedSauce" @update:sauce="updateSauce" />
              <IngredientSelector :ingredientCounts="ingredientCounts"
                @update:ingredientCount="updateIngredientCount" />
            </div>
          </div>
        </div>
        <div class="content__pizza">
          <PizzaName v-model="pizzaName" />
          <!-- Make pizza a drop target using appDrop -->
          <AppDrop @drop="onIngredientDrop">
            <div class="content__constructor">
              <div :class="`pizza pizza--foundation--${doughSizeMapper[selectedDough]}-${selectedSauce}`">
                <div class="pizza__wrapper">
                  <div v-for="(count, ingredientId) in ingredientCounts" :key="ingredientId">
                    <div v-if="count > 0" class="pizza__filling" :class="[`pizza__filling--${ingredientsName[ingredientId]}`,
                    count === TWO_INGREDIENTS && 'pizza__filling--second',
                    count === THREE_INGREDIENTS && 'pizza__filling--third']"> </div>
                  </div>
                </div>
              </div>
            </div>
          </AppDrop>
          <PizzaSummary :totalPrice="totalPrice" />
        </div>
      </div>
    </form>
  </main>
</template>
<style lang="scss">
@import "@/assets/scss/app.scss";
@import "@/assets/scss/common.scss";
</style>