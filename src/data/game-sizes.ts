import { makeFrozenStaticListIds } from './data-helpers';
import { TEAM_SIZE_LARGE, TEAM_SIZE_MEDIUM, TEAM_SIZE_SMALL } from './mech-teams';

export const GAME_SIZE_DUEL = 'GAME_SIZE_DUEL' as const;
export const GAME_SIZE_RECON = 'GAME_SIZE_RECON' as const;
export const GAME_SIZE_STRIKE = 'GAME_SIZE_STRIKE' as const;
export const GAME_SIZE_BATTLE = 'GAME_SIZE_BATTLE' as const;
export const GAME_SIZE_WAR = 'GAME_SIZE_WAR' as const;

export type GameSizeId =
    | typeof GAME_SIZE_DUEL
    | typeof GAME_SIZE_RECON
    | typeof GAME_SIZE_STRIKE
    | typeof GAME_SIZE_BATTLE
    | typeof GAME_SIZE_WAR;

export interface GameSize {
    id: GameSizeId;
    display_name: string,
    min_tons: number;
    max_support_assets: number;
    max_teams: number;
    max_secondary_agendas: number;
    max_team_sizes: {
        [TEAM_SIZE_SMALL]: number;
        [TEAM_SIZE_MEDIUM]: number;
        [TEAM_SIZE_LARGE]: number;
    };
}

export const GAME_SIZES = makeFrozenStaticListIds<GameSize>({
    [GAME_SIZE_DUEL]: {
        display_name: 'Duel',
        min_tons: 0,
        max_support_assets: 0,
        max_teams: 0,
        max_secondary_agendas: 0,
        max_team_sizes: {
            [TEAM_SIZE_SMALL]: 0,
            [TEAM_SIZE_MEDIUM]: 0,
            [TEAM_SIZE_LARGE]: 0,
        },
    },
    [GAME_SIZE_RECON]: {
        display_name: 'Recon',
        min_tons: 100,
        max_support_assets: 1,
        max_teams: 1,
        max_secondary_agendas: 1,
        max_team_sizes: {
            [TEAM_SIZE_SMALL]: 1,
            [TEAM_SIZE_MEDIUM]: 0,
            [TEAM_SIZE_LARGE]: 0,
        },
    },
    [GAME_SIZE_STRIKE]: {
        display_name: 'Strike',
        min_tons: 150,
        max_support_assets: 2,
        max_teams: 2,
        max_secondary_agendas: 2,
        max_team_sizes: {
            [TEAM_SIZE_SMALL]: 0,
            [TEAM_SIZE_MEDIUM]: 2,
            [TEAM_SIZE_LARGE]: 0,
        },
    },
    [GAME_SIZE_BATTLE]: {
        display_name: 'Battle',
        min_tons: 200,
        max_support_assets: 3,
        max_teams: 3,
        max_secondary_agendas: 3,
        max_team_sizes: {
            [TEAM_SIZE_SMALL]: 0,
            [TEAM_SIZE_MEDIUM]: 2,
            [TEAM_SIZE_LARGE]: 1,
        },
    },
    [GAME_SIZE_WAR]: {
        display_name: 'All Out War',
        min_tons: 350,
        max_support_assets: 4,
        max_teams: 4,
        max_secondary_agendas: 4,
        max_team_sizes: {
            [TEAM_SIZE_SMALL]: 0,
            [TEAM_SIZE_MEDIUM]: 2,
            [TEAM_SIZE_LARGE]: 2,
        },
    },
});

export function getGameSizeId(maxTons: number): GameSizeId | undefined {
    const sizes = [
        GAME_SIZE_WAR,
        GAME_SIZE_BATTLE,
        GAME_SIZE_STRIKE,
        GAME_SIZE_RECON,
        GAME_SIZE_DUEL,
    ];

    return sizes.find((sizeId) => {
        return maxTons >= GAME_SIZES[sizeId].min_tons;
    });
}
