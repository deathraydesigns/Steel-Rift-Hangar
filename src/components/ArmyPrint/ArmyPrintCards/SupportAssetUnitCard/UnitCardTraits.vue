<script setup>
import {unitTraitDisplayName} from '../../../../data/unit-traits.js';

const {traits} = defineProps({
  traits: {
    type: Array,
    required: true,
  },
  orders: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <template v-if="traits.length">
    <div class="section-heading">
      Traits
    </div>
    <div class="card-description">
      {{ traits.map(t => unitTraitDisplayName(t)).join(', ') }}
      <span v-if="orders.length">
        <span class="fw-bold"> Special Orders: </span>
        {{ orders.map(o => o.display_name).join(', ') }}
      </span>
    </div>
  </template>
</template>
