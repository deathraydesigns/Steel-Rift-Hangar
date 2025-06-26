<script setup>
import {storeToRefs} from 'pinia';
import SupportAssetWeaponAdd from './SupportAssetWeaponAdd.vue';
import TraitList from '../../../UI/TraitList.vue';
import BtnToolTip from '../../../UI/BtnToolTip.vue';
import {useValidationStore} from '../../../../store/validation-store.js';
import {useSupportAssetWeaponsStore} from '../../../../store/support-asset-weapons-store.js';
import {BButton} from 'bootstrap-vue-next';
import FormatNumber from '../../../functional/format-number.vue';
import IconValidationError from '../../../UI/IconValidationError.vue';
import SupportAssetWeaponDamageFormatter from '../../../UI/SupportAssetWeaponDamageFormatter.vue';
import SupportAssetNoteList from '../../../UI/SupportAssetNoteList.vue';

const store = useSupportAssetWeaponsStore();
const validationStore = useValidationStore();

const {invalid_number_of_support_assets} = storeToRefs(validationStore);
const {
  support_asset_weapons_info,
} = storeToRefs(store);

</script>
<template>
  <div
      :class="{
        'card card-dark-border': true,
        'border-danger': invalid_number_of_support_assets
      }"
  >
    <div class="card-header text-bg-primary">
      <div class="d-flex">
        <div class="col-form-label form-control-sm flex-shrink-1 pe-2 fw-bold">
          Off Table Support Assets
        </div>
        <div class="flex-grow-1">
          <IconValidationError size="sm" :message="invalid_number_of_support_assets"/>
        </div>
        <div class="flex-shrink-1 text-end">
          <SupportAssetWeaponAdd/>
        </div>
      </div>
    </div>
    <div class="card-body p-2" v-if="support_asset_weapons_info.length">
      <table class="table table-btn-sm m-0">
        <thead>
        <tr class="table-tinted">
          <th>Name</th>
          <th class="text-end pe-1">Damage</th>
          <th class="text-end pe-1">Tons</th>
          <th>Traits</th>
          <th>Notes</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in support_asset_weapons_info" :key="item.id">
          <td>
            <BtnToolTip>
              <template #target>
                <span class="text-tooltip">
                  {{ item.display_name }}
                </span>
              </template>
              <template #content>
                {{ item.description }}
              </template>
            </BtnToolTip>
          </td>
          <td class="text-end">
            <SupportAssetWeaponDamageFormatter
                :damage="item.off_table_weapon.damage"
                :damage-modifiers="item.off_table_weapon.damage_modifiers"
            />
          </td>
          <td class="text-end">
            <format-number :val="item.cost" :invert-color="true"/>
          </td>
          <td>
            <TraitList :traits="item.off_table_weapon.traits"/>
          </td>
          <td>
            <SupportAssetNoteList :notes="item.notes"/>
          </td>
          <td class="table-btn-cell text-end">
            <BButton @click="store.removeSupportAssetId(item.id)" variant="danger" size="sm"><span
                class="material-symbols-outlined">delete</span></BButton>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>