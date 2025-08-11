import {pack1} from './hev-packs/Quick Start - Authority.js';
import {pack2} from './hev-packs/Quick Start - Freelance.js';
import {pack4} from './hev-packs/Cerberus Gunslinger Team Box.js';
import {pack3} from './hev-packs/Akamatsu Assassination Team Box.js';

export const HEV_PACKS = [
    makePack(pack1),
    makePack(pack2),
    makePack(pack3),
    makePack(pack4),
];

function makePack({name, team_id, mechs}) {
    return {
        name,
        team_id,
        data: {
            save_schema_version: 3,
            mech: {
                mechs,
            },
            team: {
                teams: [],
            },
        },
    };
}