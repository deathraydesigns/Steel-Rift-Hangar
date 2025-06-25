<script setup>
import {computed, reactive, toRaw} from 'vue';
import {BDropdown, BModal} from 'bootstrap-vue-next';
import HEVCard from '../ArmyPrint/ArmyPrintCards/HEVCard.vue';
import {MECH_TEAM_ARRAY, TEAM_GENERAL} from '../../data/mech-teams.js';
import {useMechStore} from '../../store/mech-store.js';
import TeamDropDownItems from './TeamDropDownItems.vue';
import {IMPORT_PREFIX} from '../../composables/file-upload.js';
import {useArmyListStore} from '../../store/army-list-store.js';

const mechStore = useMechStore(IMPORT_PREFIX);
const armyListStore = useArmyListStore(IMPORT_PREFIX);

const emit = defineEmits(['import-mechs']);
const visible = defineModel(false);
const mechsImports = reactive(new Map());

const mechList = computed(() => {
  return mechStore.mechs.map(mech => {

    mech = toRaw(mech);
    const existing = find(mech.id);
    const teamId = existing?.teamId || mech.preferred_team_id || TEAM_GENERAL;
    const willImport = existing?.import;

    return {
      mechId: mech.id,
      mech,
      willImport,
      preferredTeam: MECH_TEAM_ARRAY.find(team => team.id === mech.preferred_team_id),
      targetTeam: MECH_TEAM_ARRAY.find(team => team.id === teamId),
    };
  });
});

function find(mechId) {
  return mechsImports.get(mechId);
}

function add(mechId, teamId) {
  const existing = find(mechId);
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
  const existing = find(mechId);
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

            <div class="fw-bold p-2">
              Import Destination
            </div>
            <BDropdown
                variant="default"
                toggle-class="w-100"
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
    </template>
  </BModal>
</template>