<script setup lang="ts">
import { BPopover } from 'bootstrap-vue-next';
import { computed } from 'vue';

const {
  required,
  reason = '',
  btnClass = '',
} = defineProps<{
  required: boolean;
  reason?: string | null;
  btnClass?: string;
}>();

const requiredReason = computed(() => {
  if (required && !reason) {
    return 'Required by Group';
  }
  return reason;
});
</script>
<template>
  <BPopover>
    <template #target>
      <button
        :class="`btn btn-sm btn-default btn-danger-light ${btnClass}`"
        v-show="required"
      >
        <span class="material-symbols-outlined">lock</span>
      </button>
    </template>

    {{ requiredReason }}
  </BPopover>
</template>