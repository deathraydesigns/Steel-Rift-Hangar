<script setup lang="ts">
const {
  displayName,
  typeDisplayName,
  subtypeDisplayName,
  description,
} = defineProps<{
  displayName: string
  typeDisplayName: string
  subtypeDisplayName: string
  description: string
}>();
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