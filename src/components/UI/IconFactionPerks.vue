<script setup lang="ts">
import { BPopover } from 'bootstrap-vue-next';
import type { FactionPerk } from '../../data/faction-perks';

const {
  perks,
  size = 'sm',
  btnClass = '',
} = defineProps<{
  btnClass?: string;
  perks: FactionPerk[];
  size?: string;
}>();

</script>
<template>
  <BPopover>
    <template #target><span
      v-show="perks && perks.length"
      :class="`btn btn-${size} btn-default ${btnClass}`">

      <span class="material-symbols-outlined">
        flag
      </span>
    </span></template>

    <template #title>
      Faction Perks
      <span class="material-symbols-outlined">
        flag
      </span>
    </template>

    <template v-for="perk in perks">
      <div class="fw-bold">
        {{ perk.display_name }}:
      </div>
      <p class="p-gap">{{ perk.description }}</p>
    </template>
  </BPopover>
</template>