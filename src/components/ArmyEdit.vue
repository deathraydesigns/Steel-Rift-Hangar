<script setup>
import ArmyList from './ArmyEdit/ArmyList.vue';
import SecondaryAgendas from './ArmyEdit/SecondaryAgendas.vue';
import MechTeamList from './ArmyEdit/Mech/MechTeamList.vue';
import {storeToRefs} from 'pinia';
import {useSupportAssetUnitsStore} from '../store/support-asset-units-store.js';
import UnitItem from './ArmyEdit/Units/UnitItem.vue';
import {inject} from 'vue';

const {support_asset_units} = storeToRefs(useSupportAssetUnitsStore());

const mode = inject('color_mode');
</script>
<template>
  <div class="container-lg pb-2" :data-bs-theme="mode">
    <ArmyList/>
    <UnitItem v-for="unit in support_asset_units" :key="unit.id" :support-asset-attachment-id="unit.id"/>
    <MechTeamList/>
    <SecondaryAgendas/>
  </div>
</template>