<script setup lang="ts">
import { computed } from 'vue';
import { type ORDER, ORDERS } from '../../data/orders';

const { orderIds } = defineProps<{
  orderIds: ORDER[];
}>();

const orders = computed(() => {
  const ids = orderIds || [];
  return ids.map(orderId => {
    return ORDERS[orderId];
  });
});
</script>
<template>
  <div v-for="order in orders">
    <span class="fw-bold">{{ order.display_name }} (ORDER):</span>
    {{ order.description }}
  </div>
</template>