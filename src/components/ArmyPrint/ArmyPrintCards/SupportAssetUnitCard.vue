<script setup>
import {computed} from 'vue';
import CardHeader from './CardParts/CardHeader.vue';
import UnitCardVehicles from './SupportAssetUnitCard/UnitCardVehicles.vue';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';
import UnitCardWeapons from './SupportAssetUnitCard/UnitCardWeapons.vue';
import CardFooter from './CardParts/CardFooter.vue';
import UnitCardGarrisonInfantry from './SupportAssetUnitCard/UnitCardGarrisonInfantry.vue';

const store = useSupportAssetUnitsStore();

const {unitAttachmentId} = defineProps({
  unitAttachmentId: {
    type: Number,
    required: true,
  },
});

const info = computed(() => store.getUnitAttachmentInfo(unitAttachmentId));
const vehicleWeapons = computed(() => store.getUnitAttachmentVehicleWeaponsCardInfo(unitAttachmentId));
const infantryWeapons = computed(() => store.getUnitAttachmentVehicleGarrisonWeaponsCardInfo(unitAttachmentId));

</script>
<template>
  <div class="game-card card-support-asset-unit">
    <div class="card-content-container">

      <CardHeader :title="info.display_name"/>



      <div class="row g-2">
        <div class="col-6">
          <UnitCardVehicles :unit-attachment-id="unitAttachmentId"/>
          <UnitCardWeapons :weapons="vehicleWeapons" label="Vehicle"/>
        </div>
        <div class="col-6">

          <UnitCardGarrisonInfantry :unit-attachment-id="unitAttachmentId"/>
          <UnitCardWeapons :weapons="infantryWeapons" label="Infantry" damage-suffix=" x (X)"/>
        </div>
      </div>

      <CardFooter/>
    </div>
  </div>
</template>