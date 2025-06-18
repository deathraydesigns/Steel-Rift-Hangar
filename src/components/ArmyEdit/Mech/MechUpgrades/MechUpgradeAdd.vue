<script setup>
import {useMechStore} from '../../../../store/mech-store.js';
import {computed} from 'vue';
import IconTeamGroupPerks from '../../../UI/IconTeamGroupPerks.vue';
import IconNotAvailable from '../../../UI/IconNotAvailable.vue';
import TraitList from '../../../UI/TraitList.vue';
import IconFactionPerks from '../../../UI/IconFactionPerks.vue';
import BtnToolTip from '../../../UI/BtnToolTip.vue';
import {BDropdown} from 'bootstrap-vue-next';
import FormatNumber from '../../../functional/format-number.vue';

const {mechId} = defineProps({
  mechId: {
    type: Number,
    required: true,
  },
});

const mechStore = useMechStore();
const options = computed(() => mechStore.getMechAvailableUpgradesInfo(mechId));

function addUpgrade(upgradeId, valid, event) {
  if (!valid) {
    event.stopPropagation();
    return;
  }
  mechStore.addMechUpgradeAttachment(mechId, upgradeId);
}
</script>
<template>
  <BDropdown
      :id="'mech-input-upgrades-add-' + mechId"
      class="dropdown-table"
      text="Add"
      size="sm"
      variant="secondary"
      lazy
  >
    <div class="position-relative">
      <table class="table table-hover table-borderless table-striped">
        <thead class="sticky-top top-0 shadow">
        <tr>
          <td>
            Upgrade
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
          <td colspan="3">
            Notes
          </td>
        </tr>
        </thead>
        <tbody>
        <tr
            :class="{
              'dropdown-row': true,
              'disabled': !item.valid
            }"
            v-for="item in options" :key="item.upgrade_id"
            @click="addUpgrade(item.upgrade_id, item.valid, $event)"
        >
          <td>
            <BtnToolTip>
              <template #target="{mouseover, mouseleave}">
                <span
                    @mouseover="mouseover"
                    @mouseleave="mouseleave"
                    class="text-tooltip"
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
            <TraitList :traits="item.traits"/>
          </td>
          <td class="notes">
            <IconNotAvailable
                :valid="item.valid"
                :validation-message="item.validation_message"
            />
          </td>
          <td class="notes">
            <IconTeamGroupPerks
                btn-class="ms-1"
                :perks="item.team_perks"
            />
          </td>
          <td class="notes">
            <IconFactionPerks
                btn-class="ms-1"
                :perks="item.faction_perks"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </BDropdown>
</template>