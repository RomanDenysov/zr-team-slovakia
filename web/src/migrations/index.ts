import * as migration_20260918_072330 from './20260918_072330';

export const migrations = [
  {
    up: migration_20260918_072330.up,
    down: migration_20260918_072330.down,
    name: '20260918_072330'
  },
];
