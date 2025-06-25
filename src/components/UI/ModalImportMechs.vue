<script setup>
import {computed, reactive, toRaw} from 'vue';
import {BDropdown, BModal} from 'bootstrap-vue-next';
import HEVCard from '../ArmyPrint/ArmyPrintCards/HEVCard.vue';
import {MECH_TEAMS, TEAM_SHELF} from '../../data/mech-teams.js';
import {useMechStore} from '../../store/mech-store.js';
import TeamDropDownItems from './TeamDropDownItems.vue';
import {IMPORT_PREFIX} from '../../composables/file-upload.js';
import {useArmyListStore} from '../../store/army-list-store.js';
import {useTeamStore} from '../../store/team-store.js';

const mechStore = useMechStore(IMPORT_PREFIX);
const teamStore = useTeamStore(IMPORT_PREFIX);
const armyListStore = useArmyListStore(IMPORT_PREFIX);

const emit = defineEmits(['import-mechs']);
const visible = defineModel(false);
const mechsImports = reactive(new Map());

const mechList = computed(() => {
  return mechStore.mechs.map(mech => {

    mech = toRaw(mech);
    const existing = mechsImports.get(mech.id);
    const {teamId} = teamStore.getMechTeamAndGroupIds(mech.id);
    const targetTeamId = existing?.teamId || mech.preferred_team_id || teamId;

    return {
      mechId: mech.id,
      willImport: existing?.import,
      currentTeam: MECH_TEAMS[teamId],
      preferredTeam: MECH_TEAMS[mech.preferred_team_id],
      targetTeam: MECH_TEAMS[targetTeamId],
    };
  });
});

function add(mechId, teamId) {
  const existing = mechsImports.get(mechId);
  if (existing) {
    existing.teamId = teamId;
    existing.import = true;
  } else {
    mechsImports.set(mechId, {
      mechId,
      teamId,
      import: true,
    });
  }
}

function remove(mechId) {
  const existing = mechsImports.get(mechId);
  existing.import = false;
}

function onHidden() {
  mechsImports.value = new Map();
}

function importSelectedMechs() {
  emit('import-mechs', [...mechsImports.values()].filter((item) => item.import));
}
</script>
<template>
  <BModal
      lazy
      v-model="visible"
      size="xl"
      ok-variant="secondary"
      @ok="importSelectedMechs"
      @hidden="onHidden"
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
                  store-prefix="import"
              />
            </div>
          </div>

          <div class="card-footer">
            <div class="p-2">
              <template v-if="item.currentTeam.id === TEAM_SHELF">
                <strong>Preferred Team:</strong>
                {{ item.preferredTeam.display_name }}
                <Icon :name="item.preferredTeam.icon"/>
              </template>
              <template v-else>
                <strong>Current Team:</strong>
                {{ item.currentTeam.display_name }}
                <Icon :name="item.currentTeam.icon"/>
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
      </div>
    </template>
  </BModal>
</template>