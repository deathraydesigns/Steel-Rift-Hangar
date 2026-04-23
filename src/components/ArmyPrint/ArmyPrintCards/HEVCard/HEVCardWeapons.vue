<script setup lang="ts">
import { computed } from 'vue';
import { MECH_UPGRADE } from '../../../../data/mech-upgrades.js';
import { UPGRADE_TRAIT } from '../../../../data/upgrade-traits.js';
import { WEAPON_TRAIT } from '../../../../data/weapon-traits.js';
import { findBy } from '../../../../store/helpers/collection-helper';
import { useMechStore } from '../../../../store/mech-store';
import type { MechWeaponAttachmentInfo, Trait, TraitInfo } from '../../../../types';
import DamageFormatter from '../../../UI/DamageFormatter.vue';
import RangeFormatter from '../../../UI/RangeFormatter.vue';

const mechStore = useMechStore();
const { mechId } = defineProps<{
  mechId: number,
}>();
const weapons = computed(() => {
  let results: MechWeaponAttachmentInfo[] = mechStore.getMechWeaponsAttachmentInfo(mechId);
  let mineDroneUpgrade = findBy(mechStore.getMechUpgradesAttachmentInfo(mechId), 'upgrade_id', MECH_UPGRADE.MINEFIELD_DRONE_CARRIER_SYSTEM);

  if (mineDroneUpgrade) {
    mineDroneUpgrade.display_name = 'Mine Drones';
    mineDroneUpgrade.traits = mineDroneUpgrade.traits.filter(trait => trait.id !== UPGRADE_TRAIT.LIMITED);
    results.push(mineDroneUpgrade as unknown as MechWeaponAttachmentInfo);
  }

  return results;
});

const hasUses = computed(() => weapons.value.find(weapon => !!weapon.max_uses));

function filterTraits(traits: TraitInfo<WEAPON_TRAIT>[]) {
  return traits.filter((trait) => trait.id !== WEAPON_TRAIT.LIMITED && trait.id !== WEAPON_TRAIT.SHORT);
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
      <td class="text-nowrap">
        <DamageFormatter
          :damage="weapon.damage"
          :melee-base-damage="weapon.melee_base_damage"
          :melee-modifier-damage="weapon.melee_trait_damage"
          :melee-total-damage="weapon.melee_total_damage"
        />
      </td>
      <td class="text-nowrap">
        <RangeFormatter
          :range="weapon.range"
          :modifier="weapon.range_modifier"
          :total="weapon.range_total"
        />
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