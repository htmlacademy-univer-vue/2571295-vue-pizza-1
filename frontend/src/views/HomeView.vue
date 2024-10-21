 <script setup>
import { reactive, ref, computed } from 'vue';
import ingredients from '@/mocks/ingredients.json';
import DoughSelector from '@/modules/constructor/DoughSelector.vue';
import SizeSelector from '@/modules/constructor/SizeSelector.vue';
import SauceSelector from '@/modules/constructor/SauceSelector.vue';
import ingredientsName from '@/common/data/ingredients';
import IngredientSelector from '@/modules/constructor/IngredientSelector.vue';
import PizzaName from '@/modules/constructor/PizzaName.vue';
import PizzaSummary from '@/modules/constructor/PizzaSummary.vue';
import sizesNumber from '@/common/data/sizes';
import sizes from '@/mocks/sizes.json';
import sauces from '@/mocks/sauces.json'
import saucesName from '@/common/data/sauces'
import AppDrop from '@/common/components/AppDrop.vue'; // Import AppDrop
  

const selectedDough = ref("");
const selectedSize = ref(sizesNumber[sizes[0].id]); // Значение по умолчанию

const selectedSauce = ref(saucesName[sauces[0].id]); // Значение по умолчанию - первый соус
const pizzaName = ref("");
console.log(selectedSauce.value)

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
const totalPrice = computed(() => {
  let basePrice = 0; // Пример стоимости базы пиццы

  // Рассчитываем стоимость ингредиентов
  let ingredientsPrice = Object.entries(ingredientCounts).reduce(
    (sum, [id, count]) => {
      const ingredient = ingredients.find((item) => item.id == id);
      return sum + count * (ingredient ? ingredient.price : 0);
    },
    0
  );

  return basePrice + ingredientsPrice;
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
   

           <DoughSelector
         v-model:dough="selectedDough"/>

              <!-- Используем компонент SizeSelector и связываем пропс и событие -->
    <SizeSelector
      :selectedSize="selectedSize"
      @update:size="updateSize"
    />
   
           <div class="content__ingredients">
             <div class="sheet">
               <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
   
               <div class="sheet__content ingredients">

                <SauceSelector
                :selectedSauce="selectedSauce"
                @update:sauce="updateSauce"
                />

        <IngredientSelector
          :ingredientCounts="ingredientCounts"
          @update:ingredientCount="updateIngredientCount"
                  />
    
   
               </div>
             </div>
           </div>
   
           <div class="content__pizza">

            <PizzaName v-model="pizzaName" />
               <!-- Make pizza a drop target using appDrop -->
          <AppDrop @drop="onIngredientDrop">
            <div class="content__constructor">
            <div :class="`pizza pizza--foundation--${selectedSize}-${selectedSauce}`">
             <!-- <div class="pizza pizza--foundation--normal-tomato">  ???? normal where images-->
              <div class="pizza__wrapper">
                <!-- {{ ingredientCounts }}
                {{ ingredientsName }}
                {{ ingredients}} -->
  <div
    v-for="(count, ingredientId) in ingredientCounts"
    :key="ingredientId" >
    <div v-if="count > 0" :class="`pizza__filling pizza__filling--${ingredientsName[ingredientId]}`">

  </div>
  </div>
</div>
            </div>
          </div>
        </AppDrop>
          <!-- :class="`pizza__filling--${ingredients[ingredientId] ? ingredients[ingredientId].name : ''}`" -->
             <PizzaSummary :totalPrice="totalPrice" />

           </div>
   
         </div>
   
       </form>
     </main>
   </template> 
  

<style lang="scss">
@import "@/assets/scss/app.scss";
.content {
    padding-top: 20px;
}

.content__wrapper {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    width: 920px;
    margin: 0 auto;
    padding-right: 2.12%;
    padding-bottom: 30px;
    padding-left: 2.12%;
}

.content__dough {
    width: 527px;
    margin-top: 15px;
    margin-right: auto;
    margin-bottom: 15px;
}

.content__diameter {
    width: 373px;
    margin-top: 15px;
    margin-bottom: 15px;
}

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

.content__constructor {
    width: 315px;
    margin-top: 25px;
    margin-right: auto;
    margin-left: auto;
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


//sheets 

.sheet {
    padding-top: 15px;

    border-radius: 8px;
    background-color: $white;
    box-shadow: $shadow-light;
}

.sheet__title {
    padding-right: 18px;
    padding-left: 18px;
}

.sheet__content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 8px;
    padding-top: 18px;
    padding-right: 18px;
    padding-left: 18px;
    border-top: 1px solid rgba($green-500, 0.1);
}

//title

.title {
    box-sizing: border-box;
    width: 100%;
    margin: 0;

    color: $black;

    &--big {
        @include b-s36-h42;
    }

    &--small {
        @include b-s18-h21;
    }
}

</style>