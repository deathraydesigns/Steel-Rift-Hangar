<script setup lang="ts">
import { BButton, BFormSelect } from 'bootstrap-vue-next';
import { computed, inject } from 'vue';
import type { INFANTRY } from '../../../data/infantry-squads';
import { SUPPORT_ASSET_UNITS } from '../../../data/support-asset-units';
import { SUPPORT_ASSET_UNIT } from '../../../data/support-assets/_support-asset-types';
import type { UNIT_WEAPON } from '../../../data/unit-weapons';
import { useSupportAssetUnitsStore } from '../../../store/support-asset-units-store';
import FormatInches from '../../functional/format-inches.vue';
import TraitList from '../../UI/TraitList.vue';
import VehicleWeaponToolTip from '../../UI/VehicleWeaponToolTip.vue';

const { supportAssetAttachmentId, supportAssetVehicleAttachmentId } = defineProps<{
  supportAssetAttachmentId: number,
  supportAssetVehicleAttachmentId: number,
}>();

const unitStore = useSupportAssetUnitsStore();
const vehicleAttachment = computed(() => unitStore.getUnitVehicleAttachment(supportAssetAttachmentId, supportAssetVehicleAttachmentId)!);
const unitInfo = computed(() => unitStore.getUnitAttachmentInfo(supportAssetAttachmentId)!);

const vehicleInfo = computed(() => unitStore.getUnitAttachmentVehicleInfo(supportAssetAttachmentId, supportAssetVehicleAttachmentId)!);
const weaponChoices = computed(() => unitStore.getUnitVehicleAttachmentAvailableWeaponChoicesInfo(supportAssetAttachmentId, supportAssetVehicleAttachmentId));
const requiredWeapons = computed(() => unitStore.getUnitVehicleAttachmentRequiredWeaponsInfo(supportAssetAttachmentId, supportAssetVehicleAttachmentId));
const garrisonUnitChoices = computed(() => unitStore.getUnitVehicleAttachmentAvailableGarrisonChoicesInfo(supportAssetAttachmentId, supportAssetVehicleAttachmentId));
const garrisonUnitsMax = computed(() => unitStore.getUnitVehicleAttachmentGarrisonMax(supportAssetAttachmentId, supportAssetVehicleAttachmentId));

const canDuplicate = computed(() => {
  const vehicleId = vehicleAttachment.value.vehicle_id;
  const vehicles = unitStore.getAvailableVehiclesInfo(supportAssetAttachmentId);

  return vehicles.find((vehicle) => vehicle.id === vehicleId)!.valid;
});
const add_disabled = inject<boolean>('add_disabled');
const has_armor = inject<boolean>('has_armor');
const has_structure = inject('has_structure');
const has_jump = inject('has_jump');
const has_garrison = inject('has_garrison');

function setWeaponChoice(choiceId: string, weaponId: UNIT_WEAPON) {
  unitStore.setUnitVehicleWeaponChoice(supportAssetAttachmentId, supportAssetVehicleAttachmentId, choiceId, weaponId);
}

function setGarrisonChoice(index: number, squadId: INFANTRY) {
  unitStore.setUnitVehicleGarrisonChoice(supportAssetAttachmentId, supportAssetVehicleAttachmentId, index, squadId);
}

function addUlHev() {
  unitStore.addSupportAsset(SUPPORT_ASSET_UNIT.ULTRA_LIGHT_HEV_SQUADRON);
}
</script>
<template>
  <tr class="tr-btn">
    <td class="text-nowrap">
      {{ vehicleInfo.display_name }}
    </td>
    <td class="text-end">
      <format-inches :value="vehicleInfo.move" />
    </td>
    <td class="text-end" v-if="has_jump">
      <format-inches :value="vehicleInfo.jump" />
    </td>
    <td class="text-end" v-if="has_armor">
      {{ vehicleInfo.armor }}
    </td>
    <td class="text-end" v-if="has_structure">
      {{ vehicleInfo.structure }}
    </td>
    <th class="text-end" v-if="!!unitInfo.max_vehicle_tons">{{ vehicleInfo.tons }}</th>
    <td :class="{'table-btn-cell': weaponChoices.length}">
      <template v-if="requiredWeapons.length">

        <template v-for="(weapon, index) in requiredWeapons" :key="weapon.id">
          <VehicleWeaponToolTip :weapon="weapon" />
          <span v-if="index !== requiredWeapons.length - 1">, </span>
        </template>
      </template>
      <template v-if="weaponChoices.length">
        <span v-for="(item) in weaponChoices">
          <BFormSelect
            :options="item.weapons"
            value-field="id"
            text-field="display_name"
            :model-value="vehicleAttachment.weapon_choices![item.id]"
            @update:model-value="setWeaponChoice(item.id, $event)"
            size="sm"
            class="d-inline-block w-auto ms-1"
          />
        </span>
      </template>
    </td>
    <td v-if="has_garrison">
      <template v-if="vehicleInfo.garrison_ul_hev">
        <template v-if="!unitStore.hasUnitId(SUPPORT_ASSET_UNIT.ULTRA_LIGHT_HEV_SQUADRON)">
          <BButton
            size="sm"
            @click="addUlHev"
          >
            Add
            {{ SUPPORT_ASSET_UNITS[SUPPORT_ASSET_UNIT.ULTRA_LIGHT_HEV_SQUADRON].display_name }}
          </BButton>
        </template>
        <template v-else>
          {{ SUPPORT_ASSET_UNITS[SUPPORT_ASSET_UNIT.ULTRA_LIGHT_HEV_SQUADRON].display_name }}
          <br>
          (separate support asset)
        </template>
      </template>

      <template v-if="garrisonUnitChoices.length">
        <template v-for="(x, index) in Array(garrisonUnitsMax)">
          <BFormSelect
            :options="garrisonUnitChoices"
            value-field="id"
            text-field="display_name"
            :model-value="vehicleAttachment.garrison_units?.[index]"
            @update:model-value="setGarrisonChoice(index, $event)"
            size="sm"
            class="d-inline-block w-auto ms-1"
          />
        </template>
      </template>
    </td>
    <td>
      <TraitList :traits="vehicleInfo.traits" />
    </td>
    <td class="table-btn-cell text-nowrap">
      <BButton
        size="sm"
        class="ms-1"
        variant="secondary"
        :disabled="add_disabled || !canDuplicate"
        @click="unitStore.addVehicle(supportAssetAttachmentId, vehicleInfo.vehicle_id)"
      >
        <span class="material-symbols-outlined">content_copy</span>
      </BButton>
      <BButton
        size="sm"
        class="ms-1"
        variant="danger"
        @click="unitStore.removeVehicle(supportAssetAttachmentId, vehicleInfo.id)"
      >
        <span class="material-symbols-outlined">delete</span>
      </BButton>
    </td>
  </tr>
</template>
