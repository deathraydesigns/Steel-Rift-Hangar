<script setup>
import {computed} from 'vue';
import CardHeader from './CardParts/CardHeader.vue';
import UnitCardVehicles from './SupportAssetUnitCard/UnitCardVehicles.vue';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';

const store = useSupportAssetUnitsStore();

const {unitAttachmentId} = defineProps({
  unitAttachmentId: {
    type: Number,
    required: true,
  },
});

const info = computed(() => store.getUnitAttachmentInfo(unitAttachmentId));
</script>
<template>
  <div class="game-card">
    <div class="card-content-container">

      <CardHeader :title="info.display_name"/>

      <UnitCardVehicles :unit-attachment-id="unitAttachmentId"/>
      <UnitCardWeapons :unit-attachment-id="unitAttachmentId"/>

      <CardFooter/>
    </div>
  </div>
</template>