<script setup>
import {storeToRefs} from 'pinia';
import {useTeamStore} from '../../../store/team-store.js';
import MechTeam from '../MechTeam/MechTeam.vue';
import {computed} from 'vue';
import {TEAM_SHELF, TEAM_GENERAL} from '../../../data/mech-teams.js';
import MechTeamGroup from '../MechTeam/MechTeamGroup.vue';
import BtnAddTeam from '../../UI/BtnAddTeam.vue';
import {BButton} from 'bootstrap-vue-next';

const teamStore = useTeamStore();
const {special_teams} = storeToRefs(teamStore);

const baseMechCount = computed(() => teamStore.getTeamMechCount(TEAM_GENERAL) || teamStore.getTeamMechCount(TEAM_SHELF) );

function addGeneralMech() {
  teamStore.addMechToTeamWithDefaults(TEAM_GENERAL, 'A');
}

</script>
<template>
  <MechTeamGroup
      :team-id="TEAM_SHELF"
      group-id="A"
      v-show="baseMechCount"
  />

  <MechTeamGroup
      :team-id="TEAM_GENERAL"
      group-id="A"
      v-show="baseMechCount"
  />

  <div class="text-end">
    <BButton
        variant="secondary"
        class="me-1"
        @click="addGeneralMech"
        v-if="!baseMechCount"
    >
      Add
      <Icon name="hev"/>
    </BButton>
    <BtnAddTeam/>
  </div>
  <MechTeam
      v-for="team in special_teams"
      :key="team.id"
      :team-id="team.id"
  />
  <div class="d-flex">
    <div class="flex-grow-1"></div>
    <div class="">
      <BtnAddTeam v-if="special_teams.length"/>
    </div>
  </div>
</template>