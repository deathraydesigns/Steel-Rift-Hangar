<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { urlDataStringToJson } from '../composables/url-data-parser';
import { ROUTE_HOME } from '../router.js';
import { loadSaveFileData } from '../store/helpers/store-save-load';
import { useSupportAssetUnitsStore } from '../store/support-asset-units-store';
import { toaster } from '../toaster.js';
import ArmyList from './ArmyEdit/ArmyList.vue';
import MechTeamList from './ArmyEdit/Mech/MechTeamList.vue';
import SecondaryAgendas from './ArmyEdit/SecondaryAgendas.vue';
import UnitItem from './ArmyEdit/Units/UnitItem.vue';

const { main_support_asset_units_info } = storeToRefs(useSupportAssetUnitsStore());

const router = useRouter();
const route = useRoute();

onMounted(() => {

  const dataString = route.query.payload as string;
  if (!dataString) {
    return;
  }
  try {
    const json = urlDataStringToJson(dataString);
    loadSaveFileData(json);

    router.push({ name: ROUTE_HOME })
      .then(() => {
        toaster().info('Army List loaded from Data Url');
      });

  } catch (error: any) {

    router.push({ name: ROUTE_HOME })
      .then(() => {
        toaster().validationError('Invalid Army List Data URL', error.message);
      });
  }
});
</script>
<template>
  <div class="container-lg pb-2">
    <ArmyList />
    <UnitItem v-for="unit in main_support_asset_units_info" :key="unit.id" :support-asset-attachment-id="unit.id" />
    <MechTeamList />
    <SecondaryAgendas />
  </div>
</template>