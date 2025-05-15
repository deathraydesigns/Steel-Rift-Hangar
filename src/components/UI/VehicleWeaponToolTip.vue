<script setup>

import BtnToolTip from './BtnToolTip.vue';

const {weapon} = defineProps({
  weapon: {
    type: Object,
  },
});
</script>
<template>
  <BtnToolTip>
    <template #target="{mouseover, mouseleave}">
      <span
          @mouseover="mouseover"
          @mouseleave="mouseleave"
          class="text-tooltip"
      >
        <span class="text-nowrap">{{ weapon.display_name }}</span>
      </span>
    </template>
    <template #content>
      <table class="table table-sm">
        <thead>
        <tr>
          <th>Damage</th>
          <th>Range</th>
          <th>Traits</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{weapon.damage}}</td>
          <td>{{weapon.range}}</td>
          <td>{{weapon.traits.map(t => t.display_name).join(', ')}}</td>
        </tr>
        </tbody>
      </table>
    </template>
  </BtnToolTip>
</template>