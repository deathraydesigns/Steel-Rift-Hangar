<script setup>

import BtnLoad from './UI/BtnLoad.vue';
import BtnSave from './UI/BtnSave.vue';
import {useArmyListStore} from '../store/army-list-store.js';
import {storeToRefs} from 'pinia';
import {useTeamStore} from '../store/team-store.js';
import {useSupportAssetCountsStore} from '../store/support-asset-count-store.js';
import {inject, ref} from 'vue';
import {ROUTE_HOME, ROUTE_PRINT} from '../routes.js';
import Navbar from './Navbar.vue';
import Fraction from './functional/fraction.vue';
import {resetStores} from '../store/helpers/store-save-load.js';
import {BButton, BModal} from 'bootstrap-vue-next';
import BtnArmyListValidation from './ArmyEdit/ArmyList/BtnArmyListValidation.vue';

const {used_teams_count, max_teams_count} = storeToRefs(useTeamStore());
const {used_support_assets, max_support_assets} = storeToRefs(useSupportAssetCountsStore());
const {used_tons, max_tons, name} = storeToRefs(useArmyListStore());

const currentPath = inject('currentPath');
const resetModal = ref(false);
const mode = inject('color_mode');
const modalContainer = inject('modal_container');

</script>
<template>
  <div class="sticky-top bg-body text-body border-bottom shadow app-header" :data-bs-theme="mode">
    <Navbar/>
    <div class="container-lg">
      <div class="pt-2 px-3 pb-2">
        <div class="row">
          <div class="col-md-3">
            <div class="d-flex">
              <label class="col-form-label form-control-sm fw-bold me-2" for="list-name">
                Army&nbsp;Name:
              </label>
              <input
                  type="text"
                  v-model="name"
                  id="list-name"
                  class="form-control form-control-sm"
              />
            </div>
          </div>

          <div class="col-md-6">
            <div class="col-form-label form-control-sm d-inline-block text-end">
              <strong>Teams: </strong>
              <fraction
                  :a="used_teams_count"
                  :b="max_teams_count"
                  success-class="fw-bold"
              />

              <span class="ms-2">
                <strong>Support Assets: </strong>
                <fraction
                    :a="used_support_assets"
                    :b="max_support_assets"
                    success-class="fw-bold"
                />
              </span>
              <span class="ms-2">
                <strong>Tonnage: </strong>
                <fraction
                    :a="used_tons"
                    :b="max_tons"
                    success-class="fw-bold"
                />
              </span>
            </div>
            <BtnArmyListValidation/>
          </div>
          <div class="col-md-3 text-md-end header-btns">
            <BtnSave/>
            <BtnLoad/>
            <BButton
                @click="resetModal = !resetModal"
                size="sm"
                variant="danger"
                class="ms-1"
            >
              Reset
            </BButton>
            <div class="btn-group d-inline-block ms-1 mt-2 mt-xl-0" role="group">
              <a :href="`#${ROUTE_HOME}`" :class="{
                  'btn btn-sm btn-default': true,
                  'active': currentPath === `#${ROUTE_HOME}` || currentPath === ''
                }">
                Edit
              </a>
              <a :href="`#${ROUTE_PRINT}`" :class="{
                  'btn btn-sm btn-default': true,
                  'active': currentPath === `#${ROUTE_PRINT}`
                }">
                Print
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BModal
      v-model="resetModal"
      centered
      @ok="resetStores()"
      ok-variant="danger"
      title="Reset Army List?"
      :teleport-to="modalContainer"
  >
    <div class="lead">
      Are you sure you want to clear all army list data?
    </div>
  </BModal>
</template>