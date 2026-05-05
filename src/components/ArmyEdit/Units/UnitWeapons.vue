<script setup lang="ts">
import type { UnitWeaponInfo } from '../../../data/support-assets/_support-asset-types';
import FormatInches from '../../functional/format-inches.vue';
import TraitList from '../../UI/TraitList.vue';

const {
  weapons,
  damageSuffix = '',
  title,
} = defineProps<{
  weapons: UnitWeaponInfo[],
  title: string,
  damageSuffix?: string
}>();
</script>
<template>
    <thead>
    <tr>
      <th>
        {{ title }}
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
    <tbody class="table-group-divider">
    <tr
      v-for="item in weapons" :key="item.id"
    >
      <td class="text-nowrap">
        {{ item.display_name }}
      </td>
      <td class="text-end">
        <format-inches :value="item.range" />
      </td>
      <td class="text-end">
        <template v-if="item.damage">
          {{ item.damage }}{{ damageSuffix }}
        </template>
      </td>
      <td>
        <TraitList :traits="item.traits" />
      </td>
    </tr>
    </tbody>
</template>
