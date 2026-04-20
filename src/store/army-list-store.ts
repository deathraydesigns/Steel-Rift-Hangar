import { defineScopeableStore } from 'pinia-scope';
import { computed, ref } from 'vue';
import { GAME_SIZES, getGameSizeId } from '../data/game-sizes';
import { MINEFIELD_DRONE_CARRIER_SYSTEM } from '../data/mech-upgrades';
import { ORDER_SUPPORT_MSOE } from '../data/orders/support-orders';
import { MINE_DRONE_BARRAGE } from '../data/support-asset-weapons';
import { UNIT_TRAIT } from '../data/unit-traits';
import { useMechStore } from './mech-store';
import { useSupportAssetCountsStore } from './support-asset-count-store';
import { useSupportAssetUnitsStore } from './support-asset-units-store';
import { useSupportAssetWeaponsStore } from './support-asset-weapons-store';

export const useArmyListStore = defineScopeableStore('army-list', ({ scope }: { scope: string }) => {
        const supportAssetWeaponsStore = useSupportAssetWeaponsStore(scope);
        const supportAssetUnitStore = useSupportAssetUnitsStore(scope);

        const defaultArmyName = '';
        const defaultMaxTons = 100;

        const name = ref(defaultArmyName);
        const max_tons = ref(defaultMaxTons);

        function $reset() {
            name.value = defaultArmyName;
            max_tons.value = defaultMaxTons;
        }

        const mechStore = useMechStore(scope);
        const supportAssetCounts = useSupportAssetCountsStore(scope);

        const game_size_id = computed(() => getGameSizeId(max_tons.value)!);
        const game_size_info = computed(() => GAME_SIZES[game_size_id.value]);

        const used_tons = computed((): number => {
            return mechStore.totalTons +
                supportAssetCounts.used_tons;
        });

        const includes_mine_drones = computed(() => {

            const match = mechStore.mechs.find((mech) => {
                return mech.upgrades.find(t => t.upgrade_id === MINEFIELD_DRONE_CARRIER_SYSTEM);
            });

            if (match) {
                return true;
            }

            if (supportAssetUnitStore.has_mine_drones) {
                return true;
            }
            return supportAssetWeaponsStore.hasSupportAssetId(MINE_DRONE_BARRAGE);
        });

        const includes_msoe = computed(() => {
            const hasLauncher = supportAssetUnitStore.support_asset_units.find((unit) => {
                const unitInfo = supportAssetUnitStore.getUnitAttachmentInfo(unit.id);
                if (!unitInfo) return false;
                return unitInfo.vehicles.find((vehicle) => {
                    return vehicle.traits.find((trait) => trait.id === UNIT_TRAIT.MSOE_LAUNCHER);
                });
            });

            return hasLauncher || supportAssetUnitStore.getAllGrantedOrdersCollection().includes(ORDER_SUPPORT_MSOE);
        });

        return {
            name,
            used_tons,
            max_tons,
            game_size_id,
            game_size_info,
            includes_mine_drones,
            includes_msoe,
            $reset,
        };
    }, (scope: string) => {
        return {
            persist: scope === '',
        };
    },
);
