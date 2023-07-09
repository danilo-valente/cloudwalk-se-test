export type Action =
  | 'InitGame'
  | 'Kill'
  | 'ClientUserinfoChanged'
  | 'score'
  | string;

export type LogHeader = {
  time: string;
  action: Action;
};

// Extracted from source code: https://github.com/id-Software/Quake-III-Arena/blob/master/code/game/q_shared.h#L1095-L1103
export const ENTITYNUM_WORLD = '1022';
export type ENTITYNUM_WORLD = '1022'; // Also declare as a type, so it can be used for type-checking

export const worldTypeGuard = (entityId: string): entityId is ENTITYNUM_WORLD => entityId === ENTITYNUM_WORLD;

export const MEANS_OF_DEATH = [
  'MOD_UNKNOWN',
  'MOD_SHOTGUN',
  'MOD_GAUNTLET',
  'MOD_MACHINEGUN',
  'MOD_GRENADE',
  'MOD_GRENADE_SPLASH',
  'MOD_ROCKET',
  'MOD_ROCKET_SPLASH',
  'MOD_PLASMA',
  'MOD_PLASMA_SPLASH',
  'MOD_RAILGUN',
  'MOD_LIGHTNING',
  'MOD_BFG',
  'MOD_BFG_SPLASH',
  'MOD_WATER',
  'MOD_SLIME',
  'MOD_LAVA',
  'MOD_CRUSH',
  'MOD_TELEFRAG',
  'MOD_FALLING',
  'MOD_SUICIDE',
  'MOD_TARGET_LASER',
  'MOD_TRIGGER_HURT',
  'MOD_NAIL',
  'MOD_CHAINGUN',
  'MOD_PROXIMITY_MINE',
  'MOD_KAMIKAZE',
  'MOD_JUICED',
  'MOD_GRAPPLE'
];

export type MeansOfDeath = typeof MEANS_OF_DEATH[number];

export type GenericPlayer = {
  clientId: string;
  isWorld: boolean;
};

export type HumanPlayer = GenericPlayer & {
  name: string;
  isWorld: false;
  score: number;
};

export type WorldPlayer = GenericPlayer & {
  clientId: ENTITYNUM_WORLD;
  isWorld: true;
};

export type Player = HumanPlayer | WorldPlayer;

export type Kill = {
  killer: Player;
  victim: HumanPlayer;
  reason: MeansOfDeath | string;
};

export type Exit =
  | 'Timelimit'
  | 'Fraglimit'
  | 'Capturelimit'
  | string;

export type BasicDigest = {
  total_kills: number;
  players: string[];
  kills: Record<string, number>;
  reasons?: Record<MeansOfDeath, number>;
};

export type DetailedDigest = Required<BasicDigest> & {
  exit: Exit | null;
  log_score: Record<string, number>;
};
