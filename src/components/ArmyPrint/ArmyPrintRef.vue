<script setup>
import ArmyPrintRefTeams from './ArmyPrintRef/ArmyPrintRefTeams.vue';
import ArmyPrintRefSecondaryAgendas from './ArmyPrintRef/ArmyPrintRefSecondaryAgendas.vue';
import ArmyPrintRefUpgrades from './ArmyPrintRef/ArmyPrintRefUpgrades.vue';
import ArmyPrintRefWeaponTraits from './ArmyPrintRef/ArmyPrintRefWeaponTraits.vue';
import ArmyPrintRefHeader from './ArmyPrintRef/ArmyPrintRefHeader.vue';
import ArmyPrintRefSupportAssets from './ArmyPrintRef/ArmyPrintRefSupportAssets.vue';
import ArmyPrintRefFaction from './ArmyPrintRef/ArmyPrintRefFaction.vue';
</script>
<template>

  <div class="page-preview page-letter-width"
       style="background-color:white">
    <div class="page-army-reference">

      <ArmyPrintRefHeader/>
      <ArmyPrintRefFaction/>
      <ArmyPrintRefTeams/>
      <ArmyPrintRefSecondaryAgendas/>
      <ArmyPrintRefWeaponTraits/>
      <ArmyPrintRefUpgrades/>
      <ArmyPrintRefSupportAssets/>
    </div>
  </div>

</template>
