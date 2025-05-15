<script setup>

import {computed} from 'vue';
import {useTeamStore} from '../../../../store/team-store.js';
import {useMechStore} from '../../../../store/mech-store.js';
import {TEAM_GENERAL} from '../../../../data/mech-teams.js';

const mechStore = useMechStore();
const teamStore = useTeamStore();

const {mechId} = defineProps({
  mechId: {
    type: Number,
  },
});
const info = computed(() => mechStore.getMechInfo(mechId));

const team = computed(() => {
  const {teamId} = teamStore.getMechTeamAndGroupIds(mechId);
  return teamStore.getTeamInfo(teamId);
});

</script>
<template>
  <div class="row g-1">
    <div class="col-5">
      <div class="unit-info">
        <div class="hev-size">
          {{ info.size.display_name }} HE-V
        </div>
        <div class="hev-team" v-if="team.id !== TEAM_GENERAL">
          {{ team.display_name_short }}
          <Icon :name="team.icon" color="#000" size="16px"/>
        </div>
      </div>
    </div>
    <div class="col-7">
      <table class="table-card-stats">
        <thead>
        <tr>
          <th>Tng</th>
          <th>Mov</th>
          <th>Jmp</th>
          <th>Def</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ info.tonnage_stat }}</td>
          <td>{{ info.move }}"</td>
          <td>
            <template v-if="info.jump">{{ info.jump }}"</template>
            <template v-else>-</template>
          </td>
          <td>{{ info.defense }}+</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>