<script setup>
import {useMechStore} from '../../store/mech-store.js';
import Fraction from '../functional/fraction.vue';
import {computed} from 'vue';
import {BButton, BCollapse} from 'bootstrap-vue-next';
import {useValidationStore} from '../../store/validation-store.js';
import MechStats from './Mech/MechStats.vue';
import HEVCard from '../ArmyPrint/ArmyPrintCards/HEVCard.vue';
import BtnMoveMechToTeam from './Mech/BtnMoveMechToTeam.vue';
import IconValidationError from '../UI/IconValidationError.vue';
import {useTeamStore} from '../../store/team-store.js';
import MechPreferredTeamDropDown from './Mech/MechStats/MechPreferredTeamDropDown.vue';
import IconPreferredTeam from '../UI/IconPreferredTeam.vue';
import {TEAM_BENCH} from '../../data/mech-teams.js';

const mechStore = useMechStore();
const validationStore = useValidationStore();
const teamStore = useTeamStore();

const {
  mechId,
} = defineProps({
  mechId: {
    type: Number,
    required: true,
  },
});

const visible = computed({
  get() {
    return mechStore.getMechVisible(mechId);
  },
  set(val) {
    mechStore.setMechVisible(mechId, val);
  },
});
const info = computed(() => mechStore.getMechInfo(mechId));

const invalidMechMessages = computed(() => validationStore.mechMessages(mechId));
const invalidTeamGroupMessages = computed(() => validationStore.mechTeamGroupMessages(mechId));
const valid = computed(() => !invalidMechMessages.value.length && !invalidTeamGroupMessages.value.length);

const teamId = computed(() => {
  const {teamId} = teamStore.getMechTeamAndGroupIds(mechId);
  return teamId;
});
const teamIcon = computed(() => teamStore.getTeamDef(teamId.value).icon);
const showPreferredTeam = computed(() => teamId.value === TEAM_BENCH);

</script>
<template>
  <div
      :class="{
        'draggable-item': true,
        'card card-mech': true,
        'border-danger': !valid
      }"
  >
    <div class="card-body">
      <div class="row">
        <div class="col-auto col-md-auto col-lg-2 ">
          <span class="btn btn-sm btn-grab btn-transparent">:::</span>
          <div class="d-inline-block py-1 ps-3">
            HE-V {{ info.size.display_name }}
          </div>
        </div>
        <div class="col-auto col-md-auto col-lg-4">
          <IconPreferredTeam
              btn-class="me-2"
              :team-id="info.preferred_team_id"
              :show="showPreferredTeam"
          />
          <div class="d-inline-block py-1">
            <strong class="pe-1">{{ info.display_name }}</strong>
          </div>
          <IconValidationError
              btn-class="ms-1"
              title="HE-V Validation Errors"
              icon="hev"
              :message-array="invalidMechMessages"
          />
          <IconValidationError
              btn-class="ms-1"
              title="Team Group Validation Errors"
              :icon="teamIcon"
              :message-array="invalidTeamGroupMessages"
          />
        </div>
        <div class="col-sm-12 col-md-auto col-lg-6 d-flex">
          <div class="py-1 d-inline-block ms-auto">
            <span class="pe-2">
              <strong>Arm:</strong>
              {{ info.armor_stat }}
            </span>
            <span class="px-2">
              <strong>Str:</strong>
              {{ info.structure_stat }}
            </span>
            <span class="px-2">
              <strong>Slots: </strong>
              <fraction :a="info.used_slots" :b="info.max_slots"/>
            </span>
            <span class="px-2">
              <strong>Tons: </strong>
              <fraction :a="info.used_tons" :b="info.max_tons"/>
            </span>
          </div>
          <BtnMoveMechToTeam :mech-id="mechId"/>
          <BButton
              size="sm"
              class="mx-1"
              variant="secondary"
              @click="mechStore.duplicateMech(mechId)"
          >
            <span class="material-symbols-outlined">content_copy</span>
          </BButton>

          <BButton
              size="sm"
              class="mx-1"
              variant="danger"
              @click="mechStore.removeMech(mechId)"
          >
            <span class="material-symbols-outlined">delete</span>
          </BButton>

          <BButton
              :class="'btn-collapse ' + (visible ? null : 'collapsed')"
              size="sm"
              variant="transparent"
              :aria-expanded="visible ? 'true' : 'false'"
              :aria-controls="'collapse-' + mechId"
              @click="visible = !visible"
          />
        </div>
      </div>
      <BCollapse
          :id="'collapse-' + mechId"
          v-model="visible"
          lazy
      >
        <hr class="mt-2">
        <div class="d-lg-flex justify-content-lg-center">
          <MechStats :mech-id="mechId"/>
          <div class="output-container ms-3">
            <div class="fw-bold mb-2 pt-2">Card Preview</div>
            <HEVCard :mech-id="mechId" class="shadow"/>
            <MechPreferredTeamDropDown :mech-id="mechId"/>
          </div>
        </div>
      </BCollapse>
    </div>
  </div>
</template>