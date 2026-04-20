<script setup lang="ts">
import { chunk } from 'es-toolkit';
import { computed } from 'vue';
import { RD_ADVANCED_STRUCTURAL_COMPONENTS } from '../../../../data/faction-perks.js';
import {
  EXTRA_PLATING_ARMOR_UPGRADE,
  HEAVY_PLATING_ARMOR_UPGRADE,
  NO_ARMOR_UPGRADE,
} from '../../../../data/mech-armor-upgrades';
import { SIZE } from '../../../../data/unit-sizes.js';
import { useFactionStore } from '../../../../store/faction-store';
import { useMechStore } from '../../../../store/mech-store';

const mechStore = useMechStore();
const factionStore = useFactionStore();

const { mechId } = defineProps<{
  mechId: number,
}>();

const info = computed(() => mechStore.getMechInfo(mechId)!);

const structureSystem = computed(() => {
  if (info.value.size.id === SIZE.LIGHT) {
    return 'Fragile Internals';
  }
  if (info.value.size.id === SIZE.ULTRA) {
    return 'Backup Systems';
  }
});

const armor6PerRow = computed(() => {
  const armorStat = info.value.armor_stat;
  return armorStat > 15;
});

const structure6PerRow = computed(() => {
  const structureStat = info.value.structure_stat;
  return structureStat > 10;
});

const armorHp = computed(() => {
  const armorStat = info.value.armor_stat;

  let baseArmor = armorStat;
  let extraArmor = 0;

  const armorUpgrade = mechStore.getMechArmorUpgradeAttachmentInfo(mechId);
  if (armorUpgrade && armorUpgrade.armor_mod) {
    extraArmor = armorUpgrade.armor_mod;
    baseArmor = armorStat - extraArmor;
  }

  const points: string[] = [
    ...new Array(baseArmor).fill('armor'),
    ...new Array(extraArmor).fill('extra_armor'),
  ];

  if (armor6PerRow.value) {
    return chunk(points, 6);
  }
  return chunk(points, 5);
});

function splitIntoChunkCounts(total: number) {
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

  let points: string[] = [];
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
    points.splice(points.length - 2, 2);
  }

  if (structure6PerRow.value) {
    return chunk(points, 6);
  }
  return chunk(points, 5);
});

const armorUpgrade = computed(() => {
  const armorUpgrade = mechStore.getMechArmorUpgradeAttachmentInfo(mechId);

  const exclude: string[] = [
    NO_ARMOR_UPGRADE,
    EXTRA_PLATING_ARMOR_UPGRADE,
    HEAVY_PLATING_ARMOR_UPGRADE,
  ];

  if (armorUpgrade && !exclude.includes(armorUpgrade?.id ?? '')) {
    return armorUpgrade;
  }
});

</script>
<template>
  <div class="row g-1 row-damage">
    <div class="col-5">
      <div class="hp-heading">
        ARMOR <small class="fw-light" v-if="armorUpgrade">({{ armorUpgrade.display_name }})</small>
      </div>
      <div class="hp-container">
        <div class="hp-row" v-for="row in armorHp">
          <span class="hp hp-armor" v-for="i in row">
            <template v-if="i === 'extra_armor'">+</template>
          </span>
        </div>
      </div>
    </div>
    <div class="col-7">
      <div class="d-flex">
        <div class="hp-structure flex-grow-1">
          <div class="hp-heading ps-0">
            STRUCTURE
          </div>
          <div class="hp-container">
            <div class="hp-row" v-for="row in structureHp">
              <span class="hp hp-structure" v-for="i in row">
                <span v-if="i">{{ i }}</span>
                <span v-else>&nbsp;</span>
              </span>
            </div>
          </div>
          <div class="structure-systems" v-if="structureSystem">
            {{ structureSystem }}
          </div>
        </div>
        <div class="crit-container">
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