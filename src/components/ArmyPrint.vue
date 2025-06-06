<script setup>
import ArmyPrintSettings from './ArmyPrint/ArmyPrintSettings.vue';
import {
  PRINT_MODE_ALL,
  PRINT_MODE_CARDS,
  PRINT_MODE_REF,
  PRINT_MODES,
  usePrintSettingsStore,
} from '../store/print-settings-store.js';
import {storeToRefs} from 'pinia';
import {useFactionStore} from '../store/faction-store.js';
import {useArmyListStore} from '../store/army-list-store.js';
import {BFormCheckbox} from 'bootstrap-vue-next';
import ArmyPrintCards from './ArmyPrint/ArmyPrintCards.vue';
import ArmyPrintRef from './ArmyPrint/ArmyPrintRef.vue';
import ArmyPrintAll from './ArmyPrint/ArmyPrintAll.vue';

const printSettingsStore = usePrintSettingsStore();
const factionStore = useFactionStore();

const {
  perk_1_info,
  perk_2_info,
} = storeToRefs(factionStore);

const {
  print_mode,
  print_mode_display_name,
  one_team_per_page,
  include_army_name_on_cards,
  include_mine_drone_card,
  include_msoe_card,
  include_faction_perk_1_card,
  include_faction_perk_2_card,
  separate_reference_cards_page,
} = storeToRefs(printSettingsStore);

const {includes_mine_drones, includes_msoe} = storeToRefs(useArmyListStore());

function print() {
  window.print();
}
</script>
<template>
  <div>
    <ArmyPrintSettings>
      <template #nav>
        <template v-for="(item, key) in PRINT_MODES">
          <button
              :class="{
                        'btn btn-sm btn-default': true,
                        'active': print_mode === key
                      }"
              @click="print_mode = key"
          >
            {{ item.display_name }}
          </button>
        </template>
      </template>

      <template #body>

        <div class="mb-1">
          <div class="fw-bold">
            Card Settings
          </div>

          <BFormCheckbox
              v-model="include_army_name_on_cards"
              id="include_army_name_on_cards"
          >
            Include army name on cards
          </BFormCheckbox>
        </div>

        <div class="mb-1">
          <div class="fw-bold">
            HE-V Teams
          </div>
          <BFormCheckbox
              v-model="one_team_per_page"
              id="one_team_per_page"
          >
            Print one team per page
          </BFormCheckbox>

        </div>
        <div class="mb-1">
          <div class="fw-bold">
            Reference Cards
          </div>

          <BFormCheckbox
              v-model="include_mine_drone_card"
              id="include_mine_drone_card"
              :disabled="!includes_mine_drones"
          >
            Include Mine Drone Card
          </BFormCheckbox>

          <BFormCheckbox
              v-model="include_msoe_card"
              id="include_msoe_card"
              :disabled="!includes_msoe"
          >
            Include Multi-spectral Obscuration Emitter (msoe) Card
          </BFormCheckbox>

          <BFormCheckbox
              v-model="include_faction_perk_1_card"
              id="include_faction_perk_1_card"
              :disabled="!perk_1_info"
          >
            Include Faction Perk 1 Card
            <strong v-if="perk_1_info">({{ perk_1_info.display_name }})</strong>
          </BFormCheckbox>

          <BFormCheckbox
              v-model="include_faction_perk_2_card"
              id="include_faction_perk_2_card"
              :disabled="!perk_2_info"
          >
            Include Faction Perk 2 Card
            <strong v-if="perk_2_info">({{ perk_2_info.display_name }})</strong>
          </BFormCheckbox>

          <BFormCheckbox
              v-model="separate_reference_cards_page"
              id="separate_reference_cards_page"
          >
            Print on separate page
          </BFormCheckbox>
        </div>

      </template>
      <template #footer>
        <button class="btn btn-sm btn-secondary" @click="print">
          {{ print_mode_display_name }}
          <span class="material-symbols-outlined">print</span>
        </button>
      </template>
    </ArmyPrintSettings>

    <div class="page-previews-container" data-bs-theme="light">
      <div class="output-container">
        <ArmyPrintCards v-if="print_mode === PRINT_MODE_CARDS"/>
        <ArmyPrintRef v-if="print_mode === PRINT_MODE_REF"/>
        <ArmyPrintAll v-if="print_mode === PRINT_MODE_ALL"/>
      </div>
    </div>
  </div>
</template>
