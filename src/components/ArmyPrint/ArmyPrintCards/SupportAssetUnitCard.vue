<script setup>
import {computed} from 'vue';
import CardHeader from './CardParts/CardHeader.vue';
import UnitCardVehicles from './SupportAssetUnitCard/UnitCardVehicles.vue';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';
import UnitCardWeapons from './SupportAssetUnitCard/UnitCardWeapons.vue';
import CardFooter from './CardParts/CardFooter.vue';
import UnitCardGarrisonInfantry from './SupportAssetUnitCard/UnitCardGarrisonInfantry.vue';
import UnitCardTraits from './SupportAssetUnitCard/UnitCardTraits.vue';

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
const infantryTraits = computed(() => store.getUnitAttachmentGarrisonUnitTraitsCardInfo(unitAttachmentId));
const hasGarrison = computed(() => !!store.getUnitAttachmentGarrisonUnitCardInfo(unitAttachmentId).length);

</script>
<template>
  <div
      :class="{
        'game-card': true,
        'card-support-asset-size-1': !hasGarrison,
        'card-support-asset-size-2': hasGarrison
      }"
  >
    <div class="card-content-container">

      <CardHeader
          :title="info.display_name"
          :sub-title="`(Support Asset ${info.cost} Tons)`"
      />

      <template v-if="hasGarrison">
        <div class="row g-2">
          <div class="col-6">
            <UnitCardVehicles :unit-attachment-id="unitAttachmentId"/>
            <div class="row g-1">
              <div class="col-6 mt-0">
                <UnitCardWeapons :weapons="vehicleWeapons"/>
              </div>
              <div class="col-6 mt-0">
                <UnitCardTraits :traits="info.traits"/>
              </div>
            </div>
          </div>
          <div class="col-6">
            <UnitCardGarrisonInfantry :unit-attachment-id="unitAttachmentId"/>
            <div class="row g-1">
              <div class="col-6 mt-0">
                <UnitCardWeapons :weapons="infantryWeapons" damage-suffix=" x (X)"/>
              </div>
              <div class="col-6 mt-0">
                <UnitCardTraits :traits="infantryTraits"/>
              </div>
            </div>
          </div>
        </div>

      </template>
      <template v-else>
        <UnitCardVehicles :unit-attachment-id="unitAttachmentId"/>
        <div class="row g-1">
          <div class="col-6 mt-0">
            <UnitCardWeapons :weapons="vehicleWeapons"/>
          </div>
          <div class="col-6 mt-0">
            <UnitCardTraits :traits="info.traits"/>
          </div>
        </div>
      </template>
      <CardFooter/>
    </div>
  </div>
</template>