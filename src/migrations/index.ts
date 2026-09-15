import * as migration_20260912_171950_initial from './20260912_171950_initial';
import * as migration_20260915_092011_add_featured_video from './20260915_092011_add_featured_video';
import * as migration_20260915_110005_add_games_collection from './20260915_110005_add_games_collection';
import * as migration_20260915_125906_add_logo_dark from './20260915_125906_add_logo_dark';

export const migrations = [
  {
    up: migration_20260912_171950_initial.up,
    down: migration_20260912_171950_initial.down,
    name: '20260912_171950_initial',
  },
  {
    up: migration_20260915_092011_add_featured_video.up,
    down: migration_20260915_092011_add_featured_video.down,
    name: '20260915_092011_add_featured_video',
  },
  {
    up: migration_20260915_110005_add_games_collection.up,
    down: migration_20260915_110005_add_games_collection.down,
    name: '20260915_110005_add_games_collection',
  },
  {
    up: migration_20260915_125906_add_logo_dark.up,
    down: migration_20260915_125906_add_logo_dark.down,
    name: '20260915_125906_add_logo_dark'
  },
];
