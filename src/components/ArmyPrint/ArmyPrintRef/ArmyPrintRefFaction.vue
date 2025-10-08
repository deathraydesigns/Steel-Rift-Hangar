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
      <template v-if="perk.optional_perks?.length">
        <strong>Select 1 of the following Military Training Perks before deployment:</strong>
        <ul class="optional-perks">
          <li v-for="perk2 in perk.optional_perks">
            <p class="p-gap">
              <span class="fw-bold">{{ perk2.display_name }}:z
              </span>
              {{ perk2.description }}
            </p>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

