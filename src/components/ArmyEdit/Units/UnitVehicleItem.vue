<script setup>
import {computed} from 'vue';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';
import {BButton} from 'bootstrap-vue-next';
import VehicleWeaponToolTip from '../../UI/VehicleWeaponToolTip.vue';

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
const weaponChoices = computed(() => unitStore.getUnitAttachmentAvailableWeaponChoicesInfo(supportAssetAttachmentId, supportAssetVehicleAttachmentId));
const requiredWeapons = computed(() => unitStore.getUnitVehicleAttachmentRequiredWeaponsInfo(supportAssetAttachmentId, supportAssetVehicleAttachmentId));

function setWeaponChoice(choiceId, weaponId) {
  unitStore.setUnitVehicleWeaponChoice(supportAssetAttachmentId, supportAssetVehicleAttachmentId, choiceId, weaponId);
}
</script>
<template>
  <tr class="tr-btn">
    <td class="text-nowrap">
      {{ unitInfo.display_name }}
    </td>
    <td class="text-end">
      <template v-if="unitInfo.move">
        {{ unitInfo.move }}"
      </template>
      <template v-else>
        -
      </template>
    </td>
    <td class="text-end">
      <template v-if="unitInfo.jump">
      {{ unitInfo.jump }}"
      </template>
      <template v-else>
        -
      </template>
    </td>
    <td class="text-end">
      {{ unitInfo.armor }}
    </td>
    <td class="text-end">
      {{ unitInfo.structure }}
    </td>
    <td :class="{'table-btn-cell': weaponChoices.length}">
      <template v-if="requiredWeapons.length">

        <template v-for="(weapon, index) in requiredWeapons">
          <VehicleWeaponToolTip :weapon="weapon"/>
          <template v-if="index !== requiredWeapons.length - 1">, </template>
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
      <TraitList :traits="unitInfo.traits"/>
    </td>
    <td class="table-btn-cell">
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
