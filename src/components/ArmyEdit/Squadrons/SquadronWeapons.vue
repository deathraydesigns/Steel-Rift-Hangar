<script setup>
import {computed} from 'vue';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';

const {supportAssetAttachmentId} = defineProps({
  supportAssetAttachmentId: {
    type: Number,
    required: true,
  },
});

const unitStore = useSupportAssetUnitsStore();
const weapons = computed(() => unitStore.getUnitAllWeaponsInfo(supportAssetAttachmentId));

</script>
<template>
  <table class="table table-striped">
    <thead>
    <tr>
      <th>
        Vehicle Weapons
      </th>
      <th class="text-end">
        Rng
      </th>
      <th class="text-end">
        Damage
      </th>
      <th>
        Traits
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item in weapons" :key="item.id"
    >
      <td class="text-nowrap">
        {{ item.display_name }}
      </td>
      <td class="text-end">
        <template v-if="item.range">
          {{ item.range }}"
        </template>
        <template v-else>
          -
        </template>
      </td>
      <td class="text-end">
        <template v-if="item.damage">
          {{ item.damage }} x (X)
        </template>
      </td>
      <td>
        <TraitList :traits="item.traits"/>
      </td>
    </tr>
    </tbody>
  </table>
</template>
