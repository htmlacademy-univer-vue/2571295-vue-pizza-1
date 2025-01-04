<script setup>
defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauceType in items"
      :key="sauceType.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauceType.value"
        :checked="sauceType.id === modelValue"
        @input="emit('update:modelValue', sauceType.id)"
      />
      <span>{{ sauceType.name }}</span>
    </label>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

//------------------------radio---------------------------//

.radio {
  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 28px;

    &:before {
      @include p_center-v;

      display: block;

      box-sizing: border-box;
      width: 20px;
      height: 20px;

      content: "";
      transition: 0.3s;

      border: 1px solid $purple-400;
      border-radius: 50%;
      background-color: $white;
    }
  }

  &:hover {
    input:not(:checked):not(:disabled) + span {
      &:before {
        border-color: $purple-800;
      }
    }
  }

  input {
    display: none;

    &:checked + span {
      &:before {
        border: 6px solid $green-500;
      }
    }

    &:disabled {
      & + span {
        &:before {
          border-color: $purple-400;
          background-color: $silver-200;
        }
      }

      &:checked + span {
        &:before {
          border: 6px solid $purple-400;
        }
      }
    }
  }
}
</style>
