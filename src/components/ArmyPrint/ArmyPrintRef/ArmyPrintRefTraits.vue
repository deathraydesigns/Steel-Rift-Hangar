<script setup>
import {computed} from 'vue';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';
import ArmyPrintRefTraitType from './ArmyPrintRefTraitType.vue';
import {makeUniqueItemIdCollection} from '../../../store/helpers/helpers.js';
import {WEAPON_TRAITS, weaponTraitDisplayName} from '../../../data/weapon-traits.js';
import {useMechStore} from '../../../store/mech-store.js';

const unitStore = useSupportAssetUnitsStore();
const mechStore = useMechStore();

const unitTraits = computed(() => unitStore.getAllUnitTraits());
const upgradeTraits = computed(() => mechStore.getUsedUpgradeTraitsInfo);
const weaponTraits = computed(() => {

  const traitCollection = makeUniqueItemIdCollection(WEAPON_TRAITS);
  const unitWeaponTraitIds = unitStore.getAllWeaponTraitsCollection().ids();

  traitCollection.addIds(unitWeaponTraitIds);
  traitCollection.addIds(mechStore.getUsedWeaponTraitIds);

  return traitCollection.all().map(trait => {
    return {
      ...trait,
      display_name: weaponTraitDisplayName({id: trait.id, number: 'X'}),
    };
  });
});

</script>
<template>
  <ArmyPrintRefTraitType title="Unit Traits" :traits="unitTraits"/>
  <ArmyPrintRefTraitType title="Weapon Traits" :traits="weaponTraits"/>
  <ArmyPrintRefTraitType title="Upgrade Traits" :traits="upgradeTraits"/>
</template>

