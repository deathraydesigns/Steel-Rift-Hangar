<script setup>
import {computed} from 'vue';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';
import TraitList from '../../UI/TraitList.vue';
import UnitWeaponToolTip from '../../UI/VehicleWeaponToolTip.vue';
import {formatInches} from '../../functional/format-range.js';

const {supportAssetAttachmentId} = defineProps({
  supportAssetAttachmentId: {
    type: Number,
    required: true,
  },
});

const unitStore = useSupportAssetUnitsStore();
const garrisonUnitChoices = computed(() => unitStore.getUnitAttachmentAllGarrisonChoicesInfo(supportAssetAttachmentId));

</script>
<template>
  <table class="table table-striped">
    <thead>
    <tr>
      <th>
        Garrison Unit Reference
      </th>
      <th class="text-end">
        Move
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
    <tr v-for="unitInfo in garrisonUnitChoices" :key="unitInfo.id">
      <td class="text-nowrap">
        {{ unitInfo.display_name }}
      </td>
      <td class="text-end">
        {{ formatInches(unitInfo.move) }}
      </td>
      <td class="text-end">
        {{ unitInfo.armor }}
      </td>
      <td class="text-end">
        {{ unitInfo.structure }}
      </td>
      <td :class="{'table-btn-cell': unitInfo.weapons.length}">
        <template v-if="unitInfo.weapons.length">
          <template v-for="(weapon, index) in unitInfo.weapons" :key="weapon.id">
            <UnitWeaponToolTip :weapon="weapon"/>
            <span v-if="index !== unitInfo.weapons.length - 1">, </span>
          </template>
        </template>
      </td>
      <td>
        <TraitList :traits="unitInfo.traits"/>
      </td>
    </tr>
    </tbody>
  </table>
</template>
