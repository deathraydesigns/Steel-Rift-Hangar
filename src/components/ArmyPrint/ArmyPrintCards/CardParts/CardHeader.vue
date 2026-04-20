<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useArmyListStore } from '../../../../store/army-list-store';
import { usePrintSettingsStore } from '../../../../store/print-settings-store';

const armyStore = useArmyListStore();
const { include_army_name_on_cards } = storeToRefs(usePrintSettingsStore());

const { title, subTitle = '' } = defineProps<{
  title: string,
  subTitle?: string,
}>();
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