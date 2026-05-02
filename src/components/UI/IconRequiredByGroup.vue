<script setup lang="ts">
import { BButton, BPopover } from 'bootstrap-vue-next';
import { computed } from 'vue';

const {
  required,
  reason = '',
  btnClass = '',
  size = 'md',
} = defineProps<{
  required: boolean;
  reason?: string | null;
  btnClass?: string;
  size?: string;
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
      <BButton
        :size="size as any"
        variant="default"
        :class="btnClass"
        v-show="required"
      >
        <span class="material-symbols-outlined">lock</span>
      </BButton>
    </template>

    {{ requiredReason }}
  </BPopover>
</template>