<script setup>
import {computed, reactive, toRaw} from 'vue';
import {BDropdown, BModal} from 'bootstrap-vue-next';
import HEVCard from '../../ArmyPrint/ArmyPrintCards/HEVCard.vue';
import {MECH_TEAMS, TEAM_SHELF} from '../../../data/mech-teams.js';
import {useMechStore} from '../../../store/mech-store.js';
import TeamDropDownItems from '../TeamDropDownItems.vue';
import {useArmyListStore} from '../../../store/army-list-store.js';
import {useTeamStore} from '../../../store/team-store.js';
import {loadSaveFileData} from '../../../store/helpers/store-save-load.js';
import {disposeOfPiniaScope} from 'pinia-scope';

const SCOPE = 'import';

const mechStore = useMechStore(SCOPE);
const teamStore = useTeamStore(SCOPE);
const armyListStore = useArmyListStore(SCOPE);

const appTeamStore = useTeamStore();

const visible = defineModel(false);
const mechImports = reactive(new Map());

const mechList = computed(() => {
  return mechStore.mechs.map(mech => {

    mech = toRaw(mech);
    const existing = mechImports.get(mech.id);
    const {teamId} = teamStore.getMechTeamAndGroupIds(mech.id);
    const targetTeamId = existing?.teamId || mech.preferred_team_id || teamId;

    return {
      mechId: mech.id,
      willImport: existing?.import,
      shelved: teamId === TEAM_SHELF,
      preferredTeam: MECH_TEAMS[mech.preferred_team_id],
      targetTeam: MECH_TEAMS[targetTeamId],
    };
  });
});

function add(mechId, teamId) {
  const existing = mechImports.get(mechId);
  if (existing) {
    existing.teamId = teamId;
    existing.import = true;
  } else {
    mechImports.set(mechId, {
      mechId,
      teamId,
      import: true,
    });
  }
}

function addAll() {
  mechList.value.forEach(({mechId, preferredTeam}) => {
    const existing = mechImports.get(mechId);
    if (existing) {
      existing.import = true;
      return;
    }

    add(mechId, preferredTeam.id);
  });
}

function resetAll() {
  [...mechImports.keys()].forEach((key) => mechImports.delete(key));
}

function remove(mechId) {
  const existing = mechImports.get(mechId);
  existing.import = false;
}

defineExpose({
  importJsonData(jsonData) {
    loadSaveFileData(jsonData, SCOPE);
    visible.value = true;
  },
});

function importSelectedMechs() {
  const mechs = [...mechImports.values()].filter(item => item.import);

  toRaw(mechs).forEach(({mechId, teamId}) => {
    const mech = mechStore.getMech(mechId);
    appTeamStore.addMechToTeamFromLoadedFile(mech, teamId);
  });

  disposeOfPiniaScope(SCOPE);
}

</script>
<template>
  <BModal
      lazy
      v-model="visible"
      size="xl"
      ok-variant="secondary"
      @ok="importSelectedMechs"
      @hidden="resetAll"
  >
    <template #title>
      <strong>
        Importing HE-Vs
      </strong>
      <template v-if="armyListStore.name">
        (
        <span class="fw-medium">
          From Army List:
        </span>

        <span class="fw-normal">
          {{ armyListStore.name }}
        </span>
        )
      </template>
    </template>
    <template #default>
      <div class="d-flex flex-wrap import-hev-container">
        <div class="card m-1"
             v-for="item in mechList">
          <div class="card-body">
            <div class="output-container">
              <HEVCard
                  :mech-id="item.mechId"
                  :store-scope="SCOPE"
              />
            </div>
          </div>

          <div class="card-footer">
            <div class="p-2">
              <template v-if="item.shelved">
                <strong>Preferred Team:</strong>
              </template>
              <template v-else>
                <strong>Current Team:</strong>
              </template>
              {{ item.preferredTeam.display_name }}
              <Icon :name="item.preferredTeam.icon"/>
              <template v-if="item.shelved">
                (shelved)
              </template>
            </div>
            <button
                class="btn btn-primary w-100"
                v-if="!item.willImport"
                @click="add(item.mechId, item.targetTeam.id)"
            >
              Add
            </button>
            <button
                class="btn btn-danger w-100"
                v-if="item.willImport"
                @click="remove(item.mechId)"
            >
              Remove
            </button>
            <div class="p-2">

              <span class="fw-bold me-1">
                Import To:
              </span>
              <BDropdown
                  variant="default"
                  class="d-inline-block"
              >
                <template #button-content>
                  <Icon :name="item.targetTeam.icon"/>
                  {{ item.targetTeam.display_name }}
                </template>
                <TeamDropDownItems
                    @update:modelValue="add(item.mechId, $event)"
                    :model-value="item.targetTeam.id"
                />
              </BDropdown>
            </div>

          </div>
        </div>
        <div class="p-1">

          <button class="btn btn-primary me-1" @click="addAll">Add All</button>
          <button class="btn btn-danger" @click="resetAll">Reset All</button>
        </div>
      </div>

    </template>
  </BModal>
</template>