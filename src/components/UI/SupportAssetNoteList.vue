<script setup>
import BtnToolTip from './BtnToolTip.vue';

const {notes} = defineProps({
  notes: {
    type: Array,
  },
});

function title(note) {
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
    <BtnToolTip :enabled="note.description">
      <template #target>
        <div
            :class="{
              'text-nowrap d-inline-block': true,
              'text-tooltip': note.description,
            }"
        >
          {{ note.display_name }}
          <Icon v-if="note.is_team_perk" name="team-perk" size="18px"/>
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