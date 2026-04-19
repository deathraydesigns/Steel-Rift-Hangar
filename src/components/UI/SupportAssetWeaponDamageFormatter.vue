<script setup lang="ts">
import { sum } from 'es-toolkit';
import { computed } from 'vue';

const { damage, damageModifiers } = defineProps<{
  damage: number,
  damageModifiers: number[],
}>();

const total = computed(() => damage + sum(damageModifiers || []));

const modifiers = computed(() => {
  return damageModifiers.map((modifier) => {
    if (modifier > 0) {
      return `+${modifier}`;
    }
    return modifier;
  }).join('');
});
</script>
<template>
  <div v-if="damageModifiers?.length" class="text-nowrap">
    <small class="fw-light">
      {{ damage }}{{ modifiers }} =
    </small>
    {{ total }}
  </div>
  <template v-else>
    {{ damage }}
  </template>
</template>