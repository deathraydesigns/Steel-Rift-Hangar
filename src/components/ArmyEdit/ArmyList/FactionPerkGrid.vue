<script setup>
import {useFactionStore} from '../../../store/faction-store.js';
import {storeToRefs} from 'pinia';
import {BButton, BModal} from 'bootstrap-vue-next';

const model = defineModel();
const store = useFactionStore();
const {clearInvalidPerks} = useFactionStore();

const {
  faction_id,
  factions_info,
  perks_full,
  perk_grid,
} = storeToRefs(store);

const {addPerk, removePerk, hasPerk, hasPerkInGroupId} = store;

function setFactionId(factionId) {
  faction_id.value = factionId;
  clearInvalidPerks();
}
</script>
<template>
  <BModal
      v-model="model"
      :autofocus="false"
      no-trap
      centered
      ok-variant="secondary"
      size="xl"
  >
    <template #title>
      Faction Perks <span class="fw-light">(Pick 2)</span>
    </template>

    <ul class="nav nav-tabs nav-tabs-factions">
      <button class="nav-link disabled tab-select-faction" role="tab" tabindex="-1">Select Faction:</button>
      <li class="nav-item" v-for="faction in factions_info">
        <button :class="{'nav-link': true, 'active': faction.id === faction_id}" @click="setFactionId(faction.id)">
          {{ faction.display_name }}
        </button>
      </li>
    </ul>

    <div v-for="faction in factions_info" v-show="faction.id === faction_id">
      <div
          class="my-4"
          v-for="group in perk_grid"
      >
        <h4 class="fw-bold ps-3">
          {{ group.display_name }}
        </h4>

        <div class="row row-cols-1 row-cols-lg-3">

          <div
              class="col pb-3"
              v-for="perk in group.perks"
          >
            <div :class="{'card card-faction-perk h-100': true, 'border border-primary': hasPerk(perk.id)}">
              <div class="card-header ps-3 fw-bold">
                {{ perk.display_name }}
              </div>
              <div class="card-body">
                {{ perk.description }}
              </div>
              <div class="card-footer text-end">
                <BButton
                    class="btn"
                    variant="secondary"
                    :disabled="perks_full || hasPerkInGroupId(group.id)"
                    v-if="!hasPerk(perk.id)"
                    @click="addPerk(perk.id)"
                >
                  Add Perk
                </BButton>
                <BButton
                    class="btn"
                    variant="danger"
                    v-if="hasPerk(perk.id)"
                    @click="removePerk(perk.id)"
                >
                  Remove Perk
                </BButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #cancel>&nbsp;</template>
  </BModal>
</template>