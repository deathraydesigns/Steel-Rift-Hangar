<script setup>
import {computed, inject} from 'vue';
import {useTeamStore} from '../../../../store/team-store.js';
import {useMechStore} from '../../../../store/mech-store.js';
import {TEAM_GENERAL} from '../../../../data/mech-teams.js';
import FormatInches from '../../../functional/format-inches.vue';
const prefix = inject('store-prefix', '')

const mechStore = useMechStore(prefix);
const teamStore = useTeamStore(prefix);

const {mechId} = defineProps({
  mechId: {
    type: Number,
  },
});
const info = computed(() => mechStore.getMechInfo(mechId));

const team = computed(() => {
  const {teamId} = teamStore.getMechTeamAndGroupIds(mechId);
  return teamStore.getTeamDef(teamId);
});
</script>
<template>
  <div class="row g-1">
    <div class="col-5">
      <div class="unit-info">
        <div class="hev-size">
          {{ info.size.display_name }} HE-V
        </div>
        <div class="hev-team" v-if="teamStore.isSpecialTeam(team.id)">
          {{ team.display_name_short }}
          <Icon :name="team.icon"/>
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
          <td>
            <format-inches :value="info.move"/>
          </td>
          <td>
            <format-inches :value="info.jump"/>
          </td>
          <td>{{ info.defense }}+</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>