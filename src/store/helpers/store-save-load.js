import {useMechStore} from '../mech-store.js';
import {useFactionStore} from '../faction-store.js';
import {useTeamStore} from '../team-store.js';
import {useSupportAssetCountsStore} from '../support-asset-count-store.js';
import {useArmyListStore} from '../army-list-store.js';
import {usePrintSettingsStore} from '../print-settings-store.js';
import {useSupportAssetWeaponsStore} from '../support-asset-weapons-store.js';
import {useSupportAssetUnitsStore} from '../support-asset-units-store.js';
import {MOBILITY_BI_PEDAL} from '../../data/mech-mobility.js';
import {ULTRA_LIGHT_HEV_SQUADRON} from '../../data/support-assets/ultra-light-hev-squadron.js';

function getStores() {
    return [
        useMechStore(),
        useFactionStore(),
        useTeamStore(),
        useSupportAssetCountsStore(),
        useSupportAssetWeaponsStore(),
        useSupportAssetUnitsStore(),
        useArmyListStore(),
        usePrintSettingsStore(),
    ];
}

export function resetStores() {
    getStores().forEach((store) => {
        store.$reset();
    });
}

export function makeSaveFileData() {

    const result = {
        save_schema_version: 3,
    };

    getStores().forEach((store) => {
        //make sure stores are persisted in case they have not been mutated yet
        store.$persist();

        const key = store.$id;
        result[key] = JSON.parse(localStorage[key]);
    });

    return result;
}

export function loadSaveFileData(data) {

    data = migrateLoadData(data);

    getStores().forEach((store) => {
        store.$reset();
        store.$patch(data[store.$id]);
    });
}

function migrateLoadData(data) {
    if (data.save_schema_version === 1) {
        data?.mech?.mechs?.forEach(mech => {
            if (!mech.mobility_id) {
                mech.mobility_id = MOBILITY_BI_PEDAL;
            }
        });
    }

    if (data.save_schema_version < 3) {
        data['support-asset-units']?.support_asset_units?.forEach(unit => {
            if (unit.support_asset_unit_id === ULTRA_LIGHT_HEV_SQUADRON) {
                unit?.vehicles.forEach(vehicle => {
                    if (vehicle.vehicle_id === 'FIRE_SUPPORT') {
                        vehicle.vehicle_id = 'PYRO';
                    }
                    if (vehicle.vehicle_id === 'TACTICAL') {
                        vehicle.vehicle_id = 'COMMANDO';
                    }
                    if (vehicle.vehicle_id === 'ENGINEERING') {
                        vehicle.vehicle_id = 'RIFLEMAN';
                    }
                    console.log(vehicle.vehicle_id)
                });
            }
        });
    }

    return data;
}
