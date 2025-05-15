<script setup>
import {computed} from 'vue';
import {FACTION_PERKS} from '../../../data/faction-perks.js';
import {useFactionStore} from '../../../store/faction-store.js';
import {storeToRefs} from 'pinia';
import CardHeader from './CardParts/CardHeader.vue';
import CardFooter from './CardParts/CardFooter.vue';

const {faction_display_name} = storeToRefs(useFactionStore());

const {perkId} = defineProps({
  perkId: {
    type: String,
    required: true,
  },
});

const info = computed(() => FACTION_PERKS[perkId]);

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

      <CardFooter/>
    </div>
  </div>
</template>