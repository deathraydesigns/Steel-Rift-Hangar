<script setup>
import {computed} from 'vue';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';
import {makeGrantedOrderCollection} from '../../../store/helpers/helpers.js';
import {useMechStore} from '../../../store/mech-store.js';

const mechStore = useMechStore();
const unitStore = useSupportAssetUnitsStore();

const orders = computed(() => {
  const grantedOrders = makeGrantedOrderCollection();

  mechStore.mechs.forEach((mech) => {
    const mechOrders = mechStore.getMechGrantedOrdersCollection(mech.id);
    grantedOrders.addIds(mechOrders.ids());
  });

  const unitOrders = unitStore.getAllGrantedOrdersCollection();
  grantedOrders.addIds(unitOrders.ids());

  return grantedOrders.all();
});
</script>
<template>
  <div v-if="orders.length">
    <div class="divider"></div>
    <div class="ref-heading">Special Orders</div>
    <div v-for="item in orders" :key="item.id">
      <p class="p-gap">
        <span class="fw-bold">
          {{ item.display_name }}:
        </span>
        {{ item.description }}
      </p>
    </div>
  </div>
</template>

