import * as migration_20260912_171950_initial from './20260912_171950_initial';
import * as migration_20260915_092011_add_featured_video from './20260915_092011_add_featured_video';

export const migrations = [
  {
    up: migration_20260912_171950_initial.up,
    down: migration_20260912_171950_initial.down,
    name: '20260912_171950_initial',
  },
  {
    up: migration_20260915_092011_add_featured_video.up,
    down: migration_20260915_092011_add_featured_video.down,
    name: '20260915_092011_add_featured_video'
  },
];
