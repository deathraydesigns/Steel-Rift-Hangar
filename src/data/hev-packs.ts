import { pack3 } from './hev-packs/Akamatsu Assassination Team Box';
import { pack4 } from './hev-packs/Cerberus Gunslinger Team Box';
import { pack1 } from './hev-packs/Quick Start - Authority';
import { pack2 } from './hev-packs/Quick Start - Freelance';
import type { MechTeamId } from './mech-teams';

export const HEV_PACKS = [
    makePack(pack1 as any),
    makePack(pack2 as any),
    makePack(pack3 as any),
    makePack(pack4 as any),
];

export type HevPack = ReturnType<typeof makePack>

function makePack({ name, team_id, mechs }: { name: string, team_id: MechTeamId, mechs: string[] }) {
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