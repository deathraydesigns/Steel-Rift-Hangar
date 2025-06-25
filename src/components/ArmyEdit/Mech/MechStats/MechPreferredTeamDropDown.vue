<script setup>
import {BDropdown, BDropdownItem, BPopover} from 'bootstrap-vue-next';
import {computed} from 'vue';
import {useMechStore} from '../../../../store/mech-store.js';
import {MECH_TEAM_ARRAY, MECH_TEAMS} from '../../../../data/mech-teams.js';

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
</script>
<template>
  <div class="fw-bold m-2">
    Preferred Team
    <BPopover
        :delay="{show: 100, hide: 0}"
    >
      <template #target>
        <span class="btn btn-sm btn-overlay">
          ?
        </span>
      </template>
      Used for reference when the HE-V is Benched and when importing this HE-V to another Army List.
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
        v-for="item in MECH_TEAM_ARRAY"
        @click="setPreferredTeamId(item.id)"
    >
      <Icon :name="item.icon"/>
      {{ item.display_name }}
    </BDropdownItem>
  </BDropdown>
</template>