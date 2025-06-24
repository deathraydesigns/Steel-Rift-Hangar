<script setup>

import {BButton, BModal} from 'bootstrap-vue-next';
import {useValidationStore} from '../../../store/validation-store.js';
import {storeToRefs} from 'pinia';
import {computed, ref} from 'vue';
import {TEAM_GENERAL} from '../../../data/mech-teams.js';
import TeamGroupValidation from './BtnArmyListValidation/TeamGroupValidation.vue';
import {useTeamStore} from '../../../store/team-store.js';

const teamStore = useTeamStore();
const validationStore = useValidationStore();

const modal = ref(false);

const {list_is_valid, list_validation, team_validation} = storeToRefs(validationStore);

const generalTeamGroupValidation = computed(() => {
  const team = team_validation.value.find(team => team.id === TEAM_GENERAL);
  if (team) {
    return team.groups[0];
  }
});

const specialTeamValidation = computed(() => {
  return team_validation.value.filter(team => teamStore.isSpecialTeam(team.id));
});

function click() {
  if (!list_is_valid.value) {
    modal.value = !modal.value;
  }
}

</script>
<template>
  <BButton
      @click="click"
      size="sm"
      :variant="list_is_valid ? 'transparent' : 'danger'"
      :class="{
                  'btn ms-2 position-relative': true,
                }"
  >
    <template v-if="list_is_valid">
      List Valid
      <span class="material-symbols-outlined text-success-emphasis">check</span>
    </template>
    <template v-else>
      List Invalid
      <span class="material-symbols-outlined">warning</span>
    </template>
  </BButton>

  <BModal
      v-model="modal"
      size="lg"
      ok-variant="secondary"
  >
    <template #title>
      List Validation Errors
    </template>

    <template #cancel>&nbsp;</template>
    <template #default>
      <h5>List</h5>
      <ul>
        <li v-for="item in list_validation">
          {{ item }}
        </li>
      </ul>
      <TeamGroupValidation
          v-if="generalTeamGroupValidation"
          :group="generalTeamGroupValidation"
      />
      <template v-if="specialTeamValidation.length">
        <h5>Teams</h5>
        <div v-for="team in specialTeamValidation">
          <div class="fw-bold">{{ team.display_name }}</div>
          <ul>
            <li v-for="message in team.validation_messages">
              {{ message }}
            </li>
            <li v-for="group in team.groups">
              <TeamGroupValidation :group="group"/>
            </li>
          </ul>
        </div>
      </template>
    </template>
  </BModal>
</template>
