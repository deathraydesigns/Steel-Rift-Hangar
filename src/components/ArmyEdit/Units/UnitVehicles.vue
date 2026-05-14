<script setup lang="ts">
import { computed, provide } from 'vue';
import { useSupportAssetUnitsStore } from '../../../store/support-asset-units-store';
import UnitVehicleItem from './UnitVehicleItem.vue';

const { supportAssetAttachmentId } = defineProps<{ supportAssetAttachmentId: number }>();

const unitStore = useSupportAssetUnitsStore();
const unit = computed(() => unitStore.getUnitAttachmentInfo(supportAssetAttachmentId)!);
const has_armor = computed(() => !!unit.value.vehicles.find((vehicle) => vehicle.armor));
const has_structure = computed(() => !!unit.value.vehicles.find((vehicle) => vehicle.structure));
const has_jump = computed(() => !!unit.value.vehicles.find((vehicle) => vehicle.jump));
const has_garrison = computed(() => unitStore.getUnitHasGarrisonableVehicles(unit.value.support_asset_unit_id));

provide('has_armor', has_armor);
provide('has_jump', has_jump);
provide('has_structure', has_structure);
provide('has_garrison', has_garrison);

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
      <th class="text-end" v-if="!!unit.max_vehicle_tons">Tons</th>
      <th>
        Weapons
      </th>
      <th v-if="has_garrison">
        Garrison
      </th>
      <th>
        Traits
      </th>
    </tr>
    </thead>
    <tbody class="table-group-divider">
    <UnitVehicleItem
      v-for="item in unit.vehicles" :key="item.id"
      :support-asset-attachment-id="supportAssetAttachmentId"
      :support-asset-vehicle-attachment-id="item.id"
    />
    </tbody>
  </table>
</template>
