<script setup>
import {useMechStore} from '../../../../store/mech-store.js';
import {computed} from 'vue';
import IconTeamGroupPerks from '../../../UI/IconTeamGroupPerks.vue';
import IconRequiredByGroup from '../../../UI/IconRequiredByGroup.vue';
import BtnToolTip from '../../../UI/BtnToolTip.vue';
import TraitList from '../../../UI/TraitList.vue';
import IconFactionPerks from '../../../UI/IconFactionPerks.vue';
import {BButton} from 'bootstrap-vue-next';
import Number from '../../../functional/number.vue';

const mechStore = useMechStore();

const {
  mechId,
  mechUpgradeAttachmentId,
  index,
} = defineProps({
  mechId: Number,
  mechUpgradeAttachmentId: Number,
  index: Number,
});

const upgrade = computed(() => mechStore.getMechUpgradeAttachmentInfo(mechId, mechUpgradeAttachmentId));

function remove() {
  mechStore.removeMechUpgradeAttachment(mechId, mechUpgradeAttachmentId);
}

</script>
<template>
  <tr class="list-item-sortable tr-btn">
    <td class="table-btn-cell">
      <span class="btn btn-sm btn-light btn-grab me-2">:::</span>
    </td>
    <td>
      <BtnToolTip>
        <template #target="{mouseover, mouseleave}">
          <span
              @mouseover="mouseover"
              @mouseleave="mouseleave"
              class="text-tooltip"
          >
            {{ upgrade.display_name }}
          </span>
        </template>
        <template #content>
          {{ upgrade.description }}
        </template>
      </BtnToolTip>
    </td>
    <td colspan="3">
      <TraitList :traits="upgrade.traits"/>
    </td>
    <td class="table-btn-cell">
      <BButton
          v-if="!upgrade.required_by_group"
          @click="remove()"
          variant="danger"
          size="sm"
      >
        <span class="material-symbols-outlined">delete</span>
      </BButton>
      <IconRequiredByGroup :required="upgrade.required_by_group"/>
      <IconTeamGroupPerks
          :perks="upgrade.team_perks"
          class="ms-1"
      />
      <IconFactionPerks
          :perks="upgrade.faction_perks"
          class="ms-1"
      />
    </td>
    <td>
    </td>
    <td class="text-end">
      <number :val="upgrade.slots" :invert-color="true"/>
    </td>
    <td class="text-end">
      <number :val="upgrade.cost" :invert-color="true"/>
    </td>
    <td>
    </td>
  </tr>
</template>