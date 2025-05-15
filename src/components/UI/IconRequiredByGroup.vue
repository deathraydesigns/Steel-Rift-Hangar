<script setup>
import {computed} from 'vue';

const {required, reason} = defineProps({
  required: {
    type: Boolean,
  },
  reason: {},
});

const requiredReason = computed(() => {
  if (required && !reason) {
    return 'Required by Group';
  }
  return reason;
});
</script>
<template>
  <BPopover
      :hover="true"
      :close-on-hide="true"
      :delay="{show: 100, hide: 0}"
  >
    <template #target>
      <button
          class="btn btn-sm btn-danger btn-danger-light"
          v-show="required"
      >
        <span class="material-symbols-outlined">lock</span>
      </button>
    </template>

    {{ requiredReason }}
  </BPopover>
</template>