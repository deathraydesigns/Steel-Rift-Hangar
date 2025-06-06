<script setup>
import {computed} from 'vue';
import CardHeader from './CardParts/CardHeader.vue';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';
import UnitCardWeapons from './SupportAssetUnitCard/UnitCardWeapons.vue';
import CardFooter from './CardParts/CardFooter.vue';
import UnitCardGarrisonInfantry from './SupportAssetUnitCard/UnitCardGarrisonInfantry.vue';
import UnitCardTraits from './SupportAssetUnitCard/UnitCardTraits.vue';
import UnitCardVehicleHalf from './SupportAssetUnitCard/UnitCardVehicleHalf.vue';
import {ORDER_SUPPORT} from '../../../data/orders/support-orders.js';

const store = useSupportAssetUnitsStore();

const {unitAttachmentId} = defineProps({
  unitAttachmentId: {
    type: Number,
    required: true,
  },
});

const info = computed(() => store.getUnitAttachmentInfo(unitAttachmentId));
const vehicleWeapons = computed(() => store.getUnitAttachmentVehicleWeaponsCardInfo(unitAttachmentId));
const vehicleOrders = computed(() => {
  const orders = store.getUnitAttachmentGrantedOrdersCollection(unitAttachmentId);

  orders.remove(ORDER_SUPPORT);

  return orders.all();
});
const infantryWeapons = computed(() => store.getUnitAttachmentVehicleGarrisonWeaponsCardInfo(unitAttachmentId));
const infantryTraits = computed(() => store.getUnitAttachmentGarrisonUnitTraitsCardInfo(unitAttachmentId));
const hasGarrison = computed(() => !!store.getUnitAttachmentGarrisonUnitsInfo(unitAttachmentId).length);
const infantryOrders = computed(() => store.getUnitAttachmentGarrisonGrantedOrdersCollection(unitAttachmentId).all())
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
            <UnitCardVehicleHalf
                :unit-attachment-id="unitAttachmentId"
                :weapons="vehicleWeapons"
                :traits="info.traits"
                :orders="vehicleOrders"
            />
          </div>
          <div class="col-6">
            <UnitCardGarrisonInfantry :unit-attachment-id="unitAttachmentId"/>
            <div class="row g-1">
              <div class="col-6 mt-0">
                <UnitCardWeapons :weapons="infantryWeapons" damage-suffix=" x (X)"/>
              </div>
              <div class="col-6 mt-0">
                <UnitCardTraits
                    :traits="infantryTraits"
                    :orders="infantryOrders"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <UnitCardVehicleHalf
            :unit-attachment-id="unitAttachmentId"
            :weapons="vehicleWeapons"
            :traits="info.traits"
            :orders="vehicleOrders"
        />
      </template>
      <CardFooter/>
    </div>
  </div>
</template>