<script setup>
import ArmyPrintRefTeams from './ArmyPrintRef/ArmyPrintRefTeams.vue';
import ArmyPrintRefSecondaryAgendas from './ArmyPrintRef/ArmyPrintRefSecondaryAgendas.vue';
import ArmyPrintRefUpgrades from './ArmyPrintRef/ArmyPrintRefUpgrades.vue';
import ArmyPrintRefHeader from './ArmyPrintRef/ArmyPrintRefHeader.vue';
import ArmyPrintRefSupportAssets from './ArmyPrintRef/ArmyPrintRefSupportAssets.vue';
import ArmyPrintRefFaction from './ArmyPrintRef/ArmyPrintRefFaction.vue';
import ArmyPrintRefSpecialOrders from './ArmyPrintRef/ArmyPrintRefSpecialOrders.vue';
import ArmyPrintRefTraits from './ArmyPrintRef/ArmyPrintRefTraits.vue';
import {onMounted, onUnmounted} from 'vue';

let style;

onMounted(() => {
  style = document.createElement('style');
  style.textContent = `
  @page {
  size: portrait;
  margin: 0.5in;
  padding: 0.5in;
}

@media print {
  html body {
    width: auto !important;
    height: auto !important;
  }

  .page-army-reference {
    padding: 0 !important;
    width: auto;
  }

  .page-preview.page-letter-width {
    width: auto !important;
  }
}
`;
  document.head.appendChild(style);
});

onUnmounted(() => {
  if (style) {
    style.remove();
  }
});
</script>
<template>

  <div class="page-preview page-letter-width"
       style="background-color:white">
    <div class="page-army-reference">

      <ArmyPrintRefHeader/>
      <ArmyPrintRefFaction/>
      <ArmyPrintRefTeams/>
      <ArmyPrintRefSecondaryAgendas/>
      <ArmyPrintRefUpgrades/>
      <ArmyPrintRefSupportAssets/>
      <ArmyPrintRefSpecialOrders/>
      <ArmyPrintRefTraits/>

    </div>
  </div>

</template>
