<script setup>
import {MECH_BODY_MODS} from '../../../../data/mech-body.js';
import {computed} from 'vue';
import IconNotAvailable from '../../../UI/IconNotAvailable.vue';

const {
  formId,
  label,
  tonnage,
  armor,
  structure,
  options,
} = defineProps({
  formId: {
    type: String,
  },
  label: {
    type: String,
  },
  modifierLabel: {
    type: String,
  },
  tonnage: {
    default: 0,
  },
  armor: {
    default: 0,
  },
  structure: {
    default: 0,
  },
  options: {
    required: true,
    type: Array,
  },
});

const model = defineModel();
const selectedValueLabel = computed(() => {
  return MECH_BODY_MODS[model.value].display_name;
});

function selectOption(value) {
  model.value = value;
}
</script>
<template>
  <tr>
    <td></td>
    <td>
      <label class="col-form-label" :for="formId">{{ label }}</label>
    </td>
    <td colspan="3">
      <BDropdown
          :id="formId"
          class="dropdown-form dropdown-table"
          variant="light"
          :text="selectedValueLabel"
          lazy
      >
        <table class="table table-hover table-borderless">
          <thead>
          <tr>
            <td>
              Type
            </td>
            <td class="text-end">
              {{ modifierLabel }}
            </td>
            <td class="text-end">
              Tons Used
            </td>
            <td></td>
          </tr>
          </thead>
          <tbody>
          <tr
              :class="{
                'disabled': !item.valid,
                'dropdown-row': true,
                'table-primary':   (item.value == model)
              }"
              v-for="item in options" :key="item.value"
              @click="selectOption(item.value)"
          >
            <td>
              {{ item.text }}
            </td>
            <td class="text-end">
              <number :val="item.modifier"/>
            </td>
            <td class="text-end">
              <number :val="item.max_tons" invert invert-color/>
            </td>
            <td class="notes">
              <IconNotAvailable
                  :valid="item.valid"
                  :validation_message="item.validation_message"
              />
            </td>
          </tr>
          </tbody>
        </table>
      </BDropdown>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <number :val="armor" v-if="armor !== null"/>
      </div>
    </td>
    <td class="text-end">
      <div class="col-form-label">

        <number :val="structure" v-if="structure !== null"/>
      </div>
    </td>
    <td></td>
    <td class="text-end">
      <div class="col-form-label">
        <number :val="tonnage" :invert-color="true"/>
      </div>
    </td>
    <td></td>
  </tr>
</template>
