<script setup>
import {computed} from 'vue';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';
import UnitVehicleItem from './UnitVehicleItem.vue';

const {supportAssetAttachmentId} = defineProps({
  supportAssetAttachmentId: {
    type: Number,
    required: true,
  },
});

const unitStore = useSupportAssetUnitsStore();
const unit = computed(() => unitStore.getUnitAttachmentInfo(supportAssetAttachmentId));

</script>
<template>
  <table class="table table-striped">
    <thead>
    <tr>
      <th>
        Vehicles
      </th>
      <th class="text-end">
        Move
      </th>
      <th class="text-end">
        Jump
      </th>
      <th class="text-end">
        Armor
      </th>
      <th class="text-end">
        Structure
      </th>
      <th>
        Weapons
      </th>
      <th>
        Traits
      </th>
    </tr>
    </thead>
    <tbody>
    <UnitVehicleItem
        v-for="item in unit.vehicles" :key="item.id"
        :support-asset-attachment-id="supportAssetAttachmentId"
        :support-asset-vehicle-attachment-id="item.id"
    />
    </tbody>
  </table>
</template>
