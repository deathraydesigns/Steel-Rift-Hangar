import { countBy, sortBy, sumBy } from 'es-toolkit';
import { defineScopeableStore } from 'pinia-scope';
import { computed, readonly, ref } from 'vue';
import { getInfantrySquad, type INFANTRY, INFANTRY_SQUADS } from '../data/infantry-squads';
import { INFANTRY_ORDERS } from '../data/orders';
import { SUPPORT_ASSET_UNITS } from '../data/support-asset-units';
import {
    type InfantrySquadInfo,
    SUPPORT_ASSET_UNIT,
    type SupportAssetUnitAttachment,
    type SupportAssetUnitDef,
    type SupportAssetUnitInfo,
    type SupportAssetUnitVehicleDef,
    type UnitAttachmentInfo,
    type UnitAttachmentVehicleInfo,
    type UnitVehicleId,
    type UnitVehicleInfo,
    type UnitWeaponInfo,
    type VehicleAttachment,
} from '../data/support-assets/_support-asset-types';
import type { UpgradePodId } from '../data/support-assets/ultra-light-hev-squadron';
import { UNIT_SIZES } from '../data/unit-sizes';
import { freshUnitTrait, UNIT_TRAIT, UNIT_TRAITS, unitTraitDisplayName } from '../data/unit-traits';
import { UNIT_TYPE, UNIT_TYPES } from '../data/unit-types';
import { UNIT_WEAPONS, type UNIT_WEAPON } from '../data/unit-weapons';
import { freshWeaponTrait, WEAPON_TRAIT, WEAPON_TRAITS } from '../data/weapon-traits';
import { type GarrisonUnitInfo, type Trait } from '../types';
import { filterUniqueById, findById, findItemIndexById } from './helpers/collection-helper';
import { makeGrantedOrderCollection, makeUniqueItemIdCollection } from './helpers/helpers';

