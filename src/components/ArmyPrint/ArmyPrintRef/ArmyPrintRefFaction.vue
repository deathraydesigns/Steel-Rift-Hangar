<script setup>
import {computed} from 'vue';
import {useFactionStore} from '../../../store/faction-store.js';

const factionStore = useFactionStore();

const perks = computed(() => {
  const perks = [];

  if (factionStore.perk_1_info) {
    perks.push(factionStore.perk_1_info);
  }

  if (factionStore.perk_2_info) {
    perks.push(factionStore.perk_2_info);
  }

  return perks;
});
</script>
<template>
  <div v-if="factionStore.faction_id">
    <div class="divider"></div>
    <div class="ref-heading">Faction Perks: {{ factionStore.faction_display_name }}</div>
    <div v-for="perk in perks">
      <p class="p-gap">
        <span class="fw-bold">
          {{ perk.display_name }}:
        </span>
        {{ perk.description }}
        <template v-if="perk.calculated_on_cards">
          This has already been calculated on generated unit cards.
        </template>
      </p>
    </div>
  </div>
</template>

