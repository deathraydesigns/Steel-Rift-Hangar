<script setup>
import {BDropdown, BDropdownDivider, BDropdownGroup, BDropdownHeader, BDropdownItem} from 'bootstrap-vue-next';
import {computed} from 'vue';
import {useTeamStore} from '../../../store/team-store.js';
import {MECH_TEAMS} from '../../../data/mech-teams.js';

const teamStore = useTeamStore();

const addable_teams = computed(() => {
  return teamStore.teams.map(team => {
    const teamDef = teamStore.getTeamDef(team.id);

    return {
      id: team.id,
      display_name: teamStore.getTeamDisplayName(team.id),
      icon: MECH_TEAMS[team.id].icon || '',
      groups: Object.values(teamDef.groups).map((group) => {
        return {
          id: group.id,
          display_name: group.display_name,
        };
      }),
    };
  });
});

const {
  mechId,
} = defineProps({
  mechId: {
    type: Number,
    required: true,
  },
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
      Move to Team
    </BDropdownHeader>
    <BDropdownDivider/>
    <BDropdownGroup
        v-for="item in addable_teams"
    >
      <BDropdownHeader>
        <Icon :name="item.icon"/>
        {{ item.display_name }}
      </BDropdownHeader>
      <BDropdownItem
          v-for="group in item.groups"
          @click="teamStore.moveMechToTeamGroup(item.id, group.id, mechId)"
      >
        <div class="ps-4">
          {{ group.display_name }}
        </div>
      </BDropdownItem>
    </BDropdownGroup>
  </BDropdown>
</template>