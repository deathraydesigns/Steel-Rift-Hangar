<script setup lang="ts">

const {
  label,
  sizeDisplayName = '',
  typeDisplayName = '',
} = defineProps<{
  label: string;
  sizeDisplayName?: string;
  typeDisplayName?: string;
  defense: number;
}>();
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
          <span class="fw-medium">Def:</span> {{ defense }}+
        </template>
      </div>
    </div>
  </div>
</template>