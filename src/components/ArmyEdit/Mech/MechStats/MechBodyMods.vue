<script setup lang="ts">
import { BDropdown } from 'bootstrap-vue-next';
import { computed } from 'vue';
import type { FactionPerk, FactionPerkInfo } from '../../../../data/faction-perks';
import { type MECH_BODY_MOD, MECH_BODY_MODS, type MechBodyModInfo } from '../../../../data/mech-body-mod';
import FormatNumber from '../../../functional/format-number.vue';
import IconFactionPerks from '../../../UI/IconFactionPerks.vue';
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
  factionPerks,
} = defineProps<{
  formId: string,
  label: string,
  modifierLabel: string,
  tonnage: number,
  armor: number | null,
  structure: number | null,
  factionPerks: FactionPerk[],
  options: MechBodyModInfo[],
  valid: boolean,
  validationMessage: string,
}>();

const model = defineModel<MECH_BODY_MOD>({ required: true });
const selectedValueLabel = computed(() => MECH_BODY_MODS[model.value].display_name);

function selectOption(value: MECH_BODY_MOD) {
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
            v-for="item in options" :key="item.id"
            :class="{
              'disabled': !item.valid,
              'dropdown-row': true,
              'table-selected':   (item.id === model)
            }"
            @click="selectOption(item.id)"
          >
            <td>
              {{ item.display_name }}
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
              <IconFactionPerks
                size="sm"
                btn-class="ms-1"
                :perks="item.faction_perks"
              />
            </td>
          </tr>
          </tbody>
        </table>
      </BDropdown>
      <IconNotAvailable
        btn-class="ms-1"
        size="sm"
        :valid="valid"
        :validation-message="validationMessage"
      />
      <IconFactionPerks
        size="md"
        btn-class="ms-1"
        :perks="factionPerks"
      />
      <slot name="after"></slot>
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
