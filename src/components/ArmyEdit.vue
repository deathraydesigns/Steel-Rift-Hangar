<script setup>
import ArmyList from './ArmyEdit/ArmyList.vue';
import SecondaryAgendas from './ArmyEdit/SecondaryAgendas.vue';
import MechTeamList from './ArmyEdit/Mech/MechTeamList.vue';
import {storeToRefs} from 'pinia';
import {useSupportAssetUnitsStore} from '../store/support-asset-units-store.js';
import UnitItem from './ArmyEdit/Units/UnitItem.vue';
import {useRoute, useRouter} from 'vue-router';
import {onMounted} from 'vue';
import {urlDataStringToJson} from '../composables/url-data-parser.js';
import {loadSaveFileData} from '../store/helpers/store-save-load.js';
import {ROUTE_HOME} from '../router.js';
import {toaster} from '../toaster.js';

const {support_asset_units} = storeToRefs(useSupportAssetUnitsStore());

const router = useRouter();
const route = useRoute();

onMounted(() => {

  const dataString = route.query.payload;
  if (!dataString) {
    return;
  }
  try {
    const json = urlDataStringToJson(dataString);
    loadSaveFileData(json);

    router.push({name: ROUTE_HOME})
        .then(() => {
          toaster().info('Army List loaded from Data Url');
        });

  } catch (error) {

    router.push({name: ROUTE_HOME})
        .then(() => {
          toaster().validationError('Invalid Army List Data URL', error.message);
        });
  }
});

</script>
<template>
  <div class="container-lg pb-2">
    <ArmyList/>
    <UnitItem v-for="unit in support_asset_units" :key="unit.id" :support-asset-attachment-id="unit.id"/>
    <MechTeamList/>
    <SecondaryAgendas/>
  </div>
</template>