export const useSupportAssetUnitsStore = defineScopeableStore('support-asset-units', ({ scope }: { scope: string }) => {

        const support_asset_units = ref<SupportAssetUnitAttachment[]>([]);
        const support_asset_units_id_increment = ref(0);

        function $reset() {
            support_asset_units.value = [];
            support_asset_units_id_increment.value = 0;
        }

        const support_asset_unit_ids = computed(() => {
            return support_asset_units.value.map(item => item.support_asset_unit_id);
        });

        const available_support_asset_unit_ids = computed(() => {
            const keys = Object.keys(SUPPORT_ASSET_UNITS) as SUPPORT_ASSET_UNIT[];
            return keys.filter(id => !support_asset_unit_ids.value.includes(id));
        });

        const available_support_asset_units_info = computed(() => {
            let results = available_support_asset_unit_ids.value
                .map((id) => _getUnitInfo(id));

            return sortBy(results, ['display_name']);
        });

        const support_asset_units_info = computed(() => {
            let results = support_asset_units.value
                .map(({ id }) => getUnitAttachmentInfo(id))
                .filter(v => !!v);

            return sortBy(results, ['display_name']);
        });

        const used_tons = computed(() => sumBy(support_asset_units_info.value, (t) => t.cost));
        const used_count = computed(() => support_asset_units.value.length);

        const has_mine_drones = computed(() => {
            const hasOutpost = support_asset_units.value.find((unit) => unit.support_asset_unit_id === SUPPORT_ASSET_UNIT.INFANTRY_OUTPOST);
            if (hasOutpost) {
                return true;
            }

            return !!support_asset_units_info.value.find(unit => {
                return unit.vehicles.find((vehicle) => {
                    return vehicle.traits.find((trait) => trait.id === UNIT_TRAIT.SUPPORT_MINE_DRONE_LAYER);
                });
            });
        });

        function getUnitAttachmentInfo(unitAttachmentId: number): null | UnitAttachmentInfo {
            let attachment = findById(support_asset_units.value, unitAttachmentId);
            if (!attachment) return null;

            let {
                id,
                support_asset_unit_id,
                vehicles,
                upgrade_pod_id,
            } = attachment;

            let {
                display_name,
                unit_type_id,
                size,
                cost,
                max_armor_tons,
                max_vehicles,
                max_duplicate_vehicles,
                unit_points_description,
                all_vehicle_must_be_the_same,
                traits,
                defense,
            } = _getUnitInfo(support_asset_unit_id);

            let vehicleInfos = vehicles.map(vehicleAttachment => getUnitAttachmentVehicleInfo(unitAttachmentId, vehicleAttachment.id))
                .filter(v => !!v);

            let cardIdIncrement = 1;

            vehicleInfos = vehicleInfos.map(vehicle => {
                vehicle = Object.assign({}, vehicle);
                if (vehicle.garrison_units) {
                    vehicle.garrison_units = vehicle.garrison_units.map((garrisonUnit) => {
                        return Object.assign({}, garrisonUnit, { card_ref_id: cardIdIncrement++ });
                    });
                }

                return vehicle;
            });

            const result: UnitAttachmentInfo = {
                id,
                support_asset_unit_id,
                unit_type: UNIT_TYPES[unit_type_id],
                display_name,
                size,
                cost,
                max_armor_tons,
                max_vehicles,
                max_duplicate_vehicles,
                unit_points_description,
                upgrade_pod_id,
                vehicles: vehicleInfos,
                traits,
                defense,
                all_vehicle_must_be_the_same,
            };

            return readonly(result) as UnitAttachmentInfo;
        }

        function _getUnitInfo(unitId: SUPPORT_ASSET_UNIT): SupportAssetUnitInfo {
            const asset = SUPPORT_ASSET_UNITS[unitId];
            return {
                ...asset,
                vehicles: Object.fromEntries(Object.entries(asset.vehicles)
                    .map(([key, val]) => [key, _getUnitVehicleInfo(unitId, key)])),
                unit_type: UNIT_TYPES[asset.unit_type_id]!,
                size: UNIT_SIZES[asset.size_id]!,
                traits: (asset.traits ?? []).map(freshUnitTrait<UNIT_TRAIT>),
            };
        }

        function getUnitVehicleAttachmentRequiredWeaponsInfo(unitAttachmentId: number, vehicleAttachmentId: number): UnitWeaponInfo[] {
            const vehicleDef = getUnitAttachmentVehicleDef(unitAttachmentId, vehicleAttachmentId);
            if (!vehicleDef) return [];

            const unitAttachment = getUnitAttachment(unitAttachmentId);
            if (!unitAttachment) return [];
            const unitDef = getUnitAttachmentDef(unitAttachmentId);
            if (!unitDef) return [];

            let weapons: UnitWeaponInfo[] = [];
            if (vehicleDef.weapon_ids) {
                weapons = vehicleDef.weapon_ids.map(weaponId => _getWeaponInfo(weaponId));
            }

            if (unitDef.upgrade_pods && unitAttachment.upgrade_pod_id) {
                const pod = unitDef.upgrade_pods[unitAttachment.upgrade_pod_id];

                if (pod && pod.weapon_id) {
                    weapons.push(_getWeaponInfo(pod.weapon_id));
                }
            }

            return weapons;
        }

        function isSquadron(unitAttachmentId: number): boolean {
            const info = getUnitAttachmentInfo(unitAttachmentId);
            if (!info) return false;
            return !!info.traits.find((trait) => trait.id === UNIT_TRAIT.SQUADRON);
        }

        function getAllUnitTraits() {
            const traitCollection = makeUniqueItemIdCollection(UNIT_TRAITS);
            support_asset_units.value.forEach(asset => {
                const info = getUnitAttachmentInfo(asset.id);
                if (!info) return;
                traitCollection.addMultiple(info?.traits ?? []);
                info.vehicles.forEach((vehicle) => {
                    traitCollection.addMultiple(vehicle.traits);
                });
            });
            traitCollection.all().forEach(trait => {
                traitCollection.addIds(trait?.dependent_trait_ids ?? []);
            });

            return traitCollection.all();
        }

        function getAllWeaponTraitsCollection() {
            const traitCollection = makeUniqueItemIdCollection(WEAPON_TRAITS);
            support_asset_units.value.forEach(asset => {
                const info = getUnitAttachmentInfo(asset.id);
                if (!info) return;
                info.vehicles.forEach((vehicle) => {
                    vehicle.weapons?.forEach((weapon) => {
                        traitCollection.addMultiple(weapon.traits);
                    });
                });
            });
            return traitCollection;
        }

        function getUnitVehicleAttachmentAvailableWeaponChoicesInfo(unitAttachmentId: number, vehicleAttachmentId: number) {
            const vehicleDef = getUnitAttachmentVehicleDef(unitAttachmentId, vehicleAttachmentId);
            if (!vehicleDef || !vehicleDef.weapon_choice_ids) {
                return [];
            }

            return Object.keys(vehicleDef.weapon_choice_ids).map(key => {
                const weaponIds = vehicleDef.weapon_choice_ids![key];
                return {
                    id: key,
                    weapons: weaponIds.map(weaponId => {
                        const { display_name, id } = _getWeaponInfo(weaponId);

                        return { display_name, id };
                    }),
                };
            });
        }

        function getUnitAttachmentAllGarrisonChoicesInfo(unitAttachmentId: number) {
            const unitDef = getUnitAttachmentDef(unitAttachmentId);
            if (!unitDef) return [];

            let garrisonUnitIds: INFANTRY[] = [];
            Object.values(unitDef.vehicles).forEach(vehicleDef => {
                if (vehicleDef.garrison_choice_unit_ids) {
                    garrisonUnitIds = garrisonUnitIds.concat(vehicleDef.garrison_choice_unit_ids);
                }
            });

            return garrisonUnitIds.map(_getGarrisonUnitInfo);
        }

        function getUnitVehicleAttachmentAvailableGarrisonChoicesInfo(unitAttachmentId: number, vehicleAttachmentId: number) {
            const vehicleDef = getUnitAttachmentVehicleDef(unitAttachmentId, vehicleAttachmentId);

            if (!vehicleDef || !vehicleDef.garrison_choice_unit_ids) {
                return [];
            }

            return vehicleDef.garrison_choice_unit_ids.map(unitId => {
                return _getGarrisonUnitInfo(unitId);
            });
        }

        function getUnitVehicleAttachmentGarrisonMax(unitAttachmentId: number, vehicleAttachmentId: number) {
            const vehicleDef = getUnitAttachmentVehicleDef(unitAttachmentId, vehicleAttachmentId);
            if (!vehicleDef) return;
            if (!vehicleDef.traits) return;
            const garrisonTrait = findById<Trait<UNIT_TRAIT>>(vehicleDef.traits, UNIT_TRAIT.GARRISON);

            if (!garrisonTrait) {
                return;
            }

            return garrisonTrait.number as number;
        }

        function getUnitUpgradePodChoicesInfo(unitAttachmentId: number) {
            const unitDef = getUnitAttachmentDef(unitAttachmentId);

            if (!unitDef || !unitDef.upgrade_pods) {
                return [];
            }

            return Object.entries(unitDef.upgrade_pods).map(([key, pod]) => {
                let description = 'none';

                if (pod.weapon_id) {
                    description = 'Weapon: ' + UNIT_WEAPONS[pod.weapon_id].display_name;
                }
                if (pod.trait) {
                    description = 'Trait: ' + unitTraitDisplayName(pod.trait);
                }

                return {
                    id: key,
                    description,
                };
            });
        }

        function setUnitUpgradePod(unitAttachmentId: number, upgradePodId: UpgradePodId) {
            const unitAttachment = getUnitAttachment(unitAttachmentId);
            if (unitAttachment) {
                unitAttachment.upgrade_pod_id = upgradePodId;
            }
        }

        function _getUnitTraitsInfo(traits: Trait<UNIT_TRAIT>[] | undefined) {
            if (!traits) {
                return [];
            }
            return traits.map(trait => freshUnitTrait(trait));
        }

        function _getUnitVehicleInfo(unitId: SUPPORT_ASSET_UNIT, vehicleId: string): UnitVehicleInfo {
            const asset = SUPPORT_ASSET_UNITS[unitId];
            let vehicle = asset.vehicles[vehicleId];
            const vehicleInfo: UnitVehicleInfo = {
                ...vehicle,
                support_asset_unit_id: unitId,
                weapon_choices: [],
                traits: [],
                weapons: [],
                valid: true,
                validation_message: '',
            };

            if (vehicle.weapon_ids) {
                vehicleInfo.weapons = vehicle.weapon_ids.map((weaponId) => _getWeaponInfo(weaponId));
            }

            if (vehicle.weapon_choice_ids) {
                vehicleInfo.weapon_choices = [];

                for (const weaponIds of Object.values(vehicle.weapon_choice_ids)) {
                    vehicleInfo.weapon_choices.push(weaponIds.map((weaponId) => _getWeaponInfo(weaponId)));
                }
            }

            vehicleInfo.traits = _getUnitTraitsInfo(vehicle.traits);

            return readonly(vehicleInfo) as UnitVehicleInfo;
        }

        function _getInfantryUnitInfo(infantrySquadId: INFANTRY): InfantrySquadInfo {

            let garrisonUnit = getInfantrySquad(infantrySquadId);
            return {
                ...garrisonUnit,
                unit_type: UNIT_TYPES[garrisonUnit.unit_type_id],
                size: UNIT_SIZES[garrisonUnit.size_id],
                weapons: garrisonUnit.weapon_ids.map(weaponId => _getWeaponInfo(weaponId)),
                traits: garrisonUnit.traits.map(trait => freshUnitTrait(trait)),
            };
        }

        function _getWeaponInfo(weaponId: UNIT_WEAPON): UnitWeaponInfo {
            let weapon = UNIT_WEAPONS[weaponId];
            if (!weapon) {
                throw new Error(`unit weapon id: ${weaponId} not found`);
            }
            const weaponInfo = Object.assign({}, weapon) as UnitWeaponInfo;

            weaponInfo.traits = (weapon?.traits?.map((trait) => freshWeaponTrait(trait))
                .filter((w) => w.id !== WEAPON_TRAIT.SHORT) || []) as Trait<WEAPON_TRAIT>[];

            const limitedTrait = findById<Trait<WEAPON_TRAIT>>(weapon.traits, WEAPON_TRAIT.LIMITED);

            if (limitedTrait) {
                weaponInfo.max_uses = limitedTrait.number as number;
            }

            return readonly(weaponInfo) as UnitWeaponInfo;
        }

        function _getGarrisonUnitInfo(infantrySquadId: INFANTRY): InfantrySquadInfo {
            const squad = INFANTRY_SQUADS[infantrySquadId];
            const squadInfo: InfantrySquadInfo = {
                ...squad,
                unit_type: UNIT_TYPES[squad.unit_type_id],
                size: UNIT_SIZES[squad.size_id],
                weapons: squad.weapon_ids.map((weaponId) => _getWeaponInfo(weaponId)),
                traits: squad?.traits?.map((trait) => freshUnitTrait(trait)) || [],
            };

            return readonly(squadInfo) as InfantrySquadInfo;
        }

        function getUnitAttachmentGarrisonUnitsInfo(unitAttachmentId: number): GarrisonUnitInfo[] {
            const info = getUnitAttachmentInfo(unitAttachmentId);
            if (!info) return [];
            const units = info.vehicles.flatMap((vehicle) => vehicle.garrison_units);

            return readonly(units) as GarrisonUnitInfo[];
        }

        function getUnitAttachmentGarrisonUnitTraitsCardInfo(unitAttachmentId: number): Trait<UNIT_TRAIT>[] {
            const info = getUnitAttachmentInfo(unitAttachmentId);
            if (!info) return [];
            let unitTraits = info.vehicles.flatMap((vehicle) => vehicle.garrison_unit_traits || []);
            unitTraits = filterUniqueById(unitTraits);
            return readonly(unitTraits) as Trait<UNIT_TRAIT>[];
        }

        function getUnitAttachmentVehicleInfo(unitAttachmentId: number, vehicleAttachmentId: number): null | UnitAttachmentVehicleInfo {
            const unitAttachment = getUnitAttachment(unitAttachmentId);
            if (!unitAttachment) return null;

            const vehicleAttachment = getUnitVehicleAttachment(unitAttachmentId, vehicleAttachmentId);
            if (!vehicleAttachment) return null;

            const unitAttachmentDef = getUnitAttachmentDef(unitAttachmentId);
            if (!unitAttachmentDef) return null;

            const vehicleDef = getUnitAttachmentVehicleDef(unitAttachmentId, vehicleAttachmentId);
            if (!vehicleDef) return null;

            let weapons: UnitWeaponInfo[] = [];
            if (vehicleDef.weapon_ids) {
                weapons = vehicleDef.weapon_ids.map(weaponId => _getWeaponInfo(weaponId));
            }
            if (vehicleDef.weapon_choice_ids && vehicleAttachment.weapon_choices) {
                Object.keys(vehicleDef.weapon_choice_ids).forEach(key => {
                    const weaponId = vehicleAttachment.weapon_choices![key];
                    if (weaponId) {
                        weapons.push(_getWeaponInfo(weaponId));
                    }
                });
            }
            let garrison_units = vehicleAttachment.garrison_units || [];
            let garrison_unit_infos = garrison_units.map((infantrySquadId) => _getInfantryUnitInfo(infantrySquadId));
            let garrison_unit_traits: Trait[] = vehicleDef.garrison_unit_traits || [];
            let garrison_unit_trait_infos = garrison_unit_traits.map((trait) => freshUnitTrait(trait));

            let traits: Trait<UNIT_TRAIT>[] = [...(vehicleDef.traits ?? [])];

            const {
                id,
            } = vehicleAttachment;

            let {
                display_name,
                move,
                jump,
                armor,
                structure,
                garrison_ul_hev,
            } = vehicleDef;

            if (unitAttachmentDef.upgrade_pods && unitAttachment.upgrade_pod_id) {
                const pod = unitAttachmentDef.upgrade_pods[unitAttachment.upgrade_pod_id];

                if (pod) {
                    if (pod.weapon_id) {
                        weapons.push(_getWeaponInfo(pod.weapon_id));
                    }

                    if (pod.trait) {
                        traits.push(pod.trait);
                        if (pod.trait.id === UNIT_TRAIT.UL_HEV_LAUNCH_GEAR) {
                            jump = move + 2;
                        }
                    }
                }
            }
            const result: UnitAttachmentVehicleInfo = {
                id,
                vehicle_id: vehicleDef.id,
                support_asset_unit_id: unitAttachment.support_asset_unit_id,
                weapons,
                display_name,
                move,
                jump,
                armor,
                structure,
                garrison_ul_hev,
                garrison_units: garrison_unit_infos,
                garrison_unit_traits: garrison_unit_trait_infos,
                traits: _getUnitTraitsInfo(traits),
                valid: true,
                validation_message: '',
            };

            return readonly(result) as UnitAttachmentVehicleInfo;
        }

        function getUnitAttachmentUsedPoints(unitAttachmentId: number) {
            const info = getUnitAttachmentInfo(unitAttachmentId);
            if (!info) return null;
            if (info.max_armor_tons) {
                return getUnitAttachmentArmorTotal(unitAttachmentId);
            }

            return getUnitVehicleCount(unitAttachmentId);
        }

        function getUnitAttachmentMaxPoints(unitAttachmentId: number) {
            const info = getUnitAttachmentInfo(unitAttachmentId);
            if (!info) return null;
            if (info.max_armor_tons) {
                return info.max_armor_tons;
            }

            return info.max_vehicles;
        }

        function getUnitAttachmentPointsValid(unitAttachmentId: number) {
            const used = getUnitAttachmentUsedPoints(unitAttachmentId);
            const max = getUnitAttachmentMaxPoints(unitAttachmentId);
            return used === max;
        }

        const hasUnitId = (unitId: SUPPORT_ASSET_UNIT) => support_asset_unit_ids.value.includes(unitId);
        const getUnitVehicleCount = (unitAttachmentId: number) => {
            const attachment = getUnitAttachment(unitAttachmentId);
            return attachment ? attachment.vehicles.length : 0;
        };

        function getUnitAttachmentArmorTotal(unitAttachmentId: number) {
            const attachment = getUnitAttachment(unitAttachmentId);
            if (!attachment) return 0;
            return sumBy(attachment.vehicles, (vehicle) => getUnitAttachmentVehicleInfo(unitAttachmentId, vehicle.id)?.armor ?? 0);
        }

        const getUnitAttachment = (unitAttachmentId: number) => findById(support_asset_units.value, unitAttachmentId);

        function getUnitAttachmentHasGarrisonUnits(unitAttachmentId: number): boolean {
            const info = getUnitAttachmentInfo(unitAttachmentId);
            if (!info) return false;
            return !!info.vehicles.find((vehicle) => vehicle.garrison_units?.length);
        }

        function getUnitHasGarrisonableVehicles(supportAssetUnitId: SUPPORT_ASSET_UNIT): boolean {
            const unitDef = SUPPORT_ASSET_UNITS[supportAssetUnitId];
            return !!Object.values(unitDef.vehicles).find((vehicleDef) => {
                return vehicleDef.garrison_choice_unit_ids?.length || vehicleDef.garrison_ul_hev;
            });
        }

        function getUnitVehicleAttachment(unitAttachmentId: number, vehicleAttachmentId: number): null | VehicleAttachment {
            const unitAttachment = getUnitAttachment(unitAttachmentId);
            if (!unitAttachment) return null;
            return findById(unitAttachment.vehicles, vehicleAttachmentId) ?? null;
        }

        function getUnitAttachmentVehicleGarrisonWeaponsCardInfo(unitAttachmentId: number): UnitWeaponInfo[] {
            const unit = getUnitAttachmentInfo(unitAttachmentId);
            if (!unit) return [];
            const weapons = unit.vehicles.flatMap((vehicle) => {
                return vehicle.garrison_units?.flatMap((squad) => squad.weapons) ?? [];
            });
            return readonly(filterUniqueById(weapons)) as UnitWeaponInfo[];
        }

        function getUnitAttachmentVehicleWeaponsCardInfo(unitAttachmentId: number): UnitWeaponInfo[] {
            const unit = getUnitAttachmentInfo(unitAttachmentId);
            if (!unit) return [];
            const weapons = unit.vehicles.flatMap((vehicle) => vehicle.weapons);
            return readonly(filterUniqueById(weapons)) as UnitWeaponInfo[];
        }

        function getUnitAttachmentDef(unitAttachmentId: number): null | SupportAssetUnitDef {
            const unitAttachment = getUnitAttachment(unitAttachmentId);
            if (!unitAttachment) return null;
            return SUPPORT_ASSET_UNITS[unitAttachment.support_asset_unit_id];
        }

        function getUnitAttachmentVehicleDef(unitAttachmentId: number, vehicleAttachmentId: number): null | SupportAssetUnitVehicleDef {
            const unitAttachment = getUnitAttachment(unitAttachmentId);
            if (!unitAttachment) return null;
            const vehicleAttachment = findById(unitAttachment.vehicles, vehicleAttachmentId);
            if (!vehicleAttachment) return null;

            return SUPPORT_ASSET_UNITS[unitAttachment.support_asset_unit_id].vehicles[vehicleAttachment.vehicle_id];
        }

        function getUnitAllWeaponsInfo(unitAttachmentId: number) {
            const unitDef = getUnitAttachmentDef(unitAttachmentId);
            if (!unitDef) return [];
            const vehicleDefs = unitDef.vehicles;

            const weaponIdMap = new Set<UNIT_WEAPON>();
            Object.values(vehicleDefs).forEach((vehicleDef) => {
                vehicleDef.weapon_ids?.forEach((weaponId) => {

                    weaponIdMap.add(weaponId);
                });

                Object.values(vehicleDef.weapon_choice_ids || {}).forEach((weaponIds) => {
                    weaponIds.forEach(weaponId => weaponIdMap.add(weaponId));
                });

                if (vehicleDef.garrison_choice_unit_ids) {
                    vehicleDef.garrison_choice_unit_ids.forEach((squadId) => {
                        INFANTRY_SQUADS[squadId].weapon_ids.forEach((weaponId) => weaponIdMap.add(weaponId));
                    });
                }
            });

            if (unitDef.upgrade_pods) {
                Object.values(unitDef.upgrade_pods).forEach(pod => {
                    if (pod.weapon_id) {
                        weaponIdMap.add(pod.weapon_id);
                    }
                });
            }

            return weaponIdMap.values().map(weaponId => _getWeaponInfo(weaponId));
        }

        const validation_messages = computed(() => {
            let messages: string[] = [];
            support_asset_units.value.forEach(unit => {
                const info = getUnitAttachmentInfo(unit.id);
                if (!info) return;
                if (info.max_vehicles) {
                    if (unit.vehicles.length < info.max_vehicles) {
                        messages.push(`${info.display_name} has ${unit.vehicles.length} of ${info.max_vehicles} required ${info.unit_type.display_name}(s)`);
                    }
                }

                if (info.max_armor_tons) {
                    const usedPoints = getUnitAttachmentUsedPoints(unit.id);
                    const maxPoints = getUnitAttachmentMaxPoints(unit.id);

                    if (usedPoints !== maxPoints) {
                        messages.push(`${info.display_name} has used ${usedPoints} armor points of ${maxPoints} required`);
                    }
                }
            });

            return messages;
        });

        function getAvailableVehiclesInfo(unitAttachmentId: number): UnitVehicleInfo[] {
            const unit = getUnitAttachment(unitAttachmentId);
            if (!unit) return readonly([] as UnitVehicleInfo[]) as UnitVehicleInfo[];
            const unitInfo = _getUnitInfo(unit.support_asset_unit_id);

            const vehicles = Object.assign({}, unitInfo.vehicles);
            const selectedVehicleIds = unit.vehicles.map(vehicle => vehicle.vehicle_id);
            const vehicleIdsByCount = countBy(selectedVehicleIds, id => id);

            const vehicleIds = Object.keys(vehicles) as unknown as UnitVehicleId[];

            vehicleIds.forEach(vehicleId => {
                let valid = true;
                let validation_message: string | null = null;
                const maxDuplicates = unitInfo.max_duplicate_vehicles;
                if (maxDuplicates) {
                    const count = vehicleIdsByCount[vehicleId];
                    if (count >= maxDuplicates) {
                        valid = false;
                        validation_message = `Each vehicle may only be included ${maxDuplicates} times in a ${unitInfo.display_name}`;
                    }
                }

                if (unitInfo.all_vehicle_must_be_the_same) {
                    const existingVehicleId = unit.vehicles[0]?.vehicle_id;
                    if (existingVehicleId && vehicleId !== existingVehicleId) {
                        valid = false;
                        validation_message = `All vehicles must be the same type in a ${unitInfo.display_name}`;
                    }
                }

                vehicles[vehicleId] = Object.assign({}, vehicles[vehicleId], {
                    valid,
                    validation_message,
                });
            });

            const unitVehicleInfos = Object.values(vehicles);
            return readonly(unitVehicleInfos) as UnitVehicleInfo[];
        }

        function getAllGrantedOrdersCollection() {
            const grantedOrders = makeGrantedOrderCollection();

            support_asset_units.value.forEach(unit => {
                const vehicleOrders = getUnitAttachmentGrantedOrdersCollection(unit.id);
                grantedOrders.addIds(vehicleOrders.ids());

                const infantryOrders = getUnitAttachmentGarrisonGrantedOrdersCollection(unit.id);
                grantedOrders.addIds(infantryOrders.ids());
            });

            return grantedOrders;
        }

        function getUnitAttachmentGrantedOrdersCollection(unitAttachmentId: number) {
            const grantedOrders = makeGrantedOrderCollection();

            const info = getUnitAttachmentInfo(unitAttachmentId);
            if (!info) return grantedOrders;
            grantedOrders.addMultiple(info.traits);

            info.vehicles.forEach((vehicle) => {
                grantedOrders.addMultiple(vehicle.traits);

                vehicle.weapons.forEach((weapon) => {
                    grantedOrders.addMultiple(weapon.traits);
                });
            });

            return grantedOrders;
        }

        function getUnitAttachmentGarrisonGrantedOrdersCollection(unitAttachmentId: number) {
            const grantedOrders = makeGrantedOrderCollection();
            const garrisonUnits = getUnitAttachmentGarrisonUnitsInfo(unitAttachmentId);
            if (garrisonUnits?.length && garrisonUnits[0]?.unit_type_id === UNIT_TYPE.INFANTRY) {
                grantedOrders.addIds(INFANTRY_ORDERS);
            }

            return grantedOrders;
        }

        function removeSupportAssetId(vehicleAttachmentId: number): void {
            let index = support_asset_units.value.findIndex(item => {
                return item.id === vehicleAttachmentId;
            });
            if (index === -1) {
                throw new Error('index not found');
            }
            support_asset_units.value.splice(index, 1);
        }

        function addSupportAsset(unitId: SUPPORT_ASSET_UNIT) {
            const input: SupportAssetUnitAttachment = {
                id: support_asset_units_id_increment.value++,
                support_asset_unit_id: unitId,
                vehicles_id_increment: 0,
                vehicles: [],
            };

            const unitDef = SUPPORT_ASSET_UNITS[unitId];
            if (unitDef.upgrade_pods) {
                input.upgrade_pod_id = Object.keys(unitDef.upgrade_pods)[0] as UpgradePodId;
            }
            support_asset_units.value.push(input);
        }

        function addVehicle(unitAttachmentId: number, vehicleId: UnitVehicleId) {
            const supportAssetUnit = getUnitAttachment(unitAttachmentId);
            if (!supportAssetUnit) return;
            const supportAssetUnitId = supportAssetUnit.support_asset_unit_id;
            const unitDef = SUPPORT_ASSET_UNITS[supportAssetUnitId];
            const vehicleDef = unitDef.vehicles[vehicleId];

            let addCount = 1;

            if (unitDef.all_vehicle_must_be_the_same) {
                addCount = unitDef.max_vehicles! - supportAssetUnit.vehicles.length;
            }
            Array(addCount).fill(0).forEach(() => {

                const vehicleAttachment: VehicleAttachment = {
                    id: supportAssetUnit.vehicles_id_increment++,
                    vehicle_id: vehicleId,
                    weapon_choices: {},
                };

                if (vehicleDef.weapon_choice_ids) {
                    const weaponChoices: Record<string, UNIT_WEAPON> = {};
                    Object.keys(vehicleDef.weapon_choice_ids).forEach(key => {
                        weaponChoices[key] = vehicleDef.weapon_choice_ids![key][0]!;
                    });
                    vehicleAttachment.weapon_choices = weaponChoices;
                }

                if (vehicleDef.garrison_choice_unit_ids) {
                    const garrisonTrait = findById(vehicleDef.traits || [], UNIT_TRAIT.GARRISON);
                    if (garrisonTrait) {
                        const garrisonChoices: INFANTRY[] = [];
                        Array(garrisonTrait.number).fill(0).forEach((_, index) => {
                            garrisonChoices[index] = vehicleDef.garrison_choice_unit_ids![0];
                        });
                        vehicleAttachment.garrison_units = garrisonChoices;
                    }
                }

                supportAssetUnit.vehicles.push(vehicleAttachment);
            });
        }

        function setUnitVehicleWeaponChoice(unitAttachmentId: number, vehicleAttachmentId: number, choiceId: string, weaponId: UNIT_WEAPON) {
            const vehicleAttachment = getUnitVehicleAttachment(unitAttachmentId, vehicleAttachmentId);
            if (vehicleAttachment && vehicleAttachment.weapon_choices) {
                vehicleAttachment.weapon_choices[choiceId] = weaponId;
            }
        }

        function setUnitVehicleGarrisonChoice(unitAttachmentId: number, vehicleAttachmentId: number, index: number, squadId: INFANTRY) {
            const vehicleAttachment = getUnitVehicleAttachment(unitAttachmentId, vehicleAttachmentId);
            if (vehicleAttachment && vehicleAttachment.garrison_units) {
                vehicleAttachment.garrison_units[index] = squadId;
            }
        }

        function removeVehicle(unitAttachmentId: number, vehicleAttachmentId: number) {
            const unitAttachment = getUnitAttachment(unitAttachmentId);
            if (unitAttachment) {
                const index = findItemIndexById(unitAttachment.vehicles, vehicleAttachmentId);
                if (index) {
                    unitAttachment.vehicles.splice(index, 1);
                }
            }
        }

        return {
            support_asset_units,
            support_asset_units_id_increment,

            has_mine_drones,
            used_tons,
            used_count,

            available_support_asset_units_info,
            support_asset_units_info,
            validation_messages,

            getAvailableVehiclesInfo,
            getUnitVehicleCount,
            getUnitVehicleAttachment,
            getUnitAllWeaponsInfo,
            getUnitAttachmentInfo,
            getUnitAttachmentVehicleInfo,
            getUnitAttachmentVehicleWeaponsCardInfo,
            getUnitVehicleAttachmentAvailableWeaponChoicesInfo,
            getUnitVehicleAttachmentRequiredWeaponsInfo,
            getUnitUpgradePodChoicesInfo,
            getUnitAttachmentUsedPoints,
            getUnitAttachmentMaxPoints,
            getUnitAttachmentPointsValid,
            getUnitVehicleAttachmentAvailableGarrisonChoicesInfo,
            getUnitVehicleAttachmentGarrisonMax,
            getUnitAttachmentAllGarrisonChoicesInfo,
            getUnitAttachmentGarrisonUnitsInfo,
            getUnitAttachmentGarrisonUnitTraitsCardInfo,
            getUnitAttachmentVehicleGarrisonWeaponsCardInfo,
            getUnitAttachmentHasGarrisonUnits,
            getUnitHasGarrisonableVehicles,
            getUnitAttachmentGrantedOrdersCollection,
            getAllGrantedOrdersCollection,
            getUnitAttachmentGarrisonGrantedOrdersCollection,
            getAllUnitTraits,
            getAllWeaponTraitsCollection,
            isSquadron,

            setUnitVehicleGarrisonChoice,
            setUnitUpgradePod,
            setUnitVehicleWeaponChoice,
            addVehicle,
            removeVehicle,
            removeSupportAssetId,
            addSupportAsset,
            hasUnitId,
            $reset,
        };
    }, (scope: string) => {
        return {
            persist: scope === '',
        };
    },
);
