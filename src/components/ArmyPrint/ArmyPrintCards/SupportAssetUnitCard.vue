<script setup>
import {computed} from 'vue';
import CardHeader from './CardParts/CardHeader.vue';
import UnitCardVehicles from './SupportAssetUnitCard/UnitCardVehicles.vue';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';
import UnitCardWeapons from './SupportAssetUnitCard/UnitCardWeapons.vue';
import CardFooter from './CardParts/CardFooter.vue';

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
  <div class="game-card card-support-asset-unit">
    <div class="card-content-container">

      <CardHeader :title="info.display_name"/>

      <div class="card-description small ps-2 m-0">
        Unit Size: {{ info.size.display_name }}
      </div>

      <UnitCardVehicles :unit-attachment-id="unitAttachmentId"/>
      <UnitCardWeapons :unit-attachment-id="unitAttachmentId"/>

      <CardFooter/>
    </div>
  </div>
</template>