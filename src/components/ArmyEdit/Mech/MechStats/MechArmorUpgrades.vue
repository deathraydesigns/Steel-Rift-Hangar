<script setup lang="ts">
import { BDropdown } from 'bootstrap-vue-next';
import { computed } from 'vue';
import type { MECH_ARMOR_UPGRADE } from '../../../../data/mech-armor-upgrades';
import { TEAM_PERK } from '../../../../data/mech-team-perks';
import { useMechStore } from '../../../../store/mech-store';
import { useValidationStore } from '../../../../store/validation-store';
import FormatNumber from '../../../functional/format-number.vue';
import BtnToolTip from '../../../UI/BtnToolTip.vue';
import IconNotAvailable from '../../../UI/IconNotAvailable.vue';
import IconRequiredByGroup from '../../../UI/IconRequiredByGroup.vue';
import IconTeamGroupPerks from '../../../UI/IconTeamGroupPerks.vue';
import IconValidationError from '../../../UI/IconValidationError.vue';

const mechStore = useMechStore();
const validationStore = useValidationStore();

const {
  label,
  mechId,
  isAuxInput,
} = defineProps<{
  label: string,
  mechId: number,
  isAuxInput?: true,
}>();

const model = defineModel<MECH_ARMOR_UPGRADE>({ required: true });
const options = computed(() => mechStore.getMechAvailableArmorUpgrades(mechId, isAuxInput));
const info = computed(() => mechStore.getMechArmorUpgradeInfo(mechId, model.value, isAuxInput)!);
const validationMessages = computed(() => validationStore.mechTeamGroupArmorUpgradeMessages(mechId));

function selectOption(value: MECH_ARMOR_UPGRADE) {
  model.value = value;
}
</script>
<template>
  <tr>
    <td><IconValidationError
      size="sm"
      :message-array="validationMessages"
    /></td>
    <td>
      <label class="col-form-label" :for="'mech-input-armor-upgrade-' + mechId">{{ label }}</label>
    </td>
    <td colspan="3">
      <BDropdown
        :id="'mech-input-armor-upgrade-' + mechId"
        class="dropdown-form dropdown-table d-inline-block"
        :toggle-class="{'border-danger': !info.valid}"
        :text="info.display_name"
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
            <td class="text-end">
              Tons Used
            </td>
            <td></td>
            <td></td>
          </tr>
          </thead>
          <tbody>
          <tr
            :class="{
                'dropdown-row': true,
                'table-selected':   (item.id == model),
                'disabled': !item.valid,
              }"
            v-for="item in options" :key="item.id"
            @click="selectOption(item.id)"
          >
            <td>
              <BtnToolTip
                :enabled="!!item.description">
                <template #target>
                  <span :class="{'text-tooltip': item.description}">
                    {{ item.display_name }}
                  </span>
                </template>
                <template #content>
                  {{ item.description }}
                </template>
              </BtnToolTip>
            </td>
            <td class="text-end">
              <format-number :val="item.slots" :invert-color="true" />
            </td>
            <td class="text-end">
              <format-number :val="item.cost" :invert-color="true" />
            </td>
            <td class="notes">
              <IconTeamGroupPerks
                btn-class="me-1"
                :perks="item.team_perks.filter(p => p.id !== TEAM_PERK.AUX_DEFENSE_CONFIG)"
              />
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
        size="md"
        btn-class="ms-1"
        :valid="info.valid"
        :validation-message="info.validation_message"
      />
      <IconTeamGroupPerks
        size="md"
        btn-class="ms-1"
        :perks="info.team_perks"
      />
      <IconRequiredByGroup
        :required="info.required_by_group"
        :reason="info.required_by_group_reason"
        btn-class="ms-1"
      />
      <BtnToolTip :enabled="!!info.description">
        <template #target>
          <span
            class="btn btn-md btn-default ms-1"
          >
            <span class="material-symbols-outlined">shield_question</span>
          </span>
        </template>
        <template #content>
          {{ info.description }}
        </template>
      </BtnToolTip>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <format-number :val="info.armor_mod" invert-color />
      </div>
    </td>
    <td class="text-end">
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <format-number :val="info.slots" invert-color />
      </div>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <format-number :val="info.cost" invert-color />
      </div>
    </td>
    <td></td>
  </tr>
</template>
