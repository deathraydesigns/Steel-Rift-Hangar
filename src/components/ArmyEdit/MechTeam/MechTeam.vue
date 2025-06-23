<script setup>
import {useTeamStore} from '../../../store/team-store.js';
import {computed, ref} from 'vue';
import MechTeamGroup from './MechTeamGroup.vue';
import {BButton, BOffcanvas} from 'bootstrap-vue-next';
import {MECH_SIZES} from '../../../data/unit-sizes.js';
import {MECH_TEAM_PERKS} from '../../../data/mech-team-perks.js';
import {useExpandCollapseAll} from '../../functional/expand-collapse.js';
import BtnToolTip from '../../UI/BtnToolTip.vue';
import {useValidationStore} from '../../../store/validation-store.js';

const teamStore = useTeamStore();
const validationStore = useValidationStore();

const {teamId} = defineProps({
  teamId: String,
  groupId: String,
});

const show = ref(false);
const team = computed(() => teamStore.getTeamDef(teamId));
const teamMechCount = computed(() => teamStore.getTeamMechCount(teamId));
const teamPerkIdDef = computed(() => perkId => MECH_TEAM_PERKS[perkId]);
const valid = computed(() => validationStore.getTeamValidation(teamId)).valid;
const sizeDisplayNames = computed(() => sizeIds => {

  if (sizeIds.length === 4) {
    return 'All';
  }

  return sizeIds
      .map((sizeId) => MECH_SIZES[sizeId].display_name)
      .join('/');
});
const {
  expandAll,
  collapseAll,
} = useExpandCollapseAll();
</script>
<template>
  <div :class="{
    'card card-mech-team': true,
    'border-danger': !valid,
  }">
    <div class="card-header d-flex">
      <div class="flex-grow-1">
        <span class="d-inline-block py-1 ps-2 pe-1 fw-bold">
          <Icon :name="team.icon" color="#fff"/>
          <span class="ms-2">
            {{ team.display_name }}
          </span>
        </span>
        <BtnToolTip>
          <template #target="{mouseover, mouseleave}">
            <span
                @mouseover="mouseover"
                @mouseleave="mouseleave"
                class="btn btn-sm mx-1 btn-light-outline"
            >
              {{ teamMechCount }}
              <Icon name="hev"/>
            </span>
          </template>
          <template #content>
            Team Size
          </template>
        </BtnToolTip>
      </div>
      <div class="text-end">
        <BButton
            size="sm"
            class="ms-1"
            variant="secondary"
            @click="show = !show"
        >
          Show Team Perks
          <Icon name="team-perk"/>
        </BButton>
        <BButton
            size="sm"
            class="ms-1"
            variant="danger"
            @click="teamStore.removeTeam(teamId)"
        >
          <span class="material-symbols-outlined">delete</span>
        </BButton>
        <BButton
            size="sm"
            class="ms-1"
            variant="transparent-light"
            @click="collapseAll"
        >
          <span class="material-symbols-outlined">keyboard_double_arrow_up</span>
        </BButton>
        <BButton
            size="sm"
            class="ms-1"
            variant="transparent-light"
            @click="expandAll"
        >
          <span class="material-symbols-outlined">keyboard_double_arrow_down</span>
        </BButton>
      </div>
    </div>
    <div class="card-body">
      <MechTeamGroup
          v-for="group in team.groups"
          :key="group.id"
          :team-id="teamId"
          :group-id="group.id"
      />
    </div>
  </div>
  <BOffcanvas
      v-model="show"
      placement="bottom"
      :title="team.display_name + ' Perks'"
      lazy
  >
    <table class="table table-sm table-striped">
      <thead>
      <tr>
        <th>Team Size</th>
        <th v-for="(sizeIds) in team.team_size_perk_columns">
          {{ sizeDisplayNames(sizeIds) }} HE-Vs
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(row, count) in team.team_size_perk_rows"
          :class="{'table-success': teamMechCount >= count}"
      >
        <td>{{ count }}</td>
        <td v-for="teamPerkIds in row">
          <p class="p-gap" v-for="perkId in teamPerkIds">
            <strong>{{ teamPerkIdDef(perkId).display_name }}: </strong>
            {{ teamPerkIdDef(perkId).description }}
          </p>
        </td>
      </tr>
      </tbody>
    </table>
  </BOffcanvas>
</template>