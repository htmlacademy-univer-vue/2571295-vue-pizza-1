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

      <!-- {{ doughSizes[item.id] }} -->
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
            :checked="selectedDough === doughSizes[item.id] || doughSizes[0]"
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
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
//dough 

.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}

</style>
