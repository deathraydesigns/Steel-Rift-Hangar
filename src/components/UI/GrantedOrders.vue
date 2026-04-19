<script setup lang="ts">
import {computed} from 'vue';
import {ORDERS} from '../../data/orders';

const {orderIds} = defineProps({
  orderIds: {
    type: Array,
    required: true,
  },
});

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