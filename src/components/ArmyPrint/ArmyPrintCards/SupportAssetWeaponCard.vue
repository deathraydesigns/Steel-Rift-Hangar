<script setup>
import {computed} from 'vue';
import {TRAIT_LIMITED, traitDisplayNames} from '../../../data/weapon-traits.js';
import CardHeader from './CardParts/CardHeader.vue';
import CardFooter from './CardParts/CardFooter.vue';
import {useSupportAssetWeaponsStore} from '../../../store/support-asset-weapons-store.js';
import {find} from 'es-toolkit/compat';

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
  <div class="game-card">
    <div class="card-content-container">
      <CardHeader :title="info.display_name"/>

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
            <div class="weapon-uses">
              <div class="weapon-use" v-for="i in Array(max_uses)">&nbsp;</div>
            </div>
          </td>
          <td v-if="weapon.damage">
            {{ weapon.damage }}
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
          <p v-for="i in info.notes">{{ i }}</p>
        </div>
      </template>
      <CardFooter/>
    </div>
  </div>
</template>