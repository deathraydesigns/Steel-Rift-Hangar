<script setup>
import {computed} from 'vue';
import {useMechStore} from '../../../store/mech-store.js';
import {MECH_UPGRADES} from '../../../data/mech-upgrades.js';
import {sortBy} from 'lodash';

const mechStore = useMechStore();

const upgrades = computed(() => {
  const result = mechStore.getUsedUpgradeIds.map(upgradeId => {
    return {
      display_name: MECH_UPGRADES[upgradeId].display_name,
      description: MECH_UPGRADES[upgradeId].description,
    };
  });
  return sortBy(result, 'display_name');
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
        {{ item.description }}</p>
    </template>

  </div>
</template>

