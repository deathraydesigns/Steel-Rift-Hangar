<script setup>
import Mech from '../Mech.vue';
import draggable from 'vuedraggable';
import {computed, ref} from 'vue';
import {useTeamStore} from '../../../store/team-store.js';
import {TEAM_GENERAL} from '../../../data/mech-teams.js';
import {useExpandCollapseAll} from '../../functional/expand-collapse.js';
import BtnToolTip from '../../UI/BtnToolTip.vue';
import {useValidationStore} from '../../../store/validation-store.js';
import {BButton} from 'bootstrap-vue-next';

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

const teamInfo = computed(() => teamStore.getTeamInfo(teamId));
const groupCount = computed(() => teamStore.getTeamGroupMechCount(teamId, groupId));
const groupInfo = computed(() => teamStore.getTeamGroupInfo(teamId, groupId));
const mechIds = computed(() => teamStore.getTeamGroupMechIds(teamId, groupId));
const size = computed(() => validationStore.getTeamGroupSizeValidation(teamId, groupId));
const isGeneralGroup = computed(() => teamId === TEAM_GENERAL);
const teamGroupPerks = computed(() => teamStore.getTeamGroupPerksInfo(teamId, groupId));
const teamGroupPerkCount = computed(() => {
  let count = 0;
  teamGroupPerks.value.forEach((group) => {
    count += group.perks.length;
  });

  return count;
});

const dragging = ref(false);

function onSortableChange(event) {
  let moved = event.moved;
  if (!moved) {
    return;
  }
  teamStore.moveGroupMech(teamId, groupId, moved.element, moved.newIndex);
}

const {
  expandAll,
  collapseAll,
} = useExpandCollapseAll();

</script>
<template>
  <div :class="{
    'card text-bg-light card-dark-border': true,
    'border-danger': !size.size_valid,
  }">
    <div class="card-header d-flex text-bg-primary">
      <div class="flex-grow-1">
        <BtnToolTip>
          <template #target="{mouseover, mouseleave}">
            <div
                @mouseover="mouseover"
                @mouseleave="mouseleave"
                class="btn btn-tertiary d-inline-block py-1 me-1 fw-bold"
            >
              <Icon v-if="teamInfo.icon" :name="teamInfo.icon" color="#000" class="me-2"/>
              {{ groupInfo.display_name }}
            </div>
          </template>
          <template #content>
            {{ teamInfo.display_name }} {{ groupInfo.display_name }} HE-Vs
          </template>
        </BtnToolTip>

        <BtnToolTip>
          <template #target="{mouseover, mouseleave}">
            <span
                @mouseover="mouseover"
                @mouseleave="mouseleave"
                class="btn btn-sm btn-outline mx-1 btn-light"
            >
              {{ groupCount }}
              <Icon name="hev" color="#000"/>
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
                  'btn btn-sm btn-light btn-outline mx-1': true,
                  'btn-outline-danger border-danger': !size.size_valid,
                }"
            >
              Size: {{ size.min_count }}-{{ size.max_count }}
              <span class="material-symbols-outlined" v-if="!size.size_valid">warning</span>
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
                class="btn btn-sm btn-outline mx-1 btn-light"
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
            class="btn btn-sm ms-1 btn-header-add"
            @click="teamStore.addMechToTeam(teamId, groupId)"
        >
          Add
          <Icon name="hev" color="#fff"/>
        </button>
        <BButton
            size="sm"
            variant="tertiary"
            class="ms-1"
            @click="collapseAll"
        >
          <span class="material-symbols-outlined">keyboard_double_arrow_up</span>
        </BButton>
        <BButton
            size="sm"
            variant="tertiary"
            class="ms-1"
            @click="expandAll"
        >
          <span class="material-symbols-outlined">keyboard_double_arrow_down</span>
        </BButton>
      </div>
    </div>
    <div class="card-body">
      <draggable
          :list="mechIds"
          item-key="id"
          :group="'mechs-' + teamId + '-' + groupId"
          handle=".btn-grab"
          ghost-class="ghost"
          @start="dragging = true"
          @end="dragging = false"
          @change="onSortableChange"
          :animation="200"
          :preventOnFilter="false"
      >
        <template #item="{ element }">
          <mech
              :mech-id="element"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>