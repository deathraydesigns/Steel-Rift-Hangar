<script setup lang="ts">
import { BDropdown, BDropdownItem, BPopover } from 'bootstrap-vue-next';
import { computed } from 'vue';
import { MECH_TEAM_ARRAY, MECH_TEAMS, type MechTeamId, TEAM_SHELF } from '../../../../data/mech-teams.js';
import { useMechStore } from '../../../../store/mech-store';

const mechStore = useMechStore();

const { mechId } = defineProps<{
  mechId: number
}>();

const preferredTeamId = computed(() => {
  const m = mechStore.getMech(mechId);
  if (!m) return null;
  return m.preferred_team_id;
});
const preferredTeam = computed(() => {
  if (!preferredTeamId.value) return;

  return MECH_TEAMS[preferredTeamId.value];
});

function setPreferredTeamId(teamId: MechTeamId) {
  mechStore.updateMech(mechId, {
    preferred_team_id: teamId,
  });
}

const preferredTeamOptions = computed(() => MECH_TEAM_ARRAY.filter(t => t.id !== TEAM_SHELF));
</script>
<template>
  <div class="fw-bold m-2">
    Preferred Team
    <BPopover>
      <template #target>
        <span class="btn btn-sm btn-overlay">
          ?
        </span>
      </template>

      <template #title>
        Preferred Team
      </template>
      <div class="fw-bold">
        Indicates what Team an HE-V is designed for.
      </div>
      <ul>
        <li>
          An HE-V's preferred Team is the last team it was in or it can be manually set when Shelved.
        </li>
        <li>
          Visible when the HE-V is Shelved or being Imported.
        </li>
      </ul>
    </BPopover>
  </div>
  <BDropdown
    variant="default"
    toggle-class="w-100"
  >
    <template #button-content>
      <template v-if="preferredTeam">
        <Icon :name="preferredTeam.icon" />
        {{ preferredTeam.display_name }}
      </template>
    </template>
    <BDropdownItem
      v-for="item in preferredTeamOptions"
      @click="setPreferredTeamId(item.id)"
      :link-class="{'active': item.id === preferredTeamId}"
    >
      <Icon :name="item.icon" />
      {{ item.display_name }}
    </BDropdownItem>
  </BDropdown>
</template>