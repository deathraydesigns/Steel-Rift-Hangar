<script setup lang="ts">

const {
  meleeTotalDamage,
  meleeModifierDamage,
  meleeBaseDamage,
  damage,
  suffix = '',
} = defineProps<{
  meleeBaseDamage?: number | null,
  meleeModifierDamage?: number,
  meleeTotalDamage?: number,
  damage: number | null,
  suffix?: string
}>();
</script>
<template>
  <div v-if="meleeBaseDamage" class="text-end">
    <small class="fw-light">
      {{ meleeBaseDamage }}+{{ meleeModifierDamage }} =
    </small>
    {{ meleeTotalDamage }}
  </div>
  <template v-else>
    {{ damage }}{{ suffix }}
  </template>
</template>