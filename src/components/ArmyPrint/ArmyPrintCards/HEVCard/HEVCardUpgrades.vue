<script setup lang="ts">
import { computed, watch } from 'vue';
import { type MechArmorUpgradeInfo } from '../../../../data/mech-armor-upgrades';
import { MECH_MOBILITIES, MECH_MOBILITY } from '../../../../data/mech-mobility';
import { MECH_UPGRADE } from '../../../../data/mech-upgrades.js';
import { UPGRADE_TRAIT } from '../../../../data/upgrade-traits.js';
import { useMechStore } from '../../../../store/mech-store';
import { useTeamStore } from '../../../../store/team-store';
import type { TraitInfo } from '../../../../types';
import SvgIcon from '../../../UI/Icon.vue';

const mechStore = useMechStore();
const teamStore = useTeamStore();

const emit = defineEmits<{
  (e: 'contentChanged'): void,
}>();

const { mechId } = defineProps<{
  mechId: number
}>();

type UpgradeItem = {
  display_name?: string,
  card_modifier_note?: string,
  traits?: TraitInfo<UPGRADE_TRAIT>[],
  is_team_perk?: boolean,
  max_uses?: number,
}

const armorUpgrades = computed((): MechArmorUpgradeInfo[] => {
  return mechStore.getMechAllArmorUpgradesInfo(mechId).filter(v => v.visible_on_card);
});

const armorUpgradesList = computed((): MechArmorUpgradeInfo[] => {
  if (armorUpgrades.value.length === 1) return [];
  return armorUpgrades.value;
});

const teamPerks = computed(() => {
  const perks = teamStore.getTeamPerksInfoByMech(mechId).filter(({ visible_on_card }) => visible_on_card) as UpgradeItem[];
  perks.forEach(item => item.is_team_perk = true);
  return perks;
});

const upgrades = computed((): UpgradeItem[] => {
  const soloArmorUpgrade: UpgradeItem[] = [];
  if (armorUpgrades.value.length === 1) {
    const mechArmorUpgradeInfo = armorUpgrades.value[0];
    soloArmorUpgrade.push({
      ...mechArmorUpgradeInfo,
      display_name: mechArmorUpgradeInfo.card_upgrade_solo_display_name,
    });
  }
  const excludeUpgradeTraitIds = [
    UPGRADE_TRAIT.COMPACT,
    UPGRADE_TRAIT.LIMITED,
  ];
  const excludeUpgradeIds = [
    MECH_UPGRADE.MINEFIELD_DRONE_CARRIER_SYSTEM,
    MECH_UPGRADE.DRONE_MINE_DIRECTOR,
    MECH_UPGRADE.DRONE_TACTICAL_AWARENESS,
    MECH_UPGRADE.DRONE_TARGETING_SUPPORT,
  ];
  const upgradesAttachments = mechStore.getMechUpgradesAttachmentInfo(mechId)
    .map(item => {
      if (item.traits) {
        item.traits = item.traits
          .filter(trait => !excludeUpgradeTraitIds.includes(trait.id));
      }

      return item;
    })
    // shown in weapons row instead
    .filter(item => !excludeUpgradeIds.includes(item.upgrade_id)) as UpgradeItem[];

  const mobility: UpgradeItem[] = [];
  const mech = mechStore.getMech(mechId)!;
  if (mech.mobility_id !== MECH_MOBILITY.BI_PEDAL) {
    mobility.push({
      display_name: MECH_MOBILITIES[mech.mobility_id].display_name,
    });
  }

  return [
    ...soloArmorUpgrade,
    ...upgradesAttachments,
    ...teamPerks.value,
    ...mobility,
  ];
});

const orders = computed(() => {
  const grantedOrders = mechStore.getMechGrantedOrdersCollection(mechId);
  return grantedOrders.all();
});

watch([upgrades, orders, armorUpgradesList], () => emit('contentChanged'), { flush: 'post' });
</script>
<template>
  <div v-if="upgrades.length || armorUpgrades.length">
    <div class="section-heading">
      Upgrades
      <template v-if="teamPerks.length">+ Team Perks
        <SvgIcon name="team-perk" size="1.3em" />
      </template>
    </div>
    <div class="upgrades">
      <span v-for="(upgrade, index) in upgrades">
        {{ upgrade.display_name }}<small v-if="upgrade.card_modifier_note"> ({{ upgrade.card_modifier_note }}) </small>
        <template v-if="upgrade.is_team_perk">
          <span>
            <SvgIcon name="team-perk" size="1.3em" />
            <span v-if="index !== upgrades.length -1">, </span>
          </span>
        </template>
        <template v-else>
          <template v-if="upgrade.max_uses">&nbsp;</template>
          <span
            v-if="upgrade.max_uses"
            v-for="i in Array(upgrade.max_uses)"
            class="upgrade-use"
          >&nbsp;</span>
          <template v-if="upgrade.traits?.length">:</template>
          <template v-for="trait in upgrade.traits">
            {{ trait.display_name }}
          </template>
          <span v-if="index !== upgrades.length -1">, </span>
        </template>
      </span>

      <span v-if="armorUpgradesList.length > 1">
        <span class="fw-bold"> Armor: </span>
        <template v-for="(armor, index) in armorUpgradesList">
          {{ armor.display_name }}<small v-if="armor.card_modifier_note"> ({{ armor.card_modifier_note }}) </small>
          <span v-if="index !== armorUpgradesList.length -1">, </span>
        </template>
      </span>
      <span v-if="orders.length">
        <span class="fw-bold"> Special Orders: </span>
        <span v-for="(order, index) in orders">
          {{ order.display_name }}
          <span v-if="index !== orders.length -1">, </span>
        </span>
      </span>
    </div>
  </div>
</template>