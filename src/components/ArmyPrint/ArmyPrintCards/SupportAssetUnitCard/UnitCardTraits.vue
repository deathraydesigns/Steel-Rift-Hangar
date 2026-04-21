<script setup lang="ts">
import type { Order } from '../../../../data/orders';
import { unitTraitDisplayName } from '../../../../data/unit-traits.js';
import type { Trait } from '../../../../types';

const { traits, orders } = defineProps<{
  traits: Trait[],
  orders: Order[],
}>();
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
