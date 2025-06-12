<script setup>
import {computed} from 'vue';
import {useMechStore} from '../../../store/mech-store.js';

const mechStore = useMechStore();

const upgrades = computed(() => {
  return mechStore.getUsedUpgradesInfo;

});
</script>
<template>
  <div v-if="upgrades.length">
    <div class="divider"></div>
    <div class="ref-heading">Upgrades</div>
    <template v-for="item in upgrades">
      <p class="p-gap">
        <span class="fw-bold">
          {{ item.display_name }}:
        </span>
        <template v-if="item.traits?.length">
          <span class="fw-medium">
            Traits:
          </span>
          {{ item.traits.map(o => o.display_name).join(', ') }}
          :
        </template>
        {{ item.description }}
      </p>
    </template>

  </div>
</template>

