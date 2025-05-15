<script setup>
import Number from '../../../functional/number.vue';
import BtnToolTip from '../../../UI/BtnToolTip.vue';

const {
  label,
  text,
  armor,
  structure,
  usedTons,
  usedSlots,
  description,

} = defineProps({
  label: {
    type: String,
  },
  text: {
    type: String,
  },
  description: {
    type: String,
  },
  usedSlots: {
    default: 0,
  },
  usedTons: {
    default: 0,
  },
  armor: {
    default: 0,
  },
  structure: {
    default: 0,
  },
});

</script>
<template>
  <tr>
    <td></td>
    <td>
      <label class="col-form-label">{{ label }}</label>
    </td>
    <td colspan="3" class="fw-bold">
      <BtnToolTip :enabled="!!description">
        <template #target="{mouseover, mouseleave}">
          <span
              @mouseover="mouseover"
              @mouseleave="mouseleave"
              class="btn btn-light"
          >
            {{ text }}
            <span class="material-symbols-outlined">flag</span>
          </span>
        </template>
        <template #content>
          <div class="fw-bold">{{ text }}</div>
          {{ description }}
        </template>
        <template #title>
          Faction Perk
          <span class="material-symbols-outlined">flag</span>
        </template>
      </BtnToolTip>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <number v-if="armor" :val="armor"/>
      </div>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <number v-if="structure" :val="structure"/>
      </div>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <number v-if="usedSlots" :val="usedSlots" invert-color/>
      </div>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <number v-if="usedTons" :val="usedTons" invert-color/>
      </div>
    </td>
    <td></td>
  </tr>
</template>

