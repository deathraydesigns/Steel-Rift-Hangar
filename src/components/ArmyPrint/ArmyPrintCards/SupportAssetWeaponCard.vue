<script setup>
import {computed} from 'vue';
import {TRAIT_LIMITED} from '../../../data/weapon-traits.js';
import CardHeader from './CardParts/CardHeader.vue';
import CardFooter from './CardParts/CardFooter.vue';
import {useSupportAssetWeaponsStore} from '../../../store/support-asset-weapons-store.js';
import {find} from 'es-toolkit/compat';
import {traitDisplayNames} from '../../../data/data-helpers.js';
import SupportAssetWeaponDamageFormatter from '../../UI/SupportAssetWeaponDamageFormatter.vue';

const supportAssetStore = useSupportAssetWeaponsStore();

const {supportAssetId} = defineProps({
  supportAssetId: {
    type: String,
    required: true,
  },
});

const info = computed(() => supportAssetStore.getSupportAssetInfo(supportAssetId));

const weapon = computed(() => info.value.off_table_weapon);

const traits = computed(() => {
  const filteredTraits = weapon.value.traits.filter(trait => trait.id !== TRAIT_LIMITED);
  return traitDisplayNames(filteredTraits);
});

const max_uses = computed(() => {
  const limitedTrait = find(weapon.value.traits, {id: TRAIT_LIMITED});
  if (limitedTrait) {
    return limitedTrait.number;
  }
});
</script>
<template>
  <div class="game-card card-support-asset-size-1">
    <div class="card-content-container">
      <CardHeader
          :title="info.display_name"
          :sub-title="`(Support Asset ${info.cost} Tons)`"
      />

      <div class="section-heading">Support Asset</div>
      <div class="card-description">
        {{ info.description }}
      </div>

      <table class="table-stats">
        <thead>
        <tr>
          <th>Weapon</th>
          <th class="text-start" v-if="max_uses">Ltd</th>
          <th v-if="weapon.damage">Dmg</th>
          <th class="text-start">Traits</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            {{ info.display_name }}
          </td>
          <td class="text-start" v-if="max_uses">
            <span class="text-nowrap">
              <span class="use use-weapon" v-for="i in Array(max_uses)">&nbsp;</span>
            </span>
          </td>
          <td v-if="weapon.damage">
            <SupportAssetWeaponDamageFormatter
                :damage="weapon.damage"
                :damage-modifiers="weapon.damage_modifiers"
            />
          </td>
          <td class="text-start">
            {{ traits }}
          </td>
        </tr>
        </tbody>
      </table>
      <template v-if="info.notes?.length">
        <div class="section-heading">
          Notes
        </div>
        <div class="card-description">
          <div v-for="note in info.notes">
            {{ note.display_name }}
            <Icon v-if="note.is_team_perk" name="team-perk" size="14px"/>
            <span class="material-symbols-outlined" v-if="note.is_faction_perk" style="font-size: 12px">flag</span>
          </div>
        </div>
      </template>

      <CardFooter/>
    </div>
  </div>
</template>