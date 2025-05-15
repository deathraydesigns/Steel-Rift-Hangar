<script setup>

import {computed} from 'vue';
import {SIZE_LIGHT, SIZE_ULTRA} from '../../../../data/mech-sizes.js';
import {useMechStore} from '../../../../store/mech-store.js';
import {chunk} from 'lodash';
import {useFactionStore} from '../../../../store/faction-store.js';
import {RD_ADVANCED_STRUCTURAL_COMPONENTS} from '../../../../data/faction-perks.js';

const mechStore = useMechStore();
const factionStore = useFactionStore();

const {mechId} = defineProps({
  mechId: {
    type: Number,
  },
});
const info = computed(() => mechStore.getMechInfo(mechId));

const structureSystem = computed(() => {
  if (info.value.size.id === SIZE_LIGHT) {
    return 'Fragile Internals';
  }
  if (info.value.size.id === SIZE_ULTRA) {
    return 'Backup Systems';
  }
});

const armor6PerRow = computed(() => {
  const armorStat = info.value.armor_stat;
  return armorStat > 15;
});

const armorHp = computed(() => {
  const armorStat = info.value.armor_stat;
  const points = new Array(armorStat);
  if (armor6PerRow.value) {
    return chunk(points, 6);
  }
  return chunk(points, 5);
});

function splitIntoChunkCounts(total) {
  const parts = 4;
  const base = Math.floor(total / parts);
  const remainder = total % parts;

  const chunks = Array(parts).fill(base);

  for (let i = 0; i < remainder; i++) {
    chunks[i] += 1;
  }

  return chunks;
}

const structureHp = computed(() => {
  const structure = info.value.structure_stat;

  const chunkCounts = splitIntoChunkCounts(structure);

  let points = [];
  const map = [
    'M',
    'D',
    'Ø',
  ];

  chunkCounts.forEach((count, index) => {
    const items = Array(count).fill(0);

    items[items.length - 1] = map[index];
    points = points.concat(items);
  });

  if (factionStore.hasPerk(RD_ADVANCED_STRUCTURAL_COMPONENTS)) {
    points = ['-', '-'].concat(points);
  }

  return chunk(points, 5);
});

</script>
<template>
  <div class="row g-1 row-damage">
    <div class="col-5">
      <div class="hp-heading">
        ARMOR
      </div>
      <div class="hp-container">
        <div class="hp-row" v-for="row in armorHp">
          <span class="hp" v-for="i in row"></span>
        </div>
      </div>
    </div>
    <div class="col-7">
      <div class="row g-1">
        <div class="col-7 hp-structure">
          <div class="hp-heading">
            STRUCTURE
          </div>
          <div class="hp-container">
            <div class="hp-row" v-for="row in structureHp">
              <span class="hp" v-for="i in row">
                <span v-if="i">{{ i }}</span>
                <span v-else>&nbsp;</span>
              </span>
            </div>
          </div>
          <div class="structure-systems" v-if="structureSystem">
            {{ structureSystem }}
          </div>
        </div>
        <div class="col-5 crit-container">
          <div class="crit-heading">
            CRIT
          </div>
          <div class="crit-content">
            <table class="table-crit">
              <tbody>
              <tr>
                <td>
                  <strong>(M)</strong>ove
                </td>
                <td class="text-end">
                  -1
                </td>
              </tr>
              <tr>
                <td>
                  <strong>(D)</strong>mg
                </td>
                <td class="text-end">
                  -1
                </td>
              </tr>
              <tr>
                <td>
                  <strong>(Ø)</strong>rders
                </td>
                <td class="text-end">
                  -1
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>