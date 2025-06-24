<script setup>
import {useTeamStore} from '../../../store/team-store.js';
import {computed} from 'vue';
import {MECH_TEAMS} from '../../../data/mech-teams.js';

const teamStore = useTeamStore();
const teamPerks = computed(() => {
  return teamStore.teams
      .filter((team) => teamStore.isSpecialTeam(team.id) && teamStore.getTeamMechCount(team.id))
      .map((team) => {
        return {
          ...MECH_TEAMS[team.id],
          perks: teamStore.getUsedTeamAbilityPerksInfo(team.id),
        };
      });
});
</script>
<template>
  <div v-for="team in teamPerks">
    <div v-if="team.perks.length">
      <div class="divider"></div>

      <div class="ref-heading">{{ team.display_name }}  <Icon :name="team.icon"/></div>
      <div v-for="perk in team.perks">
        <p class="p-gap">
          <span class="fw-bold">
            {{ perk.display_name }}:
          </span>
          {{ perk.description }}
        </p>
      </div>
    </div>
  </div>
</template>

