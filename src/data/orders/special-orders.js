export const ORDER_CLEAR_MINEFIELD = 'ORDER_CLEAR_MINEFIELD';
export const ORDER_DASH = 'ORDER_DASH';

export const SPECIAL_ORDERS_DATA = {
    [ORDER_CLEAR_MINEFIELD]: {
        display_name: 'Clear Minefield',
        description: 'Target a Mine Token of any type within 8” and Line of Sight of this Unit. Roll 1D6, adding +1 for each additional model with the Minesweeper Trait in this Unit. on a roll of 4+, the Mine Token is neutralized and removed from play.',
    },
    [ORDER_DASH]: {
        display_name: 'Dash',
        description: 'This Unit may move up to X” ignoring rough terrain and may end facing any direction. At the end of this Dash Order, this Unit may execute a Smash Order or Engage Order. This secondary order does not count towards the normal 2 orders a Unit can take during its activation. Dash orders count as a Move Order for the purposes of determining movement based bonuses for Smash Orders.',
    },
};
