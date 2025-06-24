<script setup>
import Mech from '../Mech.vue';
import {computed, ref} from 'vue';
import {useTeamStore} from '../../../store/team-store.js';
import BtnToolTip from '../../UI/BtnToolTip.vue';
import {useValidationStore} from '../../../store/validation-store.js';
import {BButton, BCollapse} from 'bootstrap-vue-next';
import {Container, Draggable} from 'vue-dndrop';
import IconValidationError from '../../UI/IconValidationError.vue';
import TeamGroupValidation from '../ArmyList/BtnArmyListValidation/TeamGroupValidation.vue';

const teamStore = useTeamStore();
const validationStore = useValidationStore();

const {teamId, groupId} = defineProps({
  teamId: {
    type: String,
  },
  groupId: {
    type: String,
  },
});

const visible = teamStore.getTeamGroupVisibleComputed(teamId, groupId);
const team = computed(() => teamStore.getTeamDef(teamId));
const groupCount = computed(() => teamStore.getTeamGroupMechCount(teamId, groupId));
const group = computed(() => teamStore.getTeamGroupDef(teamId, groupId));
const mechIds = computed(() => teamStore.getTeamGroupMechIds(teamId, groupId));
const size = computed(() => validationStore.getTeamGroupSizeValidation(teamId, groupId));
const isSpecialTeam = computed(() => teamStore.isSpecialTeam(teamId));
const teamGroupPerks = computed(() => teamStore.getTeamGroupPerksInfo(teamId, groupId));
const valid = computed(() => validation.value.valid);
const validation = computed(() => validationStore.getTeamGroupValidation(teamId, groupId));

const teamGroupPerkCount = computed(() => {
  let count = 0;
  teamGroupPerks.value.forEach((group) => {
    count += group.perks.length;
  });

  return count;
});
const collapsing = ref(false);

function expandAll() {
  visible.value = true;
  teamStore.setMechsOfGroupVisible(teamId, groupId, true);
}

function collapseAll() {
  teamStore.setMechsOfGroupVisible(teamId, groupId, false);
}

function getChildPayload(index) {
  return {
    teamId,
    groupId,
    mechId: mechIds.value[index],
  };
}

function onDrop(toTeamId, toGroupId, dropResult) {
  if (dropResult.addedIndex !== null && dropResult.addedIndex !== undefined) {
    teamStore.moveMechToTeamGroup(
        toTeamId,
        toGroupId,
        dropResult.payload.mechId,
        dropResult.addedIndex,
    );
  }
}

const placeholder = ref({
  className: 'cards-drop-preview',
  animationDuration: '150',
  showOnTop: true,
});

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
          <template #target="{mouseover, mouseleave}">
            <div
                @mouseover="mouseover"
                @mouseleave="mouseleave"
                class="btn btn-transparent-dark d-inline-block py-1 me-1 fw-bold"
            >
              <Icon v-if="team.icon" :name="team.icon" class="me-2"/>
              {{ group.display_name }}
            </div>
          </template>
          <template #content>
            {{ team.display_name }} {{ group.display_name }} HE-Vs
          </template>
        </BtnToolTip>

        <BtnToolTip>
          <template #target="{mouseover, mouseleave}">
            <span
                @mouseover="mouseover"
                @mouseleave="mouseleave"
                class="btn btn-sm btn-overlay mx-1"
            >
              {{ groupCount }}
              <Icon name="hev"/>
            </span>
          </template>
          <template #content>
            Group Size
          </template>
        </BtnToolTip>
        <BtnToolTip>
          <template #target="{mouseover, mouseleave}">
            <span
                v-show="isSpecialTeam"
                @mouseover="mouseover"
                @mouseleave="mouseleave"
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
          <template #target="{mouseover, mouseleave}">
            <span
                v-show="!isSpecialTeam && teamGroupPerkCount"
                @mouseover="mouseover"
                @mouseleave="mouseleave"
                class="btn btn-sm btn-overlay mx-1"
            >
              Group Perks
              <Icon name="team-perk"/>
            </span>
          </template>
          <template #content>
            <template v-for="size in teamGroupPerks">
              <h6
                  v-if="teamGroupPerks.length > 1"
              >{{ size.display_name }} HE-Vs</h6>

              <template v-for="perk in size.perks">
                <div class="fw-bold">
                  {{ perk.display_name }}:
                </div>
                <p class="p-gap">{{ perk.description }}</p>
              </template>
            </template>
          </template>
        </BtnToolTip>
        <IconValidationError
            btn-class="ms-1"
            size="sm"
            title="Group HE-V Validation Errors"
            :visible="!valid"
        >
          <TeamGroupValidation :group="validation" :show-title="false"/>
        </IconValidationError>
      </div>
      <div class="text-end">
        <div class="d-flex">
          <button
              class="btn btn-sm ms-1 btn-secondary"
              @click="teamStore.addMechToTeamWithDefaults(teamId, groupId)"
          >
            Add
            <Icon name="hev"/>
          </button>
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
        :id="'collapse-' + teamId"
        v-model="visible"
        @hide="collapsing = true"
        @hidden="collapsing = false"
    >
      <div class="card-body">
        <Container
            :get-child-payload="getChildPayload"
            group-name="mechs"
            drag-handle-selector=".btn-grab"
            @drop="onDrop(teamId, groupId, $event)"
            :drop-placeholder="placeholder"
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
        >
          <Draggable
              class="mech-drag-wrapper"
              v-for="mechId in mechIds"
              :key="mechId"
          >
            <mech :mech-id="mechId"/>
          </Draggable>
        </Container>
      </div>
    </BCollapse>
  </div>
</template>