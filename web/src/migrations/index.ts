import * as migration_20260918_072330 from './20260918_072330';
import * as migration_20260921_170308_upgrade_3_90_schema from './20260921_170308_upgrade_3_90_schema';

export const migrations = [
  {
    up: migration_20260918_072330.up,
    down: migration_20260918_072330.down,
    name: '20260918_072330',
  },
  {
    up: migration_20260921_170308_upgrade_3_90_schema.up,
    down: migration_20260921_170308_upgrade_3_90_schema.down,
    name: '20260921_170308_upgrade_3_90_schema'
  },
];
