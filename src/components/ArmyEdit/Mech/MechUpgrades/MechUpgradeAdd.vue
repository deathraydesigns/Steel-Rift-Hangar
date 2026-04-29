<script setup lang="ts">
import { BDropdown } from 'bootstrap-vue-next';
import { computed } from 'vue';
import type { MECH_UPGRADE } from '../../../../data/mech-upgrades';
import { useMechStore } from '../../../../store/mech-store';
import type { MechUpgradeInfo } from '../../../../types';
import FormatNumber from '../../../functional/format-number.vue';
import BtnToolTip from '../../../UI/BtnToolTip.vue';
import IconFactionPerks from '../../../UI/IconFactionPerks.vue';
import IconNotAvailable from '../../../UI/IconNotAvailable.vue';
import IconRequiredByGroup from '../../../UI/IconRequiredByGroup.vue';
import IconTeamGroupPerks from '../../../UI/IconTeamGroupPerks.vue';
import TraitList from '../../../UI/TraitList.vue';

const { mechId, options, text, type } = defineProps<{
  mechId: number,
  options: MechUpgradeInfo[],
  text: string,
  type: string,
}>();

const mechStore = useMechStore();

function addUpgrade(upgradeId: MECH_UPGRADE) {
  mechStore.addMechUpgradeAttachment(mechId, upgradeId);
}
</script>
<template>
  <BDropdown
    :id="'mech-input-upgrades-add-' + mechId"
    class="dropdown-table"
    :text="text"
    size="sm"
    variant="secondary"
    lazy
  >
    <div class="position-relative">
      <table class="table table-hover table-borderless table-striped">
        <thead class="sticky-top top-0 shadow">
        <tr>
          <td>
            {{ type }}
          </td>
          <td class="text-end">
            Slots
          </td>
          <td class="text-end">
            Tons
          </td>
          <td>
            Traits
          </td>
          <td colspan="4">
            Notes
          </td>
        </tr>
        </thead>
        <tbody>
        <tr
          :class="{
              'dropdown-row': true,
              'disabled': !item?.valid
            }"
          v-for="item in options" :key="item?.upgrade_id"
          @click="addUpgrade(item?.upgrade_id)"
        >
          <td>
            <BtnToolTip>
              <template #target>
                <span class="text-tooltip">
                  {{ item?.display_name }}
                </span>
              </template>
              <template #content>
                {{ item?.description }}
              </template>
            </BtnToolTip>
          </td>
          <td class="text-end">
            <format-number :val="item.slots" :invert-color="true" />
          </td>
          <td class="text-end">
            <format-number :val="item.cost" :invert-color="true" />
          </td>
          <td>
            <TraitList :traits="item.traits" />
          </td>
          <td class="notes">
            <IconRequiredByGroup
              :required="item.required_by_group"
              btn-class="ms-1"
            />
          </td>
          <td class="notes">
            <IconNotAvailable
              :valid="!!item?.valid"
              :validation-message="item?.validation_message ?? ''"
            />
          </td>
          <td class="notes">
            <IconTeamGroupPerks
              btn-class="ms-1"
              :perks="item?.team_perks ?? []"
            />
          </td>
          <td class="notes">
            <IconFactionPerks
              btn-class="ms-1"
              :perks="item?.faction_perks ?? []"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </BDropdown>
</template>