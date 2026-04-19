<script setup lang="ts">
import { computed } from 'vue';

const {
  a,
  b,
  successClass,
} = defineProps<{
  a: number,
  b: number,
  successClass?: string | null
}>();

const containerClass = computed(() => {

  let success = (a == b);
  let result: any = {
    'text-success-emphasis': success,
  };

  if (successClass) {
    result[successClass] = success;
  }
  return result;
});
</script>
<template>
  <span :class="containerClass">
    <span :class="{
            'text-danger': (a > b)
          }">
      {{ a }}
    </span>/{{ b }}
  </span>
</template>