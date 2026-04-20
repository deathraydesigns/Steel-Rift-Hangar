<script setup lang="ts">
const {
  value,
} = defineProps<{
  value: number | string | null | undefined,
}>();
</script>
<template>
  <template v-if="value">{{ value }}"</template>
  <template v-else>&ndash;&nbsp;</template>
</template>