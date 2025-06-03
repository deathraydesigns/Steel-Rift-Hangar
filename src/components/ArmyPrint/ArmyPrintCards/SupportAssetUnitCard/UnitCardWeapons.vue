<script setup>
import {TRAIT_LIMITED, TRAIT_SHORT} from '../../../../data/weapon-traits.js';
import {sortBy} from 'es-toolkit';
import {computed} from 'vue';
import FormatInches from '../../../functional/format-inches.vue';
import DamageFormatter from '../../../UI/DamageFormatter.vue';

const {weapons, damageSuffix} = defineProps({
  weapons: {
    type: Array,
    require: true,
  },
  damageSuffix: {
    type: String,
    default: '',
  },
});

function filterTraits(traits) {
  return traits.filter((trait) => trait.id !== TRAIT_LIMITED && trait.id !== TRAIT_SHORT);
}

const sortedWeapons = computed(() => sortBy(weapons, 'display_name').reverse());

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
        <format-inches :value="weapon.range"/>
      </td>
      <td class="text-start">
        <div v-for="(trait, index) in filterTraits(weapon.traits)">
          {{ trait.display_name }}<span v-if="index !== filterTraits(weapon.traits).length - 1">, </span>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>