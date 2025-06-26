<script setup>
import {BDropdown, BDropdownItem, BPopover} from 'bootstrap-vue-next';
import {computed} from 'vue';
import {useMechStore} from '../../../../store/mech-store.js';
import {MECH_TEAM_ARRAY, MECH_TEAMS, TEAM_SHELF} from '../../../../data/mech-teams.js';

const mechStore = useMechStore();

const {mechId} = defineProps({
  mechId: {
    type: Number,
  },
});

const preferredTeamId = computed(() => mechStore.getMech(mechId).preferred_team_id);
const preferredTeam = computed(() => MECH_TEAMS[preferredTeamId.value]);

function setPreferredTeamId(teamId) {
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
        <Icon :name="preferredTeam.icon"/>
        {{ preferredTeam.display_name }}
      </template>
    </template>
    <BDropdownItem
        v-for="item in preferredTeamOptions"
        @click="setPreferredTeamId(item.id)"
        :link-class="{'active': item.id === preferredTeamId}"
    >
      <Icon :name="item.icon"/>
      {{ item.display_name }}
    </BDropdownItem>
  </BDropdown>
</template>