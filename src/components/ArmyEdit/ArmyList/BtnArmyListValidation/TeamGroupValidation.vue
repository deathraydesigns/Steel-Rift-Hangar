<script setup>

const {group} = defineProps({
  group: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="fw-bold">{{ group.display_name }}</div>
  <ul>
    <li v-for="mech in group.mechs">
      <div class="fw-bold">{{ mech.info.display_name }} ({{ mech.info.size.display_name }})</div>
      <ul>
        <li v-for="message in mech.group_validation_messages">
          {{ message }}
        </li>
        <li v-for="message in mech.mech_validation_messages">
          {{ message }}
        </li>
      </ul>
    </li>
  </ul>
</template>