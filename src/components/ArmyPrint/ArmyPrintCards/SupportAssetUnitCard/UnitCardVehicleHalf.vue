<script setup lang="ts">
import { computed } from 'vue';
import type { Order } from '../../../../data/orders';
import type { UnitWeaponInfo } from '../../../../data/support-assets/_support-asset-types';
import { useSupportAssetUnitsStore } from '../../../../store/support-asset-units-store';
import type { Trait } from '../../../../types';
import UnitCardTraits from './UnitCardTraits.vue';
import UnitCardVehicles from './UnitCardVehicles.vue';
import UnitCardWeapons from './UnitCardWeapons.vue';

const unitStore = useSupportAssetUnitsStore();

const { unitAttachmentId } = defineProps<{
  unitAttachmentId: number,
  weapons: UnitWeaponInfo[],
  traits: Trait[],
  orders: Order[]
}>();

const damageSuffix = computed(() => {
  if (unitStore.isSquadron(unitAttachmentId)) {
    return ` x (X)`;
  }
});


</script>
<template>
  <UnitCardVehicles :unit-attachment-id="unitAttachmentId" />
  <div class="row g-1">
    <div class="col-6 mt-0">
      <UnitCardWeapons :weapons="weapons" :damage-suffix="damageSuffix" />
    </div>
    <div class="col-6 mt-0">
      <UnitCardTraits
        :traits="traits"
        :orders="orders"
      />
    </div>
  </div>
</template>