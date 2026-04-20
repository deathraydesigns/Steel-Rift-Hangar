<script setup lang="ts">
import { BDropdown } from 'bootstrap-vue-next';
import { computed } from 'vue';
import { MECH_MOBILITIES, type MechMobilityId } from '../../../../data/mech-mobility';
import { useMechStore } from '../../../../store/mech-store';
import FormatNumber from '../../../functional/format-number.vue';
import BtnToolTip from '../../../UI/BtnToolTip.vue';
import GrantedOrders from '../../../UI/GrantedOrders.vue';

const mechStore = useMechStore();

const {
  label,
  mechId,
} = defineProps<{
  label: string,
  mechId: number,
}>();

const model = defineModel();
const options = computed(() => MECH_MOBILITIES);

const mobility = computed(() => {
  const m = mechStore.getMech(mechId)!;
  return MECH_MOBILITIES[m.mobility_id];
});

function selectOption(value: MechMobilityId) {
  model.value = value;
}

</script>
<template>
  <tr>
    <td></td>
    <td>
      <label class="col-form-label" :for="'mech-input-mobility-' + mechId">{{ label }}</label>
    </td>
    <td colspan="3">
      <BDropdown
        :id="'mech-input-mobility-' + mechId"
        class="dropdown-form dropdown-table d-inline-block"
        :text="mobility?.display_name"
        variant="default"
        lazy
      >
        <table class="table table-hover table-borderless">
          <thead>
          <tr>
            <td>
              Type
            </td>
            <td class="text-end">
              Slots Used
            </td>
          </tr>
          </thead>
          <tbody>
          <tr
            :class="{
                'dropdown-row': true,
                'table-selected':   (item.id == model)
              }"
            v-for="item in options" :key="item.id"
            @click="selectOption(item.id)"
          >
            <td class="text-nowrap">
              <BtnToolTip :enabled="!!item.granted_order_ids.length">
                <template #target>
                  <span :class="{'text-tooltip': item.granted_order_ids.length}">
                    {{ item.display_name }}
                  </span>
                </template>
                <template #content>
                  <GrantedOrders :order-ids="item.granted_order_ids" />
                </template>
              </BtnToolTip>
            </td>
            <td class="text-end">
              <format-number :val="item.slots" invert-color />
            </td>
          </tr>
          </tbody>
        </table>
      </BDropdown>

      <BtnToolTip>
        <template #target>
          <span
            class="btn btn-md btn-default ms-1"
            v-show="!!mobility?.granted_order_ids?.length"
          >
            ?
          </span>
        </template>
        <template #content>
          <GrantedOrders :order-ids="mobility?.granted_order_ids ?? []" />
        </template>
      </BtnToolTip>
    </td>
    <td></td>
    <td></td>
    <td class="text-end">
      <div class="col-form-label">
        <format-number :val="mobility?.slots" :invert-color="true" />
      </div>
    </td>
    <td></td>
    <td></td>
  </tr>
</template>
