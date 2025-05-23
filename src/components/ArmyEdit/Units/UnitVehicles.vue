<script setup>
import {computed, provide} from 'vue';
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
const has_armor = computed(() => !!unit.value.vehicles.find((vehicle) => vehicle.armor));
const has_structure = computed(() => !!unit.value.vehicles.find((vehicle) => vehicle.structure));
const has_jump = computed(() => !!unit.value.vehicles.find((vehicle) => vehicle.jump));

provide('has_armor', has_armor);
provide('has_jump', has_jump);
provide('has_structure', has_structure);

</script>
<template>
  <table class="table table-striped">
    <thead>
    <tr>
      <th>
        {{ unit.unit_type.display_name }}
      </th>
      <th class="text-end">
        Move
      </th>
      <th class="text-end" v-if="has_jump">
        Jump
      </th>
      <th class="text-end" v-if="has_armor">
        Armor
      </th>
      <th class="text-end" v-if="has_structure">
        Structure
      </th>
      <th>
        Weapons
      </th>
      <th>
        Garrison
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
