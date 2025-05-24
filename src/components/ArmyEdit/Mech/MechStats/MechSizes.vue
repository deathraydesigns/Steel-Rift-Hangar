<script setup>
import {useMechStore} from '../../../../store/mech-store.js';
import Number from '../../../functional/number.vue';
import {computed} from 'vue';
import {useTeamStore} from '../../../../store/team-store.js';
import {BDropdown} from 'bootstrap-vue-next';

const mechStore = useMechStore();
const teamStore = useTeamStore();

const {mechId} = defineProps({
  mechId: Number,
});
const options = computed(() => teamStore.getAvailableMechSizes(mechId));

const mech = computed(() => mechStore.getMech(mechId));
const info = computed(() => mechStore.getMechInfo(mechId));

function selectOption(size_id) {
  mechStore.updateMech(mechId, {size_id});
}

</script>
<template>
  <tr>
    <td></td>
    <td>
      <label class="col-form-label" :for="'mech-input-size-' + mechId">Size</label>
    </td>
    <td colspan="3">
      <BDropdown
          :id="'mech-input-size-' + mechId"
          class="dropdown-form dropdown-table"
          :text="info.size.display_name"
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
              Armor
            </td>
            <td class="text-end">
              Structure
            </td>
            <td class="text-end">
              Slots
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
                'table-primary':   (item.value == mech.size_id)
              }"
              v-for="item in options" :key="item.value"
              @click="selectOption(item.value)"
          >
            <td>
              {{ item.text }}
            </td>
            <td class="text-end">
              {{ item.armor }}
            </td>
            <td class="text-end">
              {{ item.structure }}
            </td>
            <td class="text-end">
              {{ item.max_slots }}
            </td>
            <td class="text-end">
              {{ item.max_tons }}
            </td>
          </tr>
          </tbody>
        </table>
      </BDropdown>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        {{ info.size.armor }}
      </div>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        {{ info.size.structure }}
      </div>
    </td>
    <td class="text-end">

    </td>
    <td class="text-end">
      <div class="col-form-label">
        <number :val="info.size.armor + info.size.structure" :invert-color="true"/>
      </div>
    </td>
    <td></td>
  </tr>
</template>
