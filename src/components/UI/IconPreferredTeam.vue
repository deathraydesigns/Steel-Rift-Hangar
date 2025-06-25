<script setup>
import {BPopover} from 'bootstrap-vue-next';
import {computed} from 'vue';
import {MECH_TEAMS} from '../../data/mech-teams.js';

const {
  teamId,
  show,
  btnClass,
} = defineProps({
  show: Boolean,
  teamId: String,
  btnClass: String,
});

const visible = computed(() => show);
const team = computed(() => MECH_TEAMS[teamId] || {});
</script>
<template>
  <BPopover
      :delay="{show: 100, hide: 0}"
  >
    <template #target>
      <span
          :class="`btn btn-transparent ${btnClass}`"
          v-show="visible"
      >
        <Icon :name="team.icon" v-if="team.icon"/>
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