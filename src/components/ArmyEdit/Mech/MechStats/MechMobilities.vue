<script setup>
import {computed} from 'vue';
import {useMechStore} from '../../../../store/mech-store.js';
import BtnToolTip from '../../../UI/BtnToolTip.vue';
import {MECH_MOBILITIES} from '../../../../data/mech-mobility.js';
import {BDropdown} from 'bootstrap-vue-next';
import Number from '../../../functional/number.vue';

const mechStore = useMechStore();

const {
  label,
  mechId,
} = defineProps({
  label: {
    type: String,
  },
  mechId: {
    type: Number,
  },
});

const model = defineModel();
const options = computed(() => MECH_MOBILITIES);

const mobility = computed(() => {
  const {mobility_id} = mechStore.getMech(mechId);

  return MECH_MOBILITIES[mobility_id];
});

function selectOption(value) {
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
          :text="mobility.display_name"
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
              <BtnToolTip
                  :enabled="!!item.description">
                <template #target="{mouseover, mouseleave}">
                  <span
                      @mouseover="mouseover"
                      @mouseleave="mouseleave"
                      :class="{'text-tooltip': item.description}"
                  >
                    {{ item.display_name }}
                  </span>
                </template>
                <template #content>
                  {{ item.description }}
                </template>
              </BtnToolTip>
            </td>
            <td class="text-end">
              <number :val="item.slots" invert-color/>
            </td>
          </tr>
          </tbody>
        </table>
      </BDropdown>
      <BtnToolTip lazy>
        <template #target="{mouseover, mouseleave}">
          <span
              @mouseover="mouseover"
              @mouseleave="mouseleave"
              class="btn btn-md btn-default ms-1"
              v-show="!!mobility.description"
          >
            ?
          </span>
        </template>
        <template #content>
          {{ mobility.description }}
        </template>
      </BtnToolTip>
    </td>
    <td></td>
    <td></td>
    <td class="text-end">
      <div class="col-form-label">
        <number :val="mobility.slots" :invert-color="true"/>
      </div>
    </td>
    <td></td>
    <td></td>
  </tr>
</template>
