<script setup>

const {} = defineProps({
  meleeBaseDamage: {
    type: Number,
  },
  meleeModifierDamage: {
    type: Number,
  },
  meleeTotalDamage: {
    type: Number,
  },
  damage: {
    required: true,
  },
  suffix: {
    type: String,
  },
});
</script>
<template>
  <div v-if="meleeBaseDamage" class="text-end">
    <small class="fw-light">
      {{ meleeBaseDamage }}+{{ meleeModifierDamage }} =
    </small>
    {{ meleeTotalDamage }}
  </div>
  <template v-else>
    {{ damage }}{{suffix}}
  </template>
</template>