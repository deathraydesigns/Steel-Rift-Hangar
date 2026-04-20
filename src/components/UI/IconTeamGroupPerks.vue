<script setup lang="ts">

import { BPopover } from 'bootstrap-vue-next';
import type { TeamPerkInfo } from '../../store/team-store';
import SvgIcon from './Icon.vue';

const {
  btnClass = '',
  perks,
  useFullDisplayName = false,
  size = 'sm',
} = defineProps<{
  btnClass?: string;
  perks: TeamPerkInfo[];
  useFullDisplayName?: boolean;
  size?: string;
}>();

</script>
<template>
  <BPopover>
    <template #target><span
      v-show="perks && perks.length"
      :class="`btn btn-${size} btn-default ${btnClass}`">

      <SvgIcon name="team-perk" />
    </span></template>

    <template #title>
      Group Perks
      <SvgIcon name="team-perk" />
    </template>

    <template v-for="perk in perks">
      <template v-if="useFullDisplayName">
        <div class="fw-bold">
          {{ perk.display_name }}:
        </div>
        <p class="p-gap">{{ perk.description }}</p>
      </template>
      <template v-else>

        <p class="p-gap">
          <strong>
            {{ perk.display_name_short || perk.display_name }}:
          </strong>
          {{ perk.description }}
        </p>
      </template>

    </template>
  </BPopover>
</template>