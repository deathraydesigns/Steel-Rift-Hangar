<script setup>
import {useFactionStore} from '../../../store/faction-store.js';
import {storeToRefs} from 'pinia';
import {computed, ref} from 'vue';
import FactionPerkGrid from './FactionPerkGrid.vue';
import BtnToolTip from '../../UI/BtnToolTip.vue';
import {useSupportAssetWeaponsStore} from '../../../store/support-asset-weapons-store.js';

const factionStore = useFactionStore();
const supportAssetWeaponsStore = useSupportAssetWeaponsStore();
const {
  perk_1_info,
  perk_2_info,
  faction_display_name,
} = storeToRefs(factionStore);

const {
  support_asset_weapons_info,
  outrageous_budget_perk_support_asset_id,
} = storeToRefs(supportAssetWeaponsStore);

const hasOutrageousSupportBudget = computed(() => factionStore.hasOutrageousSupportBudget);

const modal = ref(false);

</script>
<template>
  <button
      role="button"
      class="btn btn-primary text-start mb-1 w-100"
      @click="modal = !modal"
  >
    <span class="small text-muted-custom d-block">Faction</span>
    <span>{{ faction_display_name }}</span>
  </button>

  <BtnToolTip>
    <template #target>
      <button
          v-show="perk_1_info?.display_name"
          class="btn btn-default text-start mb-1 w-100"
      >
        <span class="small text-muted-custom d-block">Perk 1</span>
        <span>{{ perk_1_info?.display_name }}</span>
      </button>

    </template>
    <template #content>
      {{ perk_1_info?.description }}
    </template>
  </BtnToolTip>

  <BtnToolTip>
    <template #target>
      <button
          v-show="perk_2_info?.display_name"
          class="btn btn-default text-start mb-1 w-100"
      >
        <span class="small text-muted d-block">Perk 2</span>
        <span>{{ perk_2_info?.display_name }}</span>
      </button>

    </template>
    <template #content>
      {{ perk_2_info?.description }}
    </template>
  </BtnToolTip>

  <div
      v-if="hasOutrageousSupportBudget"
      class="form-floating mb-1"
  >
    <BFormSelect
        :options="support_asset_weapons_info"
        text-field="display_name"
        value-field="id"
        id="outrageous_budget_perk_support_asset_id"
        v-model="outrageous_budget_perk_support_asset_id"
    />
    <label for="outrageous_budget_perk_support_asset_id">Apply Outrageous Support Budget</label>
  </div>

  <FactionPerkGrid v-model="modal"/>
</template>