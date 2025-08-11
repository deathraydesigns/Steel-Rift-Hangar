<script setup>
import {useArmyListStore} from '../../../../store/army-list-store.js';
import {usePrintSettingsStore} from '../../../../store/print-settings-store.js';
import {storeToRefs} from 'pinia';

const armyStore = useArmyListStore();
const {include_army_name_on_cards} = storeToRefs(usePrintSettingsStore());

const {title, subTitle} = defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
});
</script>
<template>
  <div class="card-name d-flex">
    <div class="flex-grow-1">
      {{ title }} <small v-if="subTitle" class="game-card-subtitle"> {{ subTitle }}</small>
    </div>
    <div class="flex-shrink-1" v-if="include_army_name_on_cards">
      {{ armyStore.name || 'Unnamed Army' }}
    </div>
  </div>
</template>