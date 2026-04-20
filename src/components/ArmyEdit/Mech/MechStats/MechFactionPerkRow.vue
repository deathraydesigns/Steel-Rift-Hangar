<script setup lang="ts">
import FormatNumber from '../../../functional/format-number.vue';
import BtnToolTip from '../../../UI/BtnToolTip.vue';

const {
  label = '',
  text = '',
  armor = 0,
  structure = 0,
  usedTons = 0,
  usedSlots = 0,
  description = '',

} = defineProps<{
  label?: string,
  text?: string,
  description?: string,
  armor?: number,
  structure?: number,
  usedTons?: number,
  usedSlots?: number,
}>();
</script>
<template>
  <tr>
    <td></td>
    <td>
      <label class="col-form-label">{{ label }}</label>
    </td>
    <td colspan="3" class="fw-bold">
      <BtnToolTip :enabled="!!description">
        <template #target>
          <span class="btn btn-default">
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
        <format-number v-if="armor" :val="armor" />
      </div>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <format-number v-if="structure" :val="structure" />
      </div>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <format-number v-if="usedSlots" :val="usedSlots" invert-color />
      </div>
    </td>
    <td class="text-end">
      <div class="col-form-label">
        <format-number v-if="usedTons" :val="usedTons" invert-color />
      </div>
    </td>
    <td></td>
  </tr>
</template>

