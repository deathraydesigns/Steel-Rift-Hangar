<script setup lang="ts">
import { BButton } from 'bootstrap-vue-next';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useSupportAssetUnitsStore } from '../../../../store/support-asset-units-store';
import { useValidationStore } from '../../../../store/validation-store';
import FormatNumber from '../../../functional/format-number.vue';
import IconValidationError from '../../../UI/IconValidationError.vue';
import SupportAssetUnitAdd from './SupportAssetUnitAdd.vue';

const store = useSupportAssetUnitsStore();
const validationStore = useValidationStore();

const { invalid_number_of_support_assets } = storeToRefs(validationStore);
const {
  main_support_asset_units_info,
} = storeToRefs(store);

const supportAssetUnits = computed(() => {
  return store.available_support_asset_units_info.map(v => ({
    ...v,
    validation_message: validationStore.addSupportAssetUnitInvalid(v.id, false),
  }));
});

</script>
<template>
  <div
    :class="{
        'card card-dark-border': true,
        'border-danger': invalid_number_of_support_assets
      }"
  >
    <div class="card-header text-bg-primary">
      <div class="d-flex">
        <div class="col-form-label form-control-sm flex-shrink-1 pe-2 fw-bold">
          On Table Support Assets
        </div>
        <div class="flex-grow-1">
          <IconValidationError size="sm" v-if="invalid_number_of_support_assets"
                               :message="invalid_number_of_support_assets" />
        </div>
        <div class="flex-shrink-1 text-end">
          <SupportAssetUnitAdd
            :available-support-asset-units-info="supportAssetUnits"
            @selected="store.addSupportAsset($event)"
          />
        </div>
      </div>
    </div>
    <div class="card-body p-2" v-if="main_support_asset_units_info.length">
      <table class="table table-btn-sm m-0">
        <thead>
        <tr class="table-tinted">
          <th>Name</th>
          <th class="text-end">Tons</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in main_support_asset_units_info" :key="item.id">
          <td>
            {{ item.display_name }}
          </td>
          <td class="text-end">
            <format-number :val="item.cost" :invert-color="true" />
          </td>
          <td class="table-btn-cell text-end">
            <BButton @click="store.removeSupportAssetId(item.id)" variant="danger" size="sm"><span
              class="material-symbols-outlined">delete</span></BButton>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>