<script setup>
import {useSupportAssetUnitsStore} from '../../../../store/support-asset-units-store.js';
import {computed} from 'vue';
import {unitTraitDisplayName} from '../../../../data/unit-traits.js';

const {unitAttachmentId} = defineProps({
  unitAttachmentId: {
    type: Number,
    required: true,
  },
});

const unitStore = useSupportAssetUnitsStore();
const unit = computed(() => unitStore.getUnitAttachmentInfo(unitAttachmentId));
</script>
<template>
  <table class="table-stats">
    <thead>
    <tr>
      <th>
        Type
      </th>
      <th class="text-end">
        Mov
      </th>
      <th class="text-end">
        Arm
      </th>
      <th class="text-end">
        Str
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
    <tr
        v-for="item in unit.vehicles" :key="item.id"
    >
      <td class="small">
        {{ item.display_name }}
      </td>
      <td class="text-end">
        {{ item.move }}"
      </td>
      <td class="text-end">
        {{ item.armor }}
      </td>
      <td class="text-end">
        {{ item.structure }}
      </td>
      <td class="text-start small">
        <template v-if="item.weapons">
          {{ item.weapons.map(w => w.display_name).join(', ') }}
        </template>
      </td>
      <td class="text-start small">
        {{ item.traits.map(t => unitTraitDisplayName(t)).join(', ') }}
      </td>
    </tr>
    </tbody>
  </table>
</template>