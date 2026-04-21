import { makeFrozenStaticListIds } from './data-helpers';
import { MECH_TEAM_SIZE } from './mech-teams';

export enum GAME_SIZE {
    DUEL = 'GAME_SIZE_DUEL',
    RECON = 'GAME_SIZE_RECON',
    STRIKE = 'GAME_SIZE_STRIKE',
    BATTLE = 'GAME_SIZE_BATTLE',
    WAR = 'GAME_SIZE_WAR',
}

export interface GameSize {
    id: GAME_SIZE;
    display_name: string,
    min_tons: number;
    max_support_assets: number;
    max_teams: number;
    max_secondary_agendas: number;
    max_team_sizes: {
        [MECH_TEAM_SIZE.SMALL]: number;
        [MECH_TEAM_SIZE.MEDIUM]: number;
        [MECH_TEAM_SIZE.LARGE]: number;
    };
}

export const GAME_SIZES = makeFrozenStaticListIds<GameSize>({
    [GAME_SIZE.DUEL]: {
        display_name: 'Duel',
        min_tons: 0,
        max_support_assets: 0,
        max_teams: 0,
        max_secondary_agendas: 0,
        max_team_sizes: {
            [MECH_TEAM_SIZE.SMALL]: 0,
            [MECH_TEAM_SIZE.MEDIUM]: 0,
            [MECH_TEAM_SIZE.LARGE]: 0,
        },
    },
    [GAME_SIZE.RECON]: {
        display_name: 'Recon',
        min_tons: 100,
        max_support_assets: 1,
        max_teams: 1,
        max_secondary_agendas: 1,
        max_team_sizes: {
            [MECH_TEAM_SIZE.SMALL]: 1,
            [MECH_TEAM_SIZE.MEDIUM]: 0,
            [MECH_TEAM_SIZE.LARGE]: 0,
        },
    },
    [GAME_SIZE.STRIKE]: {
        display_name: 'Strike',
        min_tons: 150,
        max_support_assets: 2,
        max_teams: 2,
        max_secondary_agendas: 2,
        max_team_sizes: {
            [MECH_TEAM_SIZE.SMALL]: 0,
            [MECH_TEAM_SIZE.MEDIUM]: 2,
            [MECH_TEAM_SIZE.LARGE]: 0,
        },
    },
    [GAME_SIZE.BATTLE]: {
        display_name: 'Battle',
        min_tons: 200,
        max_support_assets: 3,
        max_teams: 3,
        max_secondary_agendas: 3,
        max_team_sizes: {
            [MECH_TEAM_SIZE.SMALL]: 0,
            [MECH_TEAM_SIZE.MEDIUM]: 2,
            [MECH_TEAM_SIZE.LARGE]: 1,
        },
    },
    [GAME_SIZE.WAR]: {
        display_name: 'All Out War',
        min_tons: 350,
        max_support_assets: 4,
        max_teams: 4,
        max_secondary_agendas: 4,
        max_team_sizes: {
            [MECH_TEAM_SIZE.SMALL]: 0,
            [MECH_TEAM_SIZE.MEDIUM]: 2,
            [MECH_TEAM_SIZE.LARGE]: 2,
        },
    },
});

export function getGameSizeId(maxTons: number): GAME_SIZE | undefined {
    const sizes = [
        GAME_SIZE.WAR,
        GAME_SIZE.BATTLE,
        GAME_SIZE.STRIKE,
        GAME_SIZE.RECON,
        GAME_SIZE.DUEL,
    ];

    return sizes.find((sizeId) => {
        return maxTons >= GAME_SIZES[sizeId].min_tons;
    });
}
