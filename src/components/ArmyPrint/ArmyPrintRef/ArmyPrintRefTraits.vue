<script setup lang="ts">
import { computed } from 'vue';
import { MECH_TEAM_PERKS } from '../../../data/mech-team-perks';
import { MECH_UPGRADES } from '../../../data/mech-upgrades';
import { unitTraitDisplayName } from '../../../data/unit-traits';
import { UPGRADE_TRAITS, type UpgradeTraitDef, upgradeTraitDisplayName } from '../../../data/upgrade-traits';
import { WEAPON_TRAITS, weaponTraitDisplayName } from '../../../data/weapon-traits.js';
import { makeUniqueItemIdCollection } from '../../../store/helpers/helpers';
import { useMechStore } from '../../../store/mech-store';
import { useSupportAssetUnitsStore } from '../../../store/support-asset-units-store';
import { useTeamStore } from '../../../store/team-store';
import ArmyPrintRefTraitType from './ArmyPrintRefTraitType.vue';

const unitStore = useSupportAssetUnitsStore();
const mechStore = useMechStore();
const teamStore = useTeamStore();

const unitTraits = computed(() => {
  const traits = unitStore.getAllUnitTraits();

  traits.addIds(
    teamStore.allUsedTeamAbilityPerkIds.flatMap(perkId => MECH_TEAM_PERKS[perkId].granted_unit_traits.map(v => v.id)),
  );
  
  return traits.all().map(trait => {
    return {
      ...trait,
      display_name: unitTraitDisplayName({ id: trait.id, X: 'X' }),
    };
  });
});

const upgradeTraits = computed((): UpgradeTraitDef[] => {

  const upgradeTraits = makeUniqueItemIdCollection(UPGRADE_TRAITS);
  upgradeTraits.addIds(mechStore.getUsedUpgradeTraitIds);

  for (const unitTrait of unitTraits.value) {
    for (const upgradeId of unitTrait.referenced_upgrade_ids) {
      const upgrade = MECH_UPGRADES[upgradeId];
      upgradeTraits.addMultiple(upgrade.traits);
      for (const sizeTraits of Object.values(upgrade.traits_by_size)) {
        upgradeTraits.addMultiple(sizeTraits);
      }
    }
  }

  return upgradeTraits.ids().map(traitId => {
    return {
      ...UPGRADE_TRAITS[traitId],
      display_name: upgradeTraitDisplayName({ id: traitId, X: 'X', Y: 'Y' }),
    };
  });
});
const weaponTraits = computed(() => {

  const traitCollection = makeUniqueItemIdCollection(WEAPON_TRAITS);
  const unitWeaponTraitIds = unitStore.getAllWeaponTraitsCollection().ids();

  traitCollection.addIds(unitWeaponTraitIds);
  traitCollection.addIds(mechStore.getUsedWeaponTraitIds);

  return traitCollection.all().map(trait => {
    return {
      ...trait,
      display_name: weaponTraitDisplayName({ id: trait.id, X: 'X' }),
    };
  });
});

</script>
<template>
  <ArmyPrintRefTraitType title="Unit Traits" :traits="unitTraits" />
  <ArmyPrintRefTraitType title="Weapon Traits" :traits="weaponTraits" />
  <ArmyPrintRefTraitType title="Upgrade Traits" :traits="upgradeTraits" />
</template>

