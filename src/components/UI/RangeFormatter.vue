<script setup>

import FormatInches from '../functional/format-inches.vue';

const {
  range,
  modifier,
  total,
} = defineProps({
  range: {
    type: Number,
  },
  modifier: {
    type: Number,
  },
  total: {
    type: Number,
  },
});
</script>
<template>
  <div class="text-end" v-if="modifier">
    <small class="fw-light">
      {{ range }}+{{ modifier }} =
    </small>
    <format-inches :value="total"/>
  </div>
  <template v-else>
    <format-inches :value="range"/>
  </template>
</template>