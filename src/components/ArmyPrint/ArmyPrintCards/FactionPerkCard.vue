<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { FACTION_PERK, FACTION_PERKS } from '../../../data/faction-perks.js';
import { FACTION, FACTION_PERK_GROUP, FACTIONS } from '../../../data/factions.js';
import { useFactionStore } from '../../../store/faction-store';
import CardFooter from './CardParts/CardFooter.vue';
import CardHeader from './CardParts/CardHeader.vue';

const { faction_display_name } = storeToRefs(useFactionStore());

const { perkId } = defineProps<{
  perkId: FACTION_PERK;
}>();

const info = computed(() => FACTION_PERKS[perkId]);

const militaryTrainingPerks = computed(() => {
  const perkIds = FACTIONS[FACTION.AUTHORITIES].faction_perk_groups[FACTION_PERK_GROUP.MILITARY_TRAINING]!.perk_ids;
  return perkIds.map(perkId => {
    return FACTION_PERKS[perkId];
  });
});
</script>
<template>
  <div class="game-card">
    <div class="card-content-container">
      <CardHeader :title="'Faction Perk: ' + faction_display_name" />

      <div class="section-heading">{{ info.display_name }}</div>
      <div class="card-description">
        {{ info.description }}
        <span v-if="info.calculated_on_cards">
          This has already been calculated on generated unit cards.
        </span>
      </div>

      <template v-if="perkId === FACTION_PERK.BLO_EX_MILITARY_VETERANS">
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

      <CardFooter />
    </div>
  </div>
</template>