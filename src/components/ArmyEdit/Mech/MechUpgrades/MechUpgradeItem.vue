<script setup>
import {useMechStore} from '../../../../store/mech-store.js';
import {computed} from 'vue';
import IconTeamGroupPerks from '../../../UI/IconTeamGroupPerks.vue';
import IconRequiredByGroup from '../../../UI/IconRequiredByGroup.vue';
import BtnToolTip from '../../../UI/BtnToolTip.vue';
import TraitList from '../../../UI/TraitList.vue';
import IconFactionPerks from '../../../UI/IconFactionPerks.vue';
import {BButton} from 'bootstrap-vue-next';
import FormatNumber from '../../../functional/format-number.vue';
import IconNotAvailable from '../../../UI/IconNotAvailable.vue';

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
  <tr
      :class="{
        'list-item-sortable tr-btn': true,
        'table-danger-subtle': !upgrade.valid
      }"
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
      <TraitList :traits="upgrade.traits"/>
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
          :validation-message="upgrade.validation_message"
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
      <format-number :val="upgrade.slots" :invert-color="true"/>
    </td>
    <td class="text-end">
      <format-number :val="upgrade.cost" :invert-color="true"/>
    </td>
    <td>
    </td>
  </tr>
</template>