<script setup>
import {storeToRefs} from 'pinia';
import {useSupportAssetWeaponsStore} from '../../../store/support-asset-weapons-store.js';

const supportAssetStore = useSupportAssetWeaponsStore();
const {weapon_support_assets} = storeToRefs(supportAssetStore);
</script>
<template>
  <div v-if="weapon_support_assets.length">
    <div class="divider"></div>
    <div class="ref-heading">Support Assets</div>
    <div v-for="item in weapon_support_assets" :key="item.id">
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

