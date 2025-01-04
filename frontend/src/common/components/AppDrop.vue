<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

const emit = defineEmits(["drop"]);
const onDrop = ({ dataTransfer }) => {
  if (!dataTransfer) {
    return;
  }

  const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);

  if (payload) {
    try {
      const data = JSON.parse(payload);
      emit("drop", data);
    } catch (error) {
      console.error("Failed to parse payload:", error);
    }
  }
};
</script>
