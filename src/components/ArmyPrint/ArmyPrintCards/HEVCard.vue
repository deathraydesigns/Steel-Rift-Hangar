<script setup lang="ts">
import { setComponentScope } from 'pinia-scope';
import { computed } from 'vue';
import { useMechStore } from '../../../store/mech-store';
import CardFooter from './CardParts/CardFooter.vue';
import CardHeader from './CardParts/CardHeader.vue';
import HEVCardHp from './HEVCard/HEVCardHp.vue';
import HEVCardStats from './HEVCard/HEVCardStats.vue';
import HEVCardUpgrades from './HEVCard/HEVCardUpgrades.vue';
import HEVCardWeapons from './HEVCard/HEVCardWeapons.vue';

const { mechId, storeScope = '' } = defineProps<{
  mechId: number,
  storeScope?: string
}>();

setComponentScope(storeScope);
const mechStore = useMechStore(storeScope);

const info = computed(() => mechStore.getMechInfo(mechId)!);

</script>
<template>
  <div class="game-card">
    <div class="card-content-container">

      <CardHeader :title="info.display_name" />
      <HEVCardStats :mech-id="mechId" />
      <HEVCardHp :mech-id="mechId" />
      <HEVCardWeapons :mech-id="mechId" />
      <HEVCardUpgrades :mech-id="mechId" />

      <CardFooter />
    </div>
  </div>
</template>