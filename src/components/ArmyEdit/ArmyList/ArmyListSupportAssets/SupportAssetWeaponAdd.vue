<script setup>
import {storeToRefs} from 'pinia';
import {traitDisplayNames} from '../../../../data/weapon-traits.js';
import {useSupportAssetWeaponsStore} from '../../../../store/support-asset-weapons-store.js';
import Number from '../../../functional/number.vue';
import {BDropdown} from 'bootstrap-vue-next';

const store = useSupportAssetWeaponsStore();

const {
  available_support_asset_weapons_info,
} = storeToRefs(store);


</script>
<template>
  <BDropdown
      class="dropdown-table d-inline-block"
      text="Add"
      size="sm"
      variant="primary"
      placement="bottom-end"
  >
    <div class="position-relative">
      <table class="table table-hover table-borderless table-striped">
        <thead class="sticky-top top-0 shadow">
        <tr>
          <td>
            Support Asset
          </td>
          <td class="text-end">
            Attack
          </td>
          <td class="text-end">
            Tons
          </td>
          <td>
            Traits
          </td>
        </tr>
        </thead>
        <tbody>
        <tr
            :class="{
              'dropdown-row': true,
            }"
            v-for="item in available_support_asset_weapons_info" :key="item.id"
            @click="store.addSupportAsset(item.id)"
        >
          <td>
            {{ item.display_name }}
          </td>
          <td class="text-end">
            {{ item.off_table_weapon.damage }}
          </td>
          <td class="text-end">
            <number :val="item.cost" :invert-color="true"/>
          </td>
          <td>
            {{ traitDisplayNames(item.off_table_weapon.traits) }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </BDropdown>

</template>