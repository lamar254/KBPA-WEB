import * as migration_20260912_171950_initial from './20260912_171950_initial';

export const migrations = [
  {
    up: migration_20260912_171950_initial.up,
    down: migration_20260912_171950_initial.down,
    name: '20260912_171950_initial'
  },
];
