<script setup>
import {computed} from 'vue';
import {useMechStore} from '../../../store/mech-store.js';
import {WEAPON_TRAITS, weaponTraitDisplayName} from '../../../data/weapon-traits.js';
import {sortBy} from 'es-toolkit/compat';

const mechStore = useMechStore();

const weaponTraits = computed(() => {
  const result = mechStore.getUsedWeaponTraitIds.map(traitId => {
    return {
      display_name: weaponTraitDisplayName({id: traitId, number: 'X'}),
      description: WEAPON_TRAITS[traitId].description,
    };
  });

  return sortBy(result, 'display_name');
});
</script>
<template>
  <div v-if="weaponTraits.length">
    <div class="divider"></div>
    <div class="ref-heading">Weapon Traits</div>
    <div v-for="trait in weaponTraits">

      <p class="p-gap">
        <span class="fw-bold">
          {{ trait.display_name }}:
        </span>
        {{ trait.description }}</p>
    </div>

  </div>
</template>

