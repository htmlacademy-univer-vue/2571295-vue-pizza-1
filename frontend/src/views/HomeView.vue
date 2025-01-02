<!-- home -->
<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import DiameterSelector from "@/modules/constructor/DiameterSelector.vue";
import DoughSelector from "@/modules/constructor/DoughSelector.vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";
import SauceSelector from "@/modules/constructor/SauceSelector.vue";
import IngredientSelector from "@/modules/constructor/IngredientSelector.vue";
import { useCartStore } from "@/stores/cart";
import { useDataStore } from "@/stores/data";
import { usePizzaStore } from "@/stores/pizza";

const dataStore = useDataStore();
const pizzaStore = usePizzaStore();
const cartStore = useCartStore();
const router = useRouter();



const name = computed({
  get() {
    return pizzaStore.name;
  },
  set(value) {
    pizzaStore.setName(value);
  },
});

const doughId = computed({
  get() {
    return pizzaStore.doughId;
  },
  set(value) {
    pizzaStore.setDough(value);
  },
});

const sizeId = computed({
  get() {
    return pizzaStore.sizeId;
  },
  set(value) {
    pizzaStore.setSize(value);
  },
});

const sauceId = computed({
  get() {
    return pizzaStore.sauceId;
  },
  set(value) {
    pizzaStore.setSauce(value);
  },
});

const disableSubmit = computed(() => {
  return name.value.length === 0 || pizzaStore.price === 0;
});

const addToCart = async () => {
  cartStore.savePizza(pizzaStore.$state);
  await router.push({ name: "cart" });
  resetPizza();
};

const resetPizza = () => {
  pizzaStore.setName("");
  pizzaStore.setDough(dataStore.doughs[0].id);
  pizzaStore.setSize(dataStore.sizes[0].id);
  pizzaStore.setSauce(dataStore.sauces[0].id);
  pizzaStore.setIngredients([]);
  pizzaStore.setIndex(null);
};
onMounted(() => {
  if (pizzaStore.index === null) {
    resetPizza();
  }
});
</script>
<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <DoughSelector v-model="doughId" :items="dataStore.doughs" />
        <DiameterSelector v-model="sizeId" :items="dataStore.sizes" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>
            <div class="sheet__content ingredients">
              <SauceSelector v-model="sauceId" :items="dataStore.sauces" />
              <IngredientSelector :values="pizzaStore.ingredientQuantities" :items="dataStore.ingredients"
                @update="pizzaStore.setIngredientQuantity" />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input v-model="name" type="text" name="pizza_name" placeholder="Введите название пиццы" />
          </label>

          <PizzaConstructor :dough="pizzaStore.dough.value" :sauce="pizzaStore.sauce.value"
            :ingredients="pizzaStore.ingredientsExtended" @drop="pizzaStore.incrementIngredientQuantity" />

          <div class="content__result">
            <p>Итого: {{ pizzaStore.price }} ₽</p>
            <button type="button" class="button" :disabled="disableSubmit" @click="addToCart">
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>


<!-- <script setup>
import { reactive, ref, computed } from "vue";
import ingredients from "@/mocks/ingredients.json";
// import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";
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
// import stores
import { usePizzaStore } from "@/stores/pizza.js";
const pizzaStore = usePizzaStore();

const TWO_INGREDIENTS = 2;
const THREE_INGREDIENTS = 3;
const doughSizeMapper = {
  light: "small",
  large: "big",
};

const selectedDough = ref("large");
const selectedSize = ref(sizesNumber[sizes[0].id]); // Значение по умолчанию
// const selectedSize = ref(sizesNumber[sizes[0].id]);
// console.log(sauces[0].name)
const selectedSauce = ref(saucesName[1]); // Значение по умолчанию - первый соус
const pizzaName = ref(pizzaStore.name); // Значение по умолчанию
const ingredientCounts = reactive({
  1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0,
});

function updateSize(size) {
  selectedSize.value = size; // Обновляем значение, когда событие приходит из дочернего компонента
  pizzaStore.setPizzaSize(size);
  // pizzaStore.currentPizza.selectedSize = size;
}
function updateDough(dough) {
  selectedDough.value = dough;
  pizzaStore.setPizzaDough(dough);
}
function updateSauce(sauce) {
  selectedSauce.value = sauce;
  pizzaStore.setPizzaSauce(sauce);
}

// updateSauce();
function updateIngredientCount({ id, count }) {
  ingredientCounts[id] += count;
  if (ingredientCounts[id] < 0) {
    ingredientCounts[id] = 0;
  }
  // pizzaStore.ingredientCounts = ingredientCounts;
  pizzaStore.setIngredientCounts(ingredientCounts);
}
// data input
console.log('dough:' + selectedDough.value);
console.log('souce:' + selectedSauce.value);
console.log('size:' + selectedSize.value);

const normalizeSize = ref();

const totalPrice = computed(() => {
  // if (selectedSize.value == "") {
  //   console.log('pc' + normalizeSize.value);
  // } else
  if (selectedSize.value == "small") {
    normalizeSize.value = 1;
    console.log(normalizeSize.value);
  } else if (selectedSize.value == "normal") {
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
        <DoughSelector v-model:dough="selectedDough" @update:dough="updateDough" />

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
          <PizzaName @input="pizzaStore.setPizzaName(pizzaName)" v-model="pizzaName" />
          Имя: {{ pizzaStore.pizzaName }}
        


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
          <PizzaSummary :pizzaName="pizzaStore.pizzaName" :totalIngredient="ingredientCounts"
            :totalPrice="totalPrice" />

        </div>
      </div>
    </form>
  </main>
</template>
<style lang="scss">
@import "@/assets/scss/app.scss";
@import "@/assets/scss/common.scss";
</style> -->
