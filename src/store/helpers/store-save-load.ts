import { getStoreUnscopedId } from 'pinia-scope';
import { MECH_MOBILITY } from '../../data/mech-mobility';
import { TEAM_MULTIROLE, TEAM_SHELF } from '../../data/mech-teams';
import { ULTRA_LIGHT_HEV_SQUADRON } from '../../data/support-assets/ultra-light-hev-squadron';
import { useArmyListStore } from '../army-list-store';
import { useFactionStore } from '../faction-store';
import { useMechStore } from '../mech-store';
import { usePrintSettingsStore } from '../print-settings-store';
import { useSupportAssetCountsStore } from '../support-asset-count-store';
import { useSupportAssetUnitsStore } from '../support-asset-units-store';
import { useSupportAssetWeaponsStore } from '../support-asset-weapons-store';
import { makeShelfTeam, useTeamStore } from '../team-store';

function getStores(scope = '') {
    return [
        useMechStore(scope),
        useFactionStore(scope),
        useTeamStore(scope),
        useSupportAssetCountsStore(scope),
        useSupportAssetWeaponsStore(scope),
        useSupportAssetUnitsStore(scope),
        useArmyListStore(scope),
        usePrintSettingsStore(scope),
    ];
}

export function resetStores(scope = '') {
    window.localStorage.clear();
    getStores(scope).forEach((store: any) => {
        store.$reset();
    });
}

export function disposeStores(scope = '') {
    getStores(scope).forEach((store: any) => {
        store.$dispose();
    });
}

export function makeSaveFileData() {

    const result: any = {
        save_schema_version: 3,
    };

    getStores().forEach((store: any) => {
        //make sure stores are persisted in case they have not been mutated yet
        store.$persist();

        const key = store.$id;
        result[key] = JSON.parse(localStorage[key]);
    });

    return result;
}

export function loadSaveFileData(data: any, scope = '') {

    data = migrateLoadData(data);

    getStores(scope).forEach((store: any) => {
        const storeId = getStoreUnscopedId(store);
        store.$reset();
        store.$patch(data[storeId]);
        if (store.afterHydrate) {
            store.afterHydrate();
        }
    });
}

export function migrateLoadData(data: any) {
    if (data.save_schema_version === 1) {
        data?.mech?.mechs?.forEach((mech: any) => {
            if (!mech.mobility_id) {
                mech.mobility_id = MECH_MOBILITY.BI_PEDAL;
            }
        });
    }

    if (data.save_schema_version < 3) {
        data['support-asset-units']?.support_asset_units?.forEach((unit: any) => {
            if (unit.support_asset_unit_id === ULTRA_LIGHT_HEV_SQUADRON) {
                unit?.vehicles.forEach((vehicle: any) => {
                    if (vehicle.vehicle_id === 'FIRE_SUPPORT') {
                        vehicle.vehicle_id = 'PYRO';
                    }
                    if (vehicle.vehicle_id === 'TACTICAL') {
                        vehicle.vehicle_id = 'COMMANDO';
                    }
                    if (vehicle.vehicle_id === 'ENGINEERING') {
                        vehicle.vehicle_id = 'RIFLEMAN';
                    }
                });
            }
        });
    }

    if (data.save_schema_version < 4) {
        const tacticalTeam = data?.team?.teams?.find((team: any) => team.id === 'TEAM_TACTICAL');
        if (tacticalTeam) {
            tacticalTeam.id = TEAM_MULTIROLE;
        }
    }

    const shelfTeam = data?.team?.teams?.find((team: any) => team.id === TEAM_SHELF);

    if (!shelfTeam) {
        if (!data.team) {
            data.team = { teams: [] };
        }
        data.team.teams.push(makeShelfTeam());
    }

    return data;
}
