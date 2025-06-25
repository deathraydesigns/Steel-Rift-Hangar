import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import {useArmyListStore} from './army-list-store.js';
import {GAME_SIZES} from '../data/game-sizes.js';
import {useSupportAssetUnitsStore} from './support-asset-units-store.js';
import {useSupportAssetWeaponsStore} from './support-asset-weapons-store.js';

export const useSupportAssetCountsStore = (prefix = '') => (defineStore(prefix + 'support-asset-counts', () => {

        const armyList = useArmyListStore(prefix);

        const supportAssetUnits = useSupportAssetUnitsStore(prefix);
        const supportAssetWeapons = useSupportAssetWeaponsStore(prefix);

        const custom_max_support_assets = ref(null);

        function $reset() {
            custom_max_support_assets.value = null;
        }

        const used_tons = computed(() => {
            return supportAssetWeapons.used_tons + supportAssetUnits.used_tons;
        });
        const used_support_assets = computed(() => {
            return supportAssetWeapons.used_count + supportAssetUnits.used_count;
        });

        const max_support_assets = computed(() => {
            if (custom_max_support_assets.value) {
                return custom_max_support_assets.value;
            }
            const sizeId = armyList.game_size_id;
            return GAME_SIZES[sizeId].max_support_assets;
        });

        return {
            custom_max_support_assets,
            used_tons,
            used_support_assets,
            max_support_assets,
            $reset,
        };
    },
    {
        persist: prefix === '',
    },
))();