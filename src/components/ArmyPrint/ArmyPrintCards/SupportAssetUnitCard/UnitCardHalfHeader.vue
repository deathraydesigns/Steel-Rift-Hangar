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
  },
  sizeDisplayName: {
    type: String,
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
        <template v-if="sizeDisplayName">
          <span class="fw-medium">Size:</span> {{ sizeDisplayName }},
        </template>
        <template v-if="typeDisplayName">
          <span class="fw-medium">Type:</span> {{ typeDisplayName }}
        </template>
      </div>
    </div>
  </div>
</template>