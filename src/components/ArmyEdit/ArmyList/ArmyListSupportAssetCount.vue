<script setup>
import {BFormCheckbox, BFormInput} from 'bootstrap-vue-next';
import {storeToRefs} from 'pinia';
import {useSupportAssetCountsStore} from '../../../store/support-asset-count-store.js';

const store = useSupportAssetCountsStore();

const {
  max_support_assets,
  custom_max_support_assets,
} = storeToRefs(store);

function setCustomSupportAssetCount(value) {
  custom_max_support_assets.value = value;
}

function updateCheck(value) {
  if (value) {
    custom_max_support_assets.value = max_support_assets.value;
  } else {
    custom_max_support_assets.value = null;
  }
}

</script>
<template>
  <div class="form-floating mb-1">
    <BFormInput
        id="list_max_support_assets"
        @update:model-value="setCustomSupportAssetCount"
        :model-value="max_support_assets"
        type="number"
        :disabled="custom_max_support_assets === null"
    />
    <label for="list_max_support_assets">Support Assets</label>
  </div>
  <BFormCheckbox
      :model-value="custom_max_support_assets !== null"
      @update:model-value="updateCheck"
  >
    Custom
  </BFormCheckbox>
</template>