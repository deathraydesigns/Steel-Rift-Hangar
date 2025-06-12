<script setup>
import {computed} from 'vue';
import {ORDERS} from '../../../data/orders.js';
import {sortBy} from 'es-toolkit';

const {title, traits} = defineProps({
  title: {
    type: String,
    required: true,
  },
  traits: {
    type: Array,
    required: true,
  },
});
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

