<script setup>
import {computed} from 'vue';
import {BLO_EX_MILITARY_VETERANS, FACTION_PERKS} from '../../../data/faction-perks.js';
import {useFactionStore} from '../../../store/faction-store.js';
import {storeToRefs} from 'pinia';
import CardHeader from './CardParts/CardHeader.vue';
import CardFooter from './CardParts/CardFooter.vue';
import {AUTHORITIES, FACTIONS, MILITARY_TRAINING} from '../../../data/factions.js';

const {faction_display_name} = storeToRefs(useFactionStore());

const {perkId} = defineProps({
  perkId: {
    type: String,
    required: true,
  },
});

const info = computed(() => FACTION_PERKS[perkId]);

const militaryTrainingPerks = computed(() => {
  const perkIds = FACTIONS[AUTHORITIES].faction_perk_groups[MILITARY_TRAINING].perk_ids;
  return perkIds.map(perkId => {
    return FACTION_PERKS[perkId];
  });
});
</script>
<template>
  <div class="game-card">
    <div class="card-content-container">
      <CardHeader :title="'Faction Perk: ' + faction_display_name"/>

      <div class="fw-bold section-heading">{{ info.display_name }}</div>
      <div class="card-description">
        {{ info.description }}
        <span v-if="info.calculated_on_cards">
          This has already been calculated on generated unit cards.
        </span>
      </div>

      <template v-if="perkId === BLO_EX_MILITARY_VETERANS">
        <div v-for="perk in militaryTrainingPerks">

          <div class="card-description">
            <div class="small">
              <strong>
                {{ perk.display_name }}
              </strong>
              <span class="fw-medium">
                (Military Training)
              </span>
            </div>

            <div class="small">
              {{ perk.description }}
            </div>
          </div>
        </div>
      </template>

      <CardFooter/>
    </div>
  </div>
</template>