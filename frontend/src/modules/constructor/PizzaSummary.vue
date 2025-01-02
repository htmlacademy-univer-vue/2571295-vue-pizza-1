<script setup>
import AppButton from "@/common/components/AppButton.vue";
import { usePizzaStore } from "@/stores/pizza.js";
import { useRouter } from "vue-router";
const router = useRouter();

const pizzaStore = usePizzaStore();
let x = pizzaStore.totalPrice;
const props = defineProps({
  totalPrice: Number,
  totalIngredient: Object,
  pizzaName: String
});

async function addNewPizza() {
  try {
    pizzaStore.setTotalPrice(props.totalPrice);
    pizzaStore.addPizza();
    await router.push({ name: "cart" });
  } catch (error) {
    console.error("Error adding pizza or navigating to cart:", error);
  }
}
</script>

<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>

    <!-- <button type="button" class="button" :disabled="totalPrice === 0">Готовьте!</button> -->
    <AppButton @click="addNewPizza" :disabled="pizzaStore.currentPizza.pizzaName === ''">Готовьте!
    </AppButton>
    <!-- const addToCart = async () => {
  cartStore.savePizza(pizzaStore.$state);
  await router.push({ name: "cart" });
  resetPizza();
}; -->
    <!-- При нажатии на кнопку «Готовьте» пицца с выбранными
     параметрами добавляется в корзину. 
     Если не было выбрано ни одного ингредиента и/или 
     не введено название пиццы, то кнопка «Готовьте» будет неактивной. -->
  </div>
</template>
