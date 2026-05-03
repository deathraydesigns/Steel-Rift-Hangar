<script setup lang="ts">
import { BDropdown } from 'bootstrap-vue-next';
import { SUPPORT_ASSET_UNIT, type SupportAssetUnitInfo } from '../../../../data/support-assets/_support-asset-types';
import FormatNumber from '../../../functional/format-number.vue';
import IconNotAvailable from '../../../UI/IconNotAvailable.vue';

const emit = defineEmits<{
  (e: 'selected', id: SUPPORT_ASSET_UNIT): void,
}>();

const { availableSupportAssetUnitsInfo } = defineProps<{
  availableSupportAssetUnitsInfo: (SupportAssetUnitInfo & {
    validation_message: string | null
  })[]
}>();

</script>
<template>
  <BDropdown
    class="dropdown-table d-inline-block"
    text="Add"
    size="sm"
    variant="secondary"
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
          <td></td>
        </tr>
        </thead>
        <tbody>
        <tr
          :class="{
              'dropdown-row': true,
            }"
          v-for="item in availableSupportAssetUnitsInfo" :key="item.id"
          @click="emit('selected', item.id)"
        >
          <td class="text-nowrap">
            {{ item.display_name }}
          </td>

          <td class="text-end">
            <format-number :val="item.cost" :invert-color="true" />
          </td>
          <td class="notes">
            <IconNotAvailable
              :valid="!item.validation_message"
              :validation-message="item.validation_message"
              btn-class="ms-1"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </BDropdown>

</template>