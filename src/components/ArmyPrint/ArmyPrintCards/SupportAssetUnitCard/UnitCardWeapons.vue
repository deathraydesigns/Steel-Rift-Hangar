<script setup lang="ts">
import { sortBy } from 'es-toolkit';
import { computed } from 'vue';
import { WEAPON_TRAIT } from '../../../../data/weapon-traits.js';
import type { TraitInfo } from '../../../../types';
import FormatInches from '../../../functional/format-inches.vue';
import DamageFormatter from '../../../UI/DamageFormatter.vue';

type BasicWeaponInfo = {
  display_name: string,
  damage: number | null,
  range: number | null,
  melee_base_damage?: number | null,
  melee_trait_damage?: number,
  melee_total_damage?: number,
  traits: TraitInfo<WEAPON_TRAIT>[],
}

const { weapons, damageSuffix = '' } = defineProps<{
  weapons: BasicWeaponInfo[],
  damageSuffix?: string,
}>();

function filterTraits(traits: TraitInfo<WEAPON_TRAIT>[]) {
  return traits.filter((trait) => trait.id !== WEAPON_TRAIT.LIMITED && trait.id !== WEAPON_TRAIT.SHORT);
}

const sortedWeapons = computed(() => sortBy<BasicWeaponInfo>(weapons, ['display_name']).reverse());

</script>
<template>
  <table v-if="weapons.length" class="table-stats">
    <thead>
    <tr>
      <th class="text-start">Weapons</th>
      <th class="text-end">Dmg</th>
      <th class="text-end">Rng</th>
      <th class="text-start">Traits</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="weapon in sortedWeapons">
      <td class="text-start small">
        {{ weapon.display_name }}
      </td>
      <td class="text-end text-nowrap">
        <DamageFormatter
          :damage="weapon.damage"
          :melee-base-damage="weapon.melee_base_damage"
          :melee-modifier-damage="weapon.melee_trait_damage"
          :melee-total-damage="weapon.melee_total_damage"
          :suffix="damageSuffix"
        />
      </td>
      <td class="text-end">
        <format-inches :value="weapon.range" />
      </td>
      <td class="text-start small">
        <div v-for="(trait, index) in filterTraits(weapon.traits)">
          {{ trait.display_name }}<span v-if="index !== filterTraits(weapon.traits).length - 1">, </span>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>