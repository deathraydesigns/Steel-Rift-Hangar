<script setup lang="ts">

import type { TeamGroupValidation } from '../../../../store/validation-store';

const { group, showTitle = true } = defineProps<{
  showTitle?: boolean,
  group: TeamGroupValidation
}>();
</script>

<template>
  <div class="fw-bold" v-show="showTitle">{{ group.display_name }}</div>
  <ul>
    <li v-for="message in group.validation_messages">
      {{ message }}
    </li>
    <li v-for="mech in group.mechs">
      <div><strong>{{ mech.info.display_name }}</strong> ({{ mech.info.size.display_name }})</div>
      <ul>
        <li v-for="message in mech.mech_validation_messages">
          {{ message }}
        </li>
        <li v-for="message in mech.group_validation_messages">
          {{ message }}
        </li>
      </ul>
    </li>
  </ul>
</template>