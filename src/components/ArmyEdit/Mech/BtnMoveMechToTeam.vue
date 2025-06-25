<script setup>
import {BDropdown} from 'bootstrap-vue-next';
import {useTeamStore} from '../../../store/team-store.js';
import {toaster} from '../../../toaster.js';
import {useMechStore} from '../../../store/mech-store.js';
import {computed} from 'vue';
import TeamDropDownItems from '../../UI/TeamDropDownItems.vue';

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

const currentTeamId = computed({
  get() {
    const {teamId} = teamStore.getMechTeamAndGroupIds(mechId);
    return teamId;
  },
  set(teamId) {
    const {groupId} = teamStore.moveMechToTeam(mechId, teamId);

    const mech = mechStore.getMechInfo(mechId);
    const teamGroup = teamStore.getFullTeamGroupDisplayName(teamId, groupId);

    toaster().info(`${mech.display_name} moved to  ${teamGroup}`);
  },
});

</script>
<template>
  <BDropdown
      variant="secondary"
      class="d-inline-block"
      no-caret
  >
    <template #button-content>
      <span class="material-symbols-outlined">input</span>
    </template>
    <TeamDropDownItems v-model="currentTeamId"/>
  </BDropdown>
</template>