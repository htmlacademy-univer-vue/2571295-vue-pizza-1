<script setup>
import sizes from "@/mocks/sizes.json";
import sizesNumber from "@/common/data/sizes";

const props = defineProps({
  selectedSize: String,
});

const emit = defineEmits(["update:size"]);

// Функция для вызова события с определенным значением
function handleClick(size) {
  console.log(size);
  emit("update:size", size);
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
            :checked="!selectedSize && selectedSize === sizesNumber[item.id]"
            @change="handleClick(sizesNumber[item.id])"
          />
          <!-- :checked="!selectedSize && item.id === sizes[0].id || selectedSize === sizesNumber[item.id]" -->
          <span>{{ item.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

//diametr

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-image: url("@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
