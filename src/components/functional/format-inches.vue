<script setup>
const {
  value,
} = defineProps({
  value: {
    required: true,
  },
});
</script>
<template>
  <template v-if="value">{{ value }}"</template>
  <template v-else>&ndash;&nbsp;</template>
</template>