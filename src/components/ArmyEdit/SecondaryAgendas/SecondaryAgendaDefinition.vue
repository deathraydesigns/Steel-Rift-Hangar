<script setup>
const {
  displayName,
  typeDisplayName,
  subtypeDisplayName,
  description,
} = defineProps({
  displayName: {
    type: String,
  },
  typeDisplayName: {
    type: String,
  },
  subtypeDisplayName: {
    type: String,
  },
  description: {
    type: String,
  },
});
</script>
<template>
  <div>
    <span class="fw-bold">
      {{ displayName }}
    </span>
    (<span class="fw-medium">{{ typeDisplayName }}<span
      v-if="subtypeDisplayName">: </span></span>{{ subtypeDisplayName }})
  </div>
  <p class="p-gap">{{ description }}</p>
</template>