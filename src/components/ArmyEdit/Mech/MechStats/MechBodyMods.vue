<script setup lang="ts">
import { BDropdown } from 'bootstrap-vue-next';
import { computed } from 'vue';
import { MECH_BODY_MODS, type MechBodyModId } from '../../../../data/mech-body';
import FormatNumber from '../../../functional/format-number.vue';
import IconNotAvailable from '../../../UI/IconNotAvailable.vue';

const {
  formId,
  label,
  tonnage = 0,
  armor = 0,
  structure = 0,
  options,
  valid,
  validationMessage,
} = defineProps<{
  formId: string,
  label: string,
  modifierLabel: string,
  tonnage: number,
  armor: number | null,
  structure: number | null,
  options: {
    value: MechBodyModId,
    text: string,
    modifier: number,
    max_tons: number,
    valid: boolean,
    validation_message: string | null,
  }[],
  valid: boolean,
  validationMessage: string,
}>();

const model = defineModel<MechBodyModId>({ required: true });
const selectedValueLabel = computed(() => MECH_BODY_MODS[model.value].display_name);

function selectOption(value: MechBodyModId) {
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
        class="dropdown-form dropdown-table d-inline-block"
        :toggle-class="{'border-danger': !valid}"
        variant="default"
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
                'table-selected':   (item.value == model)
              }"
            v-for="item in options" :key="item.value"
            @click="selectOption(item.value)"
          >
            <td>
              {{ item.text }}
            </td>
            <td class="text-end">
              <format-number :val="item.modifier" />
            </td>
            <td class="text-end">
              <format-number :val="item.max_tons" invert invert-color />
            </td>
            <td class="notes">
              <IconNotAvailable
                :valid="item.valid"
                :validation-message="item.validation_message"
              />
            </td>
          </tr>
          </tbody>
        </table>
      </BDropdown>
      <IconNotAvailable
        btn-class="ms-1"
        size="md"
        :valid="valid"
        :validation-message="validationMessage"
      />
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <format-number :val="armor" v-if="armor !== null" />
      </div>
    </td>
    <td class="text-end">
      <div class="col-form-label">

        <format-number :val="structure" v-if="structure !== null" />
      </div>
    </td>
    <td></td>
    <td class="text-end">
      <div class="col-form-label">
        <format-number :val="tonnage" :invert-color="true" />
      </div>
    </td>
    <td></td>
  </tr>
</template>
