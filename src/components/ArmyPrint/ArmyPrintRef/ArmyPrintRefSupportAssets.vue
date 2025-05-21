<script setup>
import {storeToRefs} from 'pinia';
import {useSupportAssetWeaponsStore} from '../../../store/support-asset-weapons-store.js';

const supportAssetStore = useSupportAssetWeaponsStore();
const {support_asset_weapons_info} = storeToRefs(supportAssetStore);
</script>
<template>
  <div v-if="support_asset_weapons_info.length">
    <div class="divider"></div>
    <div class="ref-heading">Support Assets</div>
    <div v-for="item in support_asset_weapons_info" :key="item.id">
      <p class="p-gap">
        <span class="fw-bold">
          {{ item.display_name }}:

          <template v-if="item.damage">
            Damage: {{ item.off_table_weapon.damage }},
          </template>
          Traits: {{ item.off_table_weapon.traits.map(trait => trait.display_name).join(', ') }}
          <template v-if="item.notes">
            Notes: {{ item.notes.join(', ') }}
          </template>

        </span>
        {{ item.description }}
      </p>
    </div>
  </div>
</template>

