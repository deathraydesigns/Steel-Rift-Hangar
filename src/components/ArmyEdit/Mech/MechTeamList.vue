<script setup lang="ts">
import { BButton } from 'bootstrap-vue-next';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { MECH_TEAM } from '../../../data/mech-teams.js';
import { useTeamStore } from '../../../store/team-store';
import BtnAddTeam from '../../UI/BtnAddTeam.vue';
import SvgIcon from '../../UI/Icon.vue';
import MechTeam from '../MechTeam/MechTeam.vue';
import MechTeamGroup from '../MechTeam/MechTeamGroup.vue';

const teamStore = useTeamStore();
const { special_teams } = storeToRefs(teamStore);

const baseMechCount = computed(() => teamStore.getTeamMechCount(MECH_TEAM.GENERAL) || teamStore.getTeamMechCount(MECH_TEAM.SHELF));

function addGeneralMech() {
  teamStore.addMechToTeamWithDefaults(MECH_TEAM.GENERAL, 'A');
}

</script>
<template>
  <MechTeamGroup
    :team-id="MECH_TEAM.SHELF"
    group-id="A"
    v-show="baseMechCount"
  />

  <MechTeamGroup
    :team-id="MECH_TEAM.GENERAL"
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
      <SvgIcon name="hev" />
    </BButton>
    <BtnAddTeam />
  </div>
  <MechTeam
    v-for="team in special_teams"
    :key="team.id"
    :team-id="team.id"
  />
  <div class="d-flex">
    <div class="flex-grow-1"></div>
    <div class="">
      <BtnAddTeam v-if="special_teams.length" />
    </div>
  </div>
</template>