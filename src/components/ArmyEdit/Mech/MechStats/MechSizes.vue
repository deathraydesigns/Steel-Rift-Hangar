<script setup>
import {useMechStore} from '../../../../store/mech-store.js';
import FormatNumber from '../../../functional/format-number.vue';
import {computed} from 'vue';
import {useTeamStore} from '../../../../store/team-store.js';
import {BDropdown} from 'bootstrap-vue-next';
import {useValidationStore} from '../../../../store/validation-store.js';
import IconNotAvailable from '../../../UI/IconNotAvailable.vue';

const mechStore = useMechStore();
const teamStore = useTeamStore();
const validationStore = useValidationStore();

const {mechId} = defineProps({
  mechId: Number,
});
const options = computed(() => teamStore.getAvailableMechSizes(mechId));

const mech = computed(() => mechStore.getMech(mechId));
const info = computed(() => mechStore.getMechInfo(mechId));
const valid = computed(() => !validationStore.teamGroupMechSizeInvalid(mechId));
const notAvailableMessage = computed(() => validationStore.getNotAvailableToTeamGroupMessage(mechId));

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
          class="dropdown-form dropdown-table d-inline-block"
          :toggle-class="{'border-danger': !valid}"
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
            <td></td>
          </tr>
          </thead>
          <tbody>
          <tr
              :class="{
                'dropdown-row': true,
                'table-selected':   (item.id == mech.size_id),
                'disabled': !item.valid
              }"
              v-for="item in options" :key="item.id"
              @click="selectOption(item.id)"
          >
            <td>
              {{ item.display_name }}
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
            <td class="notes">
              <IconNotAvailable
                  :valid="item.valid"
                  :validation-message="notAvailableMessage"
              />
            </td>
          </tr>
          </tbody>
        </table>
      </BDropdown>
      <IconNotAvailable
          size="md"
          btn-class="ms-1"
          :valid="valid"
          :validation-message="notAvailableMessage"
      />
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
        <format-number :val="info.size.armor + info.size.structure" :invert-color="true"/>
      </div>
    </td>
    <td></td>
  </tr>
</template>
