<script setup lang="ts">
import { BDropdownDivider, BDropdownHeader, BDropdownItem } from 'bootstrap-vue-next';
import { groupBy, sortBy } from 'es-toolkit';
import { computed } from 'vue';
import { MECH_TEAM, MECH_TEAM_ARRAY, MECH_TEAMS, type MechTeam } from '../../data/mech-teams.js';
import { useTeamStore } from '../../store/team-store';
import SvgIcon from './Icon.vue';

const teamStore = useTeamStore();
const selectedTeamId = defineModel();

const specialTeamTypes = computed(() => {
  const specialTeams = MECH_TEAM_ARRAY.filter(team => teamStore.isSpecialTeam(team.id));
  return groupBy(specialTeams, (team) => {
    return !!teamStore.findTeam(team.id) ? 'existing' : 'notExisting';
  });
});
const sortTeamsByOriginalIndex = (team: MechTeam) => MECH_TEAM_ARRAY.findIndex((t) => t.id === team.id);

const existingTeams = computed(() => {
  return [
    MECH_TEAMS[MECH_TEAM.GENERAL],
    MECH_TEAMS[MECH_TEAM.SHELF],
    ...sortBy(specialTeamTypes.value.existing, [sortTeamsByOriginalIndex]),
  ];
});
const notExistingTeams = computed(() => sortBy(specialTeamTypes.value.notExisting, [sortTeamsByOriginalIndex]));

function selectTeam(teamId: MECH_TEAM) {
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
    <SvgIcon :name="item.icon" />
    {{ item.display_name }}
  </BDropdownItem>

  <template v-if="notExistingTeams.length">

    <BDropdownDivider />

    <BDropdownHeader>
      Move To New
    </BDropdownHeader>

    <BDropdownItem
      v-for="item in notExistingTeams"
      :link-class="{'active': selectedTeamId === item.id}"
      @click="selectTeam(item.id)"
    >
      <SvgIcon :name="item.icon" />
      {{ item.display_name }}
    </BDropdownItem>

  </template>
</template>