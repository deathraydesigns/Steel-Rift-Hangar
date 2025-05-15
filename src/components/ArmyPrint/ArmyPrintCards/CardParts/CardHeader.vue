<script setup>
import {useArmyListStore} from '../../../../store/army-list-store.js';
import {usePrintSettingsStore} from '../../../../store/print-settings-store.js';
import {storeToRefs} from 'pinia';

const armyStore = useArmyListStore();
const {include_army_name_on_cards} = storeToRefs(usePrintSettingsStore());

const {title} = defineProps({
  title: {
    type: String,
    required: true,
  },
});

</script>
<template>
  <div class="card-name d-flex">
    <div class="flex-grow-1">
      {{ title }}
    </div>
    <div class="flex-shrink-1" v-if="include_army_name_on_cards">
      {{ armyStore.name || 'Unnamed Army' }}
    </div>
  </div>
</template>