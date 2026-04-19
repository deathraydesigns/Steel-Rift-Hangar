import {computed, ref} from 'vue';
import {useArmyListStore} from './army-list-store';
import {GAME_SIZES} from '../data/game-sizes';
import {useSupportAssetUnitsStore} from './support-asset-units-store';
import {useSupportAssetWeaponsStore} from './support-asset-weapons-store';
import {defineScopeableStore} from 'pinia-scope';

export const useSupportAssetCountsStore = defineScopeableStore('support-asset-counts', ({scope}: { scope: string }) => {

        const armyList = useArmyListStore(scope);

        const supportAssetUnits = useSupportAssetUnitsStore(scope);
        const supportAssetWeapons = useSupportAssetWeaponsStore(scope);

        const custom_max_support_assets = ref<number | null>(null);

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
    }, (scope: string) => {
        return {
            persist: scope === '',
        };
    }
);
