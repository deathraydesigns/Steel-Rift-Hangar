<script setup>
import Mech from '../Mech.vue';
import {computed, ref} from 'vue';
import {useTeamStore} from '../../../store/team-store.js';
import {TEAM_GENERAL} from '../../../data/mech-teams.js';
import {useExpandCollapseAll} from '../../functional/expand-collapse.js';
import BtnToolTip from '../../UI/BtnToolTip.vue';
import {useValidationStore} from '../../../store/validation-store.js';
import {BButton} from 'bootstrap-vue-next';
import {Container, Draggable} from 'vue-dndrop';

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

const team = computed(() => teamStore.getTeamDef(teamId));
const groupCount = computed(() => teamStore.getTeamGroupMechCount(teamId, groupId));
const group = computed(() => teamStore.getTeamGroupDef(teamId, groupId));
const mechIds = computed(() => teamStore.getTeamGroupMechIds(teamId, groupId));
const size = computed(() => validationStore.getTeamGroupSizeValidation(teamId, groupId));
const isGeneralGroup = computed(() => teamId === TEAM_GENERAL);
const teamGroupPerks = computed(() => teamStore.getTeamGroupPerksInfo(teamId, groupId));
const valid = computed(() => validationStore.getTeamGroupValidation(teamId, groupId).valid);
const teamGroupPerkCount = computed(() => {
  let count = 0;
  teamGroupPerks.value.forEach((group) => {
    count += group.perks.length;
  });

  return count;
});

const draggingMechId = ref(null);

function dragStart(event) {
  draggingMechId.value = mechIds.value[event.oldIndex];
}

function dragEnd(event) {
  const {
    teamId: newTeamId,
    groupId: newGroupId,
  } = event.to.__draggable_component__.componentData;

  const {newIndex} = event;
  const mechId = draggingMechId.value;

  teamStore.moveMechToTeamGroup(
      newTeamId,
      newGroupId,
      mechId,
      newIndex,
  );
}

const componentData = computed(() => {
  return {
    teamId,
    groupId,
    tag: 'div',
    type: 'transition-group',
  };
});
const {
  expandAll,
  collapseAll,
} = useExpandCollapseAll();

function getChildPayload(index) {
  return {
    teamId,
    groupId,
    mechId: mechIds.value[index],
  };
}

function onDrop(toTeamId, toGroupId, dropResult) {
  console.log('onDrop', dropResult);

  if (dropResult.addedIndex !== null) {
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
    <div class="card-header d-flex text-bg-primary">
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
                v-show="!isGeneralGroup"
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
                v-show="!isGeneralGroup && teamGroupPerkCount"
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
      </div>
      <div class="text-end">
        <button
            class="btn btn-sm ms-1 btn-secondary"
            @click="teamStore.addMechToTeam(teamId, groupId)"
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
      </div>
    </div>
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
  </div>
</template>