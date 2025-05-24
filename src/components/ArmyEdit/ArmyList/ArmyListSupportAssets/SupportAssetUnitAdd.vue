<script setup>
import {storeToRefs} from 'pinia';
import {useSupportAssetUnitsStore} from '../../../../store/support-asset-units-store.js';
import Number from '../../../functional/number.vue';
import {BDropdown} from 'bootstrap-vue-next';

const store = useSupportAssetUnitsStore();

const {
  available_support_asset_units_info,
} = storeToRefs(store);

</script>
<template>
  <BDropdown
      class="dropdown-table d-inline-block"
      text="Add"
      size="sm"
      variant="header-add"
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
            Tons
          </td>
        </tr>
        </thead>
        <tbody>
        <tr
            :class="{
              'dropdown-row': true,
            }"
            v-for="item in available_support_asset_units_info" :key="item.id"
            @click="store.addSupportAsset(item.id)"
        >
          <td class="text-nowrap">
            {{ item.display_name }}
          </td>

          <td class="text-end">
            <number :val="item.cost" :invert-color="true"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </BDropdown>

</template>