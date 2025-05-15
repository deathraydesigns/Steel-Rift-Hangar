import {useMechStore} from '../mech-store.js';
import {useFactionStore} from '../faction-store.js';
import {useTeamStore} from '../team-store.js';
import {useSupportAssetCountsStore} from '../support-asset-count-store.js';
import {useArmyListStore} from '../army-list-store.js';
import {usePrintSettingsStore} from '../print-settings-store.js';
import {useSupportAssetWeaponsStore} from '../support-asset-weapons-store.js';
import {useSupportAssetUnitsStore} from '../support-asset-units-store.js';

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
        save_schema_version: 1,
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

    getStores().forEach((store) => {
        store.$reset();
        store.$patch(data[store.$id]);
    });
}