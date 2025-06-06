import {defineStore, storeToRefs} from 'pinia';
import {computed, ref, watch} from 'vue';
import {useArmyListStore} from './army-list-store.js';
import {useFactionStore} from './faction-store.js';

export const PRINT_MODE_CARDS = 'PRINT_MODE_CARDS';
export const PRINT_MODE_REF = 'PRINT_MODE_REF';
export const PRINT_MODE_ALL = 'PRINT_MODE_ALL';

export const PRINT_MODES = {
    [[PRINT_MODE_CARDS]]: {
        display_name: 'Cards',
    },
    [[PRINT_MODE_REF]]: {
        display_name: 'Rules Reference',
    },
    [[PRINT_MODE_ALL]]: {
        display_name: 'All',
    },
};
export const usePrintSettingsStore = defineStore('print-settings', () => {

        const one_team_per_page = ref(false);
        const include_army_name_on_cards = ref(true);

        const include_mine_drone_card = ref(false);

        const include_msoe_card = ref(false);
        const include_faction_perk_1_card = ref(false);
        const include_faction_perk_2_card = ref(false);
        const separate_reference_cards_page = ref(false);

        const print_mode = ref(PRINT_MODE_CARDS);
        const print_mode_display_name = computed(() => PRINT_MODES[print_mode.value].display_name);

        function $reset() {
            one_team_per_page.value = false;
            include_army_name_on_cards.value = false;
            include_mine_drone_card.value = false;
            include_msoe_card.value = false;
            include_faction_perk_1_card.value = false;
            include_faction_perk_2_card.value = false;
            separate_reference_cards_page.value = false;
        }

        const {includes_mine_drones} = storeToRefs(useArmyListStore());
        const {perk_1_id, perk_2_id} = storeToRefs(useFactionStore());

        watch(includes_mine_drones, () => {
            include_mine_drone_card.value = includes_mine_drones.value;
        });

        watch(perk_1_id, () => {
            include_faction_perk_1_card.value = !!perk_1_id.value;
        });

        watch(perk_2_id, () => {
            include_faction_perk_2_card.value = !!perk_2_id.value;
        });

        return {
            print_mode,
            print_mode_display_name,

            one_team_per_page,
            include_army_name_on_cards,
            include_mine_drone_card,
            include_msoe_card,
            include_faction_perk_1_card,
            include_faction_perk_2_card,
            separate_reference_cards_page,

            $reset,
        };
    },
    {
        persist: {
            pick: [
                'one_team_per_page',
                'include_army_name_on_cards',
                'include_mine_drone_card',
                'include_msoe_card',
                'include_faction_perk_1_card',
                'include_faction_perk_2_card',
                'separate_reference_cards_page',
            ],
        },
    });