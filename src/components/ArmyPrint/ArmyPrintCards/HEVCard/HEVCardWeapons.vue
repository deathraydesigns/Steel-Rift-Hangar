<script setup>
import {computed} from 'vue';
import {useMechStore} from '../../../../store/mech-store.js';
import {TRAIT_LIMITED, TRAIT_MELEE, TRAIT_SHORT} from '../../../../data/weapon-traits.js';
import {MINEFIELD_DRONE_CARRIER_SYSTEM} from '../../../../data/mech-upgrades.js';
import {TRAIT_UPGRADE_LIMITED} from '../../../../data/upgrade-traits.js';
import {find} from 'es-toolkit/compat';
import FormatInches from '../../../functional/format-inches.vue';

const mechStore = useMechStore();
const {mechId} = defineProps({
  mechId: {
    type: Number,
  },
});
const weapons = computed(() => {
  let {size} = mechStore.getMechInfo(mechId);
  let results = mechStore.getMechWeaponsAttachmentInfo(mechId);
  let mineDroneUpgrade = find(mechStore.getMechUpgradesAttachmentInfo(mechId), {upgrade_id: MINEFIELD_DRONE_CARRIER_SYSTEM});

  if (mineDroneUpgrade) {
    mineDroneUpgrade.display_name = 'Mine Drones';
    mineDroneUpgrade.traits = mineDroneUpgrade.traits.filter(trait => trait.id !== TRAIT_UPGRADE_LIMITED);
    results.push(mineDroneUpgrade);
  }

  return results.map(weapon => {
    const melee = find(weapon.traits, {id: TRAIT_MELEE});

    if (melee) {

      const base_melee_damage = size.smash_damage + 1;
      const melee_trait_damage = melee.number;
      return Object.assign({}, weapon, {
        base_melee_damage,
        melee_trait_damage,
        total_damage: base_melee_damage + melee_trait_damage,
      });
    }

    return weapon;
  });
});

const hasUses = computed(() => weapons.value.find(weapon => !!weapon.max_uses));

function filterTraits(traits) {
  return traits.filter((trait) => trait.id !== TRAIT_LIMITED && trait.id !== TRAIT_SHORT);
}
</script>
<template>
  <table class="table-stats">
    <thead>
    <tr>
      <th>Weapon</th>
      <th class="text-start" v-if="hasUses">Ltd</th>
      <th>Dmg</th>
      <th>Rng</th>
      <th class="text-start">Traits</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="weapon in weapons">
      <td>
        <div>
          {{ weapon.display_name }}
        </div>
      </td>
      <td class="text-start" v-if="hasUses">
        <span class="text-nowrap" v-if="weapon.max_uses">
          <span class="use use-weapon" v-for="i in Array(weapon.max_uses)">&nbsp;</span>
        </span>
      </td>
      <td>
        <template v-if="weapon.base_melee_damage">
          <small class="fw-light">
            {{ weapon.base_melee_damage }}+{{ weapon.melee_trait_damage }} =
          </small>
          {{ weapon.total_damage }}
        </template>
        <template v-else>
          {{ weapon.damage }}
        </template>
      </td>
      <td class="text-nowrap">
        <div class="text-end" v-if="weapon.range_modifier">
          <small class="fw-light">
            {{ weapon.range }}+{{ weapon.range_modifier }} =
          </small>
          {{ weapon.range_total }}"
        </div>
        <template v-else>
          <format-inches :value="weapon.range"/>
        </template>
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