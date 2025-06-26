<script setup>

import {BPopover} from 'bootstrap-vue-next';

const {
  perks,
  size,
  btnClass,
} = defineProps({
  btnClass: {
    type: String,
    default: '',
  },
  perks: {
    type: Array,
  },
  size: {
    type: String,
    default: 'sm',
  },
});

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