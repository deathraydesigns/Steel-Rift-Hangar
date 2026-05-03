<script setup lang="ts">
import { BButton, BCollapse } from 'bootstrap-vue-next';
import { computed, ref } from 'vue';
import { MECH_TEAM_PERKS, TEAM_PERK } from '../../../data/mech-team-perks';
import { MECH_TEAM } from '../../../data/mech-teams.js';
import { type SUPPORT_ASSET_UNIT } from '../../../data/support-assets/_support-asset-types';
import { useSupportAssetUnitsStore } from '../../../store/support-asset-units-store';
import { useTeamStore } from '../../../store/team-store';
import { useValidationStore } from '../../../store/validation-store';
import BtnToolTip from '../../UI/BtnToolTip.vue';
import SvgIcon from '../../UI/Icon.vue';
import IconValidationError from '../../UI/IconValidationError.vue';
import SupportAssetUnitAdd from '../ArmyList/ArmyListSupportAssets/SupportAssetUnitAdd.vue';
import UnitItem from '../Units/UnitItem.vue';

const supportAssetUnitStore = useSupportAssetUnitsStore();
const teamStore = useTeamStore();
const validationStore = useValidationStore();
const { teamId, groupId } = defineProps<{
  teamId: MECH_TEAM,
  groupId: string,
}>();

const visible = teamStore.getTeamGroupVisibleComputed(teamId, groupId);
const team = computed(() => teamStore.getTeamDef(teamId));

const supportAssetUnitsCount = computed(() => teamStore.coordinatedAssetsTeamUnitsInfo.length);
const size = computed(() => validationStore.getTeamGroupSizeValidation(teamId, groupId));

const availableUnitCount = computed(() => {
  return (size.value.max_count as number) - supportAssetUnitsCount.value;
});

const availableSupportAssetUnitsInfo = computed(() => {
  if (availableUnitCount.value <= 0) [];
  const ids = team.value.support_asset_units?.support_asset_unit_ids ?? [];
  return ids.map(id => ({
    ...supportAssetUnitStore.getUnitInfo(id),
    validation_message: validationStore.addSupportAssetUnitInvalid(id, false),
  }));
});

const teamGroupPerks = computed(() => {
  const count = teamStore.getTeamUnitCount(teamId);
  if (count >= 3) {
    return [MECH_TEAM_PERKS[TEAM_PERK.CONVOY]];
  }
  return [];
});

const valid = computed(() => validation.value.valid);
const validation = computed(() => {

  return {
    valid: true,
    validation_message: null,
  };
});

const teamGroupPerkCount = computed(() => teamGroupPerks.value.length);

const collapsing = ref(false);

function add(unitId: SUPPORT_ASSET_UNIT) {
  supportAssetUnitStore.addSupportAsset(unitId, true);
}

function expandAll() {
  visible.value = true;
  teamStore.setUnitsOfGroupVisible(teamId, groupId, true);
}

function collapseAll() {
  teamStore.setUnitsOfGroupVisible(teamId, groupId, false);
}

</script>
<template>
  <div :class="{
    'card card-mech-team-group': true,
    'border-danger': !valid,
  }">
    <div
      :class="{
          'card-header d-flex text-bg-primary': true,
          'card-header-collapsed': !visible,
          'card-header-collapsing': collapsing,
        }
    ">
      <div class="flex-grow-1">
        <BtnToolTip>
          <template #target>
            <div class="btn btn-transparent-dark d-inline-block py-1 me-1 fw-bold">
              <SvgIcon v-if="team.icon" :name="team.icon" class="me-2" />
              Support Asset Units
            </div>
          </template>
          <template #content>
            {{ team.display_name }} Support Asset Units
          </template>
        </BtnToolTip>
        <BtnToolTip>
          <template #target>
            <span class="btn btn-sm btn-overlay mx-1">
              {{ supportAssetUnitsCount }}
            </span>
          </template>
          <template #content>
            Group Size
          </template>
        </BtnToolTip>
        <BtnToolTip>
          <template #target>
            <span
              :class="{
                  'btn btn-sm btn-overlay mx-1': true,
                  'btn-outline-danger border-danger': !size.size_valid,
                }"
            >
              Size: {{ size.min_count }}-{{ size.max_count }}
              <span class="material-symbols-outlined text-danger" v-if="!size.size_valid">warning</span>
            </span>
          </template>
          <template #content>
            {{ size.size_validation_message }}
          </template>
        </BtnToolTip>
        <BtnToolTip>
          <template #target>
            <span
              v-show="teamGroupPerkCount"
              class="btn btn-sm btn-overlay mx-1"
            >
              Group Perks
              <SvgIcon name="team-perk" />
            </span>
          </template>
          <template #content>
            <h6
              v-if="teamGroupPerks.length > 1"
            >Support Asset Units</h6>

            <template v-for="perk in teamGroupPerks">
              <div class="fw-bold">
                {{ perk.display_name }}:
              </div>
              <p class="p-gap">{{ perk.description }}</p>
            </template>
          </template>
        </BtnToolTip>
        <IconValidationError
          btn-class="ms-1"
          size="sm"
          title="Group Validation Errors"
          :visible="!valid"
        >
        </IconValidationError>
      </div>
      <div class="text-end">
        <div class="d-flex">

          <SupportAssetUnitAdd
            :available-support-asset-units-info="availableSupportAssetUnitsInfo"
            @selected="add"
          />

          <BButton
            size="sm"
            variant="transparent-dark"
            class="ms-1"
            @click="collapseAll"
          >
            <span class="material-symbols-outlined">keyboard_double_arrow_up</span>
          </BButton>
          <BButton
            size="sm"
            variant="transparent-dark"
            class="ms-1"
            @click="expandAll"
          >
            <span class="material-symbols-outlined">keyboard_double_arrow_down</span>
          </BButton>
          <BButton
            :class="'btn-collapse btn-collapse-team ms-1 ' + (visible ? null : 'collapsed')"
            size="sm"
            variant="transparent-dark"
            :aria-expanded="visible ? 'true' : 'false'"
            :aria-controls="'collapse-' + teamId"
            @click="visible = !visible"
          />
        </div>
      </div>
    </div>
    <BCollapse
      :id="'collapse-' + teamId + '-' + groupId"
      v-model="visible"
      @hide="collapsing = true"
      @hidden="collapsing = false"
    >
      <div class="card-body">
        <UnitItem v-for="unit in teamStore.coordinatedAssetsTeamUnitsInfo" :key="unit.id"
                  :support-asset-attachment-id="unit.id" />
      </div>
    </BCollapse>
  </div>
</template>