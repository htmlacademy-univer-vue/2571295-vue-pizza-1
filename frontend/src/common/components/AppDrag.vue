<script setup>
import { DATA_TRANSFER_PAYLOAD, MOVE } from "@/common/constants";

const props = defineProps({
  dataTransfer: {
    type: Object,
    required: true,
  },
});

function onDrag({ dataTransfer }) {
  dataTransfer.effectAllowed = "move";
  const payload = JSON.stringify(props.dataTransfer);

  if (!payload) {
    console.error("Payload is empty or undefined.");
    return;
  }

  dataTransfer.setData(DATA_TRANSFER_PAYLOAD, payload);
  console.log("Drag started with payload:", payload);
}
</script>

<template>
  <div :draggable="true" @dragstart.self="onDrag" @dragover.prevent @dragenter.prevent>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
[draggable="true"] {
  cursor: grab;
}

[draggable="true"]:active {
  cursor: grabbing;
}
</style>
