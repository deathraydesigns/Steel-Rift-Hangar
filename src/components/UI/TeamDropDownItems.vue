<script setup>
import {BDropdownDivider, BDropdownHeader, BDropdownItem} from 'bootstrap-vue-next';
import {computed} from 'vue';
import {sortBy} from 'es-toolkit';
import {groupBy} from 'es-toolkit/compat';
import {useTeamStore} from '../../store/team-store.js';
import {MECH_TEAM_ARRAY, MECH_TEAMS, TEAM_SHELF, TEAM_GENERAL} from '../../data/mech-teams.js';

const teamStore = useTeamStore();
const selectedTeamId = defineModel();

const specialTeamTypes = computed(() => {
  const specialTeams = MECH_TEAM_ARRAY.filter(team => teamStore.isSpecialTeam(team.id));

  const grouped = groupBy(specialTeams, (team) => {
    return !!teamStore.findTeam(team.id) ? 'existing' : 'notExisting'
  });

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
    MECH_TEAMS[TEAM_SHELF],
    ...sortBy(specialTeamTypes.value.existing, [sortTeamsByOriginalIndex]),
  ];
});
const notExistingTeams = computed(() => sortBy(specialTeamTypes.value.notExisting, [sortTeamsByOriginalIndex]));

function selectTeam(teamId) {
  selectedTeamId.value = teamId;
}
</script>
<template>

  <BDropdownHeader>
    Move To Existing
  </BDropdownHeader>

  <BDropdownItem
      v-for="item in existingTeams"
      :link-class="{'active': selectedTeamId === item.id}"
      @click="selectTeam(item.id)"
  >
    <Icon :name="item.icon"/>
    {{ item.display_name }}
  </BDropdownItem>

  <template v-if="notExistingTeams.length">

    <BDropdownDivider/>

    <BDropdownHeader>
      Move To New
    </BDropdownHeader>

    <BDropdownItem
        v-for="item in notExistingTeams"
        :link-class="{'active': selectedTeamId === item.id}"
        @click="selectTeam(item.id)"
    >
      <Icon :name="item.icon"/>
      {{ item.display_name }}
    </BDropdownItem>

  </template>
</template>