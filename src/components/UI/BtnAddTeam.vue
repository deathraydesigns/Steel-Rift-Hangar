<script setup lang="ts">
import { BDropdown, BDropdownItem } from 'bootstrap-vue-next';
import { storeToRefs } from 'pinia';
import { useTeamStore } from '../../store/team-store';
import SvgIcon from './Icon.vue';

const teamStore = useTeamStore();
const { addable_teams } = storeToRefs(teamStore);
</script>
<template>
  <BDropdown
    text="Add Team"
    variant="secondary"
    class="d-inline-block"
  >
    <BDropdownItem
      v-for="item in addable_teams"
      @click="teamStore.addTeamWithDefaultMechs(item.id)"
    >
      <SvgIcon :name="item.icon" />

      {{ item.display_name }}
    </BDropdownItem>
  </BDropdown>
</template>
