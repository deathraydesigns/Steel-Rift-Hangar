<script setup>

import BtnToolTip from './BtnToolTip.vue';

const {traits} = defineProps({
  traits: {
    type: Array,
  },
});
</script>
<template>
  <template v-for="(trait, index) in traits">
    <BtnToolTip :enabled="!!trait.description">
      <template #target="{mouseover, mouseleave}">
        <span
            v-show="traits.length"
            @mouseover="mouseover"
            @mouseleave="mouseleave"
            :class="{'text-tooltip': trait.description}"
        >
          <span class="text-nowrap">{{ trait.display_name }}</span>
        </span>
        <span v-if="index !== traits.length - 1">, </span>

      </template>
      <template #content>
        {{ trait.description }}
      </template>
    </BtnToolTip>
  </template>
</template>