<script setup>
import {computed} from 'vue';
import {sum} from 'es-toolkit';

const {damage, damageModifiers} = defineProps({
  damage: {
    type: Number,
  },
  damageModifiers: {
    type: Array,
  },
});

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