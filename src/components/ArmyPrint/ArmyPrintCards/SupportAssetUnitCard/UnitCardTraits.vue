<script setup>
import {unitTraitDisplayName} from '../../../../data/unit-traits.js';

const {traits} = defineProps({
  traits: {
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
    </div>
  </template>
</template>
