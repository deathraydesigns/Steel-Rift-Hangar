<script setup lang="ts">
import { BButton, BCollapse, BOffcanvas } from 'bootstrap-vue-next';
import { computed, ref } from 'vue';
import { MECH_TEAM_PERKS, TEAM_PERK } from '../../../data/mech-team-perks';
import { type MECH_TEAM, type MechTeamPerkColumn, SUPPORT_ASSET_UNITS_GROUP_ID } from '../../../data/mech-teams';
import { MECH_SIZES } from '../../../data/unit-sizes.js';
import { useTeamStore } from '../../../store/team-store';
import { useValidationStore } from '../../../store/validation-store';
import BtnToolTip from '../../UI/BtnToolTip.vue';
import SvgIcon from '../../UI/Icon.vue';
import IconValidationError from '../../UI/IconValidationError.vue';
import TeamGroupValidation from '../ArmyList/BtnArmyListValidation/TeamGroupValidation.vue';
import MechTeamGroup from './MechTeamGroup.vue';
import MechTeamSupportAssetGroup from './MechTeamSupportAssetGroup.vue';

const teamStore = useTeamStore();
const validationStore = useValidationStore();

const { teamId } = defineProps<{
  teamId: MECH_TEAM
}>();
const visible = teamStore.getTeamVisibleComputed(teamId);
const collapsing = ref(false);
const showTeamPerks = ref(false);
const team = computed(() => teamStore.getTeamDef(teamId));
const teamMechCount = computed(() => teamStore.getTeamUnitCount(teamId));
const teamPerkIdDef = computed(() => (perkId: TEAM_PERK) => MECH_TEAM_PERKS[perkId]);
const validation = computed(() => validationStore.getTeamValidation(teamId));
const valid = computed(() => validation.value.valid);
const supportAssetUnits = computed(() => team.value.support_asset_units);
const teamGroups = computed(() => Object.values(team.value.groups).filter(group => group.id !== SUPPORT_ASSET_UNITS_GROUP_ID));

const sizeDisplayNames = computed(() => (column: MechTeamPerkColumn) => {
  if ('custom_perk_column' in column) {
    return column.custom_perk_column;
  }

  if (column.length === 4) {
    return 'All';
  }

  return column
    .map((sizeId) => MECH_SIZES[sizeId].display_name)
    .join('/');
});

function expandAll() {
  visible.value = true;
  teamStore.setGroupsOfTeamVisible(teamId, true);
}

function collapseAll() {
  teamStore.setGroupsOfTeamVisible(teamId, false);
  teamStore.setMechsOfTeamVisible(teamId, false);
}
</script>
<template>
  <div :class="{
    'card card-mech-team': true,
    'border-danger': !valid,
  }">
    <div
      :class="{
          'card-header d-flex': true,
          'card-header-collapsed': !visible,
          'card-header-collapsing': collapsing,
        }
    ">
      <div class="flex-grow-1">
        <span class="d-inline-block py-1 ps-2 pe-1 fw-bold">
          <SvgIcon :name="team.icon" color="#fff" />
          <span class="ms-2">
            {{ team.display_name }}
          </span>
        </span>
        <BtnToolTip>
          <template #target>
            <span class="btn btn-sm mx-1 btn-light-outline">
              {{ teamMechCount }}
              <SvgIcon name="hev" />
            </span>
          </template>
          <template #content>
            Team Size
          </template>
        </BtnToolTip>

        <IconValidationError
          btn-class="ms-1"
          size="sm"
          title="Team HE-V Validation Errors"
          :visible="!valid"
        >
          <template v-for="group in validation.groups">
            <TeamGroupValidation :group="group" />
          </template>
        </IconValidationError>
      </div>
      <div class="text-end">
        <div class="d-flex">
          <BButton
            size="sm"
            class="ms-1"
            variant="secondary"
            @click="showTeamPerks = !showTeamPerks"
          >
            Show Team Perks
            <SvgIcon name="team-perk" />
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
          <BButton
            :class="'btn-collapse btn-collapse-light ms-1 ' + (visible ? null : 'collapsed')"
            size="sm"
            variant="transparent-light"
            :aria-expanded="visible ? 'true' : 'false'"
            :aria-controls="'collapse-' + teamId"
            @click="visible = !visible"
          />

        </div>
      </div>
    </div>
    <BCollapse
      :id="'collapse-' + teamId"
      v-model="visible"
      @hide="collapsing = true"
      @hidden="collapsing = false"
    >
      <div class="card-body">
        <MechTeamGroup
          v-for="group in teamGroups"
          :key="group.id"
          :team-id="teamId"
          :group-id="group.id"
        />

        <div v-if="supportAssetUnits">
          <MechTeamSupportAssetGroup :team-id="team.id" :group-id="SUPPORT_ASSET_UNITS_GROUP_ID" />
        </div>
      </div>
    </BCollapse>
  </div>
  <BOffcanvas
    v-model="showTeamPerks"
    placement="bottom"
    :title="team.display_name + ' Perks'"
    lazy
  >
    <table class="table table-sm table-striped">
      <thead>
      <tr>
        <th>Team Size</th>
        <th v-for="col in team.team_size_perk_columns">
          {{ sizeDisplayNames(col) }} HE-Vs
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