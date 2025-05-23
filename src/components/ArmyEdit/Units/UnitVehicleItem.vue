<script setup>
import {computed, inject} from 'vue';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';
import {BButton, BFormSelect} from 'bootstrap-vue-next';
import TraitList from '../../UI/TraitList.vue';
import {ULTRA_LIGHT_HEV_SQUADRON} from '../../../data/support-assets/ultra-light-hev-squadron.js';
import {SUPPORT_ASSET_UNITS} from '../../../data/support-asset-units.js';
import VehicleWeaponToolTip from '../../UI/VehicleWeaponToolTip.vue';
import FormatInches from '../../functional/format-inches.vue';

const {supportAssetAttachmentId, supportAssetVehicleAttachmentId} = defineProps({
  supportAssetAttachmentId: {
    type: Number,
    required: true,
  },
  supportAssetVehicleAttachmentId: {
    type: Number,
    required: true,
  },
});

const unitStore = useSupportAssetUnitsStore();
const vehicleAttachment = computed(() => unitStore.getUnitVehicleAttachment(supportAssetAttachmentId, supportAssetVehicleAttachmentId));
const unitInfo = computed(() => unitStore.getUnitAttachmentVehicleInfo(supportAssetAttachmentId, supportAssetVehicleAttachmentId));
const weaponChoices = computed(() => unitStore.getUnitVehicleAttachmentAvailableWeaponChoicesInfo(supportAssetAttachmentId, supportAssetVehicleAttachmentId));
const requiredWeapons = computed(() => unitStore.getUnitVehicleAttachmentRequiredWeaponsInfo(supportAssetAttachmentId, supportAssetVehicleAttachmentId));
const garrisonUnitChoices = computed(() => unitStore.getUnitVehicleAttachmentAvailableGarrisonChoicesInfo(supportAssetAttachmentId, supportAssetVehicleAttachmentId));
const garrisonUnitsMax = computed(() => unitStore.getUnitVehicleAttachmentGarrisonMax(supportAssetAttachmentId, supportAssetVehicleAttachmentId));

const add_disabled = inject('add_disabled');
const has_armor = inject('has_armor');
const has_structure = inject('has_structure');
const has_jump = inject('has_jump');

function setWeaponChoice(choiceId, weaponId) {
  unitStore.setUnitVehicleWeaponChoice(supportAssetAttachmentId, supportAssetVehicleAttachmentId, choiceId, weaponId);
}

function setGarrisonChoice(index, squadId) {
  unitStore.setUnitVehicleGarrisonChoice(supportAssetAttachmentId, supportAssetVehicleAttachmentId, index, squadId);
}

function addUlHev() {
  unitStore.addSupportAsset(ULTRA_LIGHT_HEV_SQUADRON);
}
</script>
<template>
  <tr class="tr-btn">
    <td class="text-nowrap">
      {{ unitInfo.display_name }}
    </td>
    <td class="text-end">
      <format-inches :value="unitInfo.move"/>
    </td>
    <td class="text-end" v-if="has_jump">
      <format-inches :value="unitInfo.jump"/>
    </td>
    <td class="text-end" v-if="has_armor">
      {{ unitInfo.armor }}
    </td>
    <td class="text-end" v-if="has_structure">
      {{ unitInfo.structure }}
    </td>
    <td :class="{'table-btn-cell': weaponChoices.length}">
      <template v-if="requiredWeapons.length">

        <template v-for="(weapon, index) in requiredWeapons" :key="weapon.id">
          <VehicleWeaponToolTip :weapon="weapon"/>
          <span v-if="index !== requiredWeapons.length - 1">, </span>
        </template>
      </template>
      <template v-if="weaponChoices.length">
        <span v-for="(item) in weaponChoices">
          <BFormSelect
              :options="item.weapons"
              value-field="id"
              text-field="display_name"
              :model-value="vehicleAttachment.weapon_choices[item.id]"
              @update:model-value="setWeaponChoice(item.id, $event)"
              size="sm"
              class="d-inline-block w-auto ms-1"
          />
        </span>
      </template>
    </td>
    <td>
      <template v-if="unitInfo.garrison_ul_hev">

        <template v-if="!unitStore.hasUnitId(ULTRA_LIGHT_HEV_SQUADRON)">
          <BButton
              size="sm"
              @click="addUlHev"
          >
            Add
            {{ SUPPORT_ASSET_UNITS[ULTRA_LIGHT_HEV_SQUADRON].display_name }}
          </BButton>
        </template>
        <template v-else>
          {{ SUPPORT_ASSET_UNITS[ULTRA_LIGHT_HEV_SQUADRON].display_name }}
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
              :model-value="vehicleAttachment.garrison_units[index]"
              @update:model-value="setGarrisonChoice(index, $event)"
              size="sm"
              class="d-inline-block w-auto ms-1"
          />
        </template>
      </template>
    </td>
    <td>
      <TraitList :traits="unitInfo.traits"/>
    </td>
    <td class="table-btn-cell text-nowrap">
      <BButton
          size="sm"
          class="ms-1"
          variant="primary"
          :disabled="add_disabled"
          @click="unitStore.addVehicle(supportAssetAttachmentId, unitInfo.vehicle_id)"
      >
        <span class="material-symbols-outlined">content_copy</span>
      </BButton>
      <BButton
          size="sm"
          class="ms-1"
          variant="danger"
          @click="unitStore.removeVehicle(supportAssetAttachmentId, unitInfo.id)"
      >
        <span class="material-symbols-outlined">delete</span>
      </BButton>
    </td>
  </tr>
</template>
