<script setup lang="ts">
import type { SupportAssetWeaponInfoNote } from '../../data/support-asset-weapons';
import BtnToolTip from './BtnToolTip.vue';
import SvgIcon from './Icon.vue';

const { notes } = defineProps<{
  notes: SupportAssetWeaponInfoNote[]
}>();

function title(note: SupportAssetWeaponInfoNote) {
  if (note.is_team_perk) {
    return 'Team Perk';
  }
  if (note.is_faction_perk) {
    return 'Faction Perk';
  }
}
</script>
<template>
  <template v-for="(note, index) in notes">
    <BtnToolTip :enabled="!!note.description">
      <template #target>
        <div
          :class="{
              'text-nowrap d-inline-block': true,
              'text-tooltip': note.description,
            }"
        >
          {{ note.display_name }}
          <SvgIcon v-if="note.is_team_perk" name="team-perk" size="18px" />
          <span class="material-symbols-outlined" v-if="note.is_faction_perk">flag</span>
          <template v-if="index !== notes.length-1">,</template>
        </div>

      </template>
      <template #title>
        {{ title(note) }}
      </template>
      <template #content>
        {{ note.description }}
      </template>
    </BtnToolTip>
  </template>
</template>