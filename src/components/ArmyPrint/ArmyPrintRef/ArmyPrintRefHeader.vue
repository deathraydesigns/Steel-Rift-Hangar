<script setup>
import {useArmyListStore} from '../../../store/army-list-store.js';
import Fraction from '../../functional/fraction.vue';
import {storeToRefs} from 'pinia';
import {useTeamStore} from '../../../store/team-store.js';
import {useSupportAssetCountsStore} from '../../../store/support-asset-count-store.js';

const armyListStore = useArmyListStore();

const store = useArmyListStore();
const {used_teams_count, max_teams_count} = storeToRefs(useTeamStore());

const {used_tons, max_tons} = storeToRefs(store);
const {used_support_assets, max_support_assets} = storeToRefs(useSupportAssetCountsStore());

</script>
<template>
  <div class="d-flex">
    <div class="flex-shrink-1">
      <template v-if="armyListStore.name">{{ armyListStore.name }}:</template>
      Army Reference
    </div>

    <div class="flex-grow-1 text-end">
      <strong>Teams: </strong>
      <fraction
          :a="used_teams_count"
          :b="max_teams_count"
          success-class="fw-bold"
      />

      <span class="ms-2">
        <strong>Support Assets: </strong>
        <fraction
            :a="used_support_assets"
            :b="max_support_assets"
            success-class="fw-bold"
        />
      </span>
      <span class="ms-2">
        <strong>Tonnage: </strong>
        <fraction
            :a="used_tons"
            :b="max_tons"
            success-class="fw-bold"
        />
      </span>
    </div>
  </div>
</template>
