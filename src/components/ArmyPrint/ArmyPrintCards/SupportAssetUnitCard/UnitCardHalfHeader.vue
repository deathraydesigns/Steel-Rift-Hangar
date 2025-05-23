<script setup>

const {
  label,
  sizeDisplayName,
  typeDisplayName,
} = defineProps({
  label: {
    type: String,
    required: true,
  },
  typeDisplayName: {
    type: String,
    required: true,
  },
  sizeDisplayName: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="card-description small m-0">
    <div class="d-flex">
      <div class="flex-grow-1">
        {{ label }}
      </div>
      <div class="flex-shrink-1">
        <span class="fw-medium">Size:</span> {{ sizeDisplayName }},
        <span class="fw-medium">Type:</span> {{ typeDisplayName }}
      </div>
    </div>
  </div>
</template>