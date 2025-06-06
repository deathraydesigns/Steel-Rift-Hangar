<script setup>

import BtnToolTip from './BtnToolTip.vue';
import GrantedOrders from './GrantedOrders.vue';

const {traits} = defineProps({
  traits: {
    type: Array,
  },
});

function show(trait) {
  return !!(trait.description || trait.granted_order_ids?.length);
}
</script>
<template>
  <template v-for="(trait, index) in traits">
    <BtnToolTip :enabled="show(trait)">
      <template #target="{mouseover, mouseleave}">
        <span
            @mouseover="mouseover"
            @mouseleave="mouseleave"
            :class="{'text-tooltip': show(trait)}"
        >
          <span class="text-nowrap">{{ trait.display_name }}</span>
        </span>
        <span v-if="index !== traits.length - 1">, </span>

      </template>
      <template #content>
        {{ trait.description }}
        <GrantedOrders :order-ids="trait.granted_order_ids"/>
      </template>
    </BtnToolTip>
  </template>
</template>