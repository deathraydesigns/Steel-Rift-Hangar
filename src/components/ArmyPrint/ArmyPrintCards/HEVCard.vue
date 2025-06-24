<script setup>

import {useMechStore} from '../../../store/mech-store.js';
import {computed, provide} from 'vue';
import HEVCardWeapons from './HEVCard/HEVCardWeapons.vue';
import HEVCardUpgrades from './HEVCard/HEVCardUpgrades.vue';
import HEVCardStats from './HEVCard/HEVCardStats.vue';
import HEVCardHp from './HEVCard/HEVCardHp.vue';
import CardHeader from './CardParts/CardHeader.vue';
import CardFooter from './CardParts/CardFooter.vue';

const {mechId, storePrefix} = defineProps({
  mechId: {
    type: Number,
    required: true,
  },
  storePrefix: {
    type: String,
  },
});

provide('store-prefix', storePrefix);
const mechStore = useMechStore(storePrefix);

const info = computed(() => mechStore.getMechInfo(mechId));

</script>
<template>
  <div class="game-card">
    <div class="card-content-container">

      <CardHeader :title="info.display_name"/>
      <HEVCardStats :mech-id="mechId"/>
      <HEVCardHp :mech-id="mechId"/>
      <HEVCardWeapons :mech-id="mechId"/>
      <HEVCardUpgrades :mech-id="mechId"/>

      <CardFooter/>
    </div>
  </div>
</template>