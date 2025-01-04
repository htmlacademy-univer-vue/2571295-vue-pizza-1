<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizzaName"
      placeholder="Введите название пиццы"
      :value="modelValue"
      @input="updateName"
    />
  </label>
</template>

<script setup>
defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

function updateName(e) {
  emit("update:modelValue", e.target.value);
}
</script>
