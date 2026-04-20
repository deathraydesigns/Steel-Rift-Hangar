<script setup lang="ts">
import { BPopover } from 'bootstrap-vue-next';
import { computed } from 'vue';
import { MECH_TEAMS, type MechTeamId } from '../../data/mech-teams.js';
import SvgIcon from './Icon.vue';

const {
  teamId,
  show = false,
  btnClass = '',
} = defineProps<{
  show: boolean,
  teamId: MechTeamId,
  btnClass: string,
}>();

const visible = computed(() => show);
const team = computed(() => MECH_TEAMS[teamId] || {});
</script>
<template>
  <BPopover>
    <template #target>
      <span
        :class="`btn btn-transparent ${btnClass}`"
        v-show="visible"
      >
        <SvgIcon :name="team.icon" v-if="team.icon" />
      </span>
    </template>
    <div class="text-center">

      Preferred Team
      <div class="fw-bold">
        {{ team.display_name }}
      </div>
    </div>
  </BPopover>
</template>