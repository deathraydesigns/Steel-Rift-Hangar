<script setup>
import {TRAIT_LIMITED, TRAIT_SHORT} from '../../../../data/weapon-traits.js';
import {sortBy} from 'es-toolkit';
import {computed} from 'vue';
import FormatInches from '../../../functional/format-inches.vue';

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
      <td class="text-start">
        {{ weapon.display_name }}
      </td>
      <td class="text-end text-nowrap">
        <template v-if="weapon.base_melee_damage">
          <span class="fw-light">
            {{ weapon.base_melee_damage }} + {{ weapon.melee_trait_damage }} =
          </span>
          {{ weapon.total_damage }}
        </template>
        <template v-else>
          {{ weapon.damage }}{{ damageSuffix }}
        </template>
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