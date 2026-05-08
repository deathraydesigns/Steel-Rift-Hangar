<script setup lang="ts">

import { BPopover } from 'bootstrap-vue-next';
import { computed } from 'vue';
import SvgIcon from './Icon.vue';

const {
  title,
  messageArray,
  message = '',
  size = 'md',
  icon = '',
  btnClass = '',
  visible = null,
} = defineProps<{
  title?: string
  message?: string
  size?: string
  icon?: string
  btnClass?: string
  visible?: boolean | null
  messageArray?: string[]
}>();

const isVisible = computed(() => {
  if (visible === true || visible === false) {
    return visible;
  }

  return message || messageArray?.length;
});
</script>
<template>
  <BPopover>
    <template #target>
      <button
        v-show="isVisible"
        :class="`btn btn-${size} btn-danger ${btnClass}`">
        <SvgIcon :name="icon" v-if="icon" />
        <span class="material-symbols-outlined">
          warning
        </span>
      </button>
    </template>

    <template #title>
      {{ title || 'Validation Error' }}
      <span class="material-symbols-outlined">
        warning
      </span>
    </template>

    <ul v-if="(messageArray?.length ?? 0) > 1">
      <li v-for="message in messageArray">
        {{ message }}<br>
      </li>
    </ul>
    <template v-else-if="messageArray?.length === 1">
      {{ messageArray[0] }}
    </template>

    {{ message }}
    <slot name="default"></slot>
  </BPopover>
</template>