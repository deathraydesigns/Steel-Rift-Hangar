<script setup lang="ts">
import { sortBy } from 'es-toolkit';
import { computed } from 'vue';
import type { TraitDef } from '../../../data/data-helpers';
import { ORDERS } from '../../../data/orders';

const { title, traits } = defineProps<{
  title: string,
  traits: TraitDef[],
}>();
const traitsWithOrders = computed(() => {
  const results = traits.map(trait => {
    return {
      ...trait,
      grantedOrders: trait.granted_order_ids?.map(id => ORDERS[id]) || [],
    };
  });

  return sortBy(results, ['display_name']);
});
</script>
<template>
  <div v-if="traitsWithOrders.length">
    <div class="divider"></div>
    <div class="ref-heading">{{ title }}</div>
    <div v-for="item in traitsWithOrders" :key="item.id">
      <p class="p-gap">
        <span class="fw-bold">
          {{ item.display_name }}:
        </span>
        {{ item.description }}
        <template v-if="item.grantedOrders.length">
          <span class="fw-medium">
            Grants Order(s):
          </span>
          {{ item.grantedOrders.map(o => o.display_name).join(', ') }}
        </template>
      </p>
    </div>
  </div>
</template>

