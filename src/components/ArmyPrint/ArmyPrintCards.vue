<script setup>
import {useMechStore} from '../../store/mech-store.js';
import {computed} from 'vue';
import {chunk} from 'es-toolkit/compat';
import HEVCard from './ArmyPrintCards/HEVCard.vue';
import {usePrintSettingsStore} from '../../store/print-settings-store.js';
import {useTeamStore} from '../../store/team-store.js';
import {useFactionStore} from '../../store/faction-store.js';
import {useSupportAssetWeaponsStore} from '../../store/support-asset-weapons-store.js';
import {useSupportAssetUnitsStore} from '../../store/support-asset-units-store.js';
import MineDroneCard from './ArmyPrintCards/MineDroneCard.vue';
import FactionPerkCard from './ArmyPrintCards/FactionPerkCard.vue';
import SupportAssetWeaponCard from './ArmyPrintCards/SupportAssetWeaponCard.vue';
import SupportAssetUnitCard from './ArmyPrintCards/SupportAssetUnitCard.vue';
import {flatMap, sortBy} from 'es-toolkit';
import MSOECard from './ArmyPrintCards/MSOECard.vue';

const printSettingsStore = usePrintSettingsStore();
const teamStore = useTeamStore();
const factionStore = useFactionStore();
const supportAssetWeaponsStore = useSupportAssetWeaponsStore();
const supportAssetUnitsStore = useSupportAssetUnitsStore();

function getMechCardsByTeam() {
  let results = {};

  teamStore.non_shelf_teams.forEach(team => {
    const teamMechIds = teamStore.getTeamMechIds(team.id);
    if (teamMechIds.length) {
      results[team.id] = mechIdsToCards(teamMechIds);
    }
  });

  return results;
}

const pages = computed(() => {

  const mechCardsByTeam = getMechCardsByTeam();

  if (printSettingsStore.one_team_per_page) {
    let cardPages = [];
    Object.values(mechCardsByTeam).forEach(mechCards => {
      const teamPages = chunk(mechCards, 9);
      cardPages = cardPages.concat(teamPages);
    });

    const refPages = chunk(referenceCards.value, 9);
    return [
      ...cardPages,
      ...refPages,
    ];
  }

  let cards = flatMap(Object.values(mechCardsByTeam), (cards) => cards);
  if (printSettingsStore.separate_reference_cards_page) {
    const cardPages = chunk(cards, 9);
    const refPages = chunk(referenceCards.value, 9);
    return [
      ...cardPages,
      ...refPages,
    ];
  }

  cards = [
    ...cards,
    ...referenceCards.value,
  ];
  return chunk(cards, 9);

});

function mechIdsToCards(mechIds) {
  return mechIds.map(mechId => {
    return {
      type: 'hev',
      mechId,
    };
  });
}

const referenceCards = computed(() => {
  const cards = [];
  if (printSettingsStore.include_mine_drone_card) {
    cards.push({
      type: 'mine_drone',
    });
  }

  if (printSettingsStore.include_msoe_card) {
    cards.push({
      type: 'msoe',
    });
  }

  if (printSettingsStore.include_faction_perk_1_card) {
    if (factionStore.perk_1_id) {
      cards.push({
        type: 'faction_perk',
        perkId: factionStore.perk_1_id,
      });
    }
  }

  if (printSettingsStore.include_faction_perk_2_card) {
    if (factionStore.perk_2_id) {
      cards.push({
        type: 'faction_perk',
        perkId: factionStore.perk_2_id,
      });
    }
  }

  return cards;
});

const supportAssetPages = computed(() => {

  let cards = [];
  supportAssetUnitsStore.support_asset_units.forEach(unit => {
    const hasGarrison = supportAssetUnitsStore.getUnitAttachmentHasGarrisonUnits(unit.id);

    cards.push({
      type: 'support_asset_unit',
      unitAttachmentId: unit.id,
      cardSize: hasGarrison ? 2 : 1,
    });

  });

  cards = sortBy(cards, ['cardSize']);

  supportAssetWeaponsStore.support_asset_weapon_ids.forEach(supportAssetId => {
    cards.push({
      type: 'support_asset_weapon',
      supportAssetId,
      cardSize: 1,
    });
  });

  const slotsPerPage = 6;
  const pages = [];

  let currentPage = [];
  let currentPageSize = 0;

  cards.forEach(card => {

    if (currentPageSize === slotsPerPage || currentPageSize + card.cardSize > slotsPerPage) {
      pages.push(currentPage);
      currentPage = [];
      currentPageSize = 0;
    }

    currentPage.push(card);
    currentPageSize += card.cardSize;
  });

  if (currentPage.length) {
    pages.push(currentPage);
  }
  return pages;
});

</script>
<template>
  <div
      v-for="page in pages"
      class="page-preview page-letter"
      style="background-color:white"
  >
    <div class="page-card-grid">
      <template v-for="item in page">
        <HEVCard v-if="item.type === 'hev'" :mech-id="item.mechId"/>
        <MineDroneCard v-if="item.type === 'mine_drone'"/>
        <MSOECard v-if="item.type === 'msoe'"/>
        <FactionPerkCard v-if="item.type === 'faction_perk'" :perk-id="item.perkId"/>
      </template>
    </div>
  </div>

  <div
      v-for="page in supportAssetPages"
      class="page-preview page-letter"
      style="background-color:white"
  >
    <div class="page-card-grid-flex">
      <template v-for="item in page">
        <SupportAssetWeaponCard
            v-if="item.type === 'support_asset_weapon'"
            :support-asset-id="item.supportAssetId"
        />
        <SupportAssetUnitCard
            v-if="item.type === 'support_asset_unit'"
            :unit-attachment-id="item.unitAttachmentId"
        />
      </template>
    </div>
  </div>
</template>
