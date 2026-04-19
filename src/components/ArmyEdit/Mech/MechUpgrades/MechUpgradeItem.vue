<script setup lang="ts">
import { BButton } from 'bootstrap-vue-next';
import { computed } from 'vue';
import { useMechStore } from '../../../../store/mech-store';
import FormatNumber from '../../../functional/format-number.vue';
import BtnToolTip from '../../../UI/BtnToolTip.vue';
import IconFactionPerks from '../../../UI/IconFactionPerks.vue';
import IconNotAvailable from '../../../UI/IconNotAvailable.vue';
import IconRequiredByGroup from '../../../UI/IconRequiredByGroup.vue';
import IconTeamGroupPerks from '../../../UI/IconTeamGroupPerks.vue';
import TraitList from '../../../UI/TraitList.vue';

const mechStore = useMechStore();

const {
  mechId,
  mechUpgradeAttachmentId,
  index,
} = defineProps<{
  mechId: number,
  mechUpgradeAttachmentId: number,
  index: number,
}>();

const upgrade = computed(() => mechStore.getMechUpgradeAttachmentInfo(mechId, mechUpgradeAttachmentId));

function remove() {
  mechStore.removeMechUpgradeAttachment(mechId, mechUpgradeAttachmentId);
}

</script>
<template>
  <tr
    :class="{
        'list-item-sortable tr-btn': true,
        'table-danger-subtle': !upgrade.valid
      }"
    v-if="upgrade"
  >
    <td class="table-btn-cell">
      <span class="btn btn-sm btn-grab-upgrade btn-transparent me-2">:::</span>
    </td>
    <td>
      <BtnToolTip>
        <template #target>
          <span class="text-tooltip">
            {{ upgrade.display_name }}
          </span>
        </template>
        <template #content>
          {{ upgrade.description }}
        </template>
      </BtnToolTip>
    </td>
    <td colspan="3">
      <TraitList :traits="upgrade.traits" />
    </td>
    <td class="table-btn-cell" colspan="2">
      <BButton
        @click="remove()"
        variant="danger"
        size="sm"
        class="me-1"
      >
        <span class="material-symbols-outlined">delete</span>
      </BButton>
      <IconNotAvailable
        btn-class="me-1"
        :valid="upgrade.valid"
        :validation-message="upgrade.validation_message ?? ''"
      />
      <IconRequiredByGroup
        :required="upgrade.required_by_group"
        btn-class="me-1"
      />
      <IconTeamGroupPerks
        :perks="upgrade.team_perks"
        btn-class="me-1"
      />
      <IconFactionPerks
        :perks="upgrade.faction_perks"
        btn-class="me-1"
      />
    </td>
    <td class="text-end">
      <format-number :val="upgrade.slots" :invert-color="true" />
    </td>
    <td class="text-end">
      <format-number :val="upgrade.cost!" :invert-color="true" />
    </td>
    <td>
    </td>
  </tr>
</template>