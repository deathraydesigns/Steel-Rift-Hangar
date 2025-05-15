<script setup>
import {useTeamStore} from '../../../store/team-store.js';
import {computed, ref} from 'vue';
import MechTeamGroup from './MechTeamGroup.vue';
import {BButton} from 'bootstrap-vue-next';
import {MECH_SIZES} from '../../../data/unit-sizes.js';
import {MECH_TEAM_PERKS} from '../../../data/mech-team-perks.js';
import {useExpandCollapseAll} from '../../functional/expand-collapse.js';
import BtnToolTip from '../../UI/BtnToolTip.vue';

const teamStore = useTeamStore();

const {teamId} = defineProps({
  teamId: String,
  groupId: String,
});

const show = ref(false);
const teamInfo = computed(() => teamStore.getTeamInfo(teamId));
const teamMechCount = computed(() => teamStore.getTeamMechCount(teamId));
const teamPerkIdInfo = computed(() => perkId => MECH_TEAM_PERKS[perkId]);
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
  <div class="card text-bg-dark card-mech-team">
    <div class="card-header d-flex text-bg-dark">
      <div class="flex-grow-1">
        <span class="d-inline-block py-1 ps-2 pe-1 fw-bold">

          <Icon :name="teamInfo.icon" color="#fff"/>
          <span class="ms-2">
          {{ teamInfo.display_name }}
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
              <Icon name="hev" color="#fff"/>
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
            class="ms-1 btn-header-add"
            variant="primary"
            @click="show = !show"
        >
          Show Team Perks
          <Icon name="team-perk" color="#fff"/>
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
            variant="tertiary"
            @click="collapseAll"
        >
          <span class="material-symbols-outlined">keyboard_double_arrow_up</span>
        </BButton>
        <BButton
            size="sm"
            class="ms-1"
            variant="tertiary"
            @click="expandAll"
        >
          <span class="material-symbols-outlined">keyboard_double_arrow_down</span>
        </BButton>
      </div>
    </div>
    <div class="card-body">
      <MechTeamGroup
          v-for="group in teamInfo.groups"
          :team-id="teamId"
          :group-id="group.id"
      />
    </div>
  </div>
  <BOffcanvas
      v-model="show"
      placement="bottom"
      :title="teamInfo.display_name + ' Perks'"
      lazy
  >
    <table class="table table-sm table-striped">
      <thead>
      <tr>
        <th>Team Size</th>
        <th v-for="(sizeIds) in teamInfo.team_size_perk_columns">
          {{ sizeDisplayNames(sizeIds) }} HE-Vs
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(row, count) in teamInfo.team_size_perk_rows"
          :class="{'table-success': teamMechCount >= count}"
      >
        <td>{{ count }}</td>
        <td v-for="teamPerkIds in row">
          <p class="p-gap" v-for="perkId in teamPerkIds">
            <strong>{{ teamPerkIdInfo(perkId).display_name }}: </strong>
            {{ teamPerkIdInfo(perkId).description }}
          </p>
        </td>
      </tr>
      </tbody>
    </table>
  </BOffcanvas>
</template>