<!-- <template>
  <div class="content__constructor">
    <div :class="pizzaFoundationClass">
      <div class="pizza__wrapper">
        <div
          v-for="([ingredientId, count]) in Object.entries(ingredientCounts)"
          :key="ingredientId"
          
          class="pizza__filling"
          :class="`pizza__filling--${ingredientsName[ingredientId] || ''}`"
        ></div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import ingredientsName from '@/common/data/ingredients';
import ingredients from '@/mocks/ingredients.json';

const props = defineProps({
  selectedDough: String,
  selectedSize: String,
  ingredientCounts: Object,
});

const pizzaFoundationClass = computed(() => {
  let baseClass = 'pizza';
  if (props.selectedDough && props.selectedSize) {
    baseClass += ` pizza--foundation--${props.selectedSize}-${props.selectedDough}`;
  }
  return baseClass;
});
</script> -->




