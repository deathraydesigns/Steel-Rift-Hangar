<script setup>
import {UNIT_SIZES} from '../../../../data/unit-sizes.js';

const {label, size_id} = defineProps({
  label: {
    type: String,
    required: true,
  },
  size_id: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="card-description small m-0">
    <div class="d-flex">
      <div class="flex-grow-1">
        {{label}}
      </div>
      <div class="flex-shrink-1" v-if="size_id">
        <span class="fw-medium">Size:</span> {{ UNIT_SIZES[size_id].display_name }}
      </div>
    </div>
  </div>
</template>