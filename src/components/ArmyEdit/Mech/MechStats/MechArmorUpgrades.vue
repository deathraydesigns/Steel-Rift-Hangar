<script setup>
import {computed} from 'vue';
import FormatNumber from '../../../functional/format-number.vue';
import {useMechStore} from '../../../../store/mech-store.js';
import IconTeamGroupPerks from '../../../UI/IconTeamGroupPerks.vue';
import IconNotAvailable from '../../../UI/IconNotAvailable.vue';
import BtnToolTip from '../../../UI/BtnToolTip.vue';
import {BDropdown} from 'bootstrap-vue-next';
import {useValidationStore} from '../../../../store/validation-store.js';

const mechStore = useMechStore();
const validationStore = useValidationStore();

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
const options = computed(() => mechStore.getMechAvailableArmorUpgrades(mechId));

const armorUpgrade = computed(() => {
  const {armor_upgrade_id} = mechStore.getMech(mechId);
  return mechStore.getMechArmorUpgradeInfo(mechId, armor_upgrade_id);
});

const info = computed(() => mechStore.getMechArmorUpgradeAttachmentInfo(mechId));

function selectOption(value) {
  model.value = value;
}

</script>

<template>
  <tr>
    <td></td>
    <td>
      <label class="col-form-label" :for="'mech-input-armor-upgrade-' + mechId">{{ label }}</label>
    </td>
    <td colspan="3">
      <BDropdown
          :id="'mech-input-armor-upgrade-' + mechId"
          class="dropdown-form dropdown-table d-inline-block"
          :toggle-class="{'border-danger': !info.valid}"
          :text="armorUpgrade.display_name"
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
              <format-number :val="item.slots" :invert-color="true"/>
            </td>
            <td class="text-end">
              <format-number :val="item.cost" :invert-color="true"/>
            </td>
            <td class="notes">
              <IconTeamGroupPerks
                  btn-class="me-1"
                  :perks="item.team_perks"
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
          :perks="armorUpgrade.team_perks"
      />
      <BtnToolTip
          :enabled="!!armorUpgrade.description">
        <template #target="{mouseover, mouseleave}">
          <span
              @mouseover="mouseover"
              @mouseleave="mouseleave"
              class="btn btn-md btn-default ms-1"
          >
            <span class="material-symbols-outlined">shield_question</span>
          </span>
        </template>
        <template #content>
          {{ armorUpgrade.description }}
        </template>
      </BtnToolTip>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <format-number :val="armorUpgrade.armor_mod" invert-color/>
      </div>
    </td>
    <td class="text-end">
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <format-number :val="armorUpgrade.slots" invert-color/>
      </div>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <format-number :val="armorUpgrade.cost" invert-color/>
      </div>
    </td>
    <td></td>
  </tr>
</template>
