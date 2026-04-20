<script setup lang="ts">
import { BDropdown } from 'bootstrap-vue-next';
import { computed } from 'vue';
import { useMechStore } from '../../../store/mech-store';
import { useTeamStore } from '../../../store/team-store';
import { toaster } from '../../../toaster.js';
import TeamDropDownItems from '../../UI/TeamDropDownItems.vue';

const teamStore = useTeamStore();
const mechStore = useMechStore();

const {
  mechId,
} = defineProps<{
  mechId: number
}>();

const currentTeamId = computed({
  get() {
    const { teamId } = teamStore.getMechTeamAndGroupIds(mechId);
    return teamId;
  },
  set(teamId) {
    const { groupId } = teamStore.moveMechToTeam(mechId, teamId);

    const mech = mechStore.getMechInfo(mechId);
    const teamGroup = teamStore.getFullTeamGroupDisplayName(teamId, groupId);

    toaster().info(`${mech?.display_name} moved to  ${teamGroup}`);
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
    <TeamDropDownItems v-model="currentTeamId" />
  </BDropdown>
</template>