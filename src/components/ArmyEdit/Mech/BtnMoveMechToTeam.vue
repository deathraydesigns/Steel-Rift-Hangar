<script setup>
import {BDropdown, BDropdownDivider, BDropdownHeader, BDropdownItem} from 'bootstrap-vue-next';
import {useTeamStore} from '../../../store/team-store.js';
import {MECH_TEAM_ARRAY, MECH_TEAMS, TEAM_BENCH, TEAM_GENERAL} from '../../../data/mech-teams.js';
import {toaster} from '../../../toaster.js';
import {useMechStore} from '../../../store/mech-store.js';
import {computed} from 'vue';
import {sortBy} from 'es-toolkit';
import {groupBy} from 'es-toolkit/compat';

const teamStore = useTeamStore();
const mechStore = useMechStore();
const {
  mechId,
} = defineProps({
  mechId: {
    type: Number,
    required: true,
  },
});

function moveToTeam(teamId) {
  const {groupId} = teamStore.moveMechToTeam(mechId, teamId);

  const mech = mechStore.getMechInfo(mechId);
  const teamGroup = teamStore.getFullTeamGroupDisplayName(teamId, groupId);

  toaster().info(`${mech.display_name} moved to  ${teamGroup}`);
}

function teamExists(teamId) {
  return !!teamStore.findTeam(teamId);
}

const specialTeamTypes = computed(() => {
  const specialTeams = MECH_TEAM_ARRAY.filter(team => teamStore.isSpecialTeam(team.id));

  const grouped = groupBy(specialTeams, (team) => teamExists(team.id) ? 'existing' : 'notExisting');
  return {
    existing: [],
    notExisting: [],
    ...grouped,
  };
});
const sortTeamsByOriginalIndex = (team) => MECH_TEAM_ARRAY.indexOf(t => t.id === team.id);

const existingTeams = computed(() => {
  return [
    MECH_TEAMS[TEAM_GENERAL],
    MECH_TEAMS[TEAM_BENCH],
    ...sortBy(specialTeamTypes.value.existing, [sortTeamsByOriginalIndex]),
  ];
});
const notExistingTeams = computed(() => sortBy(specialTeamTypes.value.notExisting, [sortTeamsByOriginalIndex]));

const currentTeamId = computed(() => {
  const {teamId} = teamStore.getMechTeamAndGroupIds(mechId);
  return teamId;
});
</script>
<template>
  <BDropdown
      variant="secondary"
      class="d-inline-block"
  >
    <template #button-content>
      <span class="material-symbols-outlined">input</span>
    </template>
    <BDropdownHeader>
      Move To Existing
    </BDropdownHeader>

    <BDropdownItem
        v-for="item in existingTeams"
        :link-class="{'active': currentTeamId === item.id}"
        @click="moveToTeam(item.id)"
    >
      <Icon :name="item.icon"/>
      {{ item.display_name }}
    </BDropdownItem>
    <template v-if="notExistingTeams.length">
      <BDropdownDivider/>
      <BDropdownHeader>
        Move To New
      </BDropdownHeader>
    </template>
    <BDropdownItem
        v-for="item in notExistingTeams"
        :link-class="{'active': currentTeamId === item.id}"
        @click="moveToTeam(item.id)"
    >
      <Icon :name="item.icon"/>
      {{ item.display_name }}
    </BDropdownItem>
  </BDropdown>
</template>