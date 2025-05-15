<script setup>
import {computed} from 'vue';
import {TRAIT_LIMITED, TRAIT_SHORT} from '../../../../data/weapon-traits.js';
import {useSupportAssetUnitsStore} from '../../../../store/support-asset-units-store.js';

const unitStore = useSupportAssetUnitsStore();
const {unitAttachmentId} = defineProps({
  unitAttachmentId: {
    type: Number,
    required: true,
  },
});
const weapons = computed(() => {
  return unitStore.getUnitAttachmentWeaponsCardInfo(unitAttachmentId);

});

function filterTraits(traits) {
  return traits.filter((trait) => trait.id !== TRAIT_LIMITED && trait.id !== TRAIT_SHORT);
}
</script>
<template>
  <table class="table-stats">
    <thead>
    <tr>
      <th>Weapon</th>
      <th class="text-start">Ltd</th>
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
      <td class="text-start">
        <div class="weapon-uses" v-if="weapon.max_uses">
          <div class="weapon-use" v-for="i in Array(weapon.max_uses)">&nbsp;</div>
        </div>
      </td>
      <td>
        <template v-if="weapon.base_melee_damage">
          <span class="fw-light">
            {{ weapon.base_melee_damage }} + {{ weapon.melee_trait_damage }} =
          </span>
          {{ weapon.total_damage }}
        </template>
        <template v-else>
          {{ weapon.damage }}
        </template>
      </td>
      <td>{{ weapon.range || '-' }}</td>
      <td class="text-start">
        <div v-for="(trait, index) in filterTraits(weapon.traits)">
          {{ trait.display_name }}<span v-if="index !== filterTraits(weapon.traits).length - 1">, </span>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